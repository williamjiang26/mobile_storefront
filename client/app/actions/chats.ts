import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

import { getMainDefinition } from "@apollo/client/utilities";
import { gql } from "@apollo/client";
// 1. HTTP Link for standard Queries and Mutations
const httpLink = new HttpLink({
  uri: "http://localhost:8003/graphql",
});

// 2. WebSocket Link for real-time Subscriptions
const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:8003/graphql",
  })
);

// 3. Split traffic: Send mutations to HTTP, send subscriptions to WS
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export const LISTEN_MESSAGES_SUBSCRIPTION = gql`
  subscription OnNewMessage {
    listenMessages {
      id
      senderName
      senderType
      text
    }
  }
`;

// Start the real-time observer stream
// export const subscription = client
//   .subscribe({ query: LISTEN_MESSAGES_SUBSCRIPTION })
//   .subscribe({
//     next(response) {
//       const newMessage = response.data.listenMessages;
//       console.log(
//         `✨ Real-time update from ${newMessage.senderName}:`,
//         newMessage.text
//       );
//       // Frontend Logic: Append `newMessage` to your UI state array here
//       setMessages([...prev])
//     },
//     error(err) {
//       console.error("Subscription pipeline broken:", err);
//     },
//     complete() {
//       console.log("Subscription connection closed cleanly.");
//     },
//   });

const SEND_MESSAGE_MUTATION = gql`
  mutation PublishMessage(
    $senderType: String!
    $senderName: String!
    $text: String!
  ) {
    sendMessage(senderType: $senderType, senderName: $senderName, text: $text) {
      id
      text
    }
  }
`;

// Helper function to fire off user chat actions
export async function handleUserSendMessage(
  name: string,
  typedText: string,
  senderType: string
) {
  try {
    const result = await client.mutate({
      mutation: SEND_MESSAGE_MUTATION,
      variables: {
        senderType: senderType,
        senderName: name,
        text: typedText,
      },
    });
  } catch (error) {
    console.error("Failed to commit mutation request:", error);
  }
}

import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

import { getMainDefinition } from "@apollo/client/utilities";
import { gql } from "@apollo/client";

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_CHATS_URL as string,
});
const wsLink = new GraphQLWsLink(
  createClient({
    url: process.env.NEXT_PUBLIC_WS_CHATS_URL as string,
  })
);
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
  subscription OnNewMessage($roomId: String!) {
    listenMessages(roomId: $roomId) {
      id
      senderName
      senderType
      text
    }
  }
`;

const SEND_MESSAGE_MUTATION = gql`
  mutation PublishMessage(
    $senderType: String!
    $senderName: String!
    $text: String!
    $roomId: String!
  ) {
    sendMessage(
      senderType: $senderType
      senderName: $senderName
      text: $text
      roomId: $roomId
    ) {
      id
      text
      roomId
    }
  }
`;
// Helper function to fire off user chat actions
export async function handleUserSendMessage(
  name: string,
  typedText: string,
  senderType: string,
  roomId: string
) {
  try {
    const result = await client.mutate({
      mutation: SEND_MESSAGE_MUTATION,
      variables: {
        senderType: senderType,
        senderName: name,
        text: typedText,
        roomId: roomId,
      },
    });
  } catch (error) {
    console.error("Failed to commit mutation request:", error);
  }
}

"use client";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";

import { handleUserSendMessage, subscription } from "../actions/chats";
import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

import { getMainDefinition } from "@apollo/client/utilities";
import { gql } from "@apollo/client";
export default function ChatSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi I'm the customer support assistant. You can message directly here and customer service will be with you shortly. You can also call us at , or email us at .",
    },
  ]);
  const [message, setMessage] = useState("");
  // send message function
  // const sendMessage = async () => {
  //   setMessage("");
  //   setMessages((prev) => [
  //     ...prev,
  //     { role: "user", content: message },
  //     { role: "assistant", content: "" },
  //   ]);
  //   try {
  //     const res = await fetch("http://localhost:8000/api/chat/stream", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         messages: [...messages, { role: "user", content: message }],
  //       }),
  //     });
  //     const reader = res.body?.getReader();
  //     if (!reader) throw new Error("No stream reader");

  //     const decoder = new TextDecoder();

  //     while (true) {
  //       const { done, value } = await reader.read();
  //       console.log("🚀 ~ sendMessage ~ value:", value);
  //       if (done) break;

  //       const text = decoder.decode(value, { stream: true });

  //       setMessages((prev) => {
  //         const last = prev[prev.length - 1];
  //         return [
  //           ...prev.slice(0, -1),
  //           { ...last, content: last.content + text },
  //         ];
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Stream error:", error);
  //   }
  // };

  // send message to chat regular
  const sendMessage = () => {
    handleUserSendMessage("user", message);
    setMessage("")
  };
  const httpLink = new HttpLink({
    uri: "http://localhost:8000/graphql",
  });

  // 2. WebSocket Link for real-time Subscriptions
  const wsLink = new GraphQLWsLink(
    createClient({
      url: "ws://localhost:8000/graphql",
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

  // 4. Instantiate the managed client
  const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  });

  const LISTEN_MESSAGES_SUBSCRIPTION = gql`
    subscription OnNewMessage {
      listenMessages {
        id
        senderName
        senderType
        text
      }
    }
  `;
  useEffect(() => {
    // 1. Establish the subscription listener inside the lifecycle hook
    const subscription = client
      .subscribe({ query: LISTEN_MESSAGES_SUBSCRIPTION })
      .subscribe({
        next(response) {
          const newMessage = response.data.listenMessages;
          console.log(
            `✨ Real-time update from ${newMessage.senderName}:`,
            newMessage.text
          );

          // 2. FIX: Use functional state updates to guarantee access to the latest history array
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              // Mapping your backend GraphQL structure to your React UI's role/content layout
              role: newMessage.senderType === "user" ? "user" : "assistant",
              content: newMessage.text,
              id: newMessage.id, // useful for unique React loop keys
            },
          ]);
        },
        error(err) {
          console.error("Subscription pipeline broken:", err);
        },
        complete() {
          console.log("Subscription connection closed cleanly.");
        },
      });

    // 3. CLEANUP: Return an un-subscription hook to tear down the WebSocket when the user leaves the page
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-green-100 p-5"
      >
        {isOpen ? "X" : "Chat"}
      </button>

      {/* Floating Chat Window */}
      {isOpen && (
        <div className="fixed bottom-23 right-6 w-82.5 h-150 z-50 flex flex-col bg-background border rounded-lg shadow-lg">
          {/* chat */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-muted/20">
            {messages.map((m, index) => (
              <div
                key={index}
                className={`p-2.5 rounded-2xl max-w-[80%] w-fit text-sm shadow-sm ${
                  m.role === "assistant"
                    ? "bg-blue-100 text-blue-950 mr-auto rounded-tl-none border border-blue-200"
                    : "bg-green-100 text-green-950 ml-auto rounded-tr-none border border-green-200"
                }`}
              >
                {m.role === "assistant" ? (
                  <Markdown>{m.content}</Markdown>
                ) : (
                  m.content
                )}
              </div>
            ))}
          </div>
          {/* text box + send */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className=" "
          >
            <div className=" w-full bottom-0 rounded-b-lg flex h-10">
              <input
                type="text"
                className="w-full hover:border hover:rounded-bl-lg"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button className="w-7 hover:text-green-300" type="submit">
                {">"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

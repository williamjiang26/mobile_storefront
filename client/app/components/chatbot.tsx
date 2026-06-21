"use client";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";

import {
  handleUserSendMessage,
  client,
  LISTEN_MESSAGES_SUBSCRIPTION,
} from "../actions/chats";
interface ListenMessagesData {
  listenMessages: any; // Replace 'any' with your actual Message type if available
}
const roomId = crypto.randomUUID();

export default function ChatSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "welcome-message",
      role: "assistant",
      content:
        "Hi I'm the customer support assistant. You can message directly here and customer service will be with you shortly. You can also call us at , or email us at .",
    },
    {
      id: "button",
      role: "assistant",
      content: "Click to speak to live sales representative",
    },
  ]);
  const [message, setMessage] = useState("");
  const [isSalesRep, setSalesRep] = useState(false);

  // send message to chat regular
  const sendMessage = () => {
    handleUserSendMessage("user", message, "user", roomId);
    setMessage("");
  };
  const sendAgentMessage = async () => {
    if (!message.trim()) return; // Prevent sending empty messages

    // 1. Clear the input box right away
    const currentInput = message;
    setMessage("");
    const updatedMessages = [
      ...messages,
      { id: "user-message", role: "user", content: currentInput },
    ];
    const payload = { roomId: roomId, messages: updatedMessages };
    try {
      const backendUrl = process.env.NEXT_PUBLIC_STREAM_CHATS_URL as string;
      await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error("Error fetching agent stream:", error);
    }
  };
  const handleSalesRep = () => {
    // remove the button from the conversation
    setMessages((prevMessages) =>
      prevMessages.filter((_, index) => index !== 1)
    ); // switch the route to sales rep
    setSalesRep(true);
  };
  useEffect(() => {
    const subscription = client
      .subscribe<ListenMessagesData>({
        query: LISTEN_MESSAGES_SUBSCRIPTION,
        variables: { roomId },
      })
      .subscribe({
        next(response) {
          const newMessage = response.data?.listenMessages;
          console.log("🚀 ~ next ~ newMessage:", newMessage)
          if (!newMessage) {
            console.warn("new message undefined");
            return;
          }
          setMessages((prevMessages) => {
            const existingMsgIndex = prevMessages.findIndex(
              (msg) => msg.id === newMessage?.id
            );
            if (existingMsgIndex > -1) {
              const updatedMessages = [...prevMessages];
              updatedMessages[existingMsgIndex] = {
                ...updatedMessages[existingMsgIndex],
                content:
                  updatedMessages[existingMsgIndex].content + newMessage?.text,
              };
              return updatedMessages;
            }
            return [
              ...prevMessages,
              {
                id: newMessage?.id,
                role: newMessage?.senderType === "user" ? "user" : "assistant",
                content: newMessage?.text,
              },
            ];
          });
        },
      });

    return () => {
      subscription.unsubscribe();
    };
  }, [roomId, client]);

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6  z-50 rounded-full bg-green-100 p-5"
      >
        {isOpen ? "X" : "Chat"}
      </button>

      {/* Floating Chat Window */}
      {isOpen && (
        <div className="fixed bottom-26 right-6 w-82.5 h-150 z-50 flex flex-col bg-background border rounded-lg shadow-lg">
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
                  m.id === "button" ? (
                    <button onClick={handleSalesRep}>{m.content}</button>
                  ) : (
                    <Markdown>{m.content}</Markdown>
                  )
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
              {
                isSalesRep ? sendMessage() : sendAgentMessage();
              }
            }}
          >
            <div className="w-full bottom-0 rounded-b-lg flex h-10">
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

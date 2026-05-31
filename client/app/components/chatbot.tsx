"use client";
import { useState } from "react";

export default function ChatSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi I'm the customer support assistant. You can message directly here and customer service will be with you shortly. You can also call us at , or email us at .",
    },
    {
      role: "user",
      content: "Hi  ",
    },
  ]);
  const [message, setMessage] = useState("");
  // send message function
  const sendMessage = () => {
    setMessage("");
    setMessages((prev) => [
      ...prev,
      { role: "user", content: message },
      { role: "assistant", content: "" },
    ]);
    // return null;
  };
  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50"
      >
        Chat
      </button>

      {/* Floating Chat Window */}
      {isOpen && (
        <div className="fixed bottom-23 right-6 w-82.5 h-150 z-50 flex flex-col bg-background border rounded-lg shadow-lg">
          {/* chat */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-muted/20">
            {messages.map((m, index) => (
              <div
                key={index}
                className={`p-2.5 rounded-2xl max-w-[80%] text-sm shadow-sm break-words ${
                  m.role === "assistant"
                    ? "bg-blue-100 text-blue-950 mr-auto rounded-tl-none border border-blue-200"
                    : "bg-green-100 text-green-950 ml-auto rounded-tr-none border border-green-200"
                }`}
              >
                {m.content}
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
            <div className="border w-full bottom-0 rounded-b-lg flex h-10">
              <input
                type="text"
                className="w-full border"
                // value={message}
                // onChange={setMessage}
              />
              <button className="w-full border" type="submit">
                {">"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

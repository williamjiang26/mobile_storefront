"use client";
import { useState } from "react";
import Markdown from "react-markdown";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi I'm the customer support assistant. How can I help you today?",
    },
  ]);

  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userContent = message;
    setMessage(""); // Clear input immediately for snappy UX

    // Optimistically update the UI with the user's message and a placeholder for the stream
    setMessages((prev) => [
      ...prev,
      { role: "user", content: userContent },
      { role: "assistant", content: "" },
    ]);

    try {
      const res = await fetch("http://localhost:8000/api/chat/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: userContent }],
        }),
      });

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No stream reader");

      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value, { stream: true });

        setMessages((prev) => {
          const last = prev[prev.length - 1];
          return [
            ...prev.slice(0, -1),
            { ...last, content: last.content + text },
          ];
        });
      }
    } catch (error) {
      console.error("Stream error:", error);
    }
  };

  // Allows users to send messages pressing 'Enter' naturally
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && message.trim()) {
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col  h-full w-full mx-auto bg-white p-5">
      {/* Header state when chat hasn't started */}
      {messages.length === 1 && (
        <div className="flex-1 flex items-center justify-center text-xl font-bold text-blue-400">
          Chat with Customer Support
        </div>
      )}

      {/* Message History Feed */}
      {messages.length > 1 && (
        <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-1 flex flex-col">
          {messages.map((msg, index) => {
            // Hide the streaming assistant bubble if it's completely empty yet
            if (msg.role === "assistant" && !msg.content) return null;

            const isAssistant = msg.role === "assistant";

            return (
              <div
                key={index}
                className={`flex w-full ${
                  isAssistant ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`p-3 rounded-2xl max-w-[80%] text-base leading-relaxed break-words ${
                    isAssistant
                      ? "bg-blue-100 text-blue-900 rounded-tl-none"
                      : "bg-gray-100 text-gray-800 rounded-tr-none"
                  }`}
                >
                  {isAssistant ? (
                    // Style Markdown elements via Tailwind's prose or base classes
                    <Markdown>{msg.content}</Markdown>
                  ) : (
                    <div>{msg.content}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Input Bar Section */}
      <div
        className={`pt-3 border-t border-gray-100 ${
          messages.length > 1 ? "mb-5" : ""
        }`}
      >
        <div className="flex items-center bg-gray-50 rounded-2xl p-2 border border-gray-200">
          <input
            className="flex-1 text-base p-3 text-black bg-transparent outline-none placeholder-gray-400"
            placeholder="Ask directly or ask to speak to live representative"
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            value={message}
          />
          <button
            className="ml-2 px-5 py-3 rounded-xl text-white bg-blue-500 disabled:bg-gray-200 disabled:text-gray-400 font-semibold transition-colors"
            disabled={!message.trim()}
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

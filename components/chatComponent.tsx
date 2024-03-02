"use client"
import { useChat, Message } from "ai/react"

export default function ChatComponent() {
    const { input, handleInputChange, handleSubmit, isLoading, messages } = useChat();

    console.log(messages);
    console.log(input);

    return (
<div className="chat-box flex flex-col h-screen overflow-y-auto bg-gray-100 dark:bg-gray-800 px-4 py-8 rounded-md shadow-md">
      {/* Message history */}
      <div className="message-history flex flex-col gap-4 overflow-y-auto">
        {messages.map((message: Message) => (
          <div
            key={message.id}
            className={`message flex items-center justify-${
              message.role === "assistant" ? "end" : "start"
            }`}
          >
            {message.role === "assistant" && (
              <div className="assistant-avatar rounded-full bg-blue-500 p-2">
                <svg
                  className="text-white w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Replace with your preferred assistant icon */}
                  <path
                    d="M9 5H7C4.8 5 3 6.8 3 9v12c0 2.2 1.8 4 4 4h2a2 2 0 0 0 2-2V9zM15 5h-2C12.2 5 11 6.8 11 9v12c0 2.2 1.8 4 4 4h2a2 2 0 0 0 2-2V9z"
                    fill="currentColor"
                  />
                  <path
                    d="M12 17c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM12 11c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            )}
            <div className="message-content flex flex-col ml-2">
              {message.role === "assistant" ? (
                <h3 className="assistant-name text-lg font-semibold text-blue-700">
                  Travel Thousand Miles
                </h3>
              ) : (
                <h3 className="user-name text-lg font-semibold text-gray-700 dark:text-gray-200">
                  User
                </h3>
              )}
              <div className="message-text text-gray-600 dark:text-gray-200 text-base">
                {message.content}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* User input form */}
      <form className="mt-8 flex items-center justify-between w-full" onSubmit={handleSubmit}>
        <textarea
          className="chat-input flex-grow bg-gray-100 dark:bg-gray-800 border border-transparent rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 resize-none"
          placeholder="Ask your question..."
          value={input}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="rounded-md bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 disabled:opacity-50"
          disabled={!input.trim()} 
        >
          Send
        </button>
      </form>
    </div>
    )
}
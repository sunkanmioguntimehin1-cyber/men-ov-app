import { ChevronLeft, Send } from "lucide-react";
import React, { useState } from "react";

export default function ZienaChat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ziena",
      text: "Hi! I'm Ziena, your menopause support companion. How are you feeling today? 🌸",
      timestamp: "Nov 11, 2025 at 09:55 PM",
    },
    {
      id: 2,
      sender: "user",
      text: "Not well 😔, lately I'm getting hot flashes at night and my mood is all over the place. Can you help?",
    },
    {
      id: 3,
      sender: "ziena",
      text: "Absolutely—you're not alone, I know how difficult hot flashes can be. Let me tailor support, quick checks: How often are the night sweats? Any cycle changes?",
    },
    {
      id: 4,
      sender: "user",
      text: "Almost daily and I'm struggling with irregular cycle too 😔",
    },
  ]);

  const handleSend = () => {
    if (message.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: "user",
          text: message,
        },
      ]);
      setMessage("");
    }
  };

  const handleKeyPress = (e:any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white max-w-md mx-auto">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-pink-200 via-purple-200 to-teal-200 pb-20">
        <div className="flex items-center px-4 py-4">
          <button className="mr-4">
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800">
            Chat with Ziena™
          </h1>
        </div>

        {/* Profile Section */}
        <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-12">
          <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-purple-300">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop"
              alt="Ziena"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Profile Name & Timestamp */}
      <div className="text-center mt-14 mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Ziena™</h2>
        <p className="text-sm text-gray-500 mt-1">Nov 11, 2025 at 09:55 PM</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender === "ziena" && (
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 mr-2 bg-purple-300">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                  alt="Ziena"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                msg.sender === "ziena"
                  ? "bg-purple-500 text-white rounded-tl-sm"
                  : "bg-gray-100 text-gray-800 rounded-tr-sm"
              }`}
            >
              <p className="text-sm leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="px-4 pb-4">
        <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-full px-4 py-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask Ziena™..."
            className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
          />
          <button
            onClick={handleSend}
            className="text-purple-500 hover:text-purple-600 transition-colors"
            disabled={!message.trim()}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-xs text-gray-500 text-center mt-3">
          We care about your data in our{" "}
          <a href="#" className="underline">
            privacy policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}

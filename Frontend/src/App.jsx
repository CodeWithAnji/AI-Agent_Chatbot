import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [model, setModel] = useState("openai");

  const scrollRef = useRef(null);

  useEffect(() => {
    // Auto-scroll to bottom on new message
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");

    const response = await axios.post("http://127.0.0.1:8000/chat", {
      message: input,
      model: model,
    });

    const botMessage = {
      sender: "bot",
      text: response.data.reply,
    };

    setMessages((prev) => [...prev, botMessage]);
  };

  return (
    <div
      className="w-full h-screen bg-gradient-to-br from-[#E3D8FF] to-[#F9E8FF] 
                    flex justify-center items-center p-6"
    >
      {/* Chat Container */}
      <div
        className="w-[480px] h-[680px] bg-white rounded-3xl shadow-xl 
                      border border-purple-100 flex flex-col"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-5 py-4 border-b bg-white">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-purple-600"></div>
            <div>
              <p className="text-lg font-semibold text-gray-800">
                AI-Agent Chatbot
              </p>
            </div>
          </div>

          {/* model dropdown */}
          <select
            className="bg-purple-100 text-purple-700 px-3 py-1 rounded-xl 
                       text-sm outline-none hover:bg-purple-200 transition"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          >
            <option value="openai">OpenAI</option>
            <option value="groq">Groq</option>
            <option value="tavily">Tavily</option>
          </select>
        </div>

        {/* MESSAGES AREA (takes full remaining height) */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F7F4FF]"
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-[80%] p-3 rounded-2xl shadow 
                ${
                  msg.sender === "user"
                    ? "ml-auto bg-purple-600 text-white"
                    : "bg-white text-gray-800"
                }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* FIXED BOTTOM INPUT BAR */}
        <div className="p-4 bg-white border-t flex items-center gap-3">
          <input
            className="flex-1 px-4 py-3 bg-gray-100 rounded-xl outline-none
                       focus:ring-2 focus:ring-purple-400 text-gray-700"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />

          <button
            onClick={sendMessage}
            className="px-5 py-3 rounded-xl bg-purple-600 text-white 
                       hover:bg-purple-700 transition shadow-md"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";

function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [chat, setChat] = useState([
    { sender: "bot", text: "Hi there! Ask me about today’s best deals." },
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const user = { sender: "user", text: input };
    setChat((prev) => [...prev, user]);
    setInput("");

    try {
      const res = await fetch("/api/products/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });
      const data = await res.json();
      const bot = {
        sender: "bot",
        text: data.answer || "🤖 Hmm, I couldn't find a good answer to that.",
      };
      setChat((prev) => [...prev, bot]);
    } catch {
      setChat((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Error reaching AI backend." },
      ]);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open ? (
        <div className="w-72 bg-white rounded-lg shadow-lg border border-gray-300 flex flex-col overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-3 text-sm font-semibold flex justify-between items-center">
            🤖 Assistant
            <button onClick={() => setOpen(false)} className="text-white font-bold">×</button>
          </div>

          <div className="flex-1 p-3 overflow-y-auto bg-sky-50 text-sm space-y-2">
            {chat.map((msg, idx) => (
              <div
                key={idx}
                className={`px-3 py-2 rounded-lg shadow-sm max-w-[85%] ${
                  msg.sender === "bot"
                    ? "bg-white text-blue-800 self-start"
                    : "bg-blue-600 text-white self-end ml-auto"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="flex border-t p-2">
            <input
              className="flex-1 text-sm p-1 px-2 border rounded outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask something..."
            />
            <button
              onClick={handleSend}
              className="ml-2 bg-blue-600 hover:bg-blue-700 text-white px-3 text-sm rounded"
            >
              ▶
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm shadow-lg"
        >
          💬 Chat
        </button>
      )}
    </div>
  );
}

export default AIAssistant;
import React, { useState } from "react";

export default function ChatRoom() {
  const [superChat, setSuperChat] = useState(false);
  const [amount, setAmount] = useState(50);

  const questions = [
    {
      id: 1,
      name: "Bob Smith",
      text: "How does this compare to competitors in the market?",
      time: "10:27:23 PM",
      type: "superchat",
      amount: 100,
    },
    {
      id: 2,
      name: "Carol Davis",
      text: "When will this be available for purchase?",
      time: "10:28:23 PM",
      type: "normal",
    },
    {
      id: 3,
      name: "Alice Johnson",
      text: "What are the key features of the new product?",
      time: "10:26:23 PM",
      type: "done",
    },
  ];

  return (
    <div className="bg-[#0d1117] min-h-screen text-white p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-3">
        <h1 className="text-xl md:text-2xl font-bold">Tech Talk Q&amp;A</h1>
        <div className="flex flex-wrap items-center gap-3">
          <span className="bg-red-600 text-white px-2 py-1 rounded-md text-xs md:text-sm">
            Live
          </span>
          <button className="border border-orange-500 text-orange-500 px-3 py-1 text-sm rounded-md hover:bg-orange-600 hover:text-white transition">
            👑 Admin Mode
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Questions Section */}
        <div className="md:col-span-2 bg-[#161b22] rounded-xl p-4">
          <h2 className="text-lg font-bold mb-4">Questions</h2>
          <div className="space-y-4 overflow-y-auto max-h-[400px] md:max-h-[500px] pr-2">
            {questions.map((q) => (
              <div
                key={q.id}
                className={`p-4 rounded-md text-sm md:text-base ${
                  q.type === "superchat"
                    ? "bg-[#2c1c1c] border-l-4 border-orange-500"
                    : q.type === "done"
                    ? "bg-[#1c242e] opacity-70"
                    : "bg-[#1c242e]"
                }`}
              >
                <div className="flex flex-col md:flex-row justify-between md:items-center mb-2 gap-1">
                  <span className="font-semibold">{q.name}</span>
                  {q.type === "superchat" && (
                    <span className="bg-orange-600 text-white px-2 py-1 text-xs rounded-md self-start md:self-auto">
                      💲 SuperChat ₹{q.amount}
                    </span>
                  )}
                  {q.type === "done" && (
                    <span className="bg-green-700 px-2 py-1 text-xs rounded-md self-start md:self-auto">
                      ✔ Done
                    </span>
                  )}
                </div>
                <p>{q.text}</p>
                <p className="text-gray-400 text-xs mt-2">{q.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Ask Question Section */}
        <div className="bg-[#161b22] rounded-xl p-4 md:p-6">
          <h2 className="text-lg font-bold mb-4">Ask a Question</h2>
          <input
            type="text"
            placeholder="Enter your name..."
            className="w-full p-2 mb-3 rounded-md bg-[#0d1117] border border-gray-700 focus:outline-none focus:border-orange-500 text-sm"
          />
          <textarea
            placeholder="What would you like to ask?"
            rows="4"
            className="w-full p-2 mb-3 rounded-md bg-[#0d1117] border border-gray-700 focus:outline-none focus:border-orange-500 text-sm"
          />
          <div className="flex items-center gap-2 mb-3">
            <button
    onClick={() => setSuperChat(!superChat)}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
      superChat ? "bg-orange-600" : "bg-gray-600"
    }`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
        superChat ? "translate-x-6" : "translate-x-1"
      }`}
    />
  </button>
            <span className="text-sm">SuperChat - Priority question</span>
          </div>

          {superChat && (
            <div className="mb-3">
              <label className="block text-sm mb-1">
                SuperChat Amount (₹)
              </label>
              <input
                type="number"
                min="50"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-2 rounded-md bg-[#0d1117] border border-gray-700 focus:outline-none focus:border-orange-500 text-sm"
              />
              <p className="text-gray-400 text-xs mt-1">
                Minimum amount: ₹50
              </p>
            </div>
          )}

          <button
            className={`w-full py-2 md:py-3 rounded-md font-semibold transition text-sm md:text-base ${
              superChat
                ? "bg-orange-600 hover:bg-orange-700"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            {superChat
              ? `🚀 Submit SuperChat (₹${amount})`
              : "📩 Submit Question"}
          </button>
        </div>
      </div>

      {/* Demo Features */}
      <div className="mt-6 bg-[#161b22] p-4 rounded-xl max-w-full md:max-w-md">
        <h3 className="font-bold mb-2">Demo Features</h3>
        <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
          <li>Toggle admin mode to manage questions</li>
          <li>Try SuperChat for priority questions</li>
          <li>Questions are sorted by priority</li>
          <li>All data is stored locally (demo only)</li>
        </ul>
      </div>
    </div>
  );
}

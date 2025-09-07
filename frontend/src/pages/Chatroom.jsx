import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { fetchMessages, getChatRoomBySlug } from "../API/Chatroom/Chatroom";
import { Context } from "../context/Context";
import { CalendarDays, MessageCircleQuestionMark } from "lucide-react";
import { sendSuperChat } from "../API/Payment/Payment";

export default function ChatRoom() {
  const { slug } = useParams();
  const { Data, setData } = useContext(Context);

  const [FreeMsg, setFreeMsg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState({
    username: "",
    message: "",
    isSuper: false,
    amount: 50,
  });

  // 🔹 Load chatroom + previous messages
  useEffect(() => {
    async function loadChatRoom() {
      if (!slug) return;
      try {
        const chatRoom = await getChatRoomBySlug(slug);
        setData(chatRoom);

        if (chatRoom?._id) {
          const messages = await fetchMessages(chatRoom._id);
          setFreeMsg(messages);
        }
      } catch (error) {
        console.error("Error loading chat room:", error);
      }
    }
    loadChatRoom();
  }, [slug, setData]);

  // 🔹 Socket connection
  useEffect(() => {
    if (!slug) return;
    const socket = createSocketConnection();
    socket.emit("join-room", { slug });

    socket.on("new-message", (data) => {
      const obj = {
        _id: data._id,
        username: data.username,
        message: data.message,
        isSuper: data.isSuper,
        paymentAmount: data.paymentAmount,
        isDone: data.isDone,
        createdAt: data.createdAt,
      };
      setFreeMsg((prev) => [...prev, obj]);
    });

    return () => socket.disconnect();
  }, [slug]);

  // 🔹 Send free message
  function sendMessage() {
    if (!newMessage.username.trim() || !newMessage.message.trim()) {
      alert("Please enter both name and message");
      return;
    }

    const socket = createSocketConnection();
    socket.emit("free-message", {
      slug: slug,
      chatRoomId: Data._id,
      username: newMessage.username,
      message: newMessage.message,
      isSuper: false,
    });

    // Reset only the message field
    setNewMessage((prev) => ({ ...prev, message: "" }));
  }

  // 🔹 Send paid message (SuperChat)
  async function paidMessage() {
    if (!newMessage.username.trim() || !newMessage.message.trim()) {
      alert("Please enter both name and message");
      return;
    }

    if (newMessage.amount < 50) {
      alert("Minimum SuperChat amount is ₹50");
      return;
    }

    try {
      setLoading(true);
      await sendSuperChat({
        slug,
        chatRoomId: Data._id,
        username: newMessage.username,
        message: newMessage.message,
        amount: newMessage.amount,
      });
      
      // Reset message after successful payment initiation
      setNewMessage((prev) => ({ ...prev, message: "" }));
    } catch (error) {
      console.error("SuperChat failed:", error);
      alert("Failed to initiate SuperChat. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-[#0d1117] min-h-screen text-white p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-3">
        <h1 className="text-xl md:text-2xl font-bold">
          {Data?.title ?? "Create ChatRoom"}
        </h1>
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`text-xs font-semibold px-2 py-1 rounded inline-block ${
              Data?.isLive ? "bg-orange-500 text-black" : "bg-gray-600"
            }`}
          >
            {Data?.isLive ? "Live" : "Offline"}
          </span>
          <button className="border border-orange-500 text-orange-500 px-3 py-1 text-sm rounded-md hover:bg-orange-600 hover:text-white transition">
            👑 Admin Mode
          </button>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 pt-2">
        {/* Messages Section */}
        <div className="lg:col-span-3 bg-[#161b22] rounded-xl p-4">
          <h2 className="text-lg font-bold mb-4">Questions</h2>
          <div className="space-y-4 overflow-y-auto max-h-[500px] pr-2">
            {FreeMsg.length > 0 ? (
              FreeMsg.map((q) => (
                <div
                  key={q?._id}
                  className={`border-1 p-4 rounded-md text-sm md:text-base ${
                    q.isSuper === true
                      ? "bg-[#2c1c1c] border-l-4 border-orange-500"
                      : q.isDone === true
                      ? "bg-[#1c242e] opacity-70"
                      : "bg-[#1c242e]"
                  }`}
                >
                  <div className="flex flex-col md:flex-row justify-between md:items-center mb-2 gap-1">
                    <span className="uppercase font-mono text-sm">
                      🙋🏻 {q?.username} |{" "}
                      <CalendarDays className="inline text-gray-400" size={14} />
                      <span className="text-sm text-gray-400 ml-1">
                        {new Date(q?.createdAt).toLocaleString()}
                      </span>
                    </span>

                    {q.isSuper && (
                      <span className="bg-orange-600 text-white px-2 py-1 text-xs rounded-md self-start md:self-auto">
                        💲 SuperChat ₹{q?.paymentAmount}
                      </span>
                    )}
                  </div>
                  <p className="text-lg font-light">
                    <MessageCircleQuestionMark className="inline text-orange-500 mr-2" size={20} />
                    {q?.message}
                  </p>
                </div>
              ))
            ) : (
              <div className="flex-1 flex items-center justify-center py-20">
                <div className="text-center">
                  <img className="h-32 w-32 rounded-full mx-auto mb-4 opacity-50" src="/Icon.jpg" alt="No messages" />
                  <p className="text-gray-400 text-lg">No questions yet</p>
                  <p className="text-gray-500 text-sm mt-2">Be the first to ask a question!</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Input Section - Fixed positioning removed for better responsive layout */}
        <div className="lg:col-span-1 bg-[#161b22] rounded-xl p-4 md:p-6 h-fit sticky top-6">
          <h2 className="text-lg font-bold mb-4">Ask a Question</h2>

          {/* Username */}
          <input
            value={newMessage.username}
            onChange={(e) =>
              setNewMessage({ ...newMessage, username: e.target.value })
            }
            type="text"
            placeholder="Enter your name..."
            className="w-full p-3 mb-3 rounded-md bg-[#0d1117] border border-gray-700 focus:outline-none focus:border-orange-500 text-sm"
            disabled={loading}
          />

          {/* Message */}
          <textarea
            value={newMessage.message}
            onChange={(e) =>
              setNewMessage({ ...newMessage, message: e.target.value })
            }
            placeholder="What would you like to ask?"
            rows="4"
            className="w-full p-3 mb-3 rounded-md bg-[#0d1117] border border-gray-700 focus:outline-none focus:border-orange-500 text-sm resize-none"
            disabled={loading}
          />

          {/* SuperChat Toggle */}
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() =>
                setNewMessage((prev) => ({ ...prev, isSuper: !prev.isSuper }))
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                newMessage.isSuper ? "bg-orange-600" : "bg-gray-600"
              }`}
              disabled={loading}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  newMessage.isSuper ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className="text-sm">SuperChat - Priority question</span>
          </div>

          {/* SuperChat Amount */}
          {newMessage.isSuper && (
            <div className="mb-4">
              <label className="block text-sm mb-2 font-medium">SuperChat Amount (₹)</label>
              <input
                type="number"
                min="50"
                step="10"
                value={newMessage.amount}
                onChange={(e) =>
                  setNewMessage((prev) => ({
                    ...prev,
                    amount: Math.max(50, Number(e.target.value)),
                  }))
                }
                className="w-full p-3 rounded-md bg-[#0d1117] border border-gray-700 focus:outline-none focus:border-orange-500 text-sm"
                disabled={loading}
              />
              <p className="text-gray-400 text-xs mt-1">Minimum amount: ₹50</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={newMessage.isSuper ? paidMessage : sendMessage}
            disabled={loading || !newMessage.username.trim() || !newMessage.message.trim()}
            className={`w-full py-3 rounded-md font-semibold transition text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed ${
              newMessage.isSuper
                ? "bg-orange-600 hover:bg-orange-700 disabled:hover:bg-orange-600"
                : "bg-orange-500 hover:bg-orange-600 disabled:hover:bg-orange-500"
            }`}
          >
            {loading ? (
              "Processing..."
            ) : newMessage.isSuper ? (
              `🚀 Submit SuperChat (₹${newMessage.amount})`
            ) : (
              "📩 Submit Question"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
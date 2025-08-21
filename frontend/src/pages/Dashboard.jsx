import React, { useState, useEffect, useRef } from "react";

export default function Dashboard() {
  const [chatrooms, setChatrooms] = useState([
    {
      id: 1,
      name: "Tech Talk Q&A",
      created: "1/15/2024",
      questions: 12,
      timeLeft: "23h 59m left",
      live: true,
    },
    {
      id: 2,
      name: "Product Launch Session",
      created: "1/10/2024",
      questions: 8,
      timeLeft: "1h 59m left",
      live: false,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newRoomName, setNewRoomName] = useState("");
  const [roomExpiry, setRoomExpiry] = useState("24 Hours");
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const dropdownRef = useRef(null);

  const toggleLive = (id) => {
    setChatrooms(
      chatrooms.map((room) =>
        room.id === id ? { ...room, live: !room.live } : room
      )
    );
  };

  const removeRoom = (id) => {
    setChatrooms(chatrooms.filter((room) => room.id !== id));
  };

  const addRoom = () => {
    if (!newRoomName.trim()) return;
    const newRoom = {
      id: Date.now(),
      name: newRoomName,
      created: new Date().toLocaleDateString(),
      questions: 0,
      timeLeft: roomExpiry,
      live: false,
    };
    setChatrooms([...chatrooms, newRoom]);
    setShowModal(false);
    setNewRoomName("");
    setRoomExpiry("24 Hours");
  };

  const handleLogout = () => {
    alert("You have been logged out!");
    setShowProfileMenu(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-[#0d1117] min-h-screen text-white p-4 sm:p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">Admin Dashboard</h1>

        {/* Profile Avatar */}
        <div className="relative border-2" ref={dropdownRef}>
          <img
            src="https://via.placeholder.com/40"
            alt="User Avatar"
            className="w-10 h-10 rounded-full border border-gray-600 cursor-pointer"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          />

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-36 bg-[#161b22] rounded-lg shadow-lg border border-gray-700 z-50">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-red-500 hover:text-white rounded-lg"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Create Chatroom */}
      <div className="bg-[#161b22] p-4 sm:p-6 rounded-lg mb-6 border-2">
        <h2 className="text-lg sm:text-xl font-semibold mb-2">
          + Create New Chatroom
        </h2>
        <p className="text-gray-400 mb-4 text-sm sm:text-base">
          Set up a new Q&A session room with expiry
        </p>
        <button
          className="bg-orange-500 px-4 py-2 rounded font-semibold hover:bg-orange-600 transition w-full sm:w-auto"
          onClick={() => setShowModal(true)}
        >
          + Create Room
        </button>
      </div>

      {/* Your Chatrooms */}
      <div className="bg-[#161b22] p-4 sm:p-6 rounded-lg border-2">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Your Chatrooms</h2>
        <p className="text-gray-400 mb-6 text-sm sm:text-base">
          Manage your existing Q&A rooms
        </p>

        <div className="flex flex-col gap-4">
          {chatrooms.map((room) => (
            <div
              key={room.id}
              className="bg-[#1c2128] border-2 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-center gap-4"
            >
              {/* Room Info */}
              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-semibold text-base sm:text-lg">{room.name}</h3>
                <p className="text-gray-400 text-xs sm:text-sm mt-1">
                  Created {room.created} • {room.questions} questions • ⏱ {room.timeLeft}
                </p>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded mt-2 inline-block ${
                    room.live ? "bg-orange-500 text-black" : "bg-gray-600"
                  }`}
                >
                  {room.live ? "Live" : "Offline"}
                </span>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 justify-center">
                {/* Toggle */}
                <div className="flex items-center gap-1 sm:gap-2">
                  <span className="text-xs sm:text-sm">Live</span>
                  <button
                    onClick={() => toggleLive(room.id)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                      room.live ? "bg-orange-500" : "bg-gray-600"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        room.live ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Copy Link */}
                <button className="border border-orange-500 text-orange-500 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm hover:bg-orange-500 hover:text-black transition">
                  Copy Link
                </button>

                {/* Remove */}
                <button
                  className="border border-red-500 text-red-500 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm hover:bg-red-500 hover:text-white transition"
                  onClick={() => removeRoom(room.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center px-4 z-50">
          <div className="bg-[#161b22] p-4 sm:p-6 rounded-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Create New Chatroom</h2>
            <p className="text-gray-400 mb-4 text-sm sm:text-base">
              Enter room details and set an expiry time for automatic cleanup.
            </p>

            <input
              type="text"
              placeholder="Enter room name..."
              value={newRoomName}
              onChange={(e) => setNewRoomName(e.target.value)}
              className="w-full p-2 rounded bg-[#0d1117] border border-gray-600 mb-4 text-sm sm:text-base"
            />

            <select
              value={roomExpiry}
              onChange={(e) => setRoomExpiry(e.target.value)}
              className="w-full p-2 rounded bg-[#0d1117] border border-gray-600 mb-4 text-sm sm:text-base"
            >
              <option>24 Hours</option>
              <option>48 Hours</option>
              <option>7 Days</option>
            </select>

            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <button
                className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700 transition w-full sm:w-auto"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-orange-500 px-4 py-2 rounded font-semibold hover:bg-orange-600 transition w-full sm:w-auto"
                onClick={addRoom}
              >
                Create Room
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

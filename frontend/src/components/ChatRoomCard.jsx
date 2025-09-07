import { useContext } from "react";
import { Context } from "../context/Context";
import Button from "./Button";

function ChatRoomCard({room}) {
  
  const { ChatRoomStore,setChatRoomStore} = useContext(Context);

  // console.log('roomcard',room);
  
  
  const toggleLive = async(id) => {
    const res = await fetch(`http://localhost:4000/api/v1/chatroom/${id}`, {
        method: "PUT",
        credentials: "include",
      });
       const data = await res.json();
      //  console.log('updateToggle', data?.data);
       setChatRoomStore((prev) =>
  prev.map((room) => room._id === id ? { ...room, isLive: !room.isLive } : room
));
  };
  

   const handleCopy = async (slug) => {
    try {
      const frontendURL = window.location.origin;
      const link = `${frontendURL}/chatrooms/${slug}`;
      await navigator.clipboard.writeText(link);
      alert("Link copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy: ", error);
      alert("Something went wrong while copying the link.");
    }
  };

  const removeRoom = async(id) => {
    setChatRoomStore(ChatRoomStore.filter((room) => room._id !== id));
    await fetch(`http://localhost:4000/api/v1/chatroom/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });
  };
  
 
  return (
    <div
      className="bg-[#1c2128] border-2 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-center gap-4"
    >
      {/* Room Info */}
      <div className="flex-1 text-center sm:text-left">
        <h3 className="font-semibold text-base sm:text-lg">{room?.title}</h3>
        <p className="text-gray-400 text-xs sm:text-sm mt-1">
          Created {room?.roomExpiry} • ⏱ 24 Hours left
        </p>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded mt-2 inline-block ${
            room?.isLive ? "bg-orange-500 text-black" : "bg-gray-600"
          }`}
        >
          {room?.isLive ? "Live" : "Offline"}
        </span>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 justify-center">
        {/* Toggle */}
        <div className="flex items-center gap-1 sm:gap-2">
          <span className="text-xs sm:text-sm">Live</span>
          <button
            onClick={() => toggleLive(room._id)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
              room.isLive ? "bg-orange-500" : "bg-gray-600"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                room.isLive ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {/* Copy Link */}
        <Button
          action={() => handleCopy(room.slug)}
          label="Copy Link"
          className="border border-orange-500 text-orange-500 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm hover:bg-orange-500 hover:text-black transition"
        />

        {/* Remove */}
        <Button
          label="Remove"
          className="border border-red-500 text-red-500 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm hover:bg-red-500 hover:text-white transition"
          action={() => removeRoom(room._id)}
        />
      </div>
    </div>
  );
}

export default ChatRoomCard;




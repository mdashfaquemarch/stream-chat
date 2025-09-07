import { useContext, useState } from 'react'
import Button from '../components/Button';
import { Context } from '../context/Context';

function CreateRoom({setCreateRoomModal}) {

  const {setChatRoomStore} = useContext(Context);
  
  const [title, setTitle] = useState("");
  const [roomExpiry, setroomExpiry] = useState(0);
  
  
  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        console.log(title,roomExpiry);
        const response = await fetch("http://localhost:4000/api/v1/chatroom/", {
          credentials: "include",
          method: "POST", 
          headers: {
            "Content-Type": "application/json", 
          },
          body: JSON.stringify({
            title,
            roomExpiry,
          }),
        });
  
        const data = await response.json(); 
        setChatRoomStore((prev) => [...prev, data?.data]);
        setCreateRoomModal(false);

      } catch (error) {
        console.error("Error:", error);
      }
    };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center px-4 z-50">
          <div className="bg-[#161b22] p-4 sm:p-6 rounded-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Create New Chatroom</h2>
            <p className="text-gray-400 mb-4 text-sm sm:text-base">
              Enter room details and set an expiry time for automatic cleanup.
            </p>

            <input
              type="text"
              placeholder="Enter room name..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 rounded bg-[#0d1117] border border-gray-600 mb-4 text-sm sm:text-base"
            />

            <select
              value={roomExpiry}
              onChange={(e) => setroomExpiry(e.target.value)}
              className="w-full p-2 rounded bg-[#0d1117] border border-gray-600 mb-4 text-sm sm:text-base"
            >
              <option>Select</option>
              <option>24</option>
              <option>48</option>
              <option>7</option>
            </select>

            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <Button label='Cancel'
                className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700 transition w-full sm:w-auto"
                action={() => setCreateRoomModal(false)}
              />
                
              <Button label='Create Room'
                className="bg-orange-500 px-4 py-2 rounded font-semibold hover:bg-orange-600 transition w-full sm:w-auto"
                action={handleSubmit}
              />
                
            </div>
          </div>
        </div>
  )
}

export default CreateRoom 
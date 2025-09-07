import { useEffect, useRef, useContext, useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import CreateRoom from "../modal/CreateRoom";
import ChatRoomList from "../components/ChatRoomList";
import { Context } from "../context/Context";

export default function Dashboard() {

  const {User,setLoginStatus} = useContext(Context);

  const [ShowUserProfile, setShowUserProfile] = useState(false);
  const [CreateRoomModal, setCreateRoomModal] = useState(false);


  const dropdownRef = useRef(null);

  const handleLogout = () => {
    fetch("http://localhost:4000/api/v1/users/signout", {
      credentials: "include", // send cookies
    });
    setLoginStatus(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserProfile(false);
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
        <div className="relative border-2 rounded-full" ref={dropdownRef}>
          <img
            src={User?.avatar}
            alt="User Avatar"
            className="w-12 h-12 rounded-full border border-gray-600 cursor-pointer"
            onClick={() => setShowUserProfile(!ShowUserProfile)}
          />

          {ShowUserProfile && (
            <div className="absolute right-0 mt-2 w-36 bg-[#161b22] rounded-lg shadow-lg border border-gray-700 z-50 ">
              <h1 className="p-2 border-b font-mono">{User?.name}</h1>
              <Button label='Logout' className='block w-full text-left px-4 py-2 text-sm hover:bg-red-500 hover:text-white rounded-lg' action={handleLogout} />
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
        <Button
          label='+ Create Room'
          className="bg-orange-500 px-4 py-2 rounded font-semibold hover:bg-orange-600 transition w-full sm:w-auto"
          action={() => setCreateRoomModal(true)}
        />
              
      </div>

      {/* Your Chatrooms */}
      <ChatRoomList />

      {/* Modal */}
      {CreateRoomModal && <CreateRoom setCreateRoomModal={setCreateRoomModal}  />}
    </div>
  );
}
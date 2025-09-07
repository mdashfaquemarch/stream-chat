import { useContext, useEffect } from 'react'
import { Context } from '../context/Context';
import ChatRoomCard from './ChatRoomCard';

function ChatRoomList() {

  const {ChatRoomStore, setChatRoomStore} = useContext(Context);

  async function getUserChatRoom(){
    const response = await fetch('http://localhost:4000/api/v1/chatroom', {
      credentials: 'include'
    });
    
    const data = await response.json();
    console.log('chatroomList',data);
    
    setChatRoomStore(data?.data);    
  }

  useEffect(()=>{
    getUserChatRoom();
  },[]);

  return (
    <div className="bg-[#161b22] p-4 sm:p-6 rounded-lg border-2">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Your Chatrooms</h2>
        <p className="text-gray-400 mb-6 text-sm sm:text-base">
          Manage your existing Q&A rooms
        </p>

        <div className="flex flex-col gap-4">
          
          {ChatRoomStore.map((room) => <ChatRoomCard key={room._id} room={room} /> )}

        </div>
      </div>
  )
}

export default ChatRoomList
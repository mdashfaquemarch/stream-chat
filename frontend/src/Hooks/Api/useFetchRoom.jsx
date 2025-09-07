import React, { useState } from 'react'

function useFetchRoom() {
  console.log('fetchroom');
  
  const [newRoom, setNewRoom] = useState(null); 

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        console.log(title,duration);
        
        const response = await fetch("http://localhost:4000/api/v1/chatroom/", {
          credentials: "include",
          method: "POST", 
          headers: {
            "Content-Type": "application/json", 
          },
          body: JSON.stringify({
            title,
            duration,
          }),
        });
  
        const data = await response.json(); 
        setNewRoom(data?.data);
        console.log(data.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

  return {newRoom,handleSubmit}
}

export default useFetchRoom
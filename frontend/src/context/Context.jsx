import { createContext, useState, useEffect } from "react";


export const Context = createContext();

const ContextProvider = ({ children }) => {
  
  const [ChatRoomStore, setChatRoomStore] = useState([]);
  const [LoginStatus, setLoginStatus] = useState(null); 
  const [newRoom, setNewRoom] = useState(null); 
  const [User, setUser] = useState(null);
  const [Data, setData] = useState(null);



  useEffect(() => {
  async function getUser() {
    try {
      const res = await fetch("http://localhost:4000/api/v1/users/getme", {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Unauthorized");

      const data = await res.json();
      setUser(data?.data);
      setLoginStatus(true); // ✅ logged in
      // console.log("User:", data?.data);
    } catch (err) {
      setLoginStatus(false); // ❌ not logged in
    }
  }

  getUser();
}, []);

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
        setNewRoom(data?.data);
        console.log(data.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };


  const contextValue = {
    ChatRoomStore, setChatRoomStore,
    LoginStatus,
    setLoginStatus,handleSubmit,newRoom,User,setUser,Data, setData
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default ContextProvider;

import { useContext, useEffect, useState } from 'react'
import { Context } from '../../context/Context';

function useFetchUser() {
  console.log('fetchuser');
  const {setLoginStatus} = useContext(Context);
  const [User, setUser] = useState(null);
  
  async function getUser() {
    try {
      const res = await fetch("http://localhost:4000/api/v1/users/getme", {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Unauthorized");

      const data = await res.json();
      setUser(data.data);
      setLoginStatus(true);
    } catch (err) {
      setUser(null);
      // setLoginStatus(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
// console.log(User);

  return {User,getUser}
}

export default useFetchUser
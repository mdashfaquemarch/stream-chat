// App.js
import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./pages/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import ChatRoom from "./pages/Chatroom";
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {

  const {newRoom} = useContext(Context);
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/signin" element={<SignIn />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path='chatrooms/:slug' element={<ChatRoom/>} />
    </Routes>
  );
}

export default App;

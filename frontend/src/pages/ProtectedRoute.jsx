import { useContext } from "react";
import { Context } from "../context/Context";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { LoginStatus } = useContext(Context);

  if (LoginStatus === null) {
    return <div className="text-white">Checking authentication...</div>; // loading
  }

  if (!LoginStatus) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;



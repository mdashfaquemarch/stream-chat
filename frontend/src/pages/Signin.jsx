import { useContext } from "react";
import Button from "../components/Button";
import { Context } from "../context/Context";


export default function SignIn() {
const {setLoginStatus} = useContext(Context);
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:4000/auth/google";
    setLoginStatus(true);
  };
  
  return (
    <div className="bg-gradient-to-br from-[#0d1117] to-[#161b22] min-h-screen flex items-center justify-center text-white">
      <div className="bg-[#161b22] p-8 rounded-xl shadow-lg w-96 text-center">
        <h2 className="text-2xl font-bold mb-6">Welcome to Live Q&A</h2>
        <p className="text-gray-400 mb-8">Sign up or sign in with Google</p>

        <Button label='Continue with Google' 
        action={handleGoogleLogin}
        className="flex items-center justify-center w-full bg-white text-black font-medium py-3 rounded-lg shadow hover:bg-gray-200 transition">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google logo"
            className="w-6 h-6 mr-3"
          />
        </Button>
        
      </div>
    </div>
  );
}

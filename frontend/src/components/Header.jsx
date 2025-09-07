import { useNavigate } from "react-router-dom";
import Button from "./Button";

function Header() {
  const navigate = useNavigate();
  return (
    <header className="w-full px-6 py-4 flex justify-between items-center bg-[#0d1117]/80 backdrop-blur-md shadow-md fixed top-0 left-0 z-50">
      {/* Logo */}
      <div
        onClick={() => navigate("/")}
        className="text-xl sm:text-2xl font-bold cursor-pointer tracking-wide"
      >
        <span className="text-orange-500">Live</span>Q&A
      </div>

      {/* Nav Links */}
      <nav className="hidden sm:flex gap-8 text-gray-300 font-medium">
        {["Home", "Features", "About", "Contact"].map((item) => {
          return (
            <Button
              key={item}
              label={item}
              className="hover:text-orange-500 transition"
              action={() => navigate(`/${item.toLowerCase()}`)}
            />
          );
        })}
      </nav>

      {/* CTA */}
      <Button
        label="Get Started"
        action={() => navigate("/signin")}
        className="bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-lg font-semibold text-sm sm:text-base shadow-md"
      />
    </header>
  );
}

export default Header;

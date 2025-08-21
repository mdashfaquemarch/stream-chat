import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-[#0d1117] to-[#161b22] min-h-screen text-white flex flex-col">
      {/* Header */}
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
          <button onClick={() => navigate("/")} className="hover:text-orange-500 transition">Home</button>
          <button onClick={() => navigate("/features")} className="hover:text-orange-500 transition">Features</button>
          <button onClick={() => navigate("/about")} className="hover:text-orange-500 transition">About</button>
          <button onClick={() => navigate("/contact")} className="hover:text-orange-500 transition">Contact</button>
        </nav>

        {/* CTA */}
        <button
          onClick={() => navigate("/signin")}
          className="bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-lg font-semibold text-sm sm:text-base shadow-md"
        >
          Get Started
        </button>
      </header>

      {/* Main Content Wrapper (offset for fixed header) */}
      <main className="flex-1 flex flex-col items-center px-6 pt-28 sm:pt-32">
        {/* Hero Section */}
        <section className="text-center max-w-3xl">
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-6 leading-tight">
            Engage Smarter with <span className="text-orange-500">Live Q&A</span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg mb-10 max-w-2xl mx-auto">
            Real-time question & answer sessions with powerful admin controls,
            priority chats, and seamless experience.
          </p>

          {/* CTA Button */}
          <button
            onClick={() => navigate("/signin")}
            className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-xl font-semibold text-lg shadow-lg transition transform hover:scale-105"
          >
            🚀 Get Started
          </button>
        </section>

        {/* Features Section */}
        <section className="mt-16 sm:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          <div className="bg-[#1c2128] p-8 rounded-2xl shadow-lg hover:shadow-orange-500/20 transition transform hover:-translate-y-2">
            <div className="text-orange-500 text-3xl">💬</div>
            <h3 className="text-xl font-semibold mt-4">Real-time Q&A</h3>
            <p className="text-gray-400 text-sm mt-3 leading-relaxed">
              Ask and answer in real-time with instant updates powered by sockets.
            </p>
          </div>

          <div className="bg-[#1c2128] p-8 rounded-2xl shadow-lg hover:shadow-orange-500/20 transition transform hover:-translate-y-2">
            <div className="text-orange-500 text-3xl">👥</div>
            <h3 className="text-xl font-semibold mt-4">Admin Controls</h3>
            <p className="text-gray-400 text-sm mt-3 leading-relaxed">
              Manage chatrooms, moderate questions, and control sessions with ease.
            </p>
          </div>

          <div className="bg-[#1c2128] p-8 rounded-2xl shadow-lg hover:shadow-orange-500/20 transition transform hover:-translate-y-2">
            <div className="text-orange-500 text-3xl">⚡</div>
            <h3 className="text-xl font-semibold mt-4">SuperChat</h3>
            <p className="text-gray-400 text-sm mt-3 leading-relaxed">
              Give priority to paid questions with seamless Razorpay integration.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 sm:mt-20 py-6 text-gray-500 text-sm text-center border-t border-gray-800">
        © {new Date().getFullYear()} Live Q&A Platform. All rights reserved.
      </footer>
    </div>
  );
}

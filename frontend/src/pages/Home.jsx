import Header from "../components/Header";
import Footer from "../components/Footer";
import MainContent from "../components/MainContent";

export default function Home() {
  console.log('Home');
  
  return (
    <div className="bg-gradient-to-br from-[#0d1117] to-[#161b22] min-h-screen text-white flex flex-col">
      
      <Header />
      
      <MainContent />

      <Footer label={`© ${new Date().getFullYear()} Live Q&A Platform. All rights reserved.`}/> 

    </div>
  );
}

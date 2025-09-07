import Button from './Button'
import FeaturesCard from './FeaturesCard'
import { useNavigate } from 'react-router-dom';

function MainContent() {

  const navigate = useNavigate();

  const feature = [
    {id: 0, icon:'💬', title: 'Real-time Q&A', description: 'Ask and answer in real-time with instant updates powered by sockets.'},
    {id: 1, icon:'👥', title: 'Admin Controls', description: 'Manage chatrooms, moderate questions, and control sessions with ease.'},
    {id: 2, icon:'⚡', title: 'SuperChat', description: 'Give priority to paid questions with seamless Razorpay integration.'},
  ];

  return (
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

          <Button label="🚀 Get Started" className='bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-xl font-semibold text-lg shadow-lg transition transform hover:scale-105' action={() => navigate("/signin")}/>
            
        </section>

        {/* Features Section */}
        <section className="mt-16 sm:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">

          {
            feature.map((item)=>{
              return <FeaturesCard key={item.id} icon={item.icon} title={item.title} description={item.description} />
            })
          }

        </section>

      </main>
  )
}

export default MainContent
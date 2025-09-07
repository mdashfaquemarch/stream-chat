import React from 'react'

function FeaturesCard({icon, title, description}) {
  return (
    <div className="bg-[#1c2128] p-8 rounded-2xl shadow-lg hover:shadow-orange-500/20 transition transform hover:-translate-y-2">
            <div className="text-orange-500 text-3xl">{icon}</div>
            <h3 className="text-xl font-semibold mt-4">{title}</h3>
            <p className="text-gray-400 text-sm mt-3 leading-relaxed">
              {description}
            </p>
          </div>
  )
}

export default FeaturesCard
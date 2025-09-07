import React from 'react'

function Footer({label}) {
  return (
    <footer className="mt-16 sm:mt-20 py-6 text-gray-500 text-sm text-center border-t border-gray-800">
        {label}
    </footer>
  )
}

export default Footer
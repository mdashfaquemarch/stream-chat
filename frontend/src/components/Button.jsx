import React from 'react'

function Button({label, className, action, children}) {
  return (
    <button
          onClick={action}
          className={className}
        >
          {children}{label}
    </button>
  )
}

export default Button
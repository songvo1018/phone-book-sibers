import React from "react"

const SimpleButton = ({ className, handler, children }: {className: string, handler: any, children: any}) => {
  return (
      <button className={className} onClick={handler}>
          {children}
      </button>
  )
}

export default SimpleButton
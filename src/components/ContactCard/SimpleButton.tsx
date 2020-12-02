import React from "react"
import { SimpleButtonProps } from '../types'
// сделать интерфейс

const SimpleButton = ({ className, handler, children }: SimpleButtonProps ): JSX.Element=> {
  return (
      <button className={className} onClick={handler}>
          {children}
      </button>
  )
}

export default SimpleButton
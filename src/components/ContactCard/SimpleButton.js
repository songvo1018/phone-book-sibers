const SimpleButton = ({ className, handler, children }) => {
  return (
      <button className={className} onClick={handler}>
          {children}
      </button>
  )
}

export default SimpleButton
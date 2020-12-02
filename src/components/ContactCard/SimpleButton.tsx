import { SimpleButtonProps } from '../types'

const SimpleButton = ({ className, handler, children }: SimpleButtonProps): JSX.Element => {
  return (
    <button className={className} onClick={handler}>
      {children}
    </button>
  )
}

export default SimpleButton
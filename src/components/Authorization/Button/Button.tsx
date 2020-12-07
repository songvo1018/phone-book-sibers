import React from 'react'
import classes from './Button.module.css'

type Props = {
  type: string
  disabled: boolean
  children: string
  onClick: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined
}
const Button = (props: Props): JSX.Element=> {
  const cls = [
    classes.Button,
    classes[props.type]
  ]

  return (
    <button
    className={cls.join(' ')}
    disabled={props.disabled}
    onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}

export default Button
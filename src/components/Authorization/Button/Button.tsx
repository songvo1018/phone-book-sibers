import React from 'react'
import classes from './Button.module.css'

type Props = {
  type: string
  disabled: boolean
  children: string
  onClick: any
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}

export default Button
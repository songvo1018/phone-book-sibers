import React from 'react'
import classes from './Input.module.css'

type Props = {
  key: string
  type: string
  value: string
  valid: boolean
  touched: boolean
  label: string
  shouldValidate: boolean
  errorMessage: string
  onChange: any
}

interface IIsInvalidType {
  valid: boolean,
  touched: boolean,
  shouldValidate: boolean
}

const isInvalid = ({ valid, touched, shouldValidate }: IIsInvalidType) => {
  return !valid && shouldValidate && touched
}

const Input = (props: Props): JSX.Element => {
  const inputType = props.type || 'text'
  const cls = [classes.Input]

  const htmlFor = `${inputType}-${Math.random()}`

  if (isInvalid(props)) {
    cls.push(classes.invalid)
  }

  return (
    <div className={cls.join(' ')}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        type={inputType}
        id={htmlFor}
        value={props.value}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        onChange={props.onChange}
      />
      {
        isInvalid(props) && <span>{props.errorMessage || 'Неправильный адрес электронной почты или пароль'}</span>
      }
    </div>
  )
}

export default Input
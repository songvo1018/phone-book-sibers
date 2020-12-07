export type validation = {
  required : boolean
  email?: boolean
  minLength?: number
}

export type formControls = {
  value: string,
  type: string,
  label: string,
  errorMessage: string,
  valid: boolean,
  touched: boolean,
  validation: {
    required: boolean
    email?: boolean
    minLength?: number
  }
}

export interface IAuthState {
  isFormValid: boolean
  formControls: {
    [props: string]: formControls
  }
}

export interface validateControlType {
  value: string
  validation: {
    required: boolean
    email?: boolean
    minLength?: number
  }
}
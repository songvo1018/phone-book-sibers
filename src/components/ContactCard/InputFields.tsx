import React from "react"
import { ReactElement } from "react"
import {InputFieldsTypes} from '../types'

const capitalize = (s: string) => {
    if (typeof s !== "string") return ""
    return s.charAt(0).toUpperCase() + s.slice(1)
}

// set correct type 'formData' argument
const renderInputFields = ({ INPUTS, formData, handleChangeContactData }: InputFieldsTypes) => {
    const inputFields: ReactElement[] = []

    INPUTS.map((input) => {
        return inputFields.push(
            <label key={input}>
                <span
                    className={
                        formData[input].value !== ""
                            ? "label-show"
                            : "label-hide"
                    }
                >
                    Changed
                </span>
                <input
                    placeholder={capitalize(input)}
                    name={input}
                    type={input == "phone" ? "phone" :"text"}
                    value={
                        formData[input].value !== ""
                            ? formData[input].value
                            : formData[input].initialValue
                    }
                    onChange={(event) => {
                        handleChangeContactData(event)
                    }}
                    className={`input`}
                />
            </label>
        )
    })
    return <div>{inputFields}</div>
}
export default renderInputFields

import React from "react"
import { ReactElement } from "react"
import { InputFieldsTypes } from '../types'

const capitalize = (s: string) => {
    if (typeof s !== "string") return ""
    return s.charAt(0).toUpperCase() + s.slice(1)
}

const renderInputFields = ({ INPUTS, formObject, handleChangeContactData }: InputFieldsTypes): JSX.Element => {
    const inputFields: ReactElement[] = []
    INPUTS.map((input) => {
        return inputFields.push(
            <label key={input}>
                <span
                    className={
                        formObject[input].value !== formObject[input].initialValue
                            ? "label-show"
                            : "label-hide"
                    }
                >
                    Changed
                </span>
                <input
                    placeholder={capitalize(input)}
                    name={input}
                    type={input === "phone" ? "phone" : "text"}
                    value={
                        formObject[input].value !== formObject[input].initialValue
                            ? formObject[input].value
                            : formObject[input].initialValue
                    }
                    onChange={(event) => {
                        handleChangeContactData(event, formObject)
                    }}
                    className={`input`}
                />
            </label>
        )
    })
    return <div>{inputFields}</div>
}
export default renderInputFields

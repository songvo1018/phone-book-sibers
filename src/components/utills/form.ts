import { FormObjectGeneric } from "../types"

export const initializeFormObject = <T> (object: T): FormObjectGeneric<T> => {
    const formObject = {} as FormObjectGeneric<T>
    for (const key in object) {
        const value = object[key]
        formObject[key] = {
            value,
            initialValue: value,
            error: null
        }
    }

    return formObject
}

export const convertToObject = <T>(formObject: FormObjectGeneric<T>): T => {
    const object = {} as T
    for (const key in formObject) {
        object[key] = formObject[key].value
    }

    return object
}

// const contact = {} as Contact

// const formObject = initializeFormObject(contact)

// const formData = convertToObject(formObject)
// formData
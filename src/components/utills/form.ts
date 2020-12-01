import { Contact, FormObject } from "../types"

const initializeFormObject = (contact: Contact): FormObject => {
    const formObject : FormObject = {}
    for (const key in contact) {
        formObject[key] = {
            value: '',
            initialValue: contact[key],
            error: null
        }
    }
    return formObject
}

export default initializeFormObject

export const ConvertFormObjectInContact = (formObject: FormObject, contact: Contact): Contact => {
    const changedContact = {}
    for (const key in formObject) {
        if (formObject[key].value === formObject[key].initialValue) {
            continue
        } else {
            if (formObject[key].value !== '') {
                contact[key] = formObject[key].value
            }
        }
        
    }
    // WHY ITS WORK?
    return changedContact
}
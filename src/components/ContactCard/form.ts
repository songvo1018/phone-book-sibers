import { Contact, FormObject } from "../types"
// rename file to form, add second method 
// const initializeFormObject = (INPUTS: string[], contact: any, setFormData: any) => {
//     const editingContact: any = {
//         id: contact.id,
//         favorite: {
//             value: "",
//             initialValue: contact.favorite,
//             error: null,
//         },
//     }
//     INPUTS.forEach((key) => {
//         editingContact[key] = {
//             value: "",
//             initialValue: contact[key],
//             error: null,
//         }
//     })

//     setFormData(editingContact)
// }

// export default initializeFormObject
const initializeFormObject = (contact: Contact) => {
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

export const ConvertFormObjectInContact = (formObject: FormObject) => {
    return { }
}
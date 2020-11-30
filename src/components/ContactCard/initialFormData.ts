import { Contact } from "../types"
// how to set 'contact' argument correct type, and why not match 'Contact'
const initialFormData = (INPUTS: string[], contact: any, setFormData: any) => {
    const editingContact: any = {
        id: contact.id,
        favorite: {
            value: "",
            initialValue: contact.favorite,
            error: null,
        },
    }
    INPUTS.forEach((key) => {
        editingContact[key] = {
            value: "",
            initialValue: contact[key],
            error: null,
        }
    })

    setFormData(editingContact)
}

export default initialFormData
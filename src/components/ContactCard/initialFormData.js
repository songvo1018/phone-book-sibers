const initialFormData = (INPUTS, contact, setFormData) => {
  const editingContact = {
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
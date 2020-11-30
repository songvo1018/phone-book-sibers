

export interface Contact {
  map(arg0: (contact: Contact) => JSX.Element): import("react").ReactNode;
  length: number;
  name: any
  phone: string
  city: string
  company: string
  website: string
  avatar: string
  favorite: boolean | string
  id: number | string
}

export interface ContactCardType {
  contact: Contact
  handleSaveChanges: any
}

export interface GroupedByFirstLetter {
  [propName: string] : Contact[]
}

export interface SearchedContactsType {
  searchName: string,
  contactsData: Contact[],
  handleSaveChanges: any
}
export interface InputFieldsTypes {
  INPUTS: string[],
  formData: any,
  handleChangeContactData: any
}

export interface FavoriteButtonsType {
  contact: Contact, 
  formData: any 
  handleChangeContactData: any, 
}
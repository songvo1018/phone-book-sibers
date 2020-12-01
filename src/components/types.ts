interface IObjectKeys {
  [key: string]: string | number;
}

export interface FormObject {
  [propName: string] : {
    value: string | number,
    initialValue: number | string,
    error: null | string
    }
}

export interface Contact extends IObjectKeys {
  length: number;
  name: string
  phone: string
  city: string
  company: string
  website: string
  avatar: string
  favorite: string
  id: number | string
}

export interface ContactCardType {
  contact: Contact
  handleSaveChanges: void
}

export interface GroupedByFirstLetter {
  [propName: string] : Contact[]
}

export interface SearchedContactsType {
  searchName: string,
  contactsData: Contact[],
  handleSaveChanges: void
}
export interface InputFieldsTypes {
  INPUTS: string[],
  formObject: FormObject,
  handleChangeContactData: void
}

export interface FavoriteButtonsType {
  contact: Contact, 
  formObject: FormObject, 
  handleChangeContactData: void, 
}

export interface GroupedContactsByNameTypeProps {
  groupByLetter: GroupedByFirstLetter
  handleSaveChanges: void
}
export interface FavoriteContactsProps {
  contactsData: Contact[],
  handleSaveChanges: void
}
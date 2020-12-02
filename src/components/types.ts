interface IObjectKeys {
  [key: string]: string | number;
}

export type FormObjectGeneric<T> = {
  [P in keyof T]: FieldProperty<T[P]>
};

export interface FieldProperty <P>{
    value: P,
    initialValue: P,
    error: null | string
}


// переименовать
export interface  FormObjectType {
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
  id: number
}

export interface ContactCardType {
  contact: Contact
  handleSaveChanges: (agr0: FormObjectType, arg1: number) => void
}

export interface GroupedByFirstLetter {
  [propName: string] : Contact[]
}

export interface SearchedContactsType {
  searchName: string,
  contactsData: Contact[],
  handleSaveChanges: (agr0: FormObjectType, arg1: number) => void
}
export interface InputFieldsTypes {
  INPUTS: string[],
  formObject: FormObjectType,
  handleChangeContactData: (event: React.ChangeEvent < HTMLInputElement >, formObject: FormObjectType) => void
}

export interface FavoriteButtonsType {
  contact: Contact, 
  formObject: FormObjectType, 
  handleChangeContactData: (event: React.ChangeEvent<HTMLInputElement>, formObject: FormObjectType) => void, 
}

export interface GroupedContactsByNameTypeProps {
  groupByLetter: GroupedByFirstLetter
  // нужно применить правильный тип для функции handleSaveChanges такой же как
  // указан в ее обьявлении, и так же с остальными
  handleSaveChanges: (agr0 :FormObjectType, arg1: number) => void
}
export interface FavoriteContactsProps {
  contactsData: Contact[],
  handleSaveChanges: (agr0: FormObjectType, arg1: number) => void
}

export interface SimpleButtonProps {
  className: string,
  handler: () => void,
  children: string | JSX.Element
}
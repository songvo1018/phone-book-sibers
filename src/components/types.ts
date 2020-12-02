interface IObjectKeys {
  [key: string]: string | number;
}

export interface Contact extends IObjectKeys {
  name: string
  phone: string
  city: string
  company: string
  website: string
  avatar: string
  favorite: string
  id: number
}

export type FormObjectGeneric<T> = {
  [P in keyof T]: FieldProperty<T[P]>
};

export interface FieldProperty<P> {
  value: P,
  initialValue: P,
  error: null | string
}

// переименовать
export interface FormObjectType {
  [propName: string]: {
    value: string | number,
    initialValue: number | string,
    error: null | string
  }
}

export interface SearchedContactsType {
  searchName: string,
  contactsData: Contact[],
  handleSaveChanges: (agr0: FormObjectType, arg1: number) => void
}


export interface FavoriteButtonsType {
  contact: Contact,
  formObject: FormObjectGeneric<Contact>,
  handleChangeFavoriteContact: (
    value: string,
    formObject: FormObjectGeneric<Contact>
  ) => void,
}

export interface GroupedByFirstLetter {
  [propName: string]: Contact[]
}

export interface GroupedContactsByNameTypeProps {
  groupByLetter: GroupedByFirstLetter
  handleSaveChanges: (agr0: FormObjectType, arg1: number) => void
}
export interface FavoriteContactsProps {
  contactsData: Contact[],
  handleSaveChanges: (agr0: FormObjectType, arg1: number) => void
}

export interface ContactCardType {
  contact: Contact
  handleSaveChanges: (agr0: FormObjectType, arg1: number) => void
}

export interface SimpleButtonProps {
  className: string,
  handler: () => void,
  children: string | JSX.Element
}
export interface InputFieldsTypes {
  INPUTS: string[],
  formObject: FormObjectType,
  handleChangeContactData: (event: React.ChangeEvent<HTMLInputElement>, formObject: FormObjectType) => void
}

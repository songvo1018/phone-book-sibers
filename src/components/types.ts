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
  handleSaveChanges: (agr0: FormObjectGeneric<Contact>, arg1: number) => void
}


export interface FavoriteButtonsType {
  contact: Contact,
  formObject: FormObjectGeneric<Contact>,
  handleChangeFavoriteContact: (
    reverseValue: string,
    formObject: FormObjectGeneric<Contact>
  ) => void,
}

export interface GroupedByFirstLetter {
  [propName: string]: Contact[]
}

export interface GroupedContactsByNameTypeProps {
  contactsData: Contact[],
  handleSaveChanges: (agr0: FormObjectGeneric<Contact>, arg1: number) => void
}
export interface FavoriteContactsProps {
  contactsData: Contact[],
  handleSaveChanges: (agr0: FormObjectGeneric<Contact>, arg1: number) => void
}

export interface ContactCardType {
  contact: Contact
  handleSaveChanges: (agr0: FormObjectGeneric<Contact>, arg1: number) => void
}


export interface ContactInfoType {
  contact: Contact
}

export interface ContactEditType {
  INPUTS: string[],
  formObject: FormObjectGeneric<Contact>,
  contact: Contact,
  handleChangeContactData: (event: React.ChangeEvent<HTMLInputElement>, formObject: FormObjectGeneric<Contact>) => void
  handleChangeFavoriteContact: (
    reverseValue: string,
    formObject: FormObjectGeneric<Contact>
  ) => void,
}

export interface SimpleButtonProps {
  className: string,
  handler: () => void,
  children: string | JSX.Element
}
export interface InputFieldsTypes {
  INPUTS: string[],
  formObject: FormObjectGeneric<Contact>,
  handleChangeContactData: (event: React.ChangeEvent<HTMLInputElement>, formObject: FormObjectGeneric<Contact>) => void
}

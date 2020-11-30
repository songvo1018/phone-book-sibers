

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


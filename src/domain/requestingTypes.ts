type AccountHistory = {
  account: string
  amount: string
  business: string
  date: string
  name: string
  type: string
}

type Posts = {
  paragraph: string
  sentence: string
  sentences: string
  words: string[]
}

export type DataItem = {
  accountHistory: AccountHistory[],
  address: {
    city: string,
    country: string,
    geo: { lat: string, lng: string },
    state: string,
    streetA: string,
    streetB: string,
    streetC: string,
    streetD: string,
    zipcode: string,
  },
  avatar: string,
  company: {
    bs: string,
    catchPhrase: string,
    name: string,
  },
  email: string,
  favorite: boolean,
  id: number,
  name: string,
  phone: string,
  posts: Posts[],
  username: string,
  website: string,
}
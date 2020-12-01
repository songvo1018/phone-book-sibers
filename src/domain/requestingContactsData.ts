/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Contact } from "../components/types"
import getDataFromUrl from "../components/utills/xhr"

export const getContacts = async (DATA_URL: string): Promise<Contact[]> => {

  const xhrResponse = await getDataFromUrl("GET", DATA_URL)

  // converting data to flat structure
  const data = xhrResponse.map((contact: Contact) => {
    return {
      name: contact.name,
      phone: contact.phone,
      city: contact.address.city,
      company: contact.company.name,
      website: contact.website,
      avatar: contact.avatar,
      favorite: contact.favorite.toString(),
      id: contact.id,
    }
  })
  return data
}
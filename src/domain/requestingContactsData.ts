import { Contact } from "../components/types"
import getDataFromUrl from "../components/utills/xhr"
import {DataItem} from './requestingTypes'

export const getContacts = async (DATA_URL: string): Promise<Contact[]> => {

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const xhrResponse: DataItem[] = await getDataFromUrl("GET", DATA_URL)

  // converting data to flat structure
  const data: Contact[] = xhrResponse.map((dataItam: DataItem) => {
    return {
      name: dataItam.name,
      phone: dataItam.phone,
      city: dataItam.address.city,
      company: dataItam.company.name,
      website: dataItam.website,
      avatar: dataItam.avatar,
      favorite: dataItam.favorite.toString(),
      id: dataItam.id,
    }
  })
  if (data.length) {
    data.sort((a, b) => {
      const nameA = a.name.toLowerCase()
      const nameB = b.name.toLowerCase()
      if (nameA < nameB) return -1
      if (nameA > nameB) return 1
      return 0
    })
  }
  
  return data
}
import getDataFromUrl from "../components/utills/xhr"
export const getContacts = async (DATA_URL: string) => {

  const xhrResponse = await getDataFromUrl("GET", DATA_URL)
  // return xhr.response to contact
  const data = xhrResponse.map((contact: any) => {
    // return xhr.response
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
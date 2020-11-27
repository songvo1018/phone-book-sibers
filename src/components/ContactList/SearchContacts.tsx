import React from 'react'
import ContactCard from '../ContactCard/ContactCard'
import { Contact } from '../types'

const SearchedContacts = ({ searchName, contactsData, handleSaveChanges } : {searchName: string, contactsData: any, handleSaveChanges: any}) => {
    const searchContact = contactsData.filter((el: Contact) => {
        return el.name.toLowerCase().indexOf(searchName.toLowerCase()) > -1
    })
// test
    return searchContact.map((contact: Contact) => {
        return (
            <ContactCard
                key={contact.id}
                contact={contact}
                handleSaveChanges={handleSaveChanges}
            />
        )
    })
}

export default SearchedContacts

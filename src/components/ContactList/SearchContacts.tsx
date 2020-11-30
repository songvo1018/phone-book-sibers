import React from 'react'
import ContactCard from '../ContactCard/ContactCard'
import { Contact, SearchedContactsType} from '../types'

const SearchedContacts = ({ searchName, contactsData, handleSaveChanges }: SearchedContactsType) => {
    const searchContact = contactsData.filter((el: Contact) => {
        return el.name.toLowerCase().indexOf(searchName.toLowerCase()) > -1
    })
    return (
        <div>
            {searchContact.map((contact: Contact) => {
                return (
                    <ContactCard
                        key={contact.id}
                        contact={contact}
                        handleSaveChanges={handleSaveChanges}
                    />
                )
            })}
        </div>
    )
}

export default SearchedContacts

import React from "react"
import ContactCard from "../ContactCard/ContactCard"
import { Contact } from "../types"

const FavoriteContacts = ({ contactsData, handleSaveChanges }: {contactsData: any, handleSaveChanges: any}) => {
    return contactsData
        .filter(
            (contact: Contact) =>
                contact.favorite === true || contact.favorite === "true"
        )
        .map((contact: Contact) => (
            <ContactCard
                key={contact.id}
                contact={contact}
                handleSaveChanges={handleSaveChanges}
            />
        ))
}

export default FavoriteContacts

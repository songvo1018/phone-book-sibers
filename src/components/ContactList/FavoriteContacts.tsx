import React from "react"
import ContactCard from "../ContactCard/ContactCard"
import { Contact, FavoriteContactsProps } from "../types"

const FavoriteContacts = ({ contactsData, handleSaveChanges }: FavoriteContactsProps) => {
    return (<>
        {contactsData
            .filter(
                (contact: Contact) =>
                    contact.favorite === "true"
            )
            .map((contact: Contact) => (
                <ContactCard
                    key={contact.id}
                    contact={contact}
                    handleSaveChanges={handleSaveChanges}
                />
            ))}</>)
}

export default FavoriteContacts

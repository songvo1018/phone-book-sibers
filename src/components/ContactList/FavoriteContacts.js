import ContactCard from '../ContactCard/ContactCard'

const FavoriteContacts = ({ contactsData, handleSaveChanges }) => {
    return contactsData
        .filter(
            (contact) =>
                contact.favorite === true || contact.favorite === 'true'
        )
        .map((contact) => (
            <ContactCard
                key={contact.id}
                contact={contact}
                handleSaveChanges={handleSaveChanges}
            />
        ))
}

export default FavoriteContacts

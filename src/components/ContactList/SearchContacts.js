import ContactCard from '../ContactCard/ContactCard'

const SearchedContacts = ({ searchName, contactsData, handleSaveChanges }) => {
    const searchContact = contactsData.filter((el) => {
        return el.name.toLowerCase().indexOf(searchName.toLowerCase()) > -1
    })

    return searchContact.map((contact) => {
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

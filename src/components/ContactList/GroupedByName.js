import ContactCard from '../ContactCard/ContactCard'

const GroupedContactsByName = ({ groupByLetter, handleSaveChanges }) => {
    return Object.keys(groupByLetter).map((letter) => {
        return (
            <div className="group" letter={`group-${letter}`}>
                {groupByLetter[letter].length > 0 ? (
                    <div>
                        {letter.toUpperCase()}
                        {groupByLetter[letter].map((contact) => {
                            return (
                                <ContactCard
                                    key={`${letter}-${contact.id}`}
                                    contact={contact}
                                    handleSaveChanges={handleSaveChanges}
                                />
                            )
                        })}
                        <hr />
                    </div>
                ) : null}
            </div>
        )
    })
}

export default GroupedContactsByName

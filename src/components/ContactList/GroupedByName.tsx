import ContactCard from "../ContactCard/ContactCard"
import { Contact } from "../../components/types"
import React from "react"
type Props = {
    groupByLetter: Contact[]
    handleSaveChanges: any
}
const GroupedContactsByName = ({ groupByLetter, handleSaveChanges }: Props) => {
    return (
        <div>
            {Object.keys(groupByLetter).map((letter: any) => {
                return (

                    < div className="group" key={letter} >
                        {
                            groupByLetter[letter].length > 0 ? (
                                <div>
                                    {letter.toUpperCase()}
                                    {groupByLetter[letter].map((contact: Contact) => {
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
                            ) : null
                        }
                    </div>

                )
            })}
        </div>
    )
}

export default GroupedContactsByName

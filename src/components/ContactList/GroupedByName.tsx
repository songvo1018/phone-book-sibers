import ContactCard from "../ContactCard/ContactCard"
import { Contact, GroupedContactsByNameTypeProps } from "../../components/types"
import React from "react"

const GroupedContactsByName = ({ groupByLetter, handleSaveChanges }: GroupedContactsByNameTypeProps) : JSX.Element=> {
    return (
        <>
            {Object.keys(groupByLetter).map((letter: string) => {
                return (
                    < div className="group" key={letter} >
                        {
                            groupByLetter[letter].length > 0 && (
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
                            )
                        }
                    </div>

                )
            })}
        </>
    )
}

export default GroupedContactsByName

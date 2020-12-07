import React, {useMemo} from "react"
import ContactCard from "../ContactCard/ContactCard"
import { Contact, GroupedByFirstLetter, GroupedContactsByNameTypeProps } from "../../components/types"

const GroupedContactsByName = ({ contactsData, handleSaveChanges }: GroupedContactsByNameTypeProps): JSX.Element => {
    const groupLetters = (): GroupedByFirstLetter=> {
        type alphabetLetter = [string, Contact[] | []]
        const alphabet: Array<alphabetLetter> = []
        function genCharArray(charA: string, charZ: string) {
            let i = charA.charCodeAt(0)
            const j = charZ.charCodeAt(0)
            for (; i <= j; ++i) {
                alphabet.push([String.fromCharCode(i), []])
            }
            return alphabet
        }
        const entries = new Map(genCharArray("a", "z"))

        return Object.fromEntries(entries)
    }

    const groupContacts = () => {
        const result = groupLetters()
        for (let i = 0; i < contactsData.length; i++) {
            const element = contactsData[i]
            const firstLetter = element.name
                .toString()
                .toLowerCase()
                .slice(0, 1)
            result[firstLetter].push(element)
        }
        return result
    }

    const groupByLetter: GroupedByFirstLetter = useMemo(() => {
        return groupContacts()
    }, [contactsData] )

    const list = (letter: string) => {
        return (
            groupByLetter[letter].map((contact: Contact) => {
            return (
                <ContactCard
                    key={`${letter}-${contact.id}`}
                    contact={contact}
                    handleSaveChanges={handleSaveChanges}
                />
            )
        })
        )
    }

    return (
        <>
            {Object.keys(groupByLetter).map((letter: string) => {
                return (
                    < div className="group" key={letter} >
                        {groupByLetter[letter].length > 0 && (
                            <div>
                                {letter.toUpperCase()}
                                {list(letter)}
                                <hr />
                            </div>
                        )}
                    </div>

                )
            })}
        </>
    )
}

export default GroupedContactsByName

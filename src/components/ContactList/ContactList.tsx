import React, { useState, useEffect } from "react"

import "./ContactList.css"
import GroupedContactsByName from "./GroupedByName"
import FavoriteContacts from "./FavoriteContacts"
import SearchContacts from "./SearchContacts"
import {Contact, FormObjectType, GroupedByFirstLetter} from '../types'
import { getContacts } from '../../domain/requestingContactsData'
import { convertToObject} from '../utills/form'

const DATA_URL  = "http://demo.sibers.com/users"



const groupedLetters = () => {
    // how to set type for 'alphabet'
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

const ContactList = (): JSX.Element => {
    const [isRenderFavorite, setIsRenderFavorite] = useState<boolean>(false)
    const [searchName, setSearchName] = useState<string>("")
    const contactsDataItem = localStorage.getItem("contactsData")
    let parsedContactsData : Contact[] = []
    if (typeof contactsDataItem ===  'string' ) {
        parsedContactsData = JSON.parse(contactsDataItem) as Contact[]
    }

    const [contactsData, setContactsData] = useState<Contact[]>(parsedContactsData || [])

    // handler gets contactId and formObject, finding him in localstorage, and replacement changes

    const handleSaveChanges = (formObject: FormObjectType, contactId: number ) => {
        if (contactsData) {
            const currentContact = contactsData.find(
                (contact: Contact) => contact.id === contactId
            )
            if (currentContact) {
                const updatedFormObject = convertToObject(formObject)
                contactsData[contactId] = { ...currentContact, ...updatedFormObject}
                localStorage.setItem(
                    "contactsData",
                    JSON.stringify(contactsData)
                )
                setContactsData(contactsData)
            }
        }
    }

    useEffect(() => {
        if (!contactsData || !contactsData.length) {
            void getContacts(DATA_URL).then( (contacts) => {
                localStorage.setItem("contactsData", JSON.stringify(contacts))
                setContactsData(contacts)
            })
        }
    }, [contactsData])

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchName(event.target.value)
    }

    // creating object  with keys (from letters array)  for grouping contacts by first letter
    //

    const groupByLetter: GroupedByFirstLetter = groupedLetters()

    // filling the array with contacts by their first letter of the name
    //

    const groupContacts = () => {
        for (let i = 0; i < contactsData.length; i++) {
            const element = contactsData[i]

            const firstLetter = element.name
                .toString()
                .toLowerCase()
                .slice(0, 1)
            groupByLetter[firstLetter].push(element)
        }
    }

    // check if the data is loaded
    //

    if (contactsData.length) {
        // function => arrowFunction
        contactsData.sort((a, b) => {
            const nameA = a.name.toLowerCase()
            const nameB = b.name.toLowerCase()
            if (nameA < nameB) return -1
            if (nameA > nameB) return 1
            return 0
        })
        groupContacts()
    }

    return (
        <>
            <div className="list-header">
                <label className="header-actions clear">
                    <input
                        autoFocus
                        type="text"
                        value={searchName}
                        placeholder="Search contact..."
                        onChange={handleSearch}
                    ></input>
                </label>
                <label className="header-actions clear">
                    <input
                        type="button"
                        value="Clear search"
                        onClick={() => setSearchName("")}
                    />
                </label>
                <label className="header-actions button-favorite">
                    Favorite
                    <input
                        type="checkbox"
                        placeholder="Favorite"
                        onClick={() => setIsRenderFavorite(!isRenderFavorite)}
                    />
                </label>
            </div>
            {!searchName ? (
                !isRenderFavorite ? (
                    <GroupedContactsByName
                        groupByLetter={groupByLetter}
                        handleSaveChanges={handleSaveChanges}
                    />
                ) : (
                    <FavoriteContacts
                        contactsData={contactsData}
                        handleSaveChanges={handleSaveChanges}
                    />
                )
            ) : (
                <SearchContacts
                    searchName={searchName}
                    contactsData={contactsData}
                    handleSaveChanges={handleSaveChanges}
                />
            )}
        </>
    )
}

export default ContactList

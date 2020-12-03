import React, { useState, useEffect } from "react"

import "./ContactList.css"
import GroupedContactsByName from "./GroupedByName"
import FavoriteContacts from "./FavoriteContacts"
import SearchContacts from "./SearchContacts"
import { Contact, FormObjectGeneric } from '../types'
import { getContacts } from '../../domain/requestingContactsData'
import { convertToObject } from '../utills/form'

const DATA_URL = "http://demo.sibers.com/users"

const ContactList = (): JSX.Element => {
    const [isRenderFavorite, setIsRenderFavorite] = useState<boolean>(false)
    const [searchName, setSearchName] = useState<string>("")
    const contactsDataItem = localStorage.getItem("contactsData")
    let parsedContactsData: Contact[] = []
    if (typeof contactsDataItem === 'string') {
        parsedContactsData = JSON.parse(contactsDataItem) as Contact[]
    }
    const [contactsData, setContactsData] = useState<Contact[]>(parsedContactsData || [])

    useEffect(() => {
        if (!contactsData || !contactsData.length) {
            void getContacts(DATA_URL).then((contacts) => {
                localStorage.setItem("contactsData", JSON.stringify(contacts))
                setContactsData(contacts)
            })
        } 
    }, [contactsData])

    const handleSaveChanges = (formObject: FormObjectGeneric<Contact>, contactId: number) => {
        if (contactsData) {
            const index = contactsData.findIndex(contact => contact.id === contactId )
            const newContactsData = [...contactsData]
            const currentContact = newContactsData.find(
                (contact: Contact) => contact.id === contactId
            )
            if (currentContact) {
                const updatedFormObject = convertToObject(formObject)
                newContactsData[index] = updatedFormObject

                localStorage.setItem(
                    "contactsData",
                    JSON.stringify(newContactsData)
                )
                setContactsData(newContactsData)
            }
        }
    }

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchName(event.target.value)
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
                        contactsData={contactsData}
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

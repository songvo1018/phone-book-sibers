import React, { useState, useEffect } from "react"

import "./ContactList.css"
import getDataFromUrl from "../utills/xhr"
import GroupedContactsByName from "./GroupedByName"
import FavoriteContacts from "./FavoriteContacts"
import SearchContacts from "./SearchContacts"

import {Contact, GroupedByFirstLetter} from '../types'

const DATA_URL : string = "http://demo.sibers.com/users"

const putDataToLocalStorage = async (DATA_URL: string, setContactsData: any) => {
    const xhrResponse: Contact[] = await getDataFromUrl("GET", DATA_URL)
    
    localStorage.setItem("contactsData", JSON.stringify(xhrResponse))
    setContactsData(xhrResponse)
}

const groupedLetters = () => {
    // how to create type for 'alphabet'
    const alphabet : any = []
    function genCharArray(charA: string, charZ: string) {
        let i = charA.charCodeAt(0)
        let j = charZ.charCodeAt(0)
        for (; i <= j; ++i) {
            alphabet.push([String.fromCharCode(i), []])
        }
        return alphabet
    }
    const entries = new Map(genCharArray("a", "z"))

    return Object.fromEntries(entries)
}

const ContactList = () => {
    const [isRenderFavorite, setIsRenderFavorite] = useState<boolean>(false)
    const [searchName, setSearchName] = useState<string>("")

    const parsedContactsData = () : Contact[] =>
        JSON.parse(localStorage.getItem("contactsData") || `{}`)

    const [contactsData, setContactsData] = useState<Contact[] | []>(parsedContactsData || [])

    // handler gets contact, finding him in localstorage, and update changes

    // how to give 'changedContact' correct type, and why Contact not match
    // const handleSaveChanges = (changedContact: Contact) => { 
    const handleSaveChanges = (changedContact: any) => {
        const contactsData = JSON.parse(localStorage.getItem("contactsData") || `{}`)
        if (contactsData) {
            const currentContact: Contact = contactsData.find(
                (contact: Contact) => contact.id === changedContact.id
            )
            if (currentContact) {
                const field = Object.keys(currentContact)
                const updatedContact: any = {}
                for (let i = 0; i < field.length; i++) {
                    const current = field[i]
                    console.log(changedContact[current], currentContact.id);
                    
                    // checking if it field is id, because id have not fields "value, initialValue"
                    if (changedContact[current] === currentContact.id) {
                        updatedContact[current] = currentContact.id
                    } else if (changedContact[current].value) {
                        updatedContact[current] = changedContact[current].value
                    } else {
                        updatedContact[current] =
                            changedContact[current].initialValue
                    }
                }
                contactsData[currentContact.id] = updatedContact
                localStorage.setItem(
                    "contactsData",
                    JSON.stringify(contactsData)
                )
                setContactsData(parsedContactsData())
            }
        }
    }

    // WARNING: 
    //  Line 82:8:  React Hook useEffect has a missing dependency: 'contactsData'. Either include it or remove the dependency array  react-hooks/exhaustive-deps

    useEffect(() => {
        if (!contactsData || !contactsData.length) {
            putDataToLocalStorage(DATA_URL, setContactsData)
        }
    }, [])

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
        contactsData.sort(function (a: { name: { toString: () => string } }, b: { name: { toString: () => string } }) {
            let nameA = a.name.toString().toLowerCase()
            let nameB = b.name.toString().toLowerCase()
            if (nameA < nameB) return -1
            if (nameA > nameB) return 1
            return 0
        })
        groupContacts()
    }

    return (
        <div>
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
        </div>
    )
}

export default ContactList

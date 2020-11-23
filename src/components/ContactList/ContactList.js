import React, { useState, useEffect } from 'react'

import './ContactList.css'

import getDataFromUrl from '../utills/xhr'
import GroupedContactsByName from './GroupedByName'
import FavoriteContacts from './FavoriteContacts'
import SearchContacts from './SearchContacts'

const DATA_URL = 'http://demo.sibers.com/users'

const ContactList = () => {
    const [isRenderFavorite, setIsRenderFavorite] = useState(false)
    const [searchName, setSearchName] = useState(``)

    const parsedContactsData = () =>
        JSON.parse(localStorage.getItem('contactsData'))

    const [contactsData, setContactsData] = useState(parsedContactsData || [])

    const handleSaveChanges = (changedContact) => {
        const contactsData = JSON.parse(localStorage.getItem('contactsData'))
        if (contactsData) {
            const currentContact = contactsData.find(
                (contact) => contact.id === changedContact.id
            )
            if (currentContact) {
                const field = Object.keys(currentContact)
                const savedContact = {}
                for (let i = 0; i < field.length; i++) {
                    const current = field[i]

                    // check if field is id, because it have not fields 'value, initialValue'
                    if (changedContact[current] === currentContact.id) {
                        savedContact[current] = currentContact.id
                    } else if (changedContact[current].value) {
                        savedContact[current] = changedContact[current].value
                    } else {
                        savedContact[current] =
                            changedContact[current].initialValue
                    }
                }
                contactsData[currentContact.id] = savedContact
                localStorage.setItem(
                    'contactsData',
                    JSON.stringify(contactsData)
                )
                setContactsData(parsedContactsData())
            }
        }
    }

    const putDataToLocalStorage = async () => {
        const xhrResponse = await getDataFromUrl('GET', DATA_URL)
        localStorage.setItem('contactsData', JSON.stringify(xhrResponse))
        setContactsData(xhrResponse)
    }

    useEffect(() => {
        if (!contactsData || !contactsData.length) {
            putDataToLocalStorage()
        }
    }, [])

    const handleSearch = (event) => {
        setSearchName(event.target.value)
    }

    // creating object  with keys (from letters array)  for grouping contacts by first letter
    //

    const alphabet = []
    function genCharArray(charA, charZ) {
        let i = charA.charCodeAt(0)
        let j = charZ.charCodeAt(0)
        for (; i <= j; ++i) {
            alphabet.push([String.fromCharCode(i), []])
        }
        return alphabet
    }
    const entries = new Map(genCharArray('a', 'z'))

    const groupByLetter = Object.fromEntries(entries)

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

    if (contactsData) {
        contactsData.sort(function (a, b) {
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
                        onClick={() => setSearchName('')}
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

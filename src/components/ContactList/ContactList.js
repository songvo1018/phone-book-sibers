import React, { useState, useEffect } from 'react'
import './ContactList.css'
import ContactCard from '../ContactCard/ContactCard'

import getDataFromUrl from '../utills/xhr'

const DATA_URL = 'http://demo.sibers.com/users'

const ContactList = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [isRenderFavorite, setIsRenderFavorite] = useState(false)
    const [searchName, setSearchName] = useState(``)
    const parsedContactsData = () => {
        return JSON.parse(localStorage.getItem('contactsData'))
    }
    const [contactsData, setContactsData] = useState(parsedContactsData || [])

    const handleSaveChanges = (changedContact) => {
        const contactsData = JSON.parse(localStorage.getItem('contactsData'))
        if (contactsData) {
            const currentPerson = contactsData.find(
                (contact) => contact.id === changedContact.id
            )
            if (currentPerson) {
                const savedContact = {
                    avatar: changedContact.avatar.value
                        ? changedContact.avatar.value
                        : changedContact.avatar.initialValue,
                    city: changedContact.city.value
                        ? changedContact.city.value
                        : changedContact.city.initialValue,
                    company: changedContact.company.value
                        ? changedContact.company.value
                        : changedContact.company.initialValue,
                    id: changedContact.id,
                    favorite: changedContact.favorite.value
                        ? changedContact.favorite.value
                        : changedContact.favorite.initialValue,
                    name: changedContact.name.value
                        ? changedContact.name.value
                        : changedContact.name.initialValue,
                    phone: changedContact.phone.value
                        ? changedContact.phone.value
                        : changedContact.phone.initialValue,
                    website: changedContact.website.value
                        ? changedContact.website.value
                        : changedContact.website.initialValue,
                }
                contactsData[currentPerson.id] = savedContact
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
        setIsLoaded(true)
    }

    useEffect(() => {
        if (!contactsData || !contactsData.length) {
            putDataToLocalStorage()
        }
    }, [])

    const handleSearch = (event) => {
        setSearchName(event.target.value)
    }

    const renderFavoriteContacts = () => {
        return contactsData
            .filter(
                (contact) =>
                    contact.favorite === true || contact.favorite === 'true'
            )
            .map((contact) => (
                <ContactCard
                    key={contact.id}
                    person={contact}
                    handleSaveChanges={handleSaveChanges}
                />
            ))
    }

    const renderSearchedContacts = () => {
        const searchContact = contactsData.filter((el) => {
            return el.name.toLowerCase().indexOf(searchName.toLowerCase()) > -1
        })

        return searchContact.map((contact) => {
            return (
                <ContactCard
                    key={contact.id}
                    person={contact}
                    handleSaveChanges={handleSaveChanges}
                />
            )
        })
    }

    const renderGroupedContactsByName = () => {
        return Object.keys(groupByLetter).map((key) => {
            return (
                <div className="group" key={`group-${key}`}>
                    {groupByLetter[key].length > 0 ? (
                        <div>
                            {key.toUpperCase()}
                            {groupByLetter[key].map((contact) => {
                                return (
                                    <ContactCard
                                        key={`${key}-${contact.id}`}
                                        person={contact}
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
                <label 
                        className="header-actions clear">
                    <input
                        autoFocus
                        type="text"
                        value={searchName}
                        placeholder="Search contact..."
                        onChange={handleSearch}
                    ></input>
                </label>
                <label 
                        className="header-actions clear">
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

            {/* check if the data is loaded */}
            {contactsData ? (
                !searchName ? (
                    !isRenderFavorite ? (
                        renderGroupedContactsByName()
                    ) : (
                        renderFavoriteContacts()
                    )
                ) : (
                    renderSearchedContacts()
                )
            ) : (
                <div>Load...</div>
            )}
        </div>
    )
}

export default ContactList

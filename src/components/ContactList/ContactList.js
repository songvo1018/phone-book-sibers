import React, { useState, useEffect } from 'react'
import './ContactList.css'
import ContactCard from '../ContactCard/ContactCard'
const DATA_URL = 'http://demo.sibers.com/users'

const ContactList = () => {
    const xhr = new XMLHttpRequest()
    const [isLoaded, setIsLoaded] = useState(false)
    const [isRenderFavorite, setIsRenderFavorite] = useState(false)
    const [searchName, setSearchName] = useState(``)
    const [contactsData, setContactsData] = useState([])

    const getDataFromUrl = () => {
        xhr.open('GET', DATA_URL)
        xhr.responseType = 'json'
        xhr.send()
        xhr.onload = function () {
            if (xhr.status !== 200) {
                alert(`Error ${xhr.status}: ${xhr.statusText}`)
            } else {
                console.log('xhr data saved to local')
                localStorage.setItem(
                    'contactsData',
                    JSON.stringify(xhr.response)
                )

                return
            }
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                setIsLoaded(true)
            }
        }
        xhr.onerror = function () {
            console.log('Error. Request failed.')
        }
    }

    const IsLoadedAfterCheck = () => {
        if (!isLoaded) {
            setIsLoaded(true)
        }
    }

    useEffect(() => {
        if (!localStorage.getItem('contactsData')) {
            getDataFromUrl()
        } else {
            IsLoadedAfterCheck()
        }
    })

    useEffect(() => {
        const parsedContactsData = JSON.parse(
            localStorage.getItem('contactsData')
        )
        if (isLoaded) {
            setContactsData(parsedContactsData)
        }
    }, [isLoaded])

    const handleSearch = (event) => {
        setSearchName(event.target.value)
    }

    const renderFavoriteContacts = () => {
        return contactsData
            .filter((contact) => contact.favorite === true)
            .map((contact) => <ContactCard key={contact.id} person={contact} />)
    }

    const renderSearchedContacts = () => {
        const searchContact = contactsData.filter((el) => {
            return el.name.toLowerCase().indexOf(searchName.toLowerCase()) > -1
        })

        return searchContact.map((contact) => {
            return <ContactCard key={contact.id} person={contact} />
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
        let i = charA.charCodeAt(0),
            j = charZ.charCodeAt(0)
        for (; i <= j; ++i) {
            alphabet.push([String.fromCharCode(i), []])
        }
        return alphabet
    }
    let entries = new Map(genCharArray('a', 'z'))

    let groupByLetter = Object.fromEntries(entries)

    // filling the array with contacts by their first letter of the name
    //

    const groupContacts = () => {
        for (let i = 0; i < contactsData.length; i++) {
            const element = contactsData[i]

            let firstLetter = element.name.toLowerCase().slice(0, 1)
            groupByLetter[firstLetter].push(element)
        }
    }

    // check if the data is loaded
    //

    if (contactsData) {
        contactsData.sort(function (a, b) {
            let nameA = a.name.toLowerCase()
            let nameB = b.name.toLowerCase()
            if (nameA < nameB) return -1
            if (nameA > nameB) return 1
            return 0
        })
    }
    if (contactsData.length !== 0) {
        groupContacts()
    }

    return (
        <div>
            <div className="list-header">
                <input
                    autoFocus
                    type="text"
                    value={searchName}
                    placeholder="Search contact..."
                    onChange={handleSearch}
                ></input>
                <button className="clear" onClick={() => setSearchName('')}>
                    Clear search
                </button>
                <label className="favorite-button ">
                    Favorite
                    <input
                        type="checkbox"
                        onClick={() => setIsRenderFavorite(!isRenderFavorite)}
                    />
                </label>
            </div>

            {/* check if the data is loaded */}
            {isLoaded ? (
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

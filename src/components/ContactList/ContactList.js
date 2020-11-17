import React, { useState, useEffect } from 'react'
import './ContactList.css'
import ContactCard from '../ContactCard/ContactCard'
const DATA_URL = 'http://demo.sibers.com/users'

const ContactList = () => {
    const xhr = new XMLHttpRequest()
    const [isLoaded, setIsLoaded] = useState(false)
    const getDataFromUrl = () => {
        xhr.open('GET', DATA_URL)
        xhr.responseType = 'json'
        xhr.send()
        xhr.onload = function () {
            if (xhr.status !== 200) {
                alert(`Error ${xhr.status}: ${xhr.statusText}`)
            } else {
                localStorage.setItem(
                    'contactsData',
                    JSON.stringify(xhr.response)
                )
                setIsLoaded(true)
                return
            }
        }
        xhr.onerror = function () {
            console.log('Error. Request failed.')
        }
    }

    getDataFromUrl()

    let [searchName, setSearchName] = useState(``)
    const parsedContactsData = JSON.parse(localStorage.getItem('contactsData'))
    const [contactsData, setContactsData] = useState(parsedContactsData || [])

    useEffect(() => {
        setContactsData(parsedContactsData)
    }, [isLoaded])

    const handleSearch = (event) => {
        setSearchName(event.target.value)
    }

    const renderSearchedContacts = () => {
        let searchContact = contactsData.filter((el) => {
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
        groupContacts()
    }
    return (
        <div>
            <div>
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
            </div>

            {/* check if the data is loaded */}
            {isLoaded ? (
                !searchName ? (
                    renderGroupedContactsByName()
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

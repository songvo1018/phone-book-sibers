import React from 'react'
import './ContactList.css'
import ContactCard from '../ContactCard/ContactCard'
const DATA_URL = 'http://demo.sibers.com/users';
const ContactList = () => {
    const xhr = new XMLHttpRequest();

    let [requestedContactsData, setRequestContactsData] = React.useState([])
    let [searchName, setSearchName] = React.useState(``)
    let parseContactsData = []

    const getDataFromUrl = () => {
        if (requestedContactsData.length === 0) {
            xhr.open('GET', DATA_URL)
            xhr.responseType = 'json'
            xhr.send()
            xhr.onload = function () {
                if (xhr.status !== 200) {
                    alert(`Error ${xhr.status}: ${xhr.statusText}`)
                } else {
                    console.log(xhr.response)
                    setRequestContactsData(xhr.response)
                    return
                }
            }
            xhr.onerror = function () {
                console.log('Error. Request failed.')
            }
        } 
    }

    const handleSearch = (event) => {
        setSearchName(event.target.value)
    }

    const setToStorage = () => {
        requestedContactsData.map((contact) => {
            let person = JSON.stringify({
                id: contact.id,
                name: contact.name,
                address: contact.address.city,
                website: contact.website,
                phone: contact.phone,
                company: contact.company.name,
                avatar: contact.avatar,
                favorite: contact.favorite,
            })
            return localStorage.setItem(`${contact.id}`, person)
        })
    }

    const renderSearchedContacts = () => {
        let searchContact = parseContactsData.filter((el) => {
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

    // when we get json from url, we should set data on localStorage
    //
    React.useEffect(() => {
        setToStorage()
    }, [requestedContactsData])

    // check whether to make a request to the server or use data from the local storage
    //
    if (localStorage.length === 0) {
        getDataFromUrl()
    } else {
        let keys = Object.keys(localStorage)
        for (let key of keys) {
            parseContactsData.push(JSON.parse(localStorage.getItem(key)))
        }
    }

    parseContactsData.sort(function (a, b) {
        let nameA = a.name.toLowerCase()
        let nameB = b.name.toLowerCase()
        if (nameA < nameB) return -1
        if (nameA > nameB) return 1
        return 0
    })

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
        for (let i = 0; i < parseContactsData.length; i++) {
            const element = parseContactsData[i]

            let firstLetter = element.name.toLowerCase().slice(0, 1)
                    groupByLetter[firstLetter].push(element)
                
        }
    }

    groupContacts()

    // TODO:
    // 1. Add styles

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
            {!searchName
                ? renderGroupedContactsByName()
                : renderSearchedContacts()}
        </div>
    )
}

export default ContactList

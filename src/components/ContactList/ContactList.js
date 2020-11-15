import React from 'react';

// import './ContactList.css';

import ContactCard from '../ContactCard/ContactCard'

const ContactList = () => {
  const xhr = new XMLHttpRequest();
  const dataUrl = 'http://demo.sibers.com/users';
  
  let [requestContactsData, setRequestContactsData] = React.useState([]);
  let [searchName, setSearchName] = React.useState(``);
  let parseContactsData = [];

  const getDataFromUrl = () => {
    if (requestContactsData.length === 0) {
      xhr.open('GET', dataUrl);
      xhr.responseType = 'json';
      xhr.send();
      xhr.onload = function () {
        if (xhr.status !== 200) {
          alert(`Error ${xhr.status}: ${xhr.statusText}`);
        } else {
          console.log(xhr.response);
          setRequestContactsData(xhr.response);
          return;
        }
      }
      xhr.onerror = function () {
        console.log('Error. Request failed.');
      }
    } else {
      return;
    }
  }

   const handleSearch = (event) => {
    setSearchName(event.target.value);
  };

  const saveToStorage = () => {
    requestContactsData.map(contact => {
     let person = JSON.stringify({
       id: contact.id,
       name: contact.name,
       address: contact.address.city,
       website: contact.website,
       phone: contact.phone,
       company: contact.company.name,
       avatar: contact.avatar,
       favorite: contact.favorite
     });
     return localStorage.setItem(`${contact.id}`, person);
    })
  };

  const renderSearchContacts = () => {
    let searchContact = parseContactsData.filter(el => {
      return el.name.toLowerCase().indexOf(searchName.toLowerCase()) > -1;
    })
    return (
      searchContact.map(contact => {
        return (
          <ContactCard person={contact} />
        )
      })
    );
  };


  React.useEffect(() => {
    saveToStorage();
  }, [requestContactsData]);
  
  if (localStorage.length === 0) {
    getDataFromUrl();
  } else {
    let keys = Object.keys(localStorage);
    for(let key of keys) {
      parseContactsData.push(JSON.parse(localStorage.getItem(key)));
    }
  }

  parseContactsData.sort(function(a, b) {
    let nameA = a.name.toLowerCase();
    let nameB = b.name.toLowerCase();
    
    if (nameA < nameB) 
      return -1;
    if (nameA > nameB)
      return 1;
    return 0
  })

  // TODO: 
  // 0. Group contact by first letter of name
  // 1. Add 

  return (
    <div>
      <div>
        <input autoFocus type="text" value={searchName} placeholder="Search contact..." onChange={event => handleSearch(event)}></input>
        <button onClick={() => setSearchName('')}>Clear search</button>
      </div>
      {
        searchName !== '' 
          ? renderSearchContacts()
          : parseContactsData.map(contact => {
            return (
            <ContactCard person={contact} />
            )
          })
      }      
      <div>
        {/* <select>
          <option value=""></option>
          <option value=""></option>
          <option value=""></option>
          <option value=""></option>
        </select> */}
      </div>
    </div>
  )
}

export default ContactList;
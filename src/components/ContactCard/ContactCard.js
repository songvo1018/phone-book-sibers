import React from 'react';
import Modal from 'react-modal';

import './ContactCard.css';

const ContactCard = (data) => {
  let [person, setPerson] = React.useState({});
  let [showModal, setShowModal] = React.useState(false);
  let [isEditing, setIsEditing] = React.useState(false);
  let [isEdited, setIsEdited] = React.useState(false);

  React.useEffect(() => {
    const update = () => {
      setPerson(data.person)
    }
    update()
  }, [data])

  const handleOpenModal = () => {
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setShowModal(false);
  }
  
  const handleEditContact = () => {
    setIsEditing(true)
  }

  const handleSaveChanges = () => {
    localStorage.setItem(`${person.id}`, JSON.stringify(person))
    // here we send 'post' request on the server
    setIsEdited(true)
    setIsEditing(false)
  }

  const handleChangeContactData = (event) => {
    event.preventDefault()
    let name = event.target.name
    let value = event.target.value

    let obj = {...person};
    let keys = Object.keys(person)

    for (let i = 0; i < keys.length; i++) {
      const field = keys[i];
      if (field === name) {
        obj[field] = value
      }
    }
    setPerson(obj)
  }

  const renderInputFields = () => {
    let inputNames = ['name', 'phone', 'address', 'city', 'website', 'avatar']
    let inputs = [];

    inputNames.map(name => {
      inputs.push(<input name={name} type="text" value={person[name]} onChange={(event) => {handleChangeContactData(event)}} className='Modal-input' />)
    })

    return (
      <div>
        {inputs}
      </div>
    )
  }

  return (
    <div className="list">
      <div className="card" key={person.id} onClick={handleOpenModal}>
            <div>{person.name}</div>
            <div>{person.phone}</div>
      </div>
      <Modal
        isOpen={showModal}
        contentLabel='edit contacts'
        className='Modal'
        onRequestClose={handleCloseModal}
        overlayClassName='Overlay'
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
      >
        <div className='Modal-window'>
          <div className='Modal-header'>
            <div className='Modal-content'>
              {
                !isEditing
                ?<div>
                  <div><img alt={person.name} src={person.avatar} /></div>
                  <div>{person.name}</div>
                  <div>{person.phone}</div>
                  <div>{person.address}</div>
                  <div>{person.website}</div>
                </div>
                : <div>
                    <img alt={person.name} src={person.avatar} />
                    {renderInputFields()}
                  </div>
              }
            </div>
            <button className='close' onClick={handleCloseModal}>
              x
            </button>
          </div>
          <div className='Modal-footer'>
            {
              isEditing
              ? <button className='edit' onClick={handleSaveChanges}>
                  Save changes
                </button>
              : <button className='save' onClick={handleEditContact}>
                  Edit contact
                </button>
            }
            {
              isEdited
              ? <span className='edited-message'>Changes saved</span>
              : null
            }
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ContactCard;
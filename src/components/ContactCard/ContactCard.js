import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import './ContactCard.css'

const INPUTS = [    'name',
    'phone',
    'city',
    'company',
    'website',
    'avatar'
]

const ContactCard = ({person}) => {
    const [formData, setFormData] = useState({});
    const [showModal, setShowModal] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [isEdited, setIsEdited] = useState(false)
    // remove this state
    const [isFavoriteStyle, setIsFavoriteStyle] = useState(person.favorite)
    // call this in another way

    // example of form data
    const initialFormData = () => {
        const result = {};
        INPUTS.forEach(key => {
            result[key] = {
                value: currentInputValue,
                initialValue: currentInputValue,
                error: null
            }
        })
        setFormData(result);
    }





    useEffect(() => {
        const update = () => {
            // call method from parent
            setPerson(data.person)
        }
        update()
    }, [data])

    useEffect(() => {
        if (isEdited) {
            setTimeout(() => {
                setIsEdited(false)
            }, 900)
        }
    }, [isEdited])

    const handleOpenModal = () => {
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

    const handleEditContact = () => {
        initialFormData()
        setIsEdited(false)
    }


    // move this function to parent
    const handleSaveChanges = (changedContact) => {
        const contactsData = JSON.parse(localStorage.getItem('contactsData'))
        if (contactsData) {
            const currentPerson = contactsData.find((contact) => contact.id === changedContact.id);
            if (currentPerson) {
                contactsData[currentPerson.id] = changedContact;
                localStorage.setItem('contactsData', JSON.stringify(contactsData))
            }
            
        }

        // here we send 'post' request on the server
        setIsEdited(true)
        setIsEditing(false)
    }

    const handleChangeContactData = (event) => {
        event.preventDefault()
        const name = event.target.name
        const value = event.target.value
        const obj = { ...person }
        const keys = Object.keys(person)

        for (let i = 0; i < keys.length; i++) {
            const field = keys[i]
            if (field === name) {
                obj[field] = value
            }
        }

        // pay attention to naming of variables of person/contact. And call function from parent to change contacts data
        setPerson(obj)
    }

    const renderFavoriteButtons = () => {
        return (
            // remove extra button and add necessary condtions to attributes and calling handler
            <div className="favorite-block">
                <button
                    className="favorite-button enable"
                    name="favorite"
                    value={true}
                    onClick={(event) => {
                        // remove calling this method
                        setIsFavoriteStyle(true)
                        handleChangeContactData(event)
                    }}
                >
                    favorite
                </button>
                <button
                    className="favorite-button disable"
                    name="favorite"
                    value={false}
                    onClick={(event) => {
                         // remove calling this method
                        setIsFavoriteStyle(false)
                        handleChangeContactData(event)
                    }}
                >
                    unfavorite
                </button>
            </div>
        )
    }
    const renderInputFields = () => {
        //

        const inputFields = []

        INPUTS.map((input) => {
            return inputs.push(
                <input
                    // first letter to upper case
                    placeholder={input}
                    key={input}
                    name={input}
                    type="text"
                    value={formData[input].value}
                    onChange={(event) => {
                        handleChangeContactData(event)
                    }}
                    // change naming of class name
                    className="modal-input"
                />
            )
        })
        return <div>{inputFields}</div>
    }

    return (
        <div className="item">
            <div 
                // replace isFavoriteStyle to favorite field value from person prop
                className={`card${person.favorite && ' favorite'}`}
                key={person.id}
                onClick={handleOpenModal}
            >
                <div>{person.name}</div>
                <div>{person.phone}</div>
            </div>
            <Modal
                isOpen={showModal}
                contentLabel="edit contacts"
                className="modal"
                onRequestClose={handleCloseModal}
                overlayClassName="Overlay"
                shouldCloseOnOverlayClick={true}
                shouldCloseOnEsc={true}
                ariaHideApp={false}
            >
                <div className="modal-window">
                    <div className="modal-header">
                        {!isEditing ? (
                            <div className="modal-content">
                                <img alt={person.name} src={person.avatar} />
                                <div className="modal-text">{person.name}</div>
                                <div className="modal-text">{person.phone}</div>
                                <div className="modal-text">
                                    {person.company}
                                </div>
                                <div className="modal-text">
                                    {person.city}
                                </div>
                                <a
                                    href={`https://${person.website}`}
                                    className="modal-text"
                                >
                                    {person.website}
                                </a>
                            </div>
                        ) : (
                            <div className="modal-content">
                                {/* https://vincenttaverna.com/posts/react-image-hook/ */}
                                <img alt={person.name} src={person.avatar} />
                                {renderFavoriteButtons()}
                                {renderInputFields()}
                            </div>
                        )}
                        <div>
                            <button
                                className="close"
                                onClick={handleCloseModal}
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                    <div className="modal-footer">
                        {isEditing ? (
                            <button
                                className="save"
                                onClick={handleSaveChanges}
                            >
                                Save changes
                            </button>
                        ) : (
                            <button
                                className="edit"
                                onClick={handleEditContact}
                            >
                                Edit contact
                            </button>
                        )}
                        {isEdited && (
                            <span className="edited-message">
                                Changes saved
                            </span>
                        )}
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ContactCard

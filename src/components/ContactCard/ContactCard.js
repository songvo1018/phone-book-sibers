import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import './ContactCard.css'

const ContactCard = (data) => {
    const [person, setPerson] = useState(data.person)
    const [showModal, setShowModal] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [isEdited, setIsEdited] = useState(false)
    const [isFavoriteStyle, setIsFavoriteStyle] = useState(person.favorite)

    useEffect(() => {
        const update = () => {
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
        setIsEditing(true)
        setIsEdited(false)
    }

    const handleSaveChanges = () => {
        const pendingData = JSON.parse(localStorage.getItem('contactsData'))
        const id = pendingData.find((contact) => contact.id === person.id).id
        pendingData[id] = person
        localStorage.setItem('contactsData', JSON.stringify(pendingData))
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
        setPerson(obj)
    }

    const renderFavoriteButtons = () => {
        return (
            <div className="favorite-block">
                <button
                    className="favorite-button enable"
                    name="favorite"
                    value={true}
                    onClick={(event) => {
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
        const inputNames = {
            name: person.name,
            phone: person.phone,
            city: person.city,
            company: person.company,
            website: person.website,
            avatar: person.avatar,
        }
        const inputs = []

        Object.keys(inputNames).map((name) => {
            return inputs.push(
                <input
                    placeholder={name}
                    key={name}
                    name={name}
                    type="text"
                    value={inputNames[name]}
                    onChange={(event) => {
                        handleChangeContactData(event)
                    }}
                    className="modal-input"
                />
            )
        })
        return <div>{inputs}</div>
    }

    return (
        <div className="item">
            <div
                className={`card favorite-${isFavoriteStyle}`}
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
                        {isEdited ? (
                            <span className="edited-message">
                                Changes saved
                            </span>
                        ) : null}
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ContactCard

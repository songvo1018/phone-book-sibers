import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import './ContactCard.css'

const INPUTS = ['name', 'phone', 'city', 'company', 'website', 'avatar']

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

const ContactCard = ({ person, handleSaveChanges }) => {
    const [formData, setFormData] = useState({})
    const [showModal, setShowModal] = useState(false)
    const [isFieldChanged, setIsFieldChanged] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [isEdited, setIsEdited] = useState(false)
    // call this in another way

    // example of form data
    const initialFormData = () => {
        const result = {
            id: person.id,
            favorite: { value: '', initialValue: person.favorite, error: null },
        }
        INPUTS.forEach((key) => {
            result[key] = {
                value: '',
                initialValue: person[key],
                error: null,
            }
        })

        setFormData(result)
    }

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
        if (!isEdited) {
            initialFormData()
            setIsEdited(false)
        }
    }

    // move this function to parent

    // // here we send 'post' request on the server

    const handleChangeContactData = (event) => {
        event.preventDefault()
        const name = event.target.name
        const value = event.target.value
        const obj = { ...formData }
        const keys = Object.keys(formData)

        for (let i = 0; i < keys.length; i++) {
            const field = keys[i]
            if (field === name) {
                obj[field].value = value
            }
        }

        // pay attention to naming of variables of person/contact. And call function from parent to change contacts data
        setFormData(obj)
    }

    const renderFavoriteButtons = () => {

// TODO: should i take value from props or formdate?

        const initialCompare =
            formData.favorite.initialValue === true ||
            formData.favorite.initialValue === 'true'
        return (
            <button
                className={`button${initialCompare ? '' : ' favor'}${isFieldChanged? ' changed': ''}`}
                name="favorite"
                value={
                    person.favorite === true || person.favorite === 'true'
                        ? false
                        : true
                }
                onClick={(event) => {
                    setIsFieldChanged(true)
                    handleChangeContactData(event)
                }}
            >
                {initialCompare ? 'unfavorite' : 'favorite'}
            </button>
        )
    }
    const renderInputFields = () => {
        //
        const inputFields = []

        INPUTS.map((input) => {
            return inputFields.push(
                <input
                    // first letter to upper case
                    placeholder={capitalize(input)}
                    key={input}
                    name={input}
                    type="text"
                    value={
                        formData[input].value !== ''
                            ? formData[input].value
                            : formData[input].initialValue
                    }
                    onChange={(event) => {
                        handleChangeContactData(event)
                    }}
                    // change naming of class name
                    className={`input`}
                />
            )
        })
        return <div>{inputFields}</div>
    }

    return (
        <div className="item">
            <div
                // replace isFavoriteStyle to favorite field value from person prop
                className={`card${
                    person.favorite === true || person.favorite === 'true'
                        ? ' favorite'
                        : ''
                }`}
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
                                <div className="modal-text">{person.city}</div>
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
                                {renderInputFields()}
                                {renderFavoriteButtons()}
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
                        {!isEditing ? (
                            <button
                                className="button"
                                onClick={handleEditContact}
                            >
                                Edit contact
                            </button>
                        ) : (
                            <button
                                className="button"
                                onClick={() => {
                                    handleSaveChanges(formData)
                                    setIsEdited(true)
                                    setIsEditing(false)
                                }}
                            >
                                Save changes
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

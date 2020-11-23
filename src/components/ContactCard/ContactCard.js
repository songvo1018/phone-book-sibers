import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import './ContactCard.css'
import InputFields from './InputFields'
import FavoriteButtons from './FavoriteButtons'
import ContactInfo from './ContactInfo'
import Image from '../utills/Image/Image'
const INPUTS = ['name', 'phone', 'city', 'company', 'website', 'avatar']

const SimpleButton = ({ className, handler, children }) => {
    return (
        <button className={className} onClick={handler}>
            {children}
        </button>
    )
}

const initialFormData = (INPUTS, contact, setFormData) => {
    const editingContact = {
        id: contact.id,
        favorite: {
            value: '',
            initialValue: contact.favorite,
            error: null,
        },
    }
    INPUTS.forEach((key) => {
        editingContact[key] = {
            value: '',
            initialValue: contact[key],
            error: null,
        }
    })

    setFormData(editingContact)
}

const ContactCard = ({ contact, handleSaveChanges }) => {
    const [formData, setFormData] = useState({})
    const [showModal, setShowModal] = useState(false)
    const [isFieldChanged, setIsFieldChanged] = useState(false)
    const [isProcessOfEditing, setIsProcessOfEditing] = useState(false)
    const [isShowMessageEdited, setShowMessageEdited] = useState(false)

    useEffect(() => {
        if (isShowMessageEdited) {
            setTimeout(() => {
                setShowMessageEdited(false)
            }, 900)
        }
    }, [isShowMessageEdited])

    const handleOpenModal = () => {
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

    const handleEditContact = () => {
        setIsProcessOfEditing(true)
        if (!isShowMessageEdited) {
            initialFormData(INPUTS, contact, setFormData)
            setShowMessageEdited(false)
        }
    }

    const handleChangeContactData = (event) => {
        event.preventDefault()
        const name = event.target.name
        const value = event.target.value
        const currentContact = { ...formData }
        const keys = Object.keys(formData)

        for (let i = 0; i < keys.length; i++) {
            const field = keys[i]
            if (field === name) {
                currentContact[field].value = value
            }
        }
        setFormData(currentContact)
    }

    return (
        <div className="contact">
            <div
                className={`card${
                    contact.favorite === true || contact.favorite === 'true'
                        ? ' favorite'
                        : ''
                }`}
                key={contact.id}
                onClick={handleOpenModal}
            >
                <div>{contact.name}</div>
                <div>{contact.phone}</div>
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
                        {!isProcessOfEditing ? (
                            <ContactInfo contact={contact} />
                        ) : (
                            <div className="modal-content">
                                <Image
                                    src={contact.avatar}
                                    alt={contact.name}
                                />
                                <InputFields
                                    INPUTS={INPUTS}
                                    formData={formData}
                                    handleChangeContactData={
                                        handleChangeContactData
                                    }
                                />
                                <FavoriteButtons
                                    formData={formData}
                                    contact={contact}
                                    setIsFieldChanged={setIsFieldChanged}
                                    handleChangeContactData={
                                        handleChangeContactData
                                    }
                                    isFieldChanged={isFieldChanged}
                                />
                            </div>
                        )}
                        <div>
                            <SimpleButton
                                handler={handleCloseModal}
                                className={'close'}
                            >
                                <i className="fas fa-times"></i>
                            </SimpleButton>
                        </div>
                    </div>
                    <div className="modal-footer">
                        {!isProcessOfEditing ? (
                            <SimpleButton
                                handler={handleEditContact}
                                className={'button'}
                            >
                                Edit contact
                            </SimpleButton>
                        ) : (
                            <SimpleButton
                                handler={() => {
                                    handleSaveChanges(formData)
                                    setShowMessageEdited(true)
                                    setIsProcessOfEditing(false)
                                }}
                                className={'button'}
                            >
                                Save changes
                            </SimpleButton>
                        )}
                        {isShowMessageEdited && (
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

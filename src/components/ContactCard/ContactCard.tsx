import React, { useEffect, useState } from "react"
import Modal from "react-modal"

import "./ContactCard.css"
import InputFields from "./InputFields"
import FavoriteButtons from "./FavoriteButtons"
import ContactInfo from "./ContactInfo"
import Image from "../utills/Image/Image"
import SimpleButton from "./SimpleButton"
import initialFormData from "./initialFormData"

import {ContactCardType} from '../types'


const INPUTS: string[] = ["name", "phone", "city", "company", "website", "avatar"]

const handleChangeContactData = (event: any, formData: any, setFormData: any) => {
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



const ContactCard = ({ contact, handleSaveChanges }: ContactCardType) => {
    const [formData, setFormData] = useState({})
    const [showModal, setShowModal] = useState(false)
    const [isProcessOfEditing, setIsProcessOfEditing] = useState(false)
    const [isShowMessageEdited, setShowMessageEdited] = useState(false)

    useEffect(() => {
        if (isShowMessageEdited) {
            setTimeout(() => {
                setShowMessageEdited(false)
            }, 2500)
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

    return (
        <div className="contact">
            <div
                className={`card${
                    contact.favorite === true || contact.favorite === "true"
                        ? " favorite"
                        : ""
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
                        <div className="modal-container">
                            <div className="avatar">
                                <Image
                                    src={contact.avatar}
                                    alt={contact.name}
                                />
                            </div>
                            {!isProcessOfEditing ? (
                                <ContactInfo contact={contact} />
                            ) : (
                                <div className="modal-content">
                                    <InputFields
                                        INPUTS={INPUTS}
                                        formData={formData}
                                        handleChangeContactData={(event: any) =>
                                            handleChangeContactData(
                                                event,
                                                formData,
                                                setFormData
                                            )
                                        }
                                    />
                                    <FavoriteButtons
                                        formData={formData}
                                        contact={contact}
                                        handleChangeContactData={(event: any) =>
                                            handleChangeContactData(
                                                event,
                                                formData,
                                                setFormData
                                            )
                                        }
                                    />
                                </div>
                            )}
                        </div>
                        <div className="close">
                            <SimpleButton
                                handler={handleCloseModal}
                                className={"close-button"}
                            >
                                <i className="fas fa-times"></i>
                            </SimpleButton>
                        </div>
                    </div>
                    <div className="modal-footer">
                        {!isProcessOfEditing ? (
                            <SimpleButton
                                handler={handleEditContact}
                                className={"button"}
                            >
                                Edit contact
                            </SimpleButton>
                        ) : (
                            <SimpleButton
                                handler={() => {
                                    handleSaveChanges(formData)
                                    setShowMessageEdited(true)
                                    setIsProcessOfEditing(false)
                                    // can i destroy formdata?
                                }}
                                className={"button"}
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
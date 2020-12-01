import React, { useEffect, useState } from "react"
import Modal from "react-modal"

import "./ContactCard.css"
import InputFields from "./InputFields"
import FavoriteButtons from "./FavoriteButtons"
import ContactInfo from "./ContactInfo"
import Image from "../utills/Image/Image"
import SimpleButton from "./SimpleButton"
import initializeFormObject from "../utills/form"
import {ContactCardType, FormObject} from '../types'

const INPUTS: string[] = ["name", "phone", "city", "company", "website", "avatar"]

const ContactCard = ({ contact, handleSaveChanges }: ContactCardType) => {
    const [formObject, setFormObject] = useState<FormObject>({})
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
            const formO = initializeFormObject(contact)
            setFormObject(():any => formO)
            setShowMessageEdited(false)
        }
    }

    const handleChangeContactData = (event: React.ChangeEvent<HTMLInputElement>, formObject: FormObject) => {
        event.preventDefault()
        const name = event.target.name
        const value = event.target.value
        const currentContact = { ...formObject, [name]: { ...formObject[name], value, error: !value ? 'error' : null } }
        setFormObject(currentContact)
    }

    return (
        <div className="contact">
            <div
                className={`card${
                    contact.favorite === "true"
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
                                        formObject={formObject}
                                        handleChangeContactData={(event: any) =>
                                            handleChangeContactData(
                                                event,
                                                formObject
                                            )
                                        }
                                    />
                                    <FavoriteButtons
                                        formObject={formObject}
                                        contact={contact}
                                        handleChangeContactData={(event: any) =>
                                            handleChangeContactData(
                                                event,
                                                formObject
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
                                    handleSaveChanges(formObject, contact.id)
                                    setShowMessageEdited(true)
                                    setIsProcessOfEditing(false)
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

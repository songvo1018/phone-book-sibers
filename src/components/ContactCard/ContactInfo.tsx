import React from 'react'
import {Contact} from '../types'
const ContactInfo = ({ contact } : {contact: Contact} ) => {
    return (
        <div className="modal-content">
            <div className="modal-text">{contact.name}</div>
            <div className="modal-text">{contact.phone}</div>
            <div className="modal-text">{contact.company}</div>
            <div className="modal-text">{contact.city}</div>
            <a href={`https://${contact.website}`} className="modal-text">
                {contact.website}
            </a>
        </div>
    )
}

export default ContactInfo
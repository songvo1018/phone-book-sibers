import Image from '../utills/Image/Image'

const ContactInfo = ({ contact }) => {
    return (
        <div className="modal-content">
            <Image src={contact.avatar} alt={contact.name} />
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

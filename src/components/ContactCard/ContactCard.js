import React from 'react';
import Modal from 'react-modal';

import './ContactCard.css';

const ContactCard = ({person}) => {
  let [showModal, setShowModal] = React.useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setShowModal(false);
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
        <div className='Modal-content'>
          <div><img src={person.avatar} /></div>
          <div>{person.name}</div>
          <div>{person.phone}</div>
          <div>{person.address}</div>
          <div>{person.website}</div>
        </div>
        <button className='close' onClick={handleCloseModal}>
          x
        </button>
        </div>
      </Modal>
    </div>
  )
}

export default ContactCard;
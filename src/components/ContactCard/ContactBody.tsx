import ContactInfo from "./ContactInfo"
import ContactEdit from "./ContactEdit"
import {IContactBody} from '../types'
const ContactBody = ({ isProcessOfEditing, contact, INPUTS, formObject, handleChangeContactData, handleChangeFavoriteContact }: IContactBody): JSX.Element => {
  return <>
    {!isProcessOfEditing ? (
      <ContactInfo contact={contact} />
    ) : (
        <ContactEdit
          INPUTS={INPUTS}
          formObject={formObject}
          contact={contact}
          handleChangeContactData={handleChangeContactData}
          handleChangeFavoriteContact={handleChangeFavoriteContact}
        />
      )}
  </>
}

export default ContactBody
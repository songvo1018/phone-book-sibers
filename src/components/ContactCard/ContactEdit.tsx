import React from "react"

import InputFields from "./InputFields"
import FavoriteButtons from "./FavoriteButtons"
import { ContactEditType } from "../types"
const ContactEdit = ({ INPUTS, formObject, contact, handleChangeContactData, handleChangeFavoriteContact }: ContactEditType): JSX.Element => {
  return (
    <div className="modal-content">
      <InputFields
        INPUTS={INPUTS}
        formObject={formObject}
        handleChangeContactData={(event: React.ChangeEvent<HTMLInputElement>) =>
          handleChangeContactData(
            event,
            formObject
          )
        }
      />
      <FavoriteButtons
        formObject={formObject}
        contact={contact}
        handleChangeFavoriteContact={handleChangeFavoriteContact}
      />
    </div>
  )
}

export default ContactEdit
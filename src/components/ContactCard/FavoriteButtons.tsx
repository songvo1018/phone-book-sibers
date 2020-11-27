import React from "react"
import { Contact } from "../types"

const FavoriteButtons = ({
    formData,
    contact,
    handleChangeContactData
}: {contact: Contact, handleChangeContactData: any, formData: any}) => {
    // TODO: should i take value from props or formdate?

    const initialCompare =
        formData.favorite.initialValue === true ||
        formData.favorite.initialValue === "true"
    return (
        <label>
            <span
                className={
                    formData.favorite.value !== "" ? "label-show" : "label-hide"
                }
            >
                Changed
            </span>
            <button
                className="button favor"
                name="favorite"
                value={
                    contact.favorite === "true" || contact.favorite === true
                        ? "false"
                        : "true"
                }
                onClick={(event) => {
                    handleChangeContactData(event)
                }}
            >
                {initialCompare ? "unfavorite" : "favorite"}
            </button>
        </label>
    )
}

export default FavoriteButtons

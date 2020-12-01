import React from "react"
import { Contact, FavoriteButtonsType } from "../types"

const FavoriteButtons = ({ formObject, contact, handleChangeContactData }: FavoriteButtonsType) => {
    
    return (
        <label>
            <span
                className={
                    formObject.favorite.value !== "" ? "label-show" : "label-hide"
                }
            >
                Changed
            </span>
            <button
                className="button favor"
                name="favorite"
                value={
                    contact.favorite === "true"
                        ? "false"
                        : "true"
                }
                onClick={(event) => {
                    handleChangeContactData(event)
                }}
            >
                {formObject.favorite.initialValue === "true" ? "unfavorite" : "favorite"}
            </button>
        </label>
    )
}

export default FavoriteButtons

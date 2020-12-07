import React from "react";
import { FavoriteButtonsType } from "../types";
import SimpleButton from "./SimpleButton";

const FavoriteButtons = ({
    formObject,
    handleChangeFavoriteContact,
}: FavoriteButtonsType): JSX.Element => {
    return (
        <label>
            <span
                className={
                    formObject.favorite.value !== formObject.favorite.initialValue ? "label-show" : "label-hide"
                }
            >
                Changed
			</span>
            <SimpleButton
                className="button favor"
                handler={() => {
                    handleChangeFavoriteContact(formObject.favorite.value, formObject);
                }}
            >
                {formObject.favorite.initialValue === "true"
                    ? "unfavorite"
                    : "favorite"}
            </SimpleButton>
        </label>
    );
};

export default FavoriteButtons;

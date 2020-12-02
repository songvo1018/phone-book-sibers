import { FavoriteButtonsType } from "../types";

const FavoriteButtons = ({
    formObject,
    contact,
    handleChangeFavoriteContact,
}: FavoriteButtonsType): JSX.Element => {
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
                value={contact.favorite === "true" ? "false" : "true"}
                onClick={() => {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                    handleChangeFavoriteContact(contact.favorite, formObject);
                }}
            >
                {formObject.favorite.initialValue === "true"
                    ? "unfavorite"
                    : "favorite"}
            </button>
        </label>
    );
};

export default FavoriteButtons;

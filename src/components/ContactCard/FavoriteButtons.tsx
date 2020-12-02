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
                    formObject.favorite.value !== formObject.favorite.initialValue ? "label-show" : "label-hide"
                }
            >
                Changed
			</span>
            <button
                className="button favor"
                name="favorite"
                value={formObject.favorite.value === "true" ? "false" : "true"}
                onClick={() => {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                    handleChangeFavoriteContact(formObject.favorite.value, formObject);
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

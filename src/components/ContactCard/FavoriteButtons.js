const FavoriteButtons = ({
    formData,
    contact,
    setIsFieldChanged,
    handleChangeContactData,
    isFieldChanged,
}) => {
    // TODO: should i take value from props or formdate?

    const initialCompare =
        formData.favorite.initialValue === true ||
        formData.favorite.initialValue === 'true'
    return (
        <button
            className={`button${initialCompare ? '' : ' favor'}${
                isFieldChanged ? ' changed' : ''
            }`}
            name="favorite"
            value={
                contact.favorite === true || contact.favorite === 'true'
                    ? false
                    : true
            }
            onClick={(event) => {
                setIsFieldChanged(true)
                handleChangeContactData(event)
            }}
        >
            {initialCompare ? 'unfavorite' : 'favorite'}
        </button>
    )
}

export default FavoriteButtons

const capitalize = (s) => {
    if (typeof s !== "string") return ""
    return s.charAt(0).toUpperCase() + s.slice(1)
}

const renderInputFields = ({ INPUTS, formData, handleChangeContactData }) => {
    const inputFields = []

    INPUTS.map((input) => {
        return inputFields.push(
            <label key={input}>
                <span
                    className={
                        formData[input].value !== ""
                            ? "label-show"
                            : "label-hide"
                    }
                >
                    Changed
                </span>
                <input
                    placeholder={capitalize(input)}
                    name={input}
                    type="text"
                    value={
                        formData[input].value !== ""
                            ? formData[input].value
                            : formData[input].initialValue
                    }
                    onChange={(event) => {
                        handleChangeContactData(event)
                    }}
                    className={`input`}
                />
            </label>
        )
    })
    return <div>{inputFields}</div>
}
export default renderInputFields

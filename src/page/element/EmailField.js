function CheckOnlyValidEmailLetters(value) {

    const re = /^[A-Za-z0-9@.!#$%&'*+-/=?^_`{|}~]+$/;
    if (value.match(re) === null) {
        return false;
    }

    return true;
}

export default function EmailField(props) {

    const onImputChange = e => {
        const {value} = e.target;
        if (CheckOnlyValidEmailLetters(value)) {
            props.setEmail(value);
        }
    }

    return (

        <label>Email:
            <input
                type="text"
                value={props.valueEmail}
                onChange={onImputChange}
            />
        </label>


    )
}

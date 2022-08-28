function CheckOnlyLettersAndBlank(value) {
    const re = /^[A-Z a-z]+$/;
    return (value === "" || re.test(value))
}


export default function NameField(props) {


    const onInputChangeFirstName = e => {
        const {value} = e.target;
        if (CheckOnlyLettersAndBlank(value)) {
            props.setFirstName(value);
        }
    }
    const onInputChangeLastName = e => {
        const {value} = e.target;
        if (CheckOnlyLettersAndBlank(value)) {
            props.setLastName(value);
        }
    }

    return (
        <div>
            <div>
                <label>Vorname:
                    <input
                        type="text"
                        value={props.valueFirstName}
                        onChange={onInputChangeFirstName}
                    />
                </label>
            </div>
            <div>
                <label>Nachname:
                    <input
                        type="text"
                        value={props.valueLastName}
                        onChange={onInputChangeLastName}
                    />
                </label>
            </div>
        </div>
    )

}

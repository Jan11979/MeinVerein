
export default function GenderField( props ) {

    const onImputChange = e => {
        const { value } = e.target;
            props.setGender(value);
    }

    return(
        <form>
            <label>Gender:
                <input
                    type="text"
                    value={props.valueGender}
                    onChange={onImputChange}
                />
                {props.valueGender === "male"
                    ? <input type="radio" name="gender" id="gender_Male" value="male" onChange={onImputChange} checked />
                    : <input type="radio" name="gender" id="gender_Male" value="male" onChange={onImputChange} /> }
                <label htmlFor="male">Mann</label>
                {props.valueGender === "female"
                    ? <input type="radio" name="gender" id="gender_Female" value="female" onChange={onImputChange} checked />
                    : <input type="radio" name="gender" id="gender_Female" value="female" onChange={onImputChange} />}
                <label htmlFor="female">Frau</label>
                {props.valueGender === "divers"
                    ? <input type="radio" name="gender" id="gender_Diverse" value="divers" onChange={onImputChange} checked />
                    : <input type="radio" name="gender" id="gender_Diverse" value="divers" onChange={onImputChange} />}
                <label htmlFor="divers">divers</label>
            </label>

        </form>
    )
}


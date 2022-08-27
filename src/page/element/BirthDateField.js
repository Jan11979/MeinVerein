
function CheckValidBirthDateFormat( value ) {

    const re = /^\d{2}.\d{2}.\d{4}$/;
    if (value.match(re) === null) {
        return false;
    }
    // Vereinfachte Abfrage mit Festen Datum und 30/31/27 wird Ignoriert und festem max Jahr
    // Hier müsste eine DayPicker Element gebaut werden das eine Ordentliche Datumseingabe ermüglicht
    // Aus Zeitgründen lasse ich die mal weg.
    const day = value.substring(0, 2)
    const month = value.substring(3, 5)
    const year = value.substring(6, 10)
    if ( day <= 0 || day > 31 ) {
        return false;
    }
    if ( month <= 0 || month > 12 ) {
        return false;
    }
    if ( year <= 1800 || year > 2022 ) {
        return false;
    }
    return true;
}

export default function BirthDateField( props ) {


    const onImputChange = e => {
        const { value } = e.target;
        if (CheckValidBirthDateFormat( value )) {
            props.setBirthDate(value);
        }
    }

    return(
        <form>
            <label>Datum:
                <input
                    type="text"
                    value={props.valueBirthDate}
                    onChange={onImputChange}
                />
            </label>

        </form>
    )
}


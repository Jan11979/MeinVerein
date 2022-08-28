function CheckValidBirthDateFormat(value) {

    const re = /^\d{2}.\d{2}.\d{4}$/;
    return value.match(re) !== null;
    // Vereinfachte Abfrage mit Festen Datum und 30/31/27 wird Ignoriert und festem max Jahr
    // Hier müsste eine DayPicker Element gebaut werden das eine Ordentliche Datumseingabe ermüglicht
    // Aus Zeitgründen lasse ich die mal weg.

}

export default function BirthDateField(props) {


    const onImputChange = e => {
        const {value} = e.target;
        if (CheckValidBirthDateFormat(value)) {
            props.setBirthDate(value);
        }
    }

    return (

        <label>Datum:
            <input
                type="text"
                value={props.valueBirthDate}
                onChange={onImputChange}
            />
        </label>


    )
}


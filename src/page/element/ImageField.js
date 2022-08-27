

export default function ImageField( props ) {

    const onClick = e => {
        const { value } = e.target;
        console.log("onClick Miau ", value)
    }

    const importImage = e => {
        let input = document.createElement('input');
        input.type = 'file';
        input.onchange = _this => {
            let files =   Array.from(input.files);

            //props.setImage(files[0].name);
            // Da es keinen Bilder Upload gibt ignoriere ich das Ergebnis
        };
        input.click();
    }
    return(
        <div>
            <img width="200" height="auto" src={props.valueImage} onClick={importImage}/>
        </div>
    )
}



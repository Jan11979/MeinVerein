import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import logo from "../logo.svg";
import NameField from "./element/NameField";
import BirthDateField from "./element/BirthDateField";
import EmailField from "./element/EmailField";
import GenderField from "./element/GenderField";
import ImageField from "./element/ImageField";

export default function EditCreateUser() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [eMail, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [image, setImage] = useState('');


    let navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const notification = searchParams.get('notification')
    const idParam = searchParams.get('id')

    function sayMiau() {
        console.log("Miau ")
    }

    function onClickAbort() {

        navigate({ pathname: "/", search: "" });
    }

    const [userData, setUserData] = useState([]);
    const fetchPost = async () => {
        const response = await fetch(
            'https://dummyjson.com/users/'+ idParam
        );
        const data = await response.json();
        setFirstName( data.firstName );
        setLastName( data.lastName );
        const year = data.birthDate.substring(0, 4)
        const month = data.birthDate.substring(5, 7)
        const day = data.birthDate.substring(8, 10)
        setBirthDate(day + "." + month + "." + year )
        setEmail(data.email)
        setGender(data.gender)
        setImage(data.image)

        setUserData(data);
        console.log( data );
    };
    useEffect(() => {
        if(notification === 'new'){
            const data = {
                "firstName": "",
                "lastName": "",
                "gender": "",
                "email": "",
                "birthDate": "2022-01-01",
                "image": "https://robohash.org/hicveldicta.png?set=set4"
                };
            setFirstName( data.firstName );
            setLastName( data.lastName );
            const year = data.birthDate.substring(0, 4)
            const month = data.birthDate.substring(5, 7)
            const day = data.birthDate.substring(8, 10)
            setBirthDate(day + "." + month + "." + year )
            setEmail(data.email)
            setGender(data.gender)
            setImage(data.image)
        }
        else{
            fetchPost();
        }

    }, []);

    return (
        <div>
            { userData
                ? <div>
                    < NameField setFirstName={setFirstName} setLastName={setLastName} valueFirstName={firstName} valueLastName={lastName} />
                    < BirthDateField setBirthDate={setBirthDate} valueBirthDate={birthDate} />
                    < EmailField setEmail={setEmail} valueEmail={eMail} />
                    < GenderField setGender={setGender} valueGender={gender} />
                    < ImageField setImage={setImage} valueImage={image} />
                </div>
                : <img src={logo} className="App-logo" alt="logo"/>
            }
            <button onClick={() => sayMiau()}>OK</button>
            <button onClick={() => onClickAbort()}>Abbrechen</button>
        </div>
    )
}

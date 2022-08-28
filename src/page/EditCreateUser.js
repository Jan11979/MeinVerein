import { useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import logo from "../logo.svg";
import NameField from "./element/NameField";
import BirthDateField from "./element/BirthDateField";
import EmailField from "./element/EmailField";
import GenderField from "./element/GenderField";
import ImageField from "./element/ImageField";
import * as moment from 'moment';
import "./EditCreateUser.css"

export default function EditCreateUser() {

    let navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const notification = searchParams.get('notification')
    const idParam = searchParams.get('id')

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [eMail, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [image, setImage] = useState('');

    const [infoList, setInfoList] = useState([]);

    const [userData, setUserData] = useState([]);
    const fetchLoadData = async () => {
        const response = await fetch(
            'https://dummyjson.com/users/' + idParam
        );
        const data = await response.json();
        setFirstName(data.firstName);
        setLastName(data.lastName);
        const year = data.birthDate.substring(0, 4)
        const month = data.birthDate.substring(5, 7)
        const day = data.birthDate.substring(8, 10)
        setBirthDate(day + "." + month + "." + year)
        setEmail(data.email)
        setGender(data.gender)
        setImage(data.image)
        setUserData(data);
        console.log(data);
    };

    const prepareANdCheckUserData = () => {
        let tmpErrorList = [];

        if (firstName.length <= 0) {
            tmpErrorList.push("Bitte ein gültigen Vornamen Eintragen")
        }
        if (lastName.length <= 0) {
            tmpErrorList.push("Bitte ein gültigen Nachnamen Eintragen")
        }
        if (moment(birthDate, 'DD.MM.YYYY', true).isValid() === false) {
            tmpErrorList.push("Bitte ein gültiges Datum Eintragen")
        }
        if (false === (gender === "male" || gender === "female" || gender === "divers")) {
            tmpErrorList.push("Bitte ein gültiges Geschlecht Eintragen")
        }
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(eMail).toLowerCase()) === false) {
            tmpErrorList.push("Bitte eine gültige Email Eintragen")
        }


        setInfoList(tmpErrorList);

        userData.firstName = firstName;
        userData.lastName = lastName;
        const year = birthDate.substring(0, 2)
        const month = birthDate.substring(3, 5)
        const day = birthDate.substring(6, 10)
        userData.birthDate = (year + "-" + month + "-" + day)
        userData.email = eMail;
        userData.gender = gender;
        userData.image = image;

        return tmpErrorList.length
    }

    const fetchNewUser = async () => {

        if(prepareANdCheckUserData() === 0){
            const response = await fetch('https://dummyjson.com/users/add', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    birthDate: userData.birthDate,
                    email: userData.email,
                    gender: userData.gender,
                    image: userData.image
                })
            })
            const resData = await response.json();
            console.log(resData);
            setInfoList(["Neuer Benutzer Angelegt"]);
        }
    };

    const fetchUpdateUser = async () => {

        if(prepareANdCheckUserData() === 0){
            const response = await fetch('https://dummyjson.com/users/' + userData.id, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    birthDate: userData.birthDate,
                    email: userData.email,
                    gender: userData.gender,
                    image: userData.image
                })
            })
            const resData = await response.json();
            console.log(resData);
            setInfoList(["Benutzer Editirt"]);
        }
    };

    useEffect(() => {
        if (notification === 'new') {
            const data = {
                "firstName": "",
                "lastName": "",
                "gender": "",
                "email": "",
                "birthDate": "2022-01-01",
                "image": "https://robohash.org/hicveldicta.png?set=set4"
            };
            setFirstName(data.firstName);
            setLastName(data.lastName);
            const year = data.birthDate.substring(0, 4)
            const month = data.birthDate.substring(5, 7)
            const day = data.birthDate.substring(8, 10)
            setBirthDate(day + "." + month + "." + year)
            setEmail(data.email)
            setGender(data.gender)
            setImage(data.image)
        } else {
            fetchLoadData();
        }

    }, []);


    function onClickOK() {
        if (notification === 'new') {
            console.log("Create New User");
            fetchNewUser();
        } else if (notification === 'edit') {
            console.log("Update User")
            fetchUpdateUser();
        }
    }


    function onClickAbort() {
        navigate({pathname: "/", search: ""});
    }

    return (
        <div className="Body">
            {userData
                ? <div >
                    < NameField  setFirstName={setFirstName} setLastName={setLastName} valueFirstName={firstName}
                                valueLastName={lastName}/>
                    <p>< BirthDateField setBirthDate={setBirthDate} valueBirthDate={birthDate}/></p>
                    <p>< EmailField setEmail={setEmail} valueEmail={eMail}/></p>
                    < GenderField setGender={setGender} valueGender={gender}/>
                    < ImageField setImage={setImage} valueImage={image}/>
                </div>
                : <img src={logo} className="App-logo" alt="logo"/>
            }
            <button onClick={() => onClickOK()}>OK</button>
            <button onClick={() => onClickAbort()}>Abbrechen</button>
            {infoList.length > 0
                ? <div><p>Info:</p>
                    {infoList.map((elem, i) => {
                        return (
                            <p key={i}>{elem}</p>
                        );
                    })}</div>
                : <p></p>
            }
        </div>
    )
}

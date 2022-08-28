import {useEffect, useState} from "react";
import logo from "../logo.svg";
import {useNavigate} from "react-router-dom";
import './ListView.css';

function ListItem(props) {
    let navigate = useNavigate();

    let elementStringName = "";
    elementStringName = props.data.lastName + ", " + props.data.firstName;
    let elementStringMail = props.data.email;


    function onClickEdit(id) {
        console.log("Edit", id)
        let navString = "notification=edit&id=" + id;
        navigate({pathname: "edit", search: navString,});
    }

    const fetchDelete = async (id) => {
        const response = await fetch(
            'https://dummyjson.com/users/' + id, {
                method: 'DELETE',
            });
        const data = await response.json();
        console.log("User ID(", id, ") is Deleted = ", data.isDeleted);

    };

    function onClickDeleteUser(id) {
        console.log("Delete User ID ", id)
        fetchDelete(id);

        // Hier sollte noch ein Feedback für den Admin eingebaut werden,
        // das die Daten gelöscht wurden oder es einen Fehler gab.
        // Es gibt jetzt nur eine console ausgabe.

    }


    return (
        <div className="Line">
            <div>{elementStringName}</div>
            <div>{elementStringMail}</div>
            <div>
                <button onClick={() => onClickEdit(props.data.id)}>✍️</button>
                <button onClick={() => onClickDeleteUser(props.data.id)}>🗑</button>
            </div>
        </div>
    )
}


export default function ListView() {

    let navigate = useNavigate();

    function onClickNewUser() {
        let navString = "notification=new&id=" + 0;
        navigate({pathname: "edit", search: navString,});
    }

    const [posts, setPosts] = useState([]);
    const fetchPost = async () => {
        const response = await fetch(
            'https://dummyjson.com/users'
        );
        const data = await response.json();
        setPosts(data);
    };
    useEffect(() => {
        fetchPost();
    }, []);


    return (
        <div>
            <button onClick={onClickNewUser}>Neuer Eintrag</button>
            <div className="Body">

                {posts.users
                    ? <div>
                        <p></p>
                        {posts.users.map((elem, i) => {
                            return (
                                < ListItem data={elem} key={i}/>
                            );
                        })}
                    </div>
                    : <img src={logo} className="App-logo" alt="logo"/>
                }
            </div>
        </div>
    )
}

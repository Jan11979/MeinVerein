import {useEffect, useState} from "react";
import logo from "../logo.svg";
import {useNavigate} from "react-router-dom";

function ListItem( props ) {
    let navigate = useNavigate();

    let elementString = "";
    elementString += props.data.lastName;
    elementString += ", "
    elementString += props.data.firstName;
    elementString += ", "
    elementString += props.data.email;

    function sayEdit(id) {
        console.log("sayEdit", id)
        let navString="notification="+"edit"+"&id="+id;
        navigate({ pathname: "edit", search: navString, });
    }
    function sayDelete(id) {
        console.log("sayDelete", id)
    }


    return(
        <div>
            {elementString}
            <button onClick={() => sayEdit(props.data.id)}>✍️</button>
            <button onClick={() => sayDelete(props.data.id)}>🗑</button>
        </div>
    )
}


export default function ListView() {

    let navigate = useNavigate();

    function onClickNewUser() {
        let navString="notification="+"new"+"&id="+0;
            navigate({ pathname: "edit", search: navString, });
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


    fetch('https://dummyjson.com/users')
        .then(res => res.json())
        .then(console.log);

    return (
        <div>
            <button onClick={onClickNewUser}>New User</button>
            { posts.users
                ? <div>
                    <p> </p>
                    {posts.users.map((elem, i) => {
                        return (
                            < ListItem data={elem} key={i}/>
                        );
                    })}
                </div>
                : <img src={logo} className="App-logo" alt="logo"/>
            }
        </div>
    )
}

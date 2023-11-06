import { useState } from "react"
import UserPopup from "../popups/UserPopup";

export default function UserPage() {

    // const [users, setUsers] = useState([]);
    // var elems = [];

    // if (users.length <= 0)
    // {
    //     fetch(`${process.env.REACT_APP_URL}/Users`).then((res) => 
    //     {
    //         if (res.status === 200)
    //         {
    //             res.json().then((val) => 
    //             {
    //                 console.log(val);
    //                 setUsers(val);
    //             });
    //         }
    //         else
    //         {
    //             console.log("Error from server: " + res.status);
    //         }
    //     })
    // }
    // else
    // {
    //     users.forEach((id) => {
    //         elems.push(<UserPopup ID={id._id}/>);
    //     })
    // }

    return (
       <p>Hello World</p>
    );
}
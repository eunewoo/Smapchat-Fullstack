import {useState} from 'react';

export default function UserPopup(props){

    const [userData, setUserData] = useState({});

    if (props.ID == null)
    {
        console.log("User popup with no ID passed!");
    }

    if (userData._id == null)
    {
        fetch(`${process.env.REACT_APP_URL}/User/${props.ID}`).then((res) => 
        {
            if (res.status === 200)
            {
                res.json().then((val) => 
                {
                    console.log(val);
                    setUserData(val);
                });
            }
            else
            {
                console.log("Error from server: " + res.status);
            }
        })
    }

    return (
        <>
            <image></image>
            <p>{userData.username ?? "..."}</p>
            <p>{userData.email ?? "..."}</p>
        </>
    )
}

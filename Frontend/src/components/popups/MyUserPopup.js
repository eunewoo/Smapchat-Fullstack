import { Button, Card, Container, Image } from 'react-bootstrap';
import {useContext, useState} from 'react';
import "./UserPopup.css";
import "./CommonPopup.css";
import { BsXLg } from 'react-icons/bs';
import { popContext } from '../../App';

export default function UserPopup(props){

    const setPop = useContext(popContext);

    return (
        <Card className='popup'>
            <Card.Body style={{backgroundColor: "#141488", color: "white", height: "40px", padding: "5px"}}>
                <Card.Title>Personal Information</Card.Title>
                <BsXLg className="close" onClick={() => setPop(null)}></BsXLg>
            </Card.Body>

            <Container>
                <div className='box'>{props.user.username}</div>
                <div className='box'>{props.user.email}</div>
                <div className='box'>*****</div>
                <Image className="avatar" src={props.user.avatar} roundedCircle />
                <Button>Delete {/* TODO: Implement onclick to handle this with web requests */}</Button>
                <Button>Logout</Button>
            </Container>
        </Card>
    )
}

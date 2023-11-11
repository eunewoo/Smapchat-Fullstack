import { Card, Container } from "react-bootstrap";
import { Button } from 'react-bootstrap';
import { BsXLg } from "react-icons/bs";
import "./CommonToolbox.css";
import "./ArrowMapToolbox.css";

import { test } from "./TransactionHandler";

export default function ArrowMapToolbox(props) {

    console.log(props.arrowMap);

    test();

    const cards = []
    for (const arrowPointLocation in props.arrowMap.Location) {
        console.log(arrowPointLocation);
        cards.push(
            <ArrowMapLocation arrowPointLocation={props.arrowMap.Location[arrowPointLocation]}/>
        );
    }

    return (
        <Card className="toolbox">
            <Card.Body style={{backgroundColor: "#141488", color: "white"}}>
                <Card.Text>Arrow Map Editor</Card.Text>
            </Card.Body>
            <Container className="scroller">
                {cards}
            </Container>
        </Card>
    );
}

function ArrowMapLocation(props) {

    console.log(props.arrowPointLocation);

    return (
        <Card style={{width: "96%"}}>
            <Card.Body style={{backgroundColor: "#141488", color: "white", height: "40px", padding: "5px"}}>
                <input 
                    className="invisibleInput" 
                    placeholder="Name" 
                    defaultValue={props.arrowPointLocation.Name}/>
                <BsXLg className="invisibleButton"/>
            </Card.Body>
            <Container style={{padding: "20px"}}>

                <input 
                    className="input" 
                    placeholder="Order" 
                    defaultValue={props.arrowPointLocation.Order}/>
                <input 
                    className="input" 
                    placeholder="Date" 
                    defaultValue={props.arrowPointLocation.Date}/>

            </Container>
        </Card>
    )
}
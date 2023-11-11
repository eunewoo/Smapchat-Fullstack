import { Card, Container } from "react-bootstrap";
import { Button } from 'react-bootstrap';
import { BsXLg, BsArrowCounterclockwise, BsArrowClockwise } from "react-icons/bs";
import "./CommonToolbox.css";
import "./ArrowMapToolbox.css";

import { test } from "./TransactionHandler";

export default function ArrowMapToolbox(props) {

    const cards = []
    for (const arrowPointLocation in props.arrowMap.Location) {
        cards.push(
            <ArrowMapLocation 
                handler={props.handler} 
                index={arrowPointLocation} 
                arrowPointLocation={props.arrowMap.Location[arrowPointLocation]}/>
        );
    }

    return (
        <Card className="toolbox">
            <Card.Body style={{backgroundColor: "#141488", color: "white"}}>
                <Card.Text>Arrow Map Editor</Card.Text>
            </Card.Body>
            <Container className="scroller">
                <Container>
                    <Button onClick={() => props.handler.undo()}><BsArrowCounterclockwise/></Button>
                    <Button onClick={() => props.handler.redo()}><BsArrowClockwise/></Button>
                </Container>
                {cards}
            </Container>
        </Card>
    );
}

function ArrowMapLocation(props) {

    return (
        <Card style={{width: "96%"}}>
            <Card.Body style={{backgroundColor: "#141488", color: "white", height: "40px", padding: "5px"}}>
                <input 
                    className="invisibleInput" 
                    placeholder="Name" 
                    value={props.arrowPointLocation.Name}
                    onChange={(val) => props.handler.updateTrans(`Location[${props.index}].Name`, val.target.value)}/>
                <BsXLg 
                    className="invisibleButton"
                    onClick={(val) => props.handler.deleteTrans('Location', props.arrowPointLocation)}/>
            </Card.Body>
            <Container style={{padding: "20px"}}>

                <input 
                    className="input" 
                    placeholder="Order" 
                    value={props.arrowPointLocation.Order}
                    onChange={(val) => props.handler.updateTrans(`Location[${props.index}].Order`, val.target.value)}/>
                <input 
                    className="input" 
                    placeholder="Date" 
                    value={props.arrowPointLocation.Date}
                    onChange={(val) => props.handler.updateTrans(`Location[${props.index}].Date`, val.target.value)}/>

            </Container>
        </Card>
    )
}
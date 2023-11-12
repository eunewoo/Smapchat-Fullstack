import { Card, Container } from "react-bootstrap";
import { Button } from 'react-bootstrap';
import { BsXLg, BsArrowCounterclockwise, BsArrowClockwise } from "react-icons/bs";
import "./CommonToolbox.css";
import ColorWidget from "./ColorWidget";

/// The toolbox for editing an picture map. Expects the map data and a TransactionHandler
/// for that data as the pictureMap and handler props respectively.
export default function PictureMapToolbox(props) {

    const cards = []
    for (const picturePointLocation in props.pictureMap.Location) {
        cards.push(
            <PictureMapLocation 
                handler={props.handler} 
                index={picturePointLocation} 
                picturePointLocation={props.pictureMap.Location[picturePointLocation]}/>
        );
    }

    return (
        <Card className="toolbox">
            <Card.Body style={{backgroundColor: "#141488", color: "white"}}>
                <Card.Text>Picture Map Editor</Card.Text>
            </Card.Body>

            <Container>
                <Button 
                    className="undoredo" 
                    disabled={props.handler.undoList.length <= 0} 
                    onClick={() => props.handler.undo()}>
                    <BsArrowCounterclockwise/> Undo
                </Button>
                <Button 
                    className="undoredo" 
                    disabled={props.handler.redoList.length <= 0} 
                    onClick={() => props.handler.redo()}>
                    <BsArrowClockwise/> Redo
                </Button>
            </Container>

            <Container className="scroller">
                {cards}
                <Button
                    className="inner"
                    onClick={() => props.handler.createTrans('Location', {
                        "Name" : "",
                        "Longitude" : 0,
                        "Lattitude" : 0,
                        "Order" : 0,
                        "Date" : "1-1-1970"
                    })}>
                    Add new
                </Button>
            </Container>
        </Card>
    );
}

/// Sub-component for the PictureMapToolbox, expects a location and picture map data handler
/// as the picturePointLocation and handler props respectively. Also expects the index of the
/// picturePointLocation in the Location of the map data as the index prop.
function PictureMapLocation(props) {

    return (
        <Card className="inner">
            <Card.Body style={{backgroundColor: "#141488", color: "white", height: "40px", padding: "5px"}}>
                <input 
                    className="invisibleInput" 
                    placeholder="Name" 
                    value={props.picturePointLocation.Name}
                    onChange={(val) => props.handler.updateTrans(`Location[${props.index}].Name`, val.target.value)}/>
                <BsXLg 
                    className="invisibleButton"
                    onClick={(val) => props.handler.deleteTrans('Location', props.picturePointLocation)}/>
            </Card.Body>
            <Container style={{padding: "20px"}}>
                <input 
                    className="input" 
                    placeholder="Size" 
                    value={props.picturePointLocation.Size}
                    onChange={(val) => props.handler.updateTrans(`Location[${props.index}].Size`, val.target.value)}/>
            </Container>
        </Card>
    )
}
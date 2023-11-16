import { Card, Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import {
  BsXLg,
  BsArrowCounterclockwise,
  BsArrowClockwise,
} from "react-icons/bs";
import "./CommonToolbox.css";
import ColorWidget from "./ColorWidget";
import DebouncedInput from "./DebouncedInput";

/// The toolbox for editing an bubble map. Expects the map data and a TransactionHandler
/// for that data as the bubbleMap and handler props respectively.
export default function BubbleMapToolbox(props) {
  const cards = [];
  for (const bubblePointLocation in props.bubbleMap.Location) {
    cards.push(
      <BubbleMapLocation
        handler={props.handler}
        index={bubblePointLocation}
        bubblePointLocation={props.bubbleMap.Location[bubblePointLocation]}
      />,
    );
  }

  return (
    <Card className="toolbox">
      <Card.Body style={{ backgroundColor: "#0C0D34", color: "white" }}>
        <Card.Text>Bubble Map Editor</Card.Text>
      </Card.Body>

      <Container>
        <Button
          className="undoredo"
          disabled={props.handler.undoList.length <= 0}
          onClick={() => props.handler.undo()}
        >
          <BsArrowCounterclockwise /> Undo
        </Button>
        <Button
          className="undoredo"
          disabled={props.handler.redoList.length <= 0}
          onClick={() => props.handler.redo()}
        >
          <BsArrowClockwise /> Redo
        </Button>
      </Container>

      <Container className="scroller">
        {cards}
        <Button
          className="inner"
          onClick={() =>
            props.handler.createTrans("Location", {
              Name: "",
              Longitude: 0,
              Lattitude: 0,
              Order: 0,
              Date: "1-1-1970",
            })
          }
        >
          Add new
        </Button>
      </Container>
    </Card>
  );
}

/// Sub-component for the BubbleMapToolbox, expects a location and bubble map data handler
/// as the bubblePointLocation and handler props respectively. Also expects the index of the
/// bubblePointLocation in the Location of the map data as the index prop.
function BubbleMapLocation(props) {
  return (
    <Card className="inner">
      <Card.Body
        style={{
          backgroundColor: "#0C0D34",
          color: "white",
          height: "40px",
          padding: "5px",
        }}
      >
        <DebouncedInput
          className="invisibleInput"
          placeholder="Name"
          value={props.bubblePointLocation.Name}
          onChange={(val) =>
            props.handler.updateTrans(
              `Location[${props.index}].Name`,
              val,
            )
          }
        />
        <BsXLg
          className="invisibleButton"
          onClick={(val) =>
            props.handler.deleteTrans("Location", props.bubblePointLocation)
          }
        />
      </Card.Body>
      <Container style={{ padding: "20px" }}>
        <DebouncedInput
          className="input"
          placeholder="Size"
          value={props.bubblePointLocation.Size}
          onChange={(val) =>
            props.handler.updateTrans(
              `Location[${props.index}].Size`,
              val,
            )
          }
        />

        <ColorWidget
          color={props.bubblePointLocation.Color}
          onChange={(val) =>
            props.handler.updateTrans(`Location[${props.index}].Color`, val)
          }
        />
      </Container>
    </Card>
  );
}

import { Card, Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import DebouncedInput from "./DebouncedInput";
import ColorWidget from "./ColorWidget"; // Reintegrated ColorWidget
import {
  BsXLg,
  BsArrowCounterclockwise,
  BsArrowClockwise,
} from "react-icons/bs";
import "./CommonToolbox.css";

/// The toolbox for editing a category map. Expects the map data and a TransactionHandler
/// for that data as the categoryMap and handler props respectively.
export default function CategoryMapToolbox(props) {
  const cards = [];
  for (const location in props.categoryMap.Location) {
    cards.push(
      <CategoryMapLocation
        handler={props.handler}
        readyPlace={props.readyPlace}
        index={location}
        categoryLocation={props.categoryMap.Location[location]}
      />
    );
  }

  return (
    <Card className="toolbox">
      <Card.Body style={{ backgroundColor: "#0C0D34", color: "white" }}>
        <Card.Text>Category Map Editor</Card.Text>
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
            props.readyPlace(() => (latlng) => {
              props.handler.createTrans("Location", {
                Name: "",
                Lattitude: latlng.lat,
                Longitude: latlng.lng,
                Color: "#FFFFFF",
                Subname: "",
              });
            })
          }
        >
          Add new
        </Button>
      </Container>
    </Card>
  );
}

/// Sub-component for the CategoryMapToolbox, expects a location and category map data handler
/// as the categoryLocation and handler props respectively. Also expects the index of the
/// categoryLocation in the Location of the map data as the index prop.
function CategoryMapLocation(props) {
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
          value={props.categoryLocation.Name}
          onChange={(val) =>
            props.handler.updateTrans(`Location[${props.index}].Name`, val)
          }
        />
        <DebouncedInput
          className="input"
          placeholder="Subname"
          value={props.categoryLocation.Subname}
          onChange={(val) =>
            props.handler.updateTrans(`Location[${props.index}].Subname`, val)
          }
        />
        <BsXLg
          className="invisibleButton"
          onClick={() =>
            props.handler.deleteTrans("Location", props.categoryLocation)
          }
        />
      </Card.Body>
      <Container style={{ padding: "20px" }}>
        <ColorWidget
          color={props.categoryLocation.Color}
          onChange={(val) =>
            props.handler.updateTrans(`Location[${props.index}].Color`, val)
          }
        />
        <Button
          onClick={() =>
            props.readyPlace(() => (latlng) => {
              props.handler.compoundTrans([
                {
                  path: `Location[${props.index}].Lattitude`,
                  newValue: latlng.lat,
                },
                {
                  path: `Location[${props.index}].Longitude`,
                  newValue: latlng.lng,
                },
              ]);
            })
          }
        >
          Move
        </Button>
      </Container>
    </Card>
  );
}

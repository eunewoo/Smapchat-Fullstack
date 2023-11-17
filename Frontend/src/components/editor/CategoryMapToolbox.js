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

/// The toolbox for editing an category map. Expects the map data and a TransactionHandler
/// for that data as the categoryMap and handler props respectively.
export default function CategoryMapToolbox(props) {
  const cards = [];
  for (const categoryPointLocation in props.categoryMap.Category) {
    cards.push(
      <CategoryMapLocation
        handler={props.handler}
        index={categoryPointLocation}
        categoryPointLocation={
          props.categoryMap.Category[categoryPointLocation]
        }
      />,
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
            props.handler.createTrans("Category", {
              Name: "",
              Polygons: [],
              Color: "#FF0000",
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
/// as the categoryPointLocation and handler props respectively. Also expects the index of the
/// categoryPointLocation in the Location of the map data as the index prop.
function CategoryMapLocation(props) {
  const cards = [];
  for (const region in props.categoryPointLocation.Polygons) {
    cards.push(
      <CategoryMapRegion
        handler={props.handler}
        readyPlace={props.readyPlace}
        parentIndex={props.index}
        index={region}
        region={props.categoryPointLocation.Polygons[region]}
      />,
    );
  }

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
          value={props.categoryPointLocation.Name}
          onChange={(val) =>
            props.handler.updateTrans(
              `Category[${props.index}].Name`,
              val,
            )
          }
        />
        <BsXLg
          className="invisibleButton"
          onClick={(val) =>
            props.handler.deleteTrans("Category", props.categoryPointLocation)
          }
        />
      </Card.Body>
      <Container style={{ padding: "20px" }}>
        <Container>
          {cards}
          <Button
            className="inner"
            onClick={() => props.readyPlace(() => (latlng) => {

              // TODO: Calculate appropriate coordinates here based on latlng
              const Coordinates = [];

              props.handler.createTrans(`Category[${props.index}].Polygons`, {
                Coordinates: Coordinates,
              });
            })
            }
          >
            Add new
          </Button>
        </Container>

        <ColorWidget
          color={props.categoryPointLocation.Color}
          onChange={(val) =>
            props.handler.updateTrans(`Category[${props.index}].Color`, val)
          }
        />
      </Container>
    </Card>
  );
}

function CategoryMapRegion(props) {
  return (
    <Card className="inner">
      <Card.Body
        style={{
          border: "1px solid black",
          borderRadius: "5px",
          color: "black",
          height: "40px",
          padding: "5px",
        }}
      >
        Region {props.index}
        <BsXLg
          className="invisibleButton"
          style={{ position: "absolute", right: "5px", top: "12px" }}
          onClick={(val) =>
            props.handler.deleteTrans(
              `Category[${props.parentIndex}].Polygons`,
              props.region,
            )
          }
        />
      </Card.Body>
    </Card>
  );
}

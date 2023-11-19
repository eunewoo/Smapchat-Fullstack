import { Card, Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import DebouncedInput from "./DebouncedInput";
import ColorWidget from "./ColorWidget";
import {
  BsXLg,
  BsArrowCounterclockwise,
  BsArrowClockwise,
} from "react-icons/bs";
import "./CommonToolbox.css";

export default function CategoryMapToolbox(props) {
  const groupedLocations = groupLocationsByName(props.categoryMap.Location);

  return (
    <Card id="toolbox" className="toolbox">
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
        {groupedLocations.map((group, index) => (
          <CategoryMapLocation
            key={index}
            handler={props.handler}
            readyPlace={props.readyPlace}
            categoryGroup={group}
          />
        ))}
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

function CategoryMapLocation({ handler, readyPlace, categoryGroup }) {
  // Assuming all locations in a group have the same Name and Color
  const { Name, Color } = categoryGroup[0];

  return (
    <Card className="inner">
      <Card.Body
        style={{ backgroundColor: "#0C0D34", color: "white", padding: "5px" }}
      >
        <DebouncedInput
          className="invisibleInput"
          placeholder="Name"
          value={Name}
          onChange={(val) =>
            categoryGroup.forEach((loc, idx) =>
              handler.updateTrans(`Location[${idx}].Name`, val)
            )
          }
        />
        <ColorWidget
          color={Color}
          onChange={(val) =>
            categoryGroup.forEach((loc, idx) =>
              handler.updateTrans(`Location[${idx}].Color`, val)
            )
          }
        />
      </Card.Body>
      {categoryGroup.map((location, index) => (
        <Container key={index} style={{ padding: "5px" }}>
          <DebouncedInput
            className="input"
            placeholder="Subname"
            value={location.Subname}
            onChange={(val) =>
              handler.updateTrans(`Location[${index}].Subname`, val)
            }
          />
          <BsXLg
            className="invisibleButton"
            onClick={() => handler.deleteTrans("Location", location)}
          />
        </Container>
      ))}
      <Container style={{ padding: "20px" }}>
        <Button
          onClick={() =>
            readyPlace(() => (latlng) => {
              const newLocation = {
                Name: Name,
                Lattitude: latlng.lat,
                Longitude: latlng.lng,
                Color: Color,
                Subname: "",
              };
              handler.createTrans("Location", newLocation);
            })
          }
        >
          Add new
        </Button>
      </Container>
    </Card>
  );
}

function groupLocationsByName(locations) {
  const grouped = {};
  locations.forEach((location) => {
    if (!grouped[location.Name]) {
      grouped[location.Name] = [];
    }
    grouped[location.Name].push(location);
  });
  return Object.values(grouped);
}

import "./RatingDisplay.css";
import { BsFillStarFill } from "react-icons/bs";

// Displays a rating out of 5 stars. the value prop should
// be an integer from 0 to 5.
export default function RatingDisplay(props) {
  // Silly way to do this but we only promised hanlding integers
  // and this is very simple so... here we are

  // TODO: Add assets for filled and empty stars
  return (
    <div className={props.from === "map-card" ? "Container" : ""}>
      <BsFillStarFill
        className="Star"
        style={{ color: props.value > 0 ? "blue" : "gray" }}
      />
      <BsFillStarFill
        className="Star"
        style={{ color: props.value > 1 ? "blue" : "gray" }}
      />
      <BsFillStarFill
        className="Star"
        style={{ color: props.value > 2 ? "blue" : "gray" }}
      />
      <BsFillStarFill
        className="Star"
        style={{ color: props.value > 3 ? "blue" : "gray" }}
      />
      <BsFillStarFill
        className="Star"
        style={{ color: props.value > 4 ? "blue" : "gray" }}
      />
    </div>
  );
}

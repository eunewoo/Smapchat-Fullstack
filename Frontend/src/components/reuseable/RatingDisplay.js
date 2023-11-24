import "./RatingDisplay.css";
import { BsFillStarFill } from "react-icons/bs";
import { createRating } from "../pages/RatingPages/RatingEdit";

export default function RatingDisplay(props) {
  let click = async (val) => {
    if (props.onClick) {
      props.onClick(val);
    }
    // Call createRating from RatingEdit.js with the required parameters
    await createRating(props.userId, props.mapId, val);
  };

  return (
    <div className={props.from === "map-card" ? "Container" : ""}>
      {[1, 2, 3, 4, 5].map((starValue) => (
        <BsFillStarFill
          key={starValue}
          className="Star"
          style={{ color: props.value >= starValue ? "blue" : "gray" }}
          onClick={() => click(starValue)}
        />
      ))}
    </div>
  );
}

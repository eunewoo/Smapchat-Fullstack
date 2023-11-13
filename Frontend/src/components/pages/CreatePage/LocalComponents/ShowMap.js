import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Map from "../../../../assets/images/worldMap.png";
import "../styles.css";

const ShowMap = () => {
  //   TODO: remove image and render Empty Map
  return (
    <div className="position-relative text-center">
      <img src={Map} alt="Map" className="img-fluid w-100 rounded" />{" "}
      <button
        className="btn btn-edit-map position-absolute"
        style={{ top: "16px", right: "16px" }}
      >
        UPLOAD
      </button>
    </div>
  );
};

export default ShowMap;

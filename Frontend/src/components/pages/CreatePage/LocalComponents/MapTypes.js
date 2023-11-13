import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css";

const MapTypes = () => {
  const [selectedMapType, setSelectedMapType] = useState(null);

  const mapTypes = [
    "Arrow Map",
    "Bubble Map",
    "Scale Map",
    "Picture Map",
    "Category Map",
  ];

  const handleSelection = (mapType) => {
    setSelectedMapType(mapType);
  };

  return (
    <div className="d-flex flex-column align-items-start">
      <div
        className="w-100 px-3 text-white rounded"
        style={{
          backgroundColor: "#0C0D34",
          paddingTop: "0.75rem",
          paddingBottom: "0.75rem",
        }}
      >
        <h4>Map Types</h4>
      </div>

      <div className="m-auto py-3">Select one of the below Map types*</div>
      {mapTypes.map((type, index) => (
        <button
          key={index}
          className={`btn mx-3 mb-2 text-start ${
            selectedMapType === type ? "button-selected" : "button-default"
          }`}
          onClick={() => handleSelection(type)}
        >
          {type}
        </button>
      ))}
    </div>
  );
};

export default MapTypes;

import React from "react";
import "./CreatePage.css";
import MapTypes from "./LocalComponents/MapTypes";
import ShowMap from "./LocalComponents/ShowMap";

const CreatePage = () => {
  return (
    <div className="container-fluid mt-4">
      {/* remove height and color from the css when you add components */}
      <div className="row justify-content-center">
        <div className="leftC p-0 rounded">
          <MapTypes />
        </div>
        <div className="middleC p-0 rounded ms-2">
          <ShowMap />
        </div>
        <div className="rightC d-flex align-items-center">
          <div className="col align-items-center justify-content-center text-center">
            <div className="">
              In order to create a map, you should “UPLOAD” a region that you
              want to work with and select one of the Map Types. If you want to
              start editing click on ‘Start Editing’
            </div>
            <br></br>
            <button className="custom-button">Start Editing</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;

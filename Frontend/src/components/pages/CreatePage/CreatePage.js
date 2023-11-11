import React from "react";
import "./CreatePage.css";

const CreatePage = () => {
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="leftC">Types of maps</div>
        <div className="middleC">Display Map</div>
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

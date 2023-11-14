import React, { useState } from "react";
import UserInfo from "./LocalComponents/UserInfo";
import MapRenderer from "../../reuseable/MapRenderer";
import "./ViewMapPageStyles.css";
import Comments from "./LocalComponents/Comments";

const ViewMapPage = () => {
  const [mapType, setMapType] = useState("ArrowMap");

  return (
    <div className="Container-fluid mx-5 my-3 px-5">
      <div className="col text-center">
        <div className="text-white">
          <UserInfo />
        </div>

        <div
          className="m-auto my-4 position-relative text-center"
          style={{ width: "90%", height: "80vh" }}
        >
          <MapRenderer width="100%" height="100%" mapType={mapType} />
          <button
            className="btn btn-edit-map position-absolute"
            style={{ top: "16px", right: "16px" }}
          >
            Edit
          </button>
        </div>

        <Comments />
      </div>
    </div>
  );
};

export default ViewMapPage;

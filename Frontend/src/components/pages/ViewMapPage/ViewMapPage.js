import React from "react";
import UserInfo from "./LocalComponents/UserInfo";

const ViewMapPage = () => {
  return (
    <div className="Container-fluid mx-5 my-3 px-5">
      <div className="col text-center">
        <div className="text-white">
          <UserInfo />
        </div>
        <div className="text-white">Map</div>
        <div className="text-white">comments</div>
      </div>
    </div>
  );
};

export default ViewMapPage;

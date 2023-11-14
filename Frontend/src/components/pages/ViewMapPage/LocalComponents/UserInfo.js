import React from "react";
import userAvatar from "../../../../assets/images/userAvatar.png";
import RatingDisplay from "../../../reuseable/RatingDisplay";
const UserInfo = () => {
  return (
    <div className="row m-0">
      <div className="col-9">
        <div className="row m-0">
          <div className="col-auto">
            <img src={userAvatar} className="rounded" width="70" height="80" />
          </div>
          <div className="col d-flex align-items-center">
            <div className="row text-start">
              <div className="h6">Cool Map By Eunewoo</div>
              <div
                style={{
                  fontSize: "14px",
                }}
              >
                This is a cool map that I came up with! I hope you guys enjoy
                it! This is a cool map that I came up with! I hope you guys
                enjoy it! This is a cool map that I came up with! I hope you
                guys enjoy it!
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-3 d-flex align-items-end">
        <div className="row text-end px-3">
          <RatingDisplay value={3} from="view-map-page" />
        </div>
      </div>
    </div>
  );
};

export default UserInfo;

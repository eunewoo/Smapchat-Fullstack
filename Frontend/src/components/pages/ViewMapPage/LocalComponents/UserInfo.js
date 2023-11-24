import React, { useEffect, useState } from "react";
import RatingDisplay from "../../../reuseable/RatingDisplay";
import { userProfile } from "../../../../util/userUtil";
const UserInfo = (props) => {

  const [user, setUser] = useState({});

  useEffect(() => {

    userProfile(props.userEmail).then((val) => setUser(val));
  }, [props.userEmail]);

  return (
    <div className="row m-0">
      <div className="col-9">
        <div className="row m-0">
          <div className="col-auto">
            <img
              src={user.avatar}
              className="rounded"
              width="70"
              height="80"
              alt="Avatar"
            />
          </div>
          <div className="col d-flex align-items-center">
            <div className="row text-start">
              <div className="h6">{props.map.title} By {user?.username ?? "Loading..."}</div>
              <div
                style={{
                  fontSize: "14px",
                }}
              >
                {props.map.description}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-3 d-flex align-items-end">
        <div className="row text-end px-3">
          <RatingDisplay value={props.map.avgRate} from="view-map-page" />
        </div>
      </div>
    </div>
  );
};

export default UserInfo;

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UserList.css";
import Customer from "../../../reuseable/Customer";

const UserList = () => {
  const dataList = [1, 2, 3, 4, 5, 6, 34543, 2, 2, 2, 21, 1];

  return (
    <div className="container-fluid px-5">
      <div className="row">
        {dataList.map((item, index) => (
          <div className="col-md-6 d-flex justify-content-center" key={index}>
            <Customer />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;

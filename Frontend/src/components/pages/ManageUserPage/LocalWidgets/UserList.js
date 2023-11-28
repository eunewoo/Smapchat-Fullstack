import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UserList.css";
import Customer from "../../../reuseable/Customer";
import { getUsers } from "../../../../util/userUtil";

const UserList = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getUsers();

      if (result.success) {
        setUserList(result.data);
      } else {
        console.error("Error fetching users:", result.error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="container-fluid px-5">
      <div className="row">
        {userList.map((user, index) => (
          <div className="col-md-6 d-flex justify-content-center" key={index}>
            <Customer userData={user} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;

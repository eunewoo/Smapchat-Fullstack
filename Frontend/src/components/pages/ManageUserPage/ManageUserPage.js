import React from "react";
import { BsSearch } from "react-icons/bs";
import UserList from "./LocalWidgets/UserList";

const ManageUserPage = () => {
  return (
    <div className="container-fluid">
      <div>
        <UserList />
      </div>
    </div>
  );
};

export default ManageUserPage;


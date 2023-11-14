import React from "react";
import { BsSearch } from "react-icons/bs";
import UserList from "./LocalWidgets/UserList";

const ManageUserPage = () => {
  return (
    <div className="container-fluid">
      <div className="col">
        <div className="row mx-0 my-0 px-5 py-3">
          <div className="col text-white">Your Maps</div>
          <div className="col-auto">
            <div className="filter d-flex align-items-center">
              <div className="d-flex align-items-center">
                <button
                  className="btn rounded-circle me-2"
                  style={{
                    width: "28px",
                    height: "28px",
                    display: "flex",
                    backgroundColor: "#4ACEFF",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "7px",
                  }}
                >
                  <BsSearch color="white" />
                </button>
                <input
                  type="text"
                  className="form-control ml-2"
                  placeholder="Search for maps"
                  style={{
                    width: "220px",
                    borderRadius: "16px",
                    height: "28px",
                    padding: "0 12px",
                    display: "flex",
                    alignItems: "center",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <UserList />
      </div>
    </div>
  );
};

export default ManageUserPage;

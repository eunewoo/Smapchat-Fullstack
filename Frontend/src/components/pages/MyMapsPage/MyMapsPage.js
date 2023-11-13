import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";

const MyMapsPage = () => {
  const [isToggledDate, setIsToggledDate] = useState(false);

  const [isToggledRating, setIsToggledRating] = useState(false);

  const handleToggleDate = () => setIsToggledDate(!isToggledDate);

  const handleToggleRating = () => setIsToggledRating(!isToggledRating);

  return (
    <div className="container-fluid">
      <div className="row mx-5 my-3">
        <div className="col text-white">Your Maps</div>
        <div className="col-auto">
          <div className="filter d-flex align-items-center">
            <div className="text-white me-3">Date</div>
            <Form className="me-4">
              <Form.Check
                type="switch"
                id="custom-switch"
                label=""
                checked={isToggledDate}
                onChange={handleToggleDate}
              />
            </Form>
            <div className="text-white me-3">Rating</div>
            <Form className="me-4">
              <Form.Check
                type="switch"
                id="custom-switch"
                label=""
                checked={isToggledRating}
                onChange={handleToggleRating}
              />
            </Form>
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
      {/* Add your maps here */}
    </div>
  );
};

export default MyMapsPage;

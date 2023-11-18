import React, { useState } from "react";
import ScrollableComments from "../../../reuseable/ScrollableComments.js";
import "../ViewMapPageStyles.css";

const Comments = () => {
  const [comment] = useState("");

  const handleSubmit = () => {
    console.log("Submitted comment:", comment);
  };

  return (
    <>
      <div
        className="m-auto rounded px-3 py-4 mb-3"
        style={{ backgroundColor: "white", width: "80%" }}
      >
        <ScrollableComments />
      </div>
      <div>
        <div
          className="m-auto rounded px-3 py-4 mb-3"
          style={{ backgroundColor: "white", width: "75%", height: "200px" }}
        >
          <textarea
            style={{
              backgroundColor: "white",
              width: "100%",
              height: "100%",
              border: "none",
            }}
          ></textarea>
        </div>
        <div className="m-auto text-end" style={{ width: "75%" }}>
          <button
            className="btn btn-primary cus-btn mt-2"
            onClick={handleSubmit}
          >
            ADD COMMENT
          </button>
        </div>
      </div>
    </>
  );
};

export default Comments;

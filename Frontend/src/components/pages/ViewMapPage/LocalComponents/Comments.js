import React, { useState } from "react";
import Commment from "../../../reuseable/CommentComponent.js";
import CommentComponent from "../../../reuseable/CommentComponent.js";
import "../ViewMapPageStyles.css";

const Comments = () => {
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    console.log("Submitted comment:", comment);
  };

  return (
    <>
      <div
        className="m-auto rounded px-3 py-4 mb-3"
        style={{ backgroundColor: "white", width: "80%" }}
      >
        <CommentComponent />
        <CommentComponent />
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

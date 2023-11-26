import React, { useContext, useState } from "react";
import ScrollableComments from "../../../reuseable/ScrollableComments.js";
import "../ViewMapPageStyles.css";
import { handleCreateComment } from "../../../../util/commentUtil.js";
import AuthContext from "../../../../contexts/AuthContext.js";
import { GlobalStoreContext } from "../../../../contexts/GlobalStoreContext.js";

// This recieves the current map object as the `map` prop!
const Comments = (props) => {
  const { auth } = useContext(AuthContext);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const mapId = props.mapId;
  const handleSubmit = async () => {
    const userId = auth.user._id;
    setIsLoading(true);
    const mapComments = await handleCreateComment(mapId, userId, comment);

    console.log("Submitted comment:", comment);
    setIsLoading(false);
  };

  return (
    <>
      <div
        className="m-auto rounded px-3 py-4 mb-3"
        style={{ backgroundColor: "white", width: "80%" }}
      >
        <ScrollableComments mapId={mapId} />
      </div>
      <div>
        <div
          className="m-auto rounded px-3 py-4 mb-3"
          style={{ backgroundColor: "white", width: "75%", height: "200px" }}
        >
          <textarea
            onChange={(event) => setComment(event.target.value)}
            maxLength="600"
            style={{
              backgroundColor: "white",
              width: "100%",
              height: "100%",
              border: "none",
            }}
          ></textarea>
          <div
            className="text-end"
            style={{
              color: "lightgray",
            }}
          >
            {comment.length}/{600}
          </div>
        </div>
        <div className="m-auto text-end" style={{ width: "75%" }}>
          <button className="btn btn-primary mt-2" onClick={handleSubmit}>
            {!isLoading ? "ADD COMMENT" : "Saving..."}
          </button>
        </div>
      </div>
    </>
  );
};

export default Comments;

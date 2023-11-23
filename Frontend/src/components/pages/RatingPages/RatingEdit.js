import React from "react";
import {
  createOrUpdateRate,
  getRatesByMapId,
  deleteRate,
} from "../../../util/ratingUtil";

const exampleMapId = "255"; // Sample MapID
const exampleUserId = "655bd37b4d71e05970223cb1"; // Sample UserID
const exampleRate = 4; // Sample Rate

export const fetchRatesForMap = async () => {
  const rates = await getRatesByMapId(exampleMapId);
  return rates;
};

export const submitRating = async () => {
  await createOrUpdateRate(exampleUserId, exampleMapId, exampleRate);
};

export const removeRating = async () => {
  await deleteRate(exampleUserId, exampleMapId);
};

// Component example usage (Replace or adapt based on your UI framework)
const RatingEdit = () => {
  return (
    <div>
      <button onClick={submitRating}>Submit Rating</button>
      <button onClick={removeRating}>Remove Rating</button>
    </div>
  );
};

export default RatingEdit;

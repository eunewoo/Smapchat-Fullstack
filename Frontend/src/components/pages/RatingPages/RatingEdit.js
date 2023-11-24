import React from "react";
import {
  createOrUpdateRate,
  getRatesByMapId,
  deleteRate,
} from "../../../util/ratingUtil";

const exampleMapId = 253; // Sample MapID
const exampleUserId = "6549247ab828517fbe1969a3"; // Sample UserID
const exampleRate = 4; // Sample Rate

export const fetchRatesForMap = async () => {
  const rates = await getRatesByMapId(exampleMapId);
  return rates;
};

export const createRating = async () => {
  await createOrUpdateRate(exampleUserId, exampleMapId, exampleRate);
};

export const removeRating = async () => {
  await deleteRate(exampleUserId, exampleMapId);
};

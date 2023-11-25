import React from "react";
import {
  createOrUpdateRate,
  getRatesByMapId,
  deleteRate,
} from "../../../util/ratingUtil";

const exampleMapId = "65612a9a5a99c4e94572effc"; // Sample MapID
const exampleUserId = "65612c7a5a99c4e94572f00d"; // Sample UserID
const exampleRate = 5; // Sample Rate

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

import React, { useState, useReducer } from "react";
import "./MapEditPage.css";
import ShowMap from "./LocalComponents/ShowMap";
import arrowData from "../../editor/SampleArrowMap.json";
import ArrowMapToolbox from "../../editor/ArrowMapToolbox";

import TransactionHandler from "../../editor/TransactionHandler";

const MapEditPage = () => {
  const [data] = useState(arrowData);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const handler = useState(new TransactionHandler(data, forceUpdate))[0];

  return (
    <div className="container-fluid mt-4">
      <div className="row justify-content-center">
        <div className="col leftE p-0 rounded ms-2">
          <ShowMap />
        </div>
        <div className="col rightE p-0 rounded ms-2">
          <ArrowMapToolbox handler={handler} arrowMap={data} />
        </div>
      </div>
    </div>
  );
};

export default MapEditPage;

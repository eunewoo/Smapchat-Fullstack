import React, { useState, useReducer } from "react";
import "./MapEditPage.css";

import arrowData from "../../editor/SampleArrowMap.json";
import bubbleData from "../../editor/SampleBubbleMap.json";
import pictureData from "../../editor/SamplePictureMap.json";
import categoryData from "../../editor/SampleCategoryMap.json";
import scaleData from "../../editor/SampleScaleMap.json";

import ArrowMapToolbox from "../../editor/ArrowMapToolbox";
import BubbleMapToolbox from "../../editor/BubbleMapToolbox";
import PictureMapToolbox from "../../editor/PictureMapToolbox";
import CategoryMapToolbox from "../../editor/CategoryMapToolbox";
import ScaleMapToolbox from "../../editor/ScaleMapToolbox";

import TransactionHandler from "../../editor/TransactionHandler";
import MapRenderer from "../../reuseable/MapRenderer";

import { useParams } from "react-router-dom";

const MapEditPage = () => {

  var params = useParams();
  var defaultData = {};
  var toolbox = <></>

  console.log(params.mapType)

  switch(params.mapType) {
    case "ArrowMap": 
      defaultData = arrowData;
      break;
    case "BubbleMap":
      defaultData = bubbleData;
      break;
    case "PictureMap":
      defaultData = pictureData;
      break;
    case "CategoryMap":
      defaultData = categoryData;
      break;
    case "ScaleMap":
      defaultData = scaleData;
      break;
  }

  const [data] = useState(defaultData);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const handler = useState(new TransactionHandler(data, forceUpdate))[0];

  switch(params.mapType) {
    case "ArrowMap": 
      toolbox = (<ArrowMapToolbox handler={handler} arrowMap={data} />);
      break;
    case "BubbleMap": 
      toolbox = (<BubbleMapToolbox handler={handler} bubbleMap={data} />);
      break;
    case "PictureMap": 
      toolbox = (<PictureMapToolbox handler={handler} pictureMap={data} />);
      break;
    case "CategoryMap": 
      toolbox = (<CategoryMapToolbox handler={handler} categoryMap={data} />);
      break;
    case "ScaleMap": 
      toolbox = (<ScaleMapToolbox handler={handler} scaleMap={data} />);
      break;
  }

  return (
    <div className="container-fluid mt-4">
      <div className="row justify-content-center">
        <div className="col leftF p-0 rounded ms-2">
          <MapRenderer width="100%" height="100%" mapType={params.mapType} />
        </div>
        <div className="col rightE p-0 rounded ms-2">
          {toolbox}
        </div>
      </div>
    </div>
  );
};

export default MapEditPage;

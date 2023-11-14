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
import { Button } from "react-bootstrap";

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
    default:
      defaultData = {};
      break;
  }

  const [data, setData] = useState(defaultData);
  const [geoJsonData, setGeoJsonData] = useState({});
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const handler = useState(new TransactionHandler(data, forceUpdate))[0];

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const uploadedData = JSON.parse(e.target.result);
          setGeoJsonData(uploadedData);
        } catch (error) {
          console.error('Error reading GeoJSON file:', error);
        }
      };
      reader.readAsText(file);
    }
  };

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
    default:
      toolbox = (<></>);
      break;
  }

  return (
    <div className="container-fluid mt-4">
      <div className="row justify-content-center">
        <div className="col leftF p-0 rounded ms-2">
          <input type="file" onChange={handleFileChange} accept=".json" />
          <MapRenderer width="100%" height="100%" Geometry={geoJsonData} mapType={params.mapType} GeoJsonData={geoJsonData}/>
        </div>
        <div className="col rightE p-0 rounded ms-2">
          {toolbox}
          <div style={{width:"100%", display:"flex", marginTop: "60px"}}>
            <Button style={{width: "40%", margin: "auto"}}>Save</Button>
            <Button style={{width: "40%", margin: "auto"}}>Upload</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapEditPage;

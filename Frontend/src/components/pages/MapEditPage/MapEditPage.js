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
import { Button, Alert } from "react-bootstrap";

import { BubbleSave, BubblePublish } from "./BubbleEdit";
import { CategorySave, CategoryPublish } from "./CategoryEdit";
import { ScaleSave, ScalePublish } from "./ScaleEdit";
import { ArrowSave, ArrowPublish, ArrowClick } from "./ArrowEdit";
import { PictureSave, PicturePublish } from "./PictureEdit";

const MapEditPage = () => {
  var params = useParams();
  var defaultData = {};
  var toolbox = <></>;

  console.log(params.mapType);

  switch (params.mapType) {
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

  const [data] = useState(defaultData);
  const [geoJsonData, setGeoJsonData] = useState({});
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const handler = useState(new TransactionHandler(data, forceUpdate))[0];

  // This state controls if the editor screen is in a mode where we can click
  // on the map. In this state, the next time the user clicks on the map, the appropriate
  // map type's click handler will fire with placingPath. placingHint is set to
  // give a hint to the handler what kind of transaction needs to be made.
  const [placing, setPlacing] = useState(false);
  const [placingPath, setPlacingPath] = useState("");
  const [placingHint, setPlacingHint] = useState("");
  const readyPlace = (path, hint) => {
    setPlacingPath(path);
    setPlacing(true);
    setPlacingHint(hint);
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const uploadedData = JSON.parse(e.target.result);
          setGeoJsonData(uploadedData);
        } catch (error) {
          console.error("Error reading GeoJSON file:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  //save button
  const handleSaveButton = () => {
      if (params.mapType === "BubbleMap") {
        BubbleSave();
      } else if (params.mapType === "ArrowMap") {
        ArrowSave();
      } else if (params.mapType === "ScaleMap") {
        ScaleSave();
      } else if (params.mapType === "PictureMap") {
        PictureSave();
      } else if (params.mapType === "CategoryMap") {
        CategorySave();
      } else {
        // Handle the default case if needed
      }
  };

  //publish button
  const handlePublishButton = () => {
      if (params.mapType === "BubbleMap") {
        BubblePublish();
      } else if (params.mapType === "ArrowMap") {
        ArrowPublish();
      } else if (params.mapType === "ScaleMap") {
        ScalePublish();
      } else if (params.mapType === "PictureMap") {
        PicturePublish();
      } else if (params.mapType === "CategoryMap") {
        CategoryPublish();
      } else {
        // Handle the default case if needed
      }
  };

  switch (params.mapType) {
    case "ArrowMap":
      toolbox = <ArrowMapToolbox handler={handler} arrowMap={data} readyPlace={readyPlace}/>;
      break;
    case "BubbleMap":
      toolbox = <BubbleMapToolbox handler={handler} bubbleMap={data} readyPlace={readyPlace}/>;
      break;
    case "PictureMap":
      toolbox = <PictureMapToolbox handler={handler} pictureMap={data} readyPlace={readyPlace}/>;
      break;
    case "CategoryMap":
      toolbox = <CategoryMapToolbox handler={handler} categoryMap={data} readyPlace={readyPlace}/>;
      break;
    case "ScaleMap":
      toolbox = <ScaleMapToolbox handler={handler} scaleMap={data} readyPlace={readyPlace}/>;
      break;
    default:
      toolbox = <></>;
      break;
  }

  const handleMapClick = (latlng) => {

    if (!placing) {
      console.log("Clicked not placing");
      return;
    }

    if (params.mapType == "ArrowMap") {
      ArrowClick(latlng, handler, placingPath, placingHint);
    }

    setPlacing(false);
    setPlacingPath("");
    setPlacingHint("");
  };

  const notification = placing ? (
    <Alert
      style={{position:"absolute", margin:"auto", bottom:"20px"}}>
      Click anywhere on the map!
    </Alert>
    ) : (<></>);

  return (
    <div className="container-fluid mt-4">
      <div className="row justify-content-center">
        <div className="col leftF p-0 rounded ms-2">
          <input type="file" onChange={handleFileChange} accept=".json" />
          <MapRenderer
            width="100%"
            height="100%"
            Geometry={geoJsonData}
            mapType={params.mapType}
            GeoJsonData={data}
            onClick={handleMapClick}
          />
          {notification}
        </div>
        <div className="col rightE p-0 rounded ms-2">
          {toolbox}
          <div style={{ width: "100%", display: "flex", marginTop: "60px" }}>
            <Button
              style={{ width: "40%", margin: "auto" }}
              onClick={handleSaveButton}
            >
              Save
            </Button>
            <Button
              style={{ width: "40%", margin: "auto" }}
              onClick={handlePublishButton}
            >
              Upload
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapEditPage;

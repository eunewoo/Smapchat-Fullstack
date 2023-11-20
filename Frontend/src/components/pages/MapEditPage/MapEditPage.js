import React, { useState, useReducer, useEffect, useContext } from "react";
import "./MapEditPage.css";
import { Spinner } from "react-bootstrap";

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

import { GlobalStoreContext } from "../../../contexts/GlobalStoreContext";

import { useParams } from "react-router-dom";
import { Button, Alert } from "react-bootstrap";

import { BubbleSave, BubblePublish, fetchBubbleMap } from "./BubbleEdit";
import {
  CategorySave,
  CategoryPublish,
  fetchCategoryMap,
} from "./CategoryEdit";
import { ScaleSave, ScalePublish, fetchScaleMap } from "./ScaleEdit";
import { ArrowSave, ArrowPublish, fetchArrowMap } from "./ArrowEdit";
import { PictureSave, PicturePublish } from "./PictureEdit";

export default function MapEditPage() {
  const globalStore = useContext(GlobalStoreContext);

  var params = useParams();
  var defaultData = {};
  var toolbox = <></>;

  // This contains the current map graphic data and geoJson. A transaction
  // handler is initialized to handle operating on the data. See
  // TransactionHandler.js for details.
  const [data, setData] = useState(defaultData);
  const [geoJsonData, setGeoJsonData] = useState({});
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const [handler, setHandler] = useState(
    new TransactionHandler(data, forceUpdate)
  );

  // map datas
  // var bubbleData = demo
  const [dataFetched, setDataFetched] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (params.mapType === "ArrowMap") {
          const result = await fetchArrowMap();
          console.log("arrow data: ", result);
          if (!result) {
            setData(arrowData); //need more work here
          } else {
            setData(result);
          }
          setHandler(new TransactionHandler(result, forceUpdate));
        }
        if (params.mapType === "BubbleMap") {
          const result = await fetchBubbleMap();
          console.log("bubble data: ", result);
          if (!result) {
            setData(bubbleData); //need more work here
          } else {
            setData(result);
          }
          setHandler(new TransactionHandler(result, forceUpdate));
        }

        console.log("fetch set true");
        setDataFetched(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  //TODO: Make the sample data 'blank templates' instead of samples
  // for the final product.
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

  // This state controls if the editor screen is in a mode where we can click
  // on the map. In this state, the next time the user clicks on the map, the
  // placeFunction will fire. you need to pass a double closure as the function
  // because of javascript weirdness, so the form would look something like:
  // readyPlace(() => (latlng) => DoSomeSuff(latlng)); when set in an onClick.
  const [placing, setPlacing] = useState(false);
  const [placeFunction, setPlaceFunction] = useState((latlng) => {});
  const readyPlace = (placeFunction) => {
    setPlacing(true);
    setPlaceFunction(placeFunction);
  };

  // TOOD: Remove this and instead have the GeoJSON data come from the previous
  // page somehow.
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

  // This contains the current map graphic data and geoJson. A transaction
  // handler is initialized to handle operating on the data. See
  // TransactionHandler.js for details.
  // const [data, setData] = useState(defaultData);
  // const [, forceUpdate] = useReducer((x) => x + 1, 0);
  // const handler = useState(new TransactionHandler(data, forceUpdate))[0];

  // // This state controls if the editor screen is in a mode where we can click
  // // on the map. In this state, the next time the user clicks on the map, the
  // // placeFunction will fire. you need to pass a double closure as the function
  // // because of javascript weirdness, so the form would look something like:
  // // readyPlace(() => (latlng) => DoSomeSuff(latlng)); when set in an onClick.
  // const [placing, setPlacing] = useState(false);
  // const [placeFunction, setPlaceFunction] = useState((latlng) => { })
  // const readyPlace = (placeFunction) => {
  //   setPlacing(true);
  //   setPlaceFunction(placeFunction);
  // }

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
      BubblePublish(1);
    } else if (params.mapType === "ArrowMap") {
      ArrowPublish(1);
    } else if (params.mapType === "ScaleMap") {
      ScalePublish(1);
    } else if (params.mapType === "PictureMap") {
      PicturePublish();
    } else if (params.mapType === "CategoryMap") {
      CategoryPublish(1);
    } else {
      // Handle the default case if needed
    }
  };

  // Load an appropriate toolbox based on which map type we're editing.
  // May be a nicer way to clean this up later...
  if (dataFetched) {
    switch (params.mapType) {
      case "ArrowMap":
        toolbox = (
          <ArrowMapToolbox
            handler={handler}
            arrowMap={data}
            readyPlace={readyPlace}
          />
        );
        break;
      case "BubbleMap":
        toolbox = (
          <BubbleMapToolbox
            handler={handler}
            bubbleMap={data}
            readyPlace={readyPlace}
          />
        );
        break;
      case "PictureMap":
        toolbox = (
          <PictureMapToolbox
            handler={handler}
            pictureMap={data}
            readyPlace={readyPlace}
          />
        );
        break;
      case "CategoryMap":
        toolbox = (
          <CategoryMapToolbox
            handler={handler}
            categoryMap={data}
            readyPlace={readyPlace}
          />
        );
        break;
      case "ScaleMap":
        toolbox = (
          <ScaleMapToolbox
            handler={handler}
            scaleMap={data}
            readyPlace={readyPlace}
          />
        );
        break;
      default:
        toolbox = <></>;
        break;
    }
  }

  // Handles firing the appropriate events if possible when the map is clicked.
  // Will only fire anything if we're in the placing state.
  const handleMapClick = (latlng) => {
    if (!placing) {
      console.log("Clicked not placing");
      return;
    }

    placeFunction(latlng);

    setPlacing(false);
    setPlaceFunction((latlng) => {});
  };

  // Display a notification the user can click in the map when in the placing
  // state. This is the main visual distinction for this state.
  const notification = placing ? (
    <Alert style={{ position: "absolute", margin: "auto", bottom: "20px" }}>
      Click anywhere on the map!
    </Alert>
  ) : (
    <></>
  );
  if (dataFetched) {
    return (
      <div className="container-fluid mt-4">
        <div className="row justify-content-center">
          <div className="col leftF p-0 rounded ms-2">
            <MapRenderer
              width="100%"
              height="100%"
              Geometry={globalStore.store.currentGeoJson}
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
                Publish
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <div className="text-center">
          <Spinner animation="border" role="status" variant="primary">
            <span className="sr-only"></span>
          </Spinner>
          <p className="ml-2 mt-2">Loading...</p>
        </div>
      </div>
    );
  }
}

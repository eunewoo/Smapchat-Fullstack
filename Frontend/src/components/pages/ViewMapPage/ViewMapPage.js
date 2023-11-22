import React, { useState, useContext, useEffect } from "react";
import UserInfo from "./LocalComponents/UserInfo";
import MapRenderer from "../../reuseable/MapRenderer";
import "./ViewMapPageStyles.css";
import Comments from "./LocalComponents/Comments";

import { GlobalStoreContext } from "../../../contexts/GlobalStoreContext";
import { useParams } from "react-router-dom";
import { fetchSpecificMap, getArrowMap } from "../../../util/mapUtil";
import { Spinner } from "react-bootstrap";

const ViewMapPage = () => {

  const globalStore = useContext(GlobalStoreContext);
  var params = useParams();

  const [map, setMap] = useState({});
  const [loaded, setLoaded] = useState(false);

  async function populateData() {
    const map = await fetchSpecificMap(params.mapId);
    setMap(map);

    //globalStore.store.currentGeoJson =
    globalStore.store.currentMapGraphic = await getArrowMap(map.MapID);
    globalStore.setStore(globalStore.store);

    setLoaded(true);
  }

  useEffect(() => {

    // We reset the current global geometry and graphic data here since we
    // want to wait for them to load
    globalStore.store.currentGeoJson = {};
    globalStore.store.currentMapGraphic = {};
    globalStore.setStore(globalStore.store);
    setLoaded(false);

    populateData();
  }, [params.mapId, globalStore]);

  const [mapType] = useState("ArrowMap");

  if (!loaded) {
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

  return (
    <div className="Container-fluid mx-5 my-3 px-5">
      <div className="col text-center">
        <div className="text-black">
          <UserInfo 
          map={map}
          userEmail={map.owner}/>
        </div>

        <div
          className="m-auto my-4 position-relative text-center"
          style={{ width: "90%", height: "80vh" }}
        >
          <MapRenderer 
            width="100%" 
            height="100%" 
            mapType={mapType}
            Geometry={globalStore.store.currentGeoJson}
            GeoJsonData={globalStore.store.currentMapGraphic}
            />
          <button
            className="btn btn-edit-map position-absolute"
            style={{ top: "16px", right: "16px" }}
          >
            Edit
          </button>
        </div>

        <Comments />
      </div>
    </div>
  );
};

export default ViewMapPage;

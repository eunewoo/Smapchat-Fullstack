import React, { useState, useContext, useEffect } from "react";
import UserInfo from "./LocalComponents/UserInfo";
import MapRenderer from "../../reuseable/MapRenderer";
import "./ViewMapPageStyles.css";
import Comments from "./LocalComponents/Comments";

import { GlobalStoreContext } from "../../../contexts/GlobalStoreContext";
import { useNavigate, useParams } from "react-router-dom";
import { deleteMap, fetchSpecificMap, getArrowMap, getBubbleMap } from "../../../util/mapUtil";
import { Spinner } from "react-bootstrap";
import AuthContext from "../../../contexts/AuthContext";
import { webFetch } from "../../../util/webUtil";

const ViewMapPage = () => {

  const navigate = useNavigate();

  const globalStore = useContext(GlobalStoreContext);
  const auth = useContext(AuthContext);
  var params = useParams();

  const [map, setMap] = useState({});
  const [loaded, setLoaded] = useState(false);

  async function populateData() {
    const map = await fetchSpecificMap(params.mapId);
    setMap(map);

    console.log(map);

    globalStore.store.currentMap = map;

    if (map.mapFile !== "") {
      console.log("Getting GeoJSON!");
      const geoJson = await (await fetch(map.mapFile)).json();
      globalStore.store.currentGeoJson = geoJson;
      console.log("Got GeoJSON!");
    }

    switch(map.mapType){
      case "ArrowMap": globalStore.store.currentMapGraphic = await getArrowMap(map._id); break;
      case "BubbleMap": globalStore.store.currentMapGraphic = await getBubbleMap(map._id); break;
      // TODO: Expand this as other map types are properly implemented
    }

    globalStore.setStore(globalStore.store);

    setLoaded(true);
  }

  useEffect(() => {

    // We reset the current global geometry and graphic data here since we
    // want to wait for them to load
    globalStore.store.currentMap = null;
    globalStore.store.currentGeoJson = null;
    globalStore.store.currentMapGraphic = null;
    globalStore.setStore(globalStore.store);
    setLoaded(false);

    populateData();
  }, [params.mapId, globalStore]);

  const deleteButton = map.owner === auth.auth.user?.email ? 
  (<button
    className="btn btn-edit-map position-absolute"
    style={{ top: "64px", right: "16px" }}
    onClick={() => 
      {
        setLoaded(false);
        deleteMap(map._id).then(() => {
          navigate("/");
        })
      }}
  >
    Delete
  </button>) : 
  (<></>);

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
            mapType={map.mapType}
            Geometry={globalStore.store.currentGeoJson}
            GeoJsonData={globalStore.store.currentMapGraphic}
            />

          <button
            className="btn btn-edit-map position-absolute"
            style={{ top: "16px", right: "16px" }}
            onClick={() => navigate("/map-edit-page/" + map.mapType)}
          >
            {map.owner === auth.auth.user?.email ? "Edit" : "Fork"}
          </button>

          {deleteButton}
        </div>

        <Comments 
        map={map}/>
      </div>
    </div>
  );
};

export default ViewMapPage;

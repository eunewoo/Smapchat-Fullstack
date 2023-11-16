import Leaflet from "leaflet";
import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, useMapEvent, useMapEvents } from "react-leaflet";
import { renderPictureMap } from "./mapgraphics/PictureMap";
import { renderArrowMap } from "./mapgraphics/ArrowMap";
import { renderBubbleMap } from "./mapgraphics/BubbleMap";
import { renderCategoryMap } from "./mapgraphics/CategoryMap";
import { renderScaleMap } from "./mapgraphics/ScaleMap";
import "leaflet/dist/leaflet.css";
import "./MapRenderer.css";

/// Component which handles rendering a map in the application.
/// Takes a valid GeoJSON object in the Geometry prop, and a custom
/// JSON object for one of the applications map types in the
/// GraphicData prop.
export default function MapRenderer(props) {
  const mapRef = useRef(null);
  const [zoom, setZoom] = useState(2);
  const [layerGroup] = useState(Leaflet.layerGroup());

  useEffect(() => {
    if (mapRef.current) {
      layerGroup.addTo(mapRef.current);
    }
  });

  layerGroup.eachLayer((layer) => layer.remove());

  if (props.Geometry && mapRef.current) {
    const geoJsonLayer = Leaflet.geoJSON(props.Geometry.features);
    geoJsonLayer.addTo(layerGroup);
    mapRef.current.on("zoomend", () => setZoom(mapRef.current.getZoom()));
  }

  if (props.mapType === "PictureMap" && mapRef.current) {
    renderPictureMap(layerGroup, props.GeoJsonData);
  } else if (props.mapType === "ArrowMap" && mapRef.current) {
    renderArrowMap(layerGroup, props.GeoJsonData);
  } else if (props.mapType === "BubbleMap" && mapRef.current) {
    renderBubbleMap(layerGroup, props.GeoJsonData);
  } else if (
    props.mapType === "CategoryMap" &&
    mapRef.current &&
    props.GeoJsonData
  ) {
    renderCategoryMap(layerGroup, props.GeoJsonData); // Pass the GeoJSON data
  } else if (
    props.mapType === "ScaleMap" &&
    mapRef.current &&
    props.GeoJsonData
  ) {
    renderScaleMap(layerGroup, props.GeoJsonData); // Pass the GeoJSON data
  }

  return (
    <div style={{ width: props.width, height: props.height }}>
      <MapContainer
        style={{ height: props.height }}
        zoom={zoom}
        center={[200, 40]}
        minZoom={2}
        maxBoundsViscosity={1}
        ref={mapRef}
      >
        <ClickHandler onClick={props.onClick}/>
        <TileLayer
          noWrap={true}
          url="http://a.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://carto.com/">carto.com</a> contributors'
        />
        {props.Geometry && <GeoJSON data={props.Geometry.features} />}
      </MapContainer>
    </div>
  );
}

function ClickHandler(props) {
    useMapEvents({
        click(e){
            if(props.onClick != null) {
                props.onClick(e.latlng);
            }
        }
      })

    return(<></>);
}
import Leaflet from "leaflet";
import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  useMapEvents,
} from "react-leaflet";
import { renderPictureMap } from "./mapgraphics/PictureMap";
import { renderArrowMap } from "./mapgraphics/ArrowMap";
import { renderBubbleMap } from "./mapgraphics/BubbleMap";
import { renderCategoryMap } from "./mapgraphics/CategoryMap";
import { renderScaleMap } from "./mapgraphics/ScaleMap";
import "leaflet/dist/leaflet.css";
import "./MapRenderer.css";

export default function MapRenderer(props) {
  const [map, setMap] = useState(null);
  const [zoom] = useState(2);
  const [layerGroup] = useState(Leaflet.layerGroup());
  const [boundaries, setBoundaries] = useState([]); // State to store GeoJSON boundaries

  useEffect(() => {

    if (props.Geometry) {
      // Form boundaries from input map first and add on layer
      // Also add on Boundaries useState to use that in Scale,Category map
      const geoJsonLayer = Leaflet.geoJSON(props.Geometry.features, {
        onEachFeature: (feature, layer) => {
          // Store each boundary in the array
          setBoundaries((current) => {
            const newBoundaries = [
              ...current,
              { feature: feature, layer: layer },
            ];
            return newBoundaries;
          });
        },
      });

      if (map) {
        geoJsonLayer.addTo(map);
      }
    }
  }, [props.Geometry, map, zoom]);

  useEffect(() => {

    if (props.GeoJsonData) {
      layerGroup.clearLayers(); // Clear existing layers

      // Render maps based on the type
      if (props.mapType === "PictureMap" && props.GeoJsonData) {
        renderPictureMap(layerGroup, props.GeoJsonData);
      } else if (props.mapType === "ArrowMap" && props.GeoJsonData) {
        renderArrowMap(layerGroup, props.GeoJsonData);
      } else if (props.mapType === "BubbleMap" && props.GeoJsonData) {
        renderBubbleMap(layerGroup, props.GeoJsonData);
      } else if (props.mapType === "CategoryMap" && props.GeoJsonData) {
        renderCategoryMap(layerGroup, props.GeoJsonData, boundaries); 
      } else if (props.mapType === "ScaleMap" && props.GeoJsonData) {
        renderScaleMap(layerGroup, props.GeoJsonData, boundaries); 
      }
    }

    if (map) {
      layerGroup.addTo(map);
      console.log("Added layer group");
    }
    else {
      console.log("Failed to add layer group")
    }
  });

  return (
    <div style={{ width: props.width, height: props.height }}>
      <MapContainer
        style={{ height: props.height }}
        zoom={zoom}
        center={[200, 40]}
        minZoom={2}
        maxBoundsViscosity={1}
        ref={setMap}
      >
        <ClickHandler onClick={props.onClick} />
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
    click(e) {
      if (props.onClick != null) {
        props.onClick(e.latlng);
      }
    },
  });

  return <></>;
}

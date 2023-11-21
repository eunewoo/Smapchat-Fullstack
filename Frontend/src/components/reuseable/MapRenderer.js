import Leaflet from "leaflet";
import React, { useEffect, useRef, useState } from "react";
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
  const mapRef = useRef(null);
  const [zoom] = useState(2);
  const [layerGroup] = useState(Leaflet.layerGroup());
  const [boundaries, setBoundaries] = useState([]); // State to store GeoJSON boundaries

  // Run 1st
  useEffect(() => {
    console.log("UseEffect 1");
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

      if (mapRef.current) {
        geoJsonLayer.addTo(mapRef.current);
      }
    }
  }, [props.Geometry, zoom]);

  layerGroup.clearLayers(); // Clear existing layers
  // mapRef.current.on("zoomend", () => setZoom(mapRef.current.getZoom()));

  // Run 2nd
  // Render maps based on the type
  if (props.mapType === "PictureMap" && props.GeoJsonData) {
    renderPictureMap(layerGroup, props.GeoJsonData);
  } else if (props.mapType === "ArrowMap" && props.GeoJsonData) {
    renderArrowMap(layerGroup, props.GeoJsonData);
  } else if (props.mapType === "BubbleMap" && props.GeoJsonData) {
    renderBubbleMap(layerGroup, props.GeoJsonData);
  } else if (props.mapType === "CategoryMap" && props.GeoJsonData) {
    renderCategoryMap(layerGroup, props.GeoJsonData, boundaries); // Pass the GeoJSON data
  } else if (props.mapType === "ScaleMap" && props.GeoJsonData) {
    renderScaleMap(layerGroup, props.GeoJsonData, boundaries); // Pass boundaries to ScaleMap
  }

  // Run 3rd
  if (mapRef.current) {
    layerGroup.addTo(mapRef.current);
    console.log("UseEffect 3");
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

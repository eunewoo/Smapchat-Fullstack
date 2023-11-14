<<<<<<< HEAD
import Leaflet from 'leaflet';
import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import { renderPictureMap } from './mapgraphics/PictureMap'; 
import { renderArrowMap } from './mapgraphics/ArrowMap'; 
import { renderBubbleMap } from './mapgraphics/BubbleMap'; 
import { renderCategoryMap } from './mapgraphics/CategoryMap'; 
import { renderScaleMap } from './mapgraphics/ScaleMap';
import 'leaflet/dist/leaflet.css';
// import './MapRenderer.css';
=======
import Leaflet from "leaflet";
import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { renderPictureMap } from "./mapgraphics/PictureMap";
import { renderArrowMap } from "./mapgraphics/ArrowMap";
import { renderBubbleMap } from "./mapgraphics/BubbleMap";
import { renderCategoryMap } from "./mapgraphics/CategoryMap";
import { renderScaleMap } from "./mapgraphics/ScaleMap";
import "leaflet/dist/leaflet.css";
import "./MapRenderer.css";
>>>>>>> origin/build2

/// Component which handles rendering a map in the application.
/// Takes a valid GeoJSON object in the Geometry prop, and a custom
/// JSON object for one of the applications map types in the
/// GraphicData prop.
export default function MapRenderer(props) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (props.Geometry && mapRef.current) {
      const geoJsonLayer = Leaflet.geoJSON(props.Geometry.features);
      const bounds = geoJsonLayer.getBounds();
      mapRef.current.fitBounds(bounds);
    }

    if (props.mapType === "PictureMap" && mapRef.current) {
      renderPictureMap(mapRef.current);
    } else if (props.mapType === "ArrowMap" && mapRef.current) {
      renderArrowMap(mapRef.current);
    } else if (props.mapType === "BubbleMap" && mapRef.current) {
      renderBubbleMap(mapRef.current);
    } else if (
      props.mapType === "CategoryMap" &&
      mapRef.current &&
      props.GeoJsonData
    ) {
      renderCategoryMap(mapRef.current, props.GeoJsonData); // Pass the GeoJSON data
    } else if (
      props.mapType === "ScaleMap" &&
      mapRef.current &&
      props.GeoJsonData
    ) {
      renderScaleMap(mapRef.current, props.GeoJsonData); // Pass the GeoJSON data
    }

    // ... other map types
  }, [props.Geometry, mapRef, props.mapType, props.GeoJsonData]);

<<<<<<< HEAD
    return (
        <div style={{width: props.width, height: props.height}}>
            <MapContainer
                style={{ height: props.height }}
                zoom={2}
                center={[127.024, 37.532]}
                minZoom={2}
                maxBoundsViscosity={1}
                ref = {mapRef}
            >
                <TileLayer
                    noWrap={true}
                    url="http://a.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://carto.com/">carto.com</a> contributors'
                />
                {props.Geometry && (
                    <GeoJSON data={props.Geometry.features} />
                )}
            </MapContainer>
        </div>
    );
=======
  return (
    <div style={{ width: props.width, height: props.height }}>
      <MapContainer
        style={{ height: props.height }}
        zoom={2}
        center={[127.024, 37.532]}
        minZoom={2}
        maxBoundsViscosity={1}
        ref={mapRef}
      >
        <TileLayer
          noWrap={true}
          url="http://a.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://carto.com/">carto.com</a> contributors'
        />
        {props.Geometry && <GeoJSON data={props.Geometry.features} />}
      </MapContainer>
    </div>
  );
>>>>>>> origin/build2
}

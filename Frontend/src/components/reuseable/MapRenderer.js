
/// Component which handles rendering a map in the application.
/// Takes a valid GeoJSON object in the Geometry prop, and a custom
/// JSON object for one of the applications map types in the
/// GraphicData prop.
// MapRender.js
import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { renderPictureMap } from './mapgraphics/PictureMap'; 

import { renderArrowMap } from './mapgraphics/ArrowMap'; 
import { renderBubbleMap } from './mapgraphics/BubbleMap'; 

export default function MapRenderer({ Geometry, GraphicData, mapType }) {
    const mapRef = useRef(null);

    useEffect(() => {
        console.log("mapRef", mapRef.current)
        console.log("geometry", Geometry)

        if (mapType === 1 && mapRef.current) {
            renderPictureMap(mapRef.current, GraphicData);
        }
        else if (mapType === 2 && mapRef.current) {
            
            renderArrowMap(mapRef.current, GraphicData);
        }
        else if (mapType === 3 && mapRef.current) {
            renderBubbleMap(mapRef.current, GraphicData);
        }

    //     else if (mapType === 4 && map) {
    //         renderCategoryMap(map, GraphicData);
    //     }
    //     else if (mapType === 5 && map) {
    //         renderScaleMap(map, GraphicData);
    //     }
    }, [Geometry, mapRef]);

    return (
        <div className="map-rendering-box">
            <MapContainer
                style={{ height: "85vh" }}
                zoom={2}
                center={[127.024, 37.532]}
                minZoom={2}
                maxBoundsViscosity={1}
                whenCreated={ mapInstance => { this.mapRef.current = mapInstance }}
            >
                <TileLayer
                    noWrap={true}
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"                    
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {Geometry && (
                    <GeoJSON data={Geometry.features} />
                )}
            </MapContainer>
        </div>
    );
}





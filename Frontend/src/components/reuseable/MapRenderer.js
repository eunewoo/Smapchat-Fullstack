import L from 'leaflet';
import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { renderPictureMap } from './mapgraphics/PictureMap'; 
import { renderArrowMap } from './mapgraphics/ArrowMap'; 
import { renderBubbleMap } from './mapgraphics/BubbleMap'; 

export default function MapRenderer({ Geometry, GraphicData, mapType }) {
    const mapRef = useRef(null);

    useEffect(() => {
        if (Geometry && mapRef.current) {
            const geoJsonLayer = L.geoJSON(Geometry.features);
            const bounds = geoJsonLayer.getBounds();
            mapRef.current.fitBounds(bounds);
        }

        if (mapType === 1 && mapRef.current) {
            renderPictureMap(mapRef.current);
        } else if (mapType === 2 && mapRef.current) {
            renderArrowMap(mapRef.current);
        } else if (mapType === 3 && mapRef.current) {
            renderBubbleMap(mapRef.current);
        }
        // ... other map types
    }, [Geometry, mapRef, mapType]);

    return (
        <div className="map-rendering-box">
            <MapContainer
                style={{ height: "85vh" }}
                zoom={2}
                center={[127.024, 37.532]}
                minZoom={2}
                maxBoundsViscosity={1}
                ref = {mapRef}
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

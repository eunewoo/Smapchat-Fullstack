
/// Component which handles rendering a map in the application.
/// Takes a valid GeoJSON object in the Geometry prop, and a custom
/// JSON object for one of the applications map types in the
/// GraphicData prop.
// MapRender.js
import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { renderArrowMap } from './mapgraphics/ArrowMap'; 
import { renderPictureMap } from './mapgraphics/PictureMap'; 
import { renderBubbleMap } from './mapgraphics/BubbleMap'; 

export default function MapRenderer({ Geometry, GraphicData, mapType }) {
    const mapRef = useRef(null);

    useEffect(() => {
        
        if (mapType === 1 && mapRef.current) {
            renderPictureMap(mapRef.current, GraphicData);
        }
        else if (mapType === 2 && mapRef.current) {
            console.log('useEffect run')
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
    }, [GraphicData, mapType, Geometry]);

    return (
        <div className="map-rendering-box">
            <MapContainer
                style={{ height: "85vh" }}
                zoom={2}
                center={[127.024, 37.532]}
                minZoom={2}
                maxBoundsViscosity={1}
                whenCreated={(mapInstance) => {
                    mapRef.current = mapInstance;
                }}
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

// // MapRender.js
// import React from 'react';
// import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';

// export default function MapRenderer({ Geometry }) {
//     return (
//         <div className="map-rendering-box">
//             <MapContainer
//                 style={{ height: "85vh" }}
//                 zoom={2}
//                 center={[127.024, 37.532]}
//                 minZoom={2}
//                 maxBoundsViscosity={1}
//             >
//                 <TileLayer
//                     noWrap={true}
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"                    
//                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                 />
//                 {Geometry && (
//                     <GeoJSON data={Geometry.features} />
//                 )}
//             </MapContainer>
//         </div>
//     );
// }



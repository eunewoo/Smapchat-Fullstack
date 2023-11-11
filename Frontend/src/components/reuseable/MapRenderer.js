
/// Component which handles rendering a map in the application.
/// Takes a valid GeoJSON object in the Geometry prop, and a custom
/// JSON object for one of the applications map types in the
/// GraphicData prop.
// MapRender.js
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { renderArrowMap } from './mapgraphics/ArrowMap'; 
import { renderPictureMap } from './mapgraphics/PictureMap'; 

export default function MapRenderer({ Geometry, GraphicData, mapType }) {
    const [map, setMap] = useState(null);

    useEffect(() => {
        if (mapType === 1 && map) {
            renderPictureMap(map, GraphicData);
        }
        else if (mapType === 2 && map) {
            renderArrowMap(map, GraphicData);
        }
    //     else if (mapType === 3 && map) {
    //         renderBubbleMap(map, GraphicData);
    //     }
    //     else if (mapType === 4 && map) {
    //         renderCategoryMap(map, GraphicData);
    //     }
    //     else if (mapType === 5 && map) {
    //         renderScaleMap(map, GraphicData);
    //     }
    }, [map]);

    return (
        <div className="map-rendering-box">
            <MapContainer
                style={{ height: "85vh" }}
                zoom={2}
                center={[127.024, 37.532]}
                minZoom={2}
                maxBoundsViscosity={1}
                whenCreated={(mapInstance) => {
                    console.log("Map created", mapInstance);
                    setMap(mapInstance);
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



import React, { useState } from 'react';
import MapRenderer from './MapRenderer';

export default function TestMapRenderer() {
    const [geoJsonData, setGeoJsonData] = useState(null);
    const [mapType, setMapType] = useState(0);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    setGeoJsonData(data);
                    setMapType(2); 
                } catch (error) {
                    console.error('Error reading GeoJSON file:', error);
                }
            };
            reader.readAsText(file);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} accept=".json" />
            <MapRenderer
                Geometry={geoJsonData}
                mapType={mapType}
            />
        </div>
    );
}

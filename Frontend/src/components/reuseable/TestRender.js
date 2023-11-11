import React, { useState } from 'react';
import MapRenderer from './MapRenderer';

export default function TestMapRenderer() {
    const [geoJsonData, setGeoJsonData] = useState(null);
    const [mapType, setMapType] = useState(0);

    const mapTypeNames = {
        1: "PictureMap",
        2: "ArrowMap",
        3: "BubbleMap",
        4: "CategoryMap",
        5: "ScaleMap"
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    setGeoJsonData(data);
                } catch (error) {
                    console.error('Error reading GeoJSON file:', error);
                }
            };
            reader.readAsText(file);
        }
    };

    const handleMapTypeChange = (event) => {
        setMapType(parseInt(event.target.value, 10));
    };

    return (
        <div>
            <>
            {Object.entries(mapTypeNames).map(([num, name]) => (
                <label key={num}>
                    <input 
                        type="radio" 
                        name="mapType" 
                        value={num} 
                        checked={mapType === parseInt(num, 10)} 
                        onChange={handleMapTypeChange} 
                    />
                    {name}
                </label>
            ))}
            </>
            <input type="file" onChange={handleFileChange} accept=".json" />
            <MapRenderer
                Geometry={geoJsonData}
                mapType={mapType}
            />
        </div>
    );
}

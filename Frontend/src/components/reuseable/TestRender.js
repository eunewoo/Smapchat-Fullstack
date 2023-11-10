import React, { useState, useEffect } from 'react';
import MapRenderer from './MapRenderer';

export default function TestMapRenderer() {
    const [geoJsonData, setGeoJsonData] = useState(null);
    const mapType = 2; // Indicating it's an Arrow Map

    useEffect(() => {
        fetch('../../../public/testGeo/nyc.geojson')
        .then(response => {
          console.log(response); // Log to see what you're getting
          return response.json();
        })
        .then(data => setGeoJsonData(data))
        .catch(error => console.error('Error loading the GeoJSON file:', error));
      
    }, []);

    return (
        <MapRenderer
            Geometry={geoJsonData}
            GraphicData={[
                { latitude: 40.76242991263874, longitude: -73.98521056649075, name: "Gershwin Theater", order: 1 },
                { latitude: 40.75811079104577,  longitude: -73.98534622655546, name: "Time Square", order: 2 },
                { latitude: 40.76157082004316,  longitude: -73.9776430605575, name: "MoMA", order:3 },
            ]} // Replace with your actual ArrowMap data
            mapType={mapType}
        />
    );
}

import React, { useState } from 'react';
import MapRenderer from './MapRenderer';

export default function TestMapRenderer() {
    const [geoJsonData, setGeoJsonData] = useState(null);
    const mapType = 2; // Indicating it's an Arrow Map

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

    return (
        <div>
            <input type="file" onChange={handleFileChange} accept=".json" />
            <MapRenderer
                Geometry={geoJsonData}
                GraphicData={[
                    { latitude: 40.76242991263874, longitude: -73.98521056649075, name: "Gershwin Theater", order: 1 },
                    { latitude: 40.75811079104577, longitude: -73.98534622655546, name: "Time Square", order: 2 },
                    { latitude: 40.76157082004316, longitude: -73.9776430605575, name: "MoMA", order: 3 }
                ]}
                mapType={mapType}
            />
        </div>
    );
}

// // TestRender.js
// import React, { useState } from 'react';
// import MapRenderer from './MapRenderer';

// export default function TestMapRenderer() {
//     const [geoJsonData, setGeoJsonData] = useState(null);

//     const handleFileChange = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = (e) => {
//                 try {
//                     const data = JSON.parse(e.target.result);
//                     setGeoJsonData(data);
//                 } catch (error) {
//                     console.error('Error reading GeoJSON file:', error);
//                 }
//             };
//             reader.readAsText(file);
//         }
//     };

//     return (
//         <div>
//             <input type="file" onChange={handleFileChange} accept=".json" />
//             <MapRenderer Geometry={geoJsonData} />
//         </div>
//     );
// }


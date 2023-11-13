import React, { useState } from 'react';
import MapRenderer from './MapRenderer';
import RatingDisplay from './RatingDisplay';
import Card from 'react-bootstrap/Card';
import './MapCard.css';

export default function MapCard(props) {
    // The map data that this card is displaying
    const [mapData, setMapData] = useState({
        avgRate: 4, // Temporary hardcoded data
        title: "Cool map!",
        author: "Alex",
        mapFile: {} // Assuming mapFile holds the GeoJSON data
    });

    const [geoJsonData, setGeoJsonData] = useState({});
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
        <Card style={{ width: "500px", margin: "5px", display: "inline-block" }}>
            <div>
                <input type="file" onChange={handleFileChange} accept=".json" />
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
            </div>
            <MapRenderer 
                Geometry={geoJsonData} 
                mapType={mapType} 
                width="100%" 
                height="300px" 
            />
            <RatingDisplay value={mapData.avgRate} />
            <Card.Body style={{ backgroundColor: "#141488", color: "white" }}>
                <Card.Title>{mapData.title ?? "Loading..."}</Card.Title>
                <Card.Text>
                    by {mapData.author ?? "Loading..."}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

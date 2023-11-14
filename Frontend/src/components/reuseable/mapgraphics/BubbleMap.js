// BubbleMap.js
import L from 'leaflet';
import sampleBubbleMapJson from '../../editor/SampleBubbleMap.json'; 


// Sample bubble data
// const sampleBubbleData = [
//     {
//         latitude: 40.76242991263874, 
//         longitude: -73.98521056649075, 
//         name: "Gershwin Theater", 
//         color:5,
//         size: 5
//     },
//     {
//         latitude: 40.75811079104577, 
//         longitude: -73.98534622655546, 
//         name: "Time Square", 
//         color: 5,
//         size: 1
//     },
//     {
//         latitude: 40.76157082004316, 
//         longitude: -73.9776430605575, 
//         name: "MoMA", 
//         color: 5,
//         size: 3
//     }
// ];

export const renderBubbleMap = (map) => {
    const bubbleMapData = convertJsonToBubbleMapData(sampleBubbleMapJson);

    console.log("Rendering Bubble Map with data:", bubbleMapData); 

    bubbleMapData.forEach(point => {
        const bubbleColor = point.color;
        const bubbleRadius = sizeToRadius(point.size);

        L.circle([point.latitude, point.longitude], {
            color: bubbleColor,
            fillColor: bubbleColor,
            fillOpacity: 0.5,
            radius: bubbleRadius
        }).addTo(map).bindPopup(point.name);
    });
};

const convertJsonToBubbleMapData = (json) => {
    return json.Location.map(loc => ({
        name: loc.Name,
        latitude: loc.Lattitude,
        longitude: loc.Longitude,
        color: loc.Color,
        size: parseInt(loc.Size, 10) // Assuming size is a string in JSON
    }));
};

const sizeToRadius = (size) => {
    const minSize = 1;
    const maxSize = 10;
    const minRadius = 100; 
    const maxRadius = 1000; 
    return ((size - minSize) / (maxSize - minSize)) * (maxRadius - minRadius) + minRadius;
};

// arrowMap.js
import L from 'leaflet';

const defaultArrowMapData = [
    { latitude: 40.76242991263874, longitude: -73.98521056649075, name: "Gershwin Theater", order: 1 },
    { latitude: 40.75811079104577, longitude: -73.98534622655546, name: "Time Square", order: 2 },
    { latitude: 40.76157082004316, longitude: -73.9776430605575, name: "MoMA", order: 3 }
];

export const renderArrowMap = (map) => {
    const processedData = processArrowData(defaultArrowMapData);

    // Marker (pinpoint) drawing on map
    processedData.forEach(point => {
        L.marker(point.position).addTo(map).bindPopup(point.name);
    });

    // Arrow drawing on map 
    if (processedData.length > 1) {
        const polyline = L.polyline(processedData.map(point => point.position), { color: 'blue' });
        polyline.addTo(map);
    }
};

// Organize into format for marker, arrow input
const processArrowData = (arrowMapData) => {
    return arrowMapData.sort((a, b) => a.order - b.order)
                       .map(point => ({
                           position: [point.latitude, point.longitude],
                           name: point.name,
                           order: point.order
                       }));
};

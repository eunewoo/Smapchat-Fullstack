// arrowMap.js
import L from 'leaflet';

export const renderArrowMap = (map, arrowMapData) => {
    const processedData = processArrowData(arrowMapData);

    // Log to check processed data
    console.log("Processed Data:", processedData); 

    // Maker(pinpoint) drawing on map
    processedData.forEach(point => {
        L.marker(point.position).addTo(map).bindPopup(point.name);
    });

    // Arrow drawing on map 
    if (processedData.length > 1) {
        const polyline = L.polyline(processedData.map(point => point.position), { color: 'blue' });
        polyline.addTo(map);
    }
};

// Sort from smaller order to larger order
// Organize into format for marker, arrow input
const processArrowData = (arrowMapData) => {
    return arrowMapData.sort((a, b) => a.order - b.order)
                       .map(point => ({
                           position: [point.latitude, point.longitude],
                           name: point.name,
                           order: point.order
                       }));
};

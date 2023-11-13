// arrowMap.js
import L from 'leaflet';

// three sample data of ArrowPointLocation format
// later replace this part with real data from database
const sampleArrowMapData = [
    { name: "Gershwin Theater", latitude: 40.76242991263874, longitude: -73.98521056649075, order: 1, date: "2023-11-10"},
    { name: "Time Square", latitude: 40.75811079104577, longitude: -73.98534622655546, order: 2, date: "2023-11-11"},
    { name: "MoMA", latitude: 40.76157082004316, longitude: -73.9776430605575, order: 3, date: "2023-11-12"}
];


export const renderArrowMap = (map) => {
    const processedData = processArrowData(sampleArrowMapData);

    // Marker (pinpoint) drawing on map
    processedData.forEach(point => {
        // Create a marker with a label for the order number
        const marker = L.marker(point.position, {
            // You can use a Leaflet DivIcon if you want to style the label further
            icon: new L.DivIcon({
                className: 'my-div-icon',
                html: `<span>${point.order}</span>`
            })
        }).addTo(map);

        // Bind a popup with name and date information
        marker.bindPopup(`<b>${point.name}</b><br>Date: ${point.date}`).openPopup();
    });

    // Draw arrows (polylines) between points
    if (processedData.length > 1) {
        const polyline = L.polyline(processedData.map(point => point.position), { color: 'blue' });
        polyline.addTo(map);
    }
};

// Order and organize data into format for used in leaflet to extract pinpoint & arrow
const processArrowData = (arrowMapData) => {
    return arrowMapData.sort((a, b) => a.order - b.order)
                       .map(point => ({
                           position: [point.latitude, point.longitude],
                           name: point.name,
                           order: point.order,
                           date: point.date
                       }));
};

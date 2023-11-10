// arrowMap.js
import L from 'leaflet';

export const renderArrowMap = (map, arrowMapData) => {
    const processedData = processArrowData(arrowMapData);

    processedData.forEach(point => {
        L.marker(point.position).addTo(map).bindPopup(point.name);
    });

    if (processedData.length > 1) {
        const polyline = L.polyline(processedData.map(point => point.position), { color: 'blue' });
        polyline.addTo(map);
    }
};

const processArrowData = (arrowMapData) => {
    return arrowMapData.sort((a, b) => a.order - b.order)
                       .map(point => ({
                           position: [point.latitude, point.longitude],
                           name: point.name,
                           order: point.order
                       }));
};

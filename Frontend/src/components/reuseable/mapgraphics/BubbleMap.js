// BubbleMap.js
import L from 'leaflet';

export const renderBubbleMap = (map, bubbleMapData) => {
    console.log("Rendering Bubble Map with data:", bubbleMapData); 

    bubbleMapData.forEach(point => {
        const bubbleColor = numberToColor(point.color); // Convert color code
        const bubbleRadius = sizeToRadius(point.size); // Convert size to radius

        L.circle([point.latitude, point.longitude], {
            color: bubbleColor,
            fillColor: bubbleColor,
            fillOpacity: 0.5,
            radius: bubbleRadius
        }).addTo(map).bindPopup(point.name);
    });
};

const numberToColor = (num) => {
    // Replace this function with appropriate logic to convert a number to a color code
    return '#'+(num * 0xFFFFFF<<0).toString(16).padStart(6, '0');
};

const sizeToRadius = (size) => {
    // Adjust the size to a suitable radius for the map
    const minSize = 1;
    const maxSize = 10;
    const minRadius = 100; 
    const maxRadius = 1000; 
    return ((size - minSize) / (maxSize - minSize)) * (maxRadius - minRadius) + minRadius;
};

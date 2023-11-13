// ScaleMap.js
import L from 'leaflet';

// Generate a base color
const baseColor = '#007bff'; // Example base color (blue)


// Adjust the lightness/darkness of the base color based on a scale value
const getScaleColor = (scaleValue) => {
    // Assuming scaleValue is between 1 and 10
    const lightness = 100 - (scaleValue * 10);
    return `hsl(${hexToHSL(baseColor).h}, ${hexToHSL(baseColor).s}%, ${lightness}%)`;
};

// Convert HEX color to HSL
const hexToHSL = (hex) => {
    // Convert hex to RGB first
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
      r = "0x" + hex[1] + hex[1];
      g = "0x" + hex[2] + hex[2];
      b = "0x" + hex[3] + hex[3];
    } else if (hex.length === 7) {
      r = "0x" + hex[1] + hex[2];
      g = "0x" + hex[3] + hex[4];
      b = "0x" + hex[5] + hex[6];
    }
    // Then convert RGB to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;

    if (delta === 0)
      h = 0;
    else if (cmax === r)
      h = ((g - b) / delta) % 6;
    else if (cmax === g)
      h = (b - r) / delta + 2;
    else
      h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0)
      h += 360;

    l = (cmax + cmin) / 2;
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return {h, s, l};
}

// Sample Category data - initially empty
const categories = [];

const createCategoriesFromGeoJson = (geoJsonData) => {
    geoJsonData.features.forEach((feature, index) => {
        const scaleValue = index % 10 + 1; // Assign a scale value from 1 to 10
        const categoryColor = getScaleColor(scaleValue);

        const newCategory = {
            CategoryId: index + 1,
            Name: `Category ${index + 1}`,
            Color: categoryColor,
            Coordinates: feature.geometry.coordinates
        };
        categories.push(newCategory);
        console.log(`Created category: ${newCategory.Name}`, newCategory);
    });

    console.log("All created categories:", categories);
};

// Assuming you have a function to get GeoJSON data
const getGeoJsonData = () => {
    // ... your method to get GeoJSON data ...
};

export const renderScaleMap = (map, geoJsonData) => {
    // ... existing checks for GeoJSON data ...

    createCategoriesFromGeoJson(geoJsonData);

    categories.forEach(category => {
        category.Coordinates.forEach(polygonCoordinates => {
            const leafletCoordinates = polygonCoordinates.map(coord => 
                coord.map(point => [point[1], point[0]])
            );

            L.polygon(leafletCoordinates, {
                color: category.Color,
                fillColor: category.Color,
                fillOpacity: 0.5,
                weight: 2
            }).addTo(map);
        });
    });
};

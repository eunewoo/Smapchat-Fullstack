// CategoryMap.js
import L from 'leaflet';

// Sample Category data
const categories = [
    {
        CategoryId: 1,
        Name: "Category 1",
        Color: "#ff0000",
        Polygons: [101, 102]
    },
    {
        CategoryId: 2,
        Name: "Category 2",
        Color: "#00ff00",
        Polygons: [103]
    }
];

// Sample Polygon data
const polygons = [
    {
        PolygonId: 101,
        Coordinates: [/* Array of coordinates */]
    },
    {
        PolygonId: 102,
        Coordinates: [/* Array of coordinates */]
    },
    {
        PolygonId: 103,
        Coordinates: [/* Array of coordinates */]
    }
    // Add more polygon data as needed
];

export const renderCategoryMap = (map, geoJsonData) => {
    // Iterate through each GeoJSON feature
    geoJsonData.features.forEach(feature => {
        // Determine the category of the feature
        const category = categories.find(cat => cat.Polygons.includes(feature.properties.id));
        if (category) {
            // Create a polygon with the category's color
            L.geoJSON(feature, {
                style: {
                    fillColor: category.Color,
                    color: category.Color,
                    fillOpacity: 0.5
                }
            }).addTo(map);
        }
    });
};

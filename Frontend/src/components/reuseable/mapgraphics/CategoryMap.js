// CategoryMap.js
import L from 'leaflet';

// Sample Category data - initially empty
const categories = [];

// Function to create categories from GeoJSON features

const createCategoriesFromGeoJson = (geoJsonData) => {
    geoJsonData.features.forEach((feature, index) => {
        const newCategory = {
            CategoryId: index + 1,
            Name: `Category ${index + 1}`,
            Color: getRandomColor(),
            Coordinates: feature.geometry.coordinates
        };
        categories.push(newCategory);
        console.log(`Created category: ${newCategory.Name}`, newCategory);
    });

    // Log the entire list of created categories
    console.log("All created categories:", categories);
};

// Generate a random color
const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

export const renderCategoryMap = (map, geoJsonData) => {
    if (!geoJsonData || !geoJsonData.features) {
        console.error("GeoJSON data is not provided or invalid");
        return;
    }

    // Create categories based on GeoJSON data
    createCategoriesFromGeoJson(geoJsonData);

    // Render each category
    categories.forEach(category => {
        category.Coordinates.forEach(polygonCoordinates => {
            // Convert coordinates if needed (for Polygon type)
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

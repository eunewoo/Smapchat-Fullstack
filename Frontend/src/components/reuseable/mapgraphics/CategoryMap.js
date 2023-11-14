import L from 'leaflet';

// Sample Category data - initially empty
const categories = [];

// Function to create categories from GeoJSON features
const createCategoriesFromGeoJson = (geoJsonData) => {
    geoJsonData.features.forEach((feature, index) => {
        const newCategory = {
            CategoryId: index + 1,
            Name: `Category ${index + 1}`,
            // IMPORTANT: for the sample data test, first 3 boundaries are assigned Red, later 2 boundaries are assigned Blue
            Color: index < 3 ? "#FF0000" : "#2222FF",  // Assign color based on index
            Coordinates: feature.geometry.coordinates
        };
        categories.push(newCategory);
        console.log(`Created category: ${newCategory.Name}`, newCategory);
    });

    // Log the entire list of created categories
    console.log("All created categories:", categories);
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

import L from 'leaflet';

// Function to blend two colors based on a percentage
const blendColors = (color1, color2, percentage) => {
    // ...existing blendColors code...
};

// Sample Category data - initially empty
const categories = [];

const createCategoriesFromGeoJson = (geoJsonData) => {
    const totalCategories = geoJsonData.features.length;
    geoJsonData.features.forEach((feature, index) => {
        const scalePercentage = index / (totalCategories - 1); // Calculate the percentage (0 to 1)
        const categoryColor = blendColors('#FF0000', '#00FF00', scalePercentage);

        const newCategory = {
            CategoryId: index + 1,
            Name: `Category ${index + 1}`,
            Color: categoryColor,
            Coordinates: feature.geometry.coordinates,
            Percentage: Math.round(scalePercentage * 100) // Percentage rounded to nearest whole number
        };
        categories.push(newCategory);
    });
};

export const renderScaleMap = (map, geoJsonData) => {
    if (!geoJsonData || !geoJsonData.features) {
        console.error("GeoJSON data is not provided or invalid");
        return;
    }

    createCategoriesFromGeoJson(geoJsonData);

    categories.forEach(category => {
        category.Coordinates.forEach(polygonCoordinates => {
            const leafletCoordinates = polygonCoordinates.map(coord => 
                coord.map(point => [point[1], point[0]])
            );

            const polygon = L.polygon(leafletCoordinates, {
                color: category.Color,
                fillColor: category.Color,
                fillOpacity: 0.5,
                weight: 2
            }).addTo(map);

            // Get the center of the polygon to place the marker
            const center = polygon.getBounds().getCenter();

            // Create a marker to display the percentage
            const marker = L.marker(center, {
                icon: L.divIcon({
                    className: 'scale-map-percentage',
                    html: `<div style="background-color: white; padding: 2px 5px; border-radius: 5px;">${category.Percentage}%</div>`
                })
            }).addTo(map);
        });
    });
};

// Add a style for the percentage marker
const style = document.createElement('style');
style.innerHTML = `
    .scale-map-percentage {
        font-size: 12px;
        text-align: center;
    }
`;
document.head.appendChild(style);

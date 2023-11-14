import L from "leaflet";

// Sample Category data - initially empty
const categories = [];

// Function to create categories from GeoJSON features
const createCategoriesFromGeoJson = (geoJsonData) => {
  geoJsonData.Category.forEach((feature, index) => {
    feature.Polygons.forEach((poly, index2) => {
      const newCategory = {
        Name: `Category ${index + 1}-${index2 + 1}`,
        Color: feature.Color,
        Coordinates: poly.Coordinates,
      };
      categories.push(newCategory);
      console.log(`Created category: ${newCategory.Name}`, newCategory);
    });
  });

  // Log the entire list of created categories
  console.log("All created categories:", categories);
};

export const renderCategoryMap = (map, geoJsonData) => {
  if (!geoJsonData) {
    return;
  }

  // Create categories based on GeoJSON data
  createCategoriesFromGeoJson(geoJsonData);

  // Render each category
  categories.forEach((category) => {
    const leafletCoordinates = category.Coordinates.map((coord) => [
      coord[1],
      coord[0],
    ]);

    L.polygon(leafletCoordinates, {
      color: category.Color,
      fillColor: category.Color,
      fillOpacity: 0.5,
      weight: 2,
    }).addTo(map);
  });
};

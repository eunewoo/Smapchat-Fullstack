import L from "leaflet";

// Function to blend two colors based on a percentage
const blendColors = (color1, color2, percentage) => {
  // Assuming color1 and color2 are hex colors (e.g., #FF0000)
  let r = Math.round(
    parseInt(color1.substring(1, 3), 16) * (1 - percentage) +
      parseInt(color2.substring(1, 3), 16) * percentage,
  );
  let g = Math.round(
    parseInt(color1.substring(3, 5), 16) * (1 - percentage) +
      parseInt(color2.substring(3, 5), 16) * percentage,
  );
  let b = Math.round(
    parseInt(color1.substring(5, 7), 16) * (1 - percentage) +
      parseInt(color2.substring(5, 7), 16) * percentage,
  );

  return `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
};

// Sample Category data - initially empty
const categories = [];

const createCategoriesFromGeoJson = (geoJsonData) => {

  const max = geoJsonData.Location.reduce((a, b) => a.Value > b.Value ? a : b).Value;

  geoJsonData.Location.forEach((feature, index) => {
    const scalePercentage = feature.Value / max; // Calculate the percentage (0 to 1)
    const categoryColor = blendColors(
      geoJsonData.MinColor,
      geoJsonData.MaxColor,
      scalePercentage,
    );

    const newCategory = {
      CategoryId: index + 1,
      Name: `Category ${index + 1}`,
      Color: categoryColor,
      Coordinates: feature.Polygon.Coordinates,
    };
    categories.push(newCategory);
    console.log(`Created category: ${newCategory.Name}`, newCategory);
  });

  console.log("All created categories:", categories);
};

export const renderScaleMap = (map, geoJsonData) => {
  if (!geoJsonData) {
    return;
  }

  createCategoriesFromGeoJson(geoJsonData);

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

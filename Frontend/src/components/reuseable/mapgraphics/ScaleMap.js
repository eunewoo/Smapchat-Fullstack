import L from "leaflet";

// Function to convert value into color based on min, max color
const blendColors = (color1, color2, percentage) => {
  let r = Math.round(
    parseInt(color1.substring(1, 3), 16) * (1 - percentage) +
      parseInt(color2.substring(1, 3), 16) * percentage
  );
  let g = Math.round(
    parseInt(color1.substring(3, 5), 16) * (1 - percentage) +
      parseInt(color2.substring(3, 5), 16) * percentage
  );
  let b = Math.round(
    parseInt(color1.substring(5, 7), 16) * (1 - percentage) +
      parseInt(color2.substring(5, 7), 16) * percentage
  );

  return `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
};

// Boundaries is the array of coordinates that is formed when render map data in MapRenderer.js file
// Function to color a specific boundary based on lat, lng
const colorBoundary = (lat, lng, color, boundaries, map) => {
  boundaries.forEach((boundary) => {
    // If certain point's lat,lng is in the boundary, color the boundary with that point's color value
    if (
      L.polygon(boundary.layer.getLatLngs()).getBounds().contains([lat, lng])
    ) {
      const layer = boundary.layer;
      layer.setStyle({
        fillColor: color,
        fillOpacity: 0.5,
        weight: 2,
      });
      // Add the color changes on map
      map.addLayer(layer);
    } else {
      console.log("Boundary does not contain the point!");
    }
  });
};

// Function to create categories array that contains sample datas
const createCategoriesFromData = (data) => {
  const max = data.Location.reduce((a, b) => (a.Value > b.Value ? a : b)).Value;
  return data.Location.map((location, index) => {
    const scalePercentage = location.Value / max;
    const categoryColor = blendColors(
      data.MinColor,
      data.MaxColor,
      scalePercentage
    );

    return {
      CategoryId: index + 1,
      Name: location.Name,
      Color: categoryColor,
      Position: [location.Lattitude, location.Longitude],
    };
  });
};

// Main function to render the scale map
export const renderScaleMap = (map, data, boundaries) => {
  if (!data) {
    console.log("data is not provided for main function.");
    return;
  }

  // Categories is array that contains sample data
  const categories = createCategoriesFromData(data);

  // Color boundaries of geojson data, if it contains data's lat,lng
  categories.forEach((category) => {
    colorBoundary(
      category.Position[0],
      category.Position[1],
      category.Color,
      boundaries,
      map
    );
  });
};

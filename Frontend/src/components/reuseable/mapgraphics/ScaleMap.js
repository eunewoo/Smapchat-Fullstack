import L from "leaflet";
import * as turf from "@turf/turf";
// import { boundaries } from "./MapRenderer.js"; // Import boundaries from MapRenderer.js

// Function to blend two colors based on a percentage
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

// Assuming blendColors function is already defined here

// Function to color a specific boundary based on lat, lng
const colorBoundary = (lat, lng, color, boundaries) => {
  boundaries.forEach((boundary) => {
    // Check if the boundary polygon contains the given lat, lng
    if (
      L.polygon(boundary.layer.getLatLngs()).getBounds().contains([lat, lng])
    ) {
      boundary.layer.setStyle({
        fillColor: color,
        fillOpacity: 0.5,
        weight: 2,
      });
    } else {
      console.log("fail to colorboundary!");
    }
  });
};

// Function to create categories from data
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
    return;
  }

  const categories = createCategoriesFromData(data);

  categories.forEach((category) => {
    console.log("lat,long", category.Position[0]);
    colorBoundary(
      category.Position[0],
      category.Position[1],
      category.Color,
      boundaries
    );
  });
};

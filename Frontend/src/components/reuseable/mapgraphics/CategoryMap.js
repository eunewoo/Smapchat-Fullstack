import L from "leaflet";

// Function to color a specific boundary based on lat, lng
const colorBoundary = (lat, lng, color, boundaries, map) => {
  boundaries.forEach((boundary) => {
    if (
      L.polygon(boundary.layer.getLatLngs()).getBounds().contains([lat, lng])
    ) {
      boundary.layer.setStyle({
        fillColor: color,
        fillOpacity: 0.5,
        weight: 2,
      });
      map.addLayer(boundary.layer);
    } else {
      console.log("category colorBoundary failed");
    }
  });
};

// Main function to render the category map
export const renderCategoryMap = (map, data, boundaries) => {
  if (!data) {
    return;
  }

  data.Category.forEach((category) => {
    category.Locations.forEach((location) => {
      colorBoundary(
        location.Lattitude,
        location.Longitude,
        category.Color,
        boundaries,
        map
      );
    });
  });
};

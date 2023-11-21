import L from "leaflet";

function isMarkerInsidePolygon(latlng, poly) {
  var inside = false;
  var x = latlng[0], y = latlng[1];
  for (var ii=0;ii<poly.getLatLngs().length;ii++){
      var polyPoints = poly.getLatLngs()[ii];
      for (var i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++) {
          var xi = polyPoints[i].lat, yi = polyPoints[i].lng;
          var xj = polyPoints[j].lat, yj = polyPoints[j].lng;

          var intersect = ((yi > y) != (yj > y))
              && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
          if (intersect) inside = !inside;
      }
  }

  return inside;
};

// Function to color a specific boundary based on lat, lng
const colorBoundary = (lat, lng, color, boundaries, map) => {
  boundaries.forEach((boundary) => {

    var inside = false;

    boundary.layer.getLatLngs().forEach((poly) => {
      inside = inside | isMarkerInsidePolygon([lat, lng], L.polygon(poly))
    });
    if (
      inside
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
        map,
      );
    });
  });
};

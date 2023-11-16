import L from "leaflet";

export const renderArrowMap = (map, data) => {
  if (data == null) {
    return;
  }

  const arrowMapData = convertJsonToArrowMapData(data);
  const processedData = processArrowData(arrowMapData);

  // Marker (pinpoint) drawing on map
  processedData.forEach((point) => {
    // Create a marker with a label for the order number
    const marker = L.marker(point.position, {
      // Use a Leaflet DivIcon to style the label
      icon: new L.DivIcon({
        className: "my-div-icon",
        html: `<span>${point.order}</span>`,
      }),
    }).addTo(map);

    // Bind a popup with name and date information
    marker.bindPopup(`<b>${point.name}</b><br>Date: ${point.date}`);
  });

  // Draw arrows (polylines) between points
  if (processedData.length > 1) {
    const polyline = L.polyline(
      processedData.map((point) => point.position),
      { color: "blue" },
    );
    polyline.addTo(map);
  }
};

const convertJsonToArrowMapData = (json) => {
  return json.Location.map((loc, index) => ({
    name: loc.Name,
    latitude: loc.Lattitude,
    longitude: loc.Longitude,
    order: loc.Order,
    date: loc.Date,
  }));
};

const processArrowData = (arrowMapData) => {
  return arrowMapData
    .sort((a, b) => a.order - b.order)
    .map((point) => ({
      position: [point.latitude, point.longitude],
      name: point.name,
      order: point.order,
      date: point.date,
    }));
};

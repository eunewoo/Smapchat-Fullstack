import L from "leaflet";
import locationIcon from "../../../assets/images/location.png";

export const renderArrowMap = (map, data) => {
  if (data == null) {
    return;
  }

  const arrowMapData = convertJsonToArrowMapData(data);
  console.log(arrowMapData);
  const processedData = processArrowData(arrowMapData);

  // Marker (pinpoint) drawing on map
  processedData.forEach((point) => {
    // Create a marker with a label for the order number
    const marker = L.marker(point.position, {
      // Use a Leaflet DivIcon to style the label
      icon: new L.DivIcon({
        className: "my-div-icon",
        html: `
        <img src=${locationIcon} width=24px, height=24px></img>
        <div style="width:64px; background:white; border-radius:10px; box-shadow:2px 2px 10px #000000AA;">
        <p style="width:64px; text-align:center;">${point.name}</p>
        </div>`,
        iconAnchor: [12, 24]
      }),
    }).addTo(map);

    // Bind a popup with name and date information
    marker.bindPopup(`<b>${point.name}</b><br>Date: ${point.date}`);
  });

  // Draw arrows (polylines) between points
  if (processedData.length > 1) {
    const polyline = L.polyline(
      processedData.map((point) => point.position),
      { color: "#4488FF" }
    );
    polyline.addTo(map);
  }
};

const convertJsonToArrowMapData = (json) => {
  return json.Location.map((loc, index) => ({
    name: loc.Name,
    lattitude: loc.Lattitude,
    longitude: loc.Longitude,
    order: loc.Order,
    date: loc.Date,
  }));
};

const processArrowData = (arrowMapData) => {
  return arrowMapData
    .sort((a, b) => a.order - b.order)
    .map((point) => ({
      position: [point.lattitude, point.longitude],
      name: point.name,
      order: point.order,
      date: point.date,
    }));
};

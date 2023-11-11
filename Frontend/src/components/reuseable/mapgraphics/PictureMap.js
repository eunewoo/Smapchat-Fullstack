// pictureMap.js
import L from 'leaflet';

const libraryData = [
    {
      LibraryID: 1,
      name: "Library A",
      images: ["imageA1.jpg", "imageA2.jpg"]
    },
    {
      LibraryID: 2,
      name: "Library B",
      images: ["imageB1.jpg", "imageB2.jpg"]
    },
  ];
  

export const renderPictureMap = (map, pictureMapData) => {
    pictureMapData.forEach(location => {
        // Add marker for each location
        const marker = L.marker([location.latitude, location.longitude]).addTo(map);

        // Fetch images for this location's library
        const library = libraryData.find(lib => lib.LibraryID === location.libraryIds);
        const images = library ? library.images : [];

        // Create a popup with images for each marker
        const popupContent = document.createElement('div');
        images.forEach(imageUrl => {
            const img = document.createElement('img');
            img.src = imageUrl;  
            img.style.maxWidth = '100px'; 
            popupContent.appendChild(img);
        });

        marker.bindPopup(popupContent);
    });
};

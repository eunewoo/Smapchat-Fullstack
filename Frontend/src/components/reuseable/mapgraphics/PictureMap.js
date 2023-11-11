// pictureMap.js
import L from 'leaflet';

// Sample data of PictureMapLocation
const pictureMapData = {
  LocationID: 101,  
  name: "New York",
  libraryIds: [1, 2],  
  longitude: "73.9654",  
  latitude: "40.7829"  
};

// Sample data of Library schema
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
        // Add marker(pinpoint) for each location
        const marker = L.marker([location.latitude, location.longitude]).addTo(map);

        // Find matching library using location data
        const library = libraryData.find(lib => lib.LibraryID === location.libraryIds);
        const images = library ? library.images : [];

       // Create a popup with the first image for each marker(pinpoint)
       const popupContent = document.createElement('div');
       if (images.length > 0) {
           const firstImage = document.createElement('img');
           firstImage.src = images[0];
           firstImage.style.maxWidth = '100px';
           firstImage.style.cursor = 'pointer';
           popupContent.appendChild(firstImage);

           // Event listener to display remaining images in a grid layout upon clicking the first image
           firstImage.onclick = () => {
               const gridContainer = document.createElement('div');
               gridContainer.style.display = 'grid';
               gridContainer.style.gridTemplateColumns = 'repeat(2, 1fr)'; // Adjust grid layout as needed
               gridContainer.style.gap = '10px';
               gridContainer.style.maxWidth = '200px'; // Adjust size as needed

               images.forEach((imageUrl, index) => {
                   if (index > 0) { // Skip the first image
                       const img = document.createElement('img');
                       img.src = imageUrl;
                       img.style.maxWidth = '100%';
                       gridContainer.appendChild(img);
                   }
               });

               // Replace the popup content with the grid container
               popupContent.innerHTML = '';
               popupContent.appendChild(gridContainer);
               marker.getPopup().update();
           };
       }


        marker.bindPopup(popupContent);
    });
};

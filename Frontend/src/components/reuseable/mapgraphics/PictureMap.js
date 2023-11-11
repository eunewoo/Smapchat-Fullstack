// pictureMap.js
import L from 'leaflet';

// Sample data of PictureMapLocation
const pictureMapData = [{
  LocationID: 101,  
  name: "New York",
  libraryIds: [1, 2, 3],  
  longitude: "-73.9654",  
  latitude: "40.7829"  
}];

// Sample data of Library schema
const libraryData = [
    {
      LibraryID: 1,
      name: "Gershwin Theater",
      images: ["https://s1.ticketm.net/dam/a/881/dd224eeb-5c9b-4340-bdbf-57351bf04881_1734241_TABLET_LANDSCAPE_LARGE_16_9.jpg", "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/f1/5f/23/gershwin.jpg?w=1200&h=1200&s=1"]
    },
    {
      LibraryID: 2,
      name: "Time Square",
      images: ["https://images.ctfassets.net/1aemqu6a6t65/46MJ6ER585Rwl3NraEIoGL/784c5eb5d87f576b5548b1a2255f08e7/tripadvisortimessquare_taggeryanceyiv_5912?w=1200&h=800&q=75", "https://cqh.imgix.net/2023/08/pexels-jose-francisco-fernandez-saura-802024.jpg?auto=compress%2Cformat&ixlib=php-3.3.1&q=70"]
    },
    {
      LibraryID: 3,
      name: "MoMA",
      images: ["https://www.moma.org/assets/visit/entrance-image--museum-crop-7516b01003659172f2d9dbc7a6c2e9d9.jpg", "https://www.centralpark.com/downloads/10179/download/moma-starry-night-van-gogh.jpg?cb=f28f20d165ded9568f8fe897a41e19fe&w=1100"]
    },
];

export const renderPictureMap = (map) => {
    pictureMapData.forEach(location => {
        // Add marker (pinpoint) for each location
        const marker = L.marker([parseFloat(location.latitude), parseFloat(location.longitude)]).addTo(map);

        // Find matching libraries using location data
        const matchingLibraries = libraryData.filter(lib => location.libraryIds.includes(lib.LibraryID));
        const images = matchingLibraries.flatMap(lib => lib.images);

        // Create a popup with the first image for each marker (pinpoint)
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

                images.slice(1).forEach(imageUrl => {
                    const img = document.createElement('img');
                    img.src = imageUrl;
                    img.style.maxWidth = '100%';
                    gridContainer.appendChild(img);
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

// pictureMap.js
import L from 'leaflet';

// Sample data of PictureMapLocation
// replace with real data from database later
const samplePictureMapLocation = [
  {
  LocationID: 111,  
  name: "New York 1",
  libraryIds: [1, 2],  
  longitude: "-73.9654",  
  latitude: "40.7829"  
  },
  {
    LocationID: 222,  
    name: "New York 2",
    libraryIds: [3],  
    longitude: "-73.9776430605575",  
    latitude: "40.76157082004316"  
  }

];

// Sample data of Library schema
// replace with real data from database later
const sampleLibrary = [
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
      name: "Museum of Modern Art",
      images: ["https://images.adsttc.com/media/images/5da4/969e/3312/fd37/2b00/003c/large_jpg/01_MoMA_Photography_by_Brett_Beyer.jpg?1571067518", "https://www.moma.org/d/assets/W1siZiIsIjIwMjIvMDQvMDUvNTdnMml4eThtb180NzJfMTk0MV9DQ0NSX1ByZXNzX1NpdGUuanBnIl0sWyJwIiwiY29udmVydCIsIi1xdWFsaXR5IDkwIC1yZXNpemUgMTE4NHg2NjZeIC1ncmF2aXR5IE5vcnRoIC1jcm9wIDExODR4NjY2KzArNzkiXV0/472_1941_CCCR-Press%20Site.jpg?sha=5bdb603f03db6661"]
    },
];

export const renderPictureMap = (map) => {
  samplePictureMapLocation.forEach(location => {
      // Custom marker icon with LocationID
      const customIcon = L.divIcon({
          html: `<div style="background-color: black; padding: 5px; border-radius: 100%; text-align: center;">${location.LocationID}</div>`,
          className: 'custom-div-icon'
      });

      // Create marker with custom icon
      const marker = L.marker([parseFloat(location.latitude), parseFloat(location.longitude)], { icon: customIcon }).addTo(map);

      // Find matching libraries
      const matchingLibraries = sampleLibrary.filter(lib => location.libraryIds.includes(lib.LibraryID));

      // Popup content for the first image and location name
      const popupContent = document.createElement('div');
      const firstLibrary = matchingLibraries[0];
      if (firstLibrary && firstLibrary.images.length > 0) {
          const firstImage = document.createElement('img');
          firstImage.src = firstLibrary.images[0];
          firstImage.style.maxWidth = '100px';
          firstImage.style.cursor = 'pointer';
          popupContent.appendChild(firstImage);

          const locationName = document.createElement('div');
          locationName.textContent = location.name;
          popupContent.appendChild(locationName);

          // Click event to display remaining images in a grid layout
          firstImage.onclick = () => {
              const gridContainer = document.createElement('div');
              gridContainer.style.display = 'grid';
              gridContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
              gridContainer.style.gap = '10px';
              gridContainer.style.maxWidth = '200px';

              matchingLibraries.forEach(lib => {
                  const libraryName = document.createElement('div');
                  libraryName.textContent = lib.name;
                  gridContainer.appendChild(libraryName);

                  lib.images.forEach(imageUrl => {
                      const img = document.createElement('img');
                      img.src = imageUrl;
                      img.style.maxWidth = '100%';
                      gridContainer.appendChild(img);
                  });
              });

              popupContent.innerHTML = '';
              popupContent.appendChild(gridContainer);
              marker.getPopup().update();
          };
      }

      marker.bindPopup(popupContent);
  });
};
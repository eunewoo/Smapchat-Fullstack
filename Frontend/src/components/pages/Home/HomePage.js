import React from "react";
import "./HomePage.css";
import ScrollableGallery from "../../reuseable/ScrollableGallery";
import SearchWidget from "../../reuseable/SearchWidget";

const HomePage = () => {
  return (
    <div className="container-fluid mt-4">
      {/* remove height and color from the css when you add components */}

      <div className="row justify-content-center">
        <div className="left">
          <ScrollableGallery numberOfColumns={2} height={125} />
        </div>

        <div className="right">
          <SearchWidget />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

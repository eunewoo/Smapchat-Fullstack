import React from "react";
import { Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import "./HomePage.css";
import ScrollableGallery from "../../reuseable/ScrollableGallery";
import SearchWidget from "../../reuseable/SearchWidget";
import { fetchPublicMaps } from "../../../util/mapUtil";

const HomePage = () => {

  const fetchData = async (page, limit) => {
    try {
      return await fetchPublicMaps(page, limit);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [maps, setMaps] = useState([]);
  const [searchTerm, setSearchTermp] = useState("");

        return (
          <div className="container-fluid mt-4">
            {/* remove height and color from the css when you add components */}

            <div className="row justify-content-center">
              <div className="left">
                <ScrollableGallery
                  numberOfColumns={4}
                  height={125}
                  mapDataArray={maps}
                  fetchFunction={fetchData}
                />
              </div>

              <div className="right">
                <SearchWidget />
              </div>
            </div>
          </div>
        );
    
};

export default HomePage;

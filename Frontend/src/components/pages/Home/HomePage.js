import React, { useRef } from "react";
import { Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import "./HomePage.css";
import ScrollableGallery from "../../reuseable/ScrollableGallery";
import SearchWidget from "../../reuseable/SearchWidget";
import { fetchPublicMaps, fetchPublicSearchMaps } from "../../../util/mapUtil";

const HomePage = () => {

  const fetchData = async (page, limit) => {
    try {
      if (!searchTerm){
        console.log("all!");
        return await fetchPublicMaps(page, limit);

      }
      else {
        return await fetchPublicSearchMaps(searchTerm, page, limit);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [maps, setMaps] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const setSearch = (value) => {
    if (value != searchTerm) {
      setSearchTerm(value);
      console.log("setSearch");
    }
  }

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
                  lastSearch={searchTerm}
                />
              </div>

              <div className="right">
                <SearchWidget 
                  setSearchTerm={setSearch}/>
              </div>
            </div>
          </div>
        );
    
};

export default HomePage;

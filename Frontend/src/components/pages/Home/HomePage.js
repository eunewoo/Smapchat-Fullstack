import React from "react";
import { Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import "./HomePage.css";
import ScrollableGallery from "../../reuseable/ScrollableGallery";
import SearchWidget from "../../reuseable/SearchWidget";
import { fetchPublicMaps } from "../../../util/mapUtil";

const HomePage = () => {

  const [maps, setMaps] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try { // relace this
        var maps = await fetchPublicMaps();
        setMaps(maps);
        console.log("fetch set true");
        setDataFetched(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

    if (dataFetched) {
        return (
          <div className="container-fluid mt-4">
            {/* remove height and color from the css when you add components */}

            <div className="row justify-content-center">
              <div className="left">
                <ScrollableGallery
                  numberOfColumns={4}
                  height={125}
                  mapDataArray={maps}
                />
              </div>

              <div className="right">
                <SearchWidget />
              </div>
            </div>
          </div>
        );
    } else { 
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <div className="text-center">
          <Spinner animation="border" role="status" variant="primary">
            <span className="sr-only"></span>
          </Spinner>
          <p className="ml-2 mt-2">Loading...</p>
        </div>
      </div>
    );
  }
};

export default HomePage;

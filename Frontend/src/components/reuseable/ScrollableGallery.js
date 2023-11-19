import React, { useState, useEffect } from "react";
import MapCard from "./MapCard";
import { Spinner } from "react-bootstrap";
import "./ScrollableGallery.css";

/// A scrollable container for MapCard components. Used for
/// the gallery screens to allow users to scroll through many
/// screens of possible maps to view.
export default function ScrollableGallery(props) {
  // Persist elements through re-render
  const [elements, setElements] = useState([]);
  // tracks which row needs be loaded next
  // each row typically has 3 maps (may change?)
  const [row, setRow] = useState(0);
  const [dataFetched, setDataFetched] = useState(false);
  const [bottom, setBottom] = useState(false);

  const numberOfColumns = props.numberOfColumns;
  const height = props.height;

  const addRowOfMapCards = () => {

    if (bottom) {
      return;
    }

    props.fetchFunction(row + 1, numberOfColumns).then((mapDataArray) => {

      console.log(mapDataArray);

      if (!mapDataArray || !Array.isArray(mapDataArray) || mapDataArray.length <= 0) {
        setBottom(true);
        console.log("No more maps!");
        return;
      }

      const newRow = (
        <div className="row" key={`row-${row}`}>
          {mapDataArray.map((mapData, index) => (
            <MapCard
              key={`row-${row}-card-${index}`}
              numberOfColumns={numberOfColumns}
              mapData={mapData}
            />
          ))}
        </div>
      );
  
      setDataFetched(true);

      setElements([...elements, newRow]);
      setRow(row + 1);
    })
  };

  // Initial load
  useEffect(() => {
    if (elements.length === 0) {
      console.log(props.fetchFunction)
      addRowOfMapCards();
    }
  }, [elements, numberOfColumns, row]);


  // This handler handles the scrolling event, which will
  // fetch a new set of maps and create map cards for them
  // when the user is 90% of the way down the current scroll
  const handleScroll = (event) => {
    if (
      event.currentTarget.scrollTop >=
      event.currentTarget.scrollTopMax * 0.9
    ) {
      addRowOfMapCards();
    }
  };

  if (dataFetched) {
    return (
    <div
      className="scroller"
      style={{ height: `calc(100vh - ${height}px)` }}
      onScroll={handleScroll}
    >
      {elements}
    </div>);
    } 
    else { 
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
}

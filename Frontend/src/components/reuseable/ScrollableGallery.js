import React, { useState, useEffect } from "react";
import MapCard from "./MapCard";
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

  const numberOfColumns = props.numberOfColumns;
  const height = props.height;

  // TODO: Replace with actual get to fetch a row
  const addRowOfMapCards = () => {
    const newRow = (
      <div className="row" key={`row-${row}`}>
        {Array.from({ length: 6 }, (_, index) => (
          <MapCard
            key={`row-${row}-card-${index}`}
            numberOfColumns={numberOfColumns}
          />
        ))}
      </div>
    );
    setElements([...elements, newRow]);
    setRow(row + 1);
  };

  // Initial load
  useEffect(() => {
    if (elements.length === 0) {
      addRowOfMapCards();
    }
  }); // Dependency array ensures this only runs when elements.length changes

  // This handler handles the scrolling event, which will
  // fetch a new set of maps and create map cards for them
  // when the user is 90% of the way down the current scroll
  const handleScroll = (event) => {
    if (
      event.currentTarget.scrollTop >=
      event.currentTarget.scrollTopMax * 0.9
    ) {
      console.log(
        `${event.currentTarget.scrollTop} exceeds ${
          event.currentTarget.scrollTopMax * 0.9
        } expanding list`
      );
      // TODO: Replace with actual get to fetch a row
      addRowOfMapCards();
    }
  };

  return (
    <div
      className="scroller"
      style={{ height: `calc(100vh - ${height}px)` }}
      onScroll={handleScroll}
    >
      {elements}
    </div>
  );
}

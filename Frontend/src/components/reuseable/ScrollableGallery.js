import React, { useState } from "react";
import MapCard from "./MapCard";
import './ScrollableGallery.css';

/// A scrollable container for MapCard components. Used for
/// the gallery screens to allow users to scroll through many
/// screens of possible maps to view.
export default function ScrollableGallery(props) {

    // Persist elements through re-render
    const [elements] = useState([]);
    // tracks which row needs be loaded next
    // each row typically has 3 maps (may change?)
    const [row, setRow] = useState(0);

    // TODO: Replace with actual get to fetch a row
    if (elements.length <= 5) {
        elements.push(
                <MapCard/>

        );

        setRow(row + 1);
    }

    // This handler handles the scrolling event, which will
    // fetch a new set of maps and create map cards for them
    // when the user is 90% of the way down the current scroll
    const handleScroll = event => {
        if (event.currentTarget.scrollTop >= event.currentTarget.scrollTopMax * 0.9) {
            
            console.log(`${event.currentTarget.scrollTop} exceeds ${event.currentTarget.scrollTopMax * 0.9} expanding list`);
            // TODO: Replace with actual get to fetch a row
            elements.push(
                    <MapCard/>
            );

            setRow(row + 1);
        }
    };

    return (
        <div className="scroller" onScroll={handleScroll}>
            {elements}
        </div>
    );
}
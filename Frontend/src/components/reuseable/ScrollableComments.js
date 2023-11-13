import React, { useState } from "react";
import Comment from "./Comment";
import './ScrollableComments.css';

/// A scrollable container for Comment components. Used for
/// the vie screen to browse comments
export default function ScrollableComments(props) {

    // Persist elements through re-render
    const [elements] = useState([]);
    // tracks which row needs be loaded next
    const [row, setRow] = useState(0);

    // TODO: Replace with actual get to fetch a row
    if (elements.length <= 0) {
        elements.push(
            <Comment/>
        );

        setRow(row + 1);
    }

    // This handler handles the scrolling event, which will
    // fetch a new comment  when the user is 90% of the way
    // down the current scroll
    const handleScroll = event => {
        if (event.currentTarget.scrollTop >= event.currentTarget.scrollTopMax * 0.9) {
            
            console.log(`${event.currentTarget.scrollTop} exceeds ${event.currentTarget.scrollTopMax * 0.9} expanding list`);
            // TODO: Replace with actual get to fetch a row
            elements.push(
                <Comment/>
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
import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import MapCard from "./MapCard";
import './ScrollableGallery.css';

/// A scrollable container for MapCard components. Used for
/// the gallery screens to allow users to scroll through many
/// screens of possible maps to view.
export default function ScrollableGallery(props) {

    const [elements, setElements] = useState([]);
    const [row, setRow] = useState(0);

    // TODO: Replace with actual get to fetch a row
    if (elements.length <= 0) {
        elements.push(
            <Row className="row">
                <MapCard/>
                <MapCard/>
                <MapCard/>
            </Row>
        );

        setRow(row + 1);
    }

    const handleScroll = event => {
        if (event.currentTarget.scrollTop >= event.currentTarget.scrollTopMax * 0.9) {
            
            console.log(`${event.currentTarget.scrollTop} exceeds ${event.currentTarget.scrollTopMax * 0.9} expanding list`);
            // TODO: Replace with actual get to fetch a row
            elements.push(
                <Row className="row">
                    <MapCard/>
                    <MapCard/>
                    <MapCard/>
                </Row>
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
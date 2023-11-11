import { useContext, useReducer, useState } from "react"
import UserPopup from "../popups/UserPopup";
import { webFetch } from "../../util/webUtil";
import { navContext } from "../../App";
import UserPage from "./UserPage";
import MapCard from "../reuseable/MapCard";
import Comment from "../reuseable/Comment";
import ScrollableGallery from "../reuseable/ScrollableGallery";
import ScrollableComments from "../reuseable/ScrollableComments";
import SearchWidget from "../reuseable/SearchWidget";

import arrowData from "../editor/SampleArrowMap.json";
import ArrowMapToolbox from "../editor/ArrowMapToolbox";
import TransactionHandler from "../editor/TransactionHandler";

export default function PublicGallery() {

    const nav = useContext(navContext);

    /// This is for testing, but serves as an example of how to use the TransactionHandler
    /// we should set up a state variable for the JSON data we are mutating, a reducer
    /// so our transaction handler can force re-renders on un/redo, and then pass those
    /// to a new TransactionHandler. We can then pass this handler as props to the various
    /// components on an editing page.
    const [data] = useState(arrowData);
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const handler = useState(new TransactionHandler(data, forceUpdate))[0];

    return (
        <>
            Hello, I am the map page!
            <button onClick={() => nav(<UserPage/>)}> Users </button>

            <Comment/>
            <MapCard/>  
            <SearchWidget/>
            <ScrollableGallery/>  
            <ScrollableComments/>     

            <ArrowMapToolbox handler={handler} arrowMap={data}/>
        </>
    );
}
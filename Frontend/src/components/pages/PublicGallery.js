import { useContext, useState } from "react"
import UserPopup from "../popups/UserPopup";
import { webFetch } from "../../util/webUtil";
import { navContext } from "../../App";
import UserPage from "./UserPage";
import MapCard from "../reuseable/MapCard";
import Comment from "../reuseable/Comment";
import ScrollableGallery from "../reuseable/ScrollableGallery";
import ScrollableComments from "../reuseable/ScrollableComments";

export default function PublicGallery() {

    const nav = useContext(navContext);

    return (
        <>
            Hello, I am the map page!
            <button onClick={() => nav(<UserPage/>)}> Users </button>

            <Comment/>
            <MapCard/>  
            <ScrollableGallery/>  
            <ScrollableComments/>      
        </>
    );
}
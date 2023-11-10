import { useContext, useState } from "react"
import UserPopup from "../popups/UserPopup";
import { webFetch } from "../../util/webUtil";
import { navContext } from "../../App";
import UserPage from "./UserPage";

export default function PublicGallery() {

    const nav = useContext(navContext);

    return (
        <>
            Hello, I am the map page!
            <button onClick={() => nav(<UserPage/>)}> Users </button>
        </>
    );
}
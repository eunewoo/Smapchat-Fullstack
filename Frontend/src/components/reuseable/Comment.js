import { useState } from "react";

/// Component which displays a single comment. Takes the
/// ID of the desired comment as a string in the ID prop.
export default function Comment(ID) {

    /// Comment data must be fetched first as it contains the userID
    /// of the user we want to display.
    const [commentData, setCommentData] = useState({});
    const [commentUser, setCommentUser] = useState({});

    // TODO: Implement fetch calls for backend to populate state
    // fetch comment data then fetch user data after

    return (
        <>
            {/* TODO: Image placeholder? */}
            <img src={commentUser.avatar ?? ''}></img> 
            <p>{commentUser.username ?? 'Loading...'}</p>
            <p>{commentData.content ?? 'Loading...'}</p>
        </>
    );
}
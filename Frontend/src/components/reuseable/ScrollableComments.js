import React, { useState, useEffect } from "react";
import CommentComponent from "./CommentComponent";
import "./ScrollableComments.css";
import { fetchComments } from "../../util/commentUtil";

/// A scrollable container for Comment components. Used for
/// the vie screen to browse comments
export default function ScrollableComments(props) {
  const mapId = props.mapId;
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMoreComments, setHasMoreComments] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleFetchComments = async (pageNumber) => {
    return await fetchComments(mapId, pageNumber, 20);
  };

  const addComments = async () => {
    if (!hasMoreComments) return;
    console.log("later fetching moreCom: ", hasMoreComments);

    setIsLoading(true);

    const newComments = await handleFetchComments(page);
    console.log(newComments);
    if (newComments && newComments.length > 0) {
      setComments([...comments, ...newComments]);
      setPage(page + 1);
    } else {
      setHasMoreComments(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    addComments();
  }, []);

  // This handler handles the scrolling event, which will
  // fetch a new comment  when the user is 90% of the way
  // down the current scroll
  const handleScroll = (event) => {
    console.log("scrolling");
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    const isBottom = scrollTop + clientHeight >= scrollHeight * 0.9;

    if (isBottom && !isLoading) {
      console.log(`expanding list`);

      addComments();
    }
  };

  return (
    <>
      {comments.length == 0 ? (
        <div style={{ color: "lightgrey" }}>No Comments</div>
      ) : (
        <div className="scroller" onScroll={handleScroll}>
          {comments.map((comment, index) => (
            <CommentComponent key={`comment-${index}`} {...comment} />
          ))}
        </div>
      )}
    </>
  );
}

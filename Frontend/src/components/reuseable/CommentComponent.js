import { useState } from "react";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import { BsHandThumbsUp, BsHandThumbsDown } from "react-icons/bs";
import "./Comment.css";

/// Component which displays a single comment. Takes the
/// ID of the desired comment as a string in the ID prop.
export default function CommentComponent(props) {
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="Comment">
      <Image
        className="Avatar"
        src={
          props.commenterAvatar == ""
            ? require("../../assets/images/avatar.png")
            : props.commenterAvatar
        }
        roundedCircle
      />
      <Card style={{ width: "100%", border: "none" }}>
        <Card.Body>
          <Card.Title className="text-start">
            {props.commenterUsername ?? "Loading..."}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted text-start">
            {" "}
            {props.likes.length - props.disLikes.length} likes *{" "}
            {formatDate(props.date)}
          </Card.Subtitle>
          <Card.Text className="text-start">{props.content}</Card.Text>
        </Card.Body>
      </Card>

      <div className="Rating">
        {/*TODO: These will need OnClick implementation!*/}
        <BsHandThumbsUp className="Button" />
        <BsHandThumbsDown className="Button" />
      </div>
    </div>
  );
}

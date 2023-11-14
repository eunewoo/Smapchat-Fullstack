import { useState } from "react";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import {
  BsFillHandThumbsUpFill,
  BsFillHandThumbsDownFill,
} from "react-icons/bs";
import "./Comment.css";

/// Component which displays a single comment. Takes the
/// ID of the desired comment as a string in the ID prop.
export default function CommentComponent(props) {
  /// Comment data must be fetched first as it contains the userID
  /// of the user we want to display.
  const [commentData, setCommentData] = useState({});
  const [commentUser, setCommentUser] = useState({});

  // TODO: Implement fetch calls for backend to populate state
  // fetch comment data then fetch user data after

  // Temporary hardcoded data for build 2!
  if (Object.keys(commentData).length === 0) {
    setCommentData({
      content:
        "This map is really cool! I like it asf, fsih, sda, w da, asdsadasdwafs sadas safassfaasasf, fsih, sda, w da, asdsadasdwafs sadas safassfaasasf, fsih, sda, w da, asdsadasdwafs sadas safassfaasasf, fsih, sda, w da, asdsadasdwafs sadas safassfaasasf, fsih, sda, w da, asdsadasdwafs sadas safassfaasasf, fsih, sda, w da, ",
      date: "1/1/1970",
    });

    setCommentUser({
      avatar:
        "http://wallup.net/wp-content/uploads/2016/03/10/319576-photography-landscape-nature-water-grass-trees-plants-sunrise-lake.jpg",
      username: "Commenter",
    });
  }

  return (
    <div className="Comment">
      <Image className="Avatar" src={commentUser.avatar} roundedCircle />
      <Card style={{ width: "100%", border: "none" }}>
        <Card.Body>
          <Card.Title className="text-start">
            {commentUser.username ?? "Loading..."}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted text-start">
            {" "}
            on {commentData.date}
          </Card.Subtitle>
          <Card.Text className="text-start">
            {commentData.content ?? "Loading..."}
          </Card.Text>
        </Card.Body>
      </Card>

      <div className="Rating">
        {/*TODO: These will need OnClick implementation!*/}
        <BsFillHandThumbsUpFill className="Button" />
        <BsFillHandThumbsDownFill className="Button" />
      </div>
    </div>
  );
}

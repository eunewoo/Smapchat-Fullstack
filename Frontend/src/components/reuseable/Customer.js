import { useContext, useState } from "react";
import { Image, Card, Container, Button } from "react-bootstrap";
import { popContext } from "../../App";
import "./Customer.css";
import UserPopup from "../popups/UserPopup";

export default function Customer(props) {
  const [user, setUser] = useState({});
  const setPop = useContext(popContext);

  // Temporary hardcoded data for build 2!
  if (Object.keys(user).length === 0) {
    setUser({
      avatar:
        "http://wallup.net/wp-content/uploads/2016/03/10/319576-photography-landscape-nature-water-grass-trees-plants-sunrise-lake.jpg",
      username: "Random user",
      email: "Random@User.com",
    });
  }

  return (
    <Card className="my-2">
      <Card.Body
        style={{
          backgroundColor: "#141488",
          color: "white",
          height: "40px",
          padding: "5px",
        }}
      >
        <Card.Title>{user.username ?? "Loading..."}</Card.Title>
      </Card.Body>

      <Container>
        <Image className="Avatar" src={user.avatar} roundedCircle />
        <Button
          className="button"
          onClick={() => setPop(<UserPopup user={user} />)}
        >
          View Profile
        </Button>
        <Button className="button">View Maps</Button>
        <Button variant="danger" className="redButton">
          Ban
        </Button>
      </Container>
    </Card>
  );
}

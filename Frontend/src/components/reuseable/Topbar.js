import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';

export default function Topbar() {
  return (
    <Navbar fixed="top" bg="primary" expand="lg">
      <Container>
        <Navbar.Brand>sMAPchat</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">

          <Nav className="justify-content-end">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Create</Nav.Link>
            <Nav.Link href="#link">My Maps</Nav.Link>
            <ProfileWidget/>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function ProfileWidget(props) {

  if (props.user == null)
  {
    return (
      <Button>Login</Button>
    );
  }
  else
  {
    return (
      <>
        <Image className="Avatar" src={props.user.avatar} roundedCircle />
        <Button>{props.user.username}</Button>
      </>
    );
  }
}
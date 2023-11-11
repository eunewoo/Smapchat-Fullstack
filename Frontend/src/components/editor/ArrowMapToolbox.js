export default function ArrowMapToolbox(props) {

    return (
        <>
        </>
    );
}

function ArrowMapLocation(props) {

    return (
        <Card>
        <Card.Body style={{backgroundColor: "#141488", color: "white"}}>
            <Card.Text>Search & Sort</Card.Text>
        </Card.Body>
        <Container style={{padding: "20px"}}>
            <input className="bar" placeholder="Order"></input>
            <input className="bar" placeholder="Date"></input>
        </Container>
    </Card>
    )
}
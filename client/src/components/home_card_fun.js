import React from "react";
import { Button, Card } from "react-bootstrap";

const HomeCard = (props) => {
  const pageHandler =
    props.title === "Activities"
      ? props.goToActivities
      : props.title === "Make Payment"
      ? props.goToPayment
      : props.goToVolunteer;
  return (
    <Card style={{ left: "0%", top: "80%", height: "30rem", width: "36rem" }}>
      <Card.Img variant="top" src={props.image} />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.description}</Card.Text>
        <Button
          onClick={pageHandler}
          style={{ position: "absolute", left: "0%", top: "90%" }}
          variant="dark"
          size="lg"
          block
        >
          {props.title}
        </Button>
      </Card.Body>
    </Card>
  );
};
export default HomeCard;

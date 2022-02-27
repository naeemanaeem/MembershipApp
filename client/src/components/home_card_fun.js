import React from "react";
import { Button, Card } from "react-bootstrap";
import Classes from "./home_card.module.css";

const HomeCard = (props) => {
  const pageHandler =
    props.title === "Activities"
      ? props.goToActivities
      : props.title === "Make Payment"
      ? props.goToPayment
      : props.goToVolunteer;
  return (
    <Card className={Classes.card}>
      <Card.Img variant="top" src={props.image} width="100px" height="150px" />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.description}</Card.Text>
        <Button
          onClick={pageHandler}
          className={Classes.btn}
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

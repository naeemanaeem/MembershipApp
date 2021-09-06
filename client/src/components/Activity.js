import React from "react";
import Card from "react-bootstrap/Card";

const Activity = (props) => {
  return (
    <Card
      className="card text-center"
      style={{
        width: "22rem",
        padding: "2%",
        margin: "1%",
        height: "25rem",
        fontFamily: "robo",
        cursor: "pointer",
      }}
      onClick={() => {
        props.onCardClick(props.data);
        props.onEventDetail(true);
      }}
    >
      <Card.Img
        variant="top"
        src={props.data.imageUrl}
        alt={props.data.name}
        style={{ height: "65%", width: "100%" }}
      />
      <Card.Title style={{ paddingTop: "5%", fontSize: "2rem" }}>
        {props.data.title}
      </Card.Title>
      <Card.Body>
        {props.data.tagName ? (
          <div
            style={{
              color: "white",
              backgroundColor: "orange",
              margin: "0 auto",
              width: "10rem",
              padding: "2%",
            }}
          >
            {props.data.tagName}
          </div>
        ) : null}
      </Card.Body>
    </Card>
  );
};
export default Activity;

import React from "react";
import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";

const Activity = (props) => {
  const tags = props.data.tags ? props.data.tags.split(",").slice(0, 4) : "";
  const colors = ["orange", "green", "blue", "red"];
  return (
    <Card
      className="card text-center"
      style={{
        width: "22rem",
        padding: "2%",
        margin: "1%",
        height: "30rem",
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
        {props.data.title}{" "}
        {props.data.isRecurring ? (
          <span
            style={{
              color: "black",
              backgroundColor: "yellow",
              fontSize: "0.5em",
              fontFamily: "robo",
              margin: "0 auto",
              width: "5rem",
              padding: "2%",
              borderRadius: "5px",
            }}
          >
            Recurring
          </span>
        ) : null}
      </Card.Title>

      <Card.Body>
        {props.data.tags ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            {tags.map((tag, i) => (
              <div
                key={i}
                style={{
                  color: "white",
                  width: "8rem",
                  padding: "2%",
                  margin: "1%",
                  borderRadius: "5px",
                  backgroundColor: `${colors[i]}`,
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        ) : null}
      </Card.Body>
    </Card>
  );
};
Activity.propTypes = {
  data: PropTypes.object,
  onCardClick: PropTypes.func,
  onEventDetail: PropTypes.func,
};
export default Activity;

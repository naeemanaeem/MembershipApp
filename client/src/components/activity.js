import React from "react";
import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";
import classes from "./activity.module.css";

const Activity = (props) => {
  const tags = props.data.tags ? props.data.tags.split(",").slice(0, 4) : "";

  const backgroundColors = [
    classes.orangeTag,
    classes.greenTag,
    classes.blueTag,
    classes.purpleTag,
  ];
  return (
    <Card
      className={`card text-center ${classes.card}`}
      onClick={() => {
        props.onCardClick(props.data);
        props.onEventDetail(true);
      }}
    >
      <Card.Img
        variant="top"
        src={props.data.imageUrl}
        alt={props.data.name}
        className={classes.cardImg}
      />

      <Card.Title className={classes.cardTitle}>
        {props.data.title}
        {props.data.isRecurring ? (
          <span className={classes.recurringEventTag}>Recurring</span>
        ) : null}
        <br></br>
        {props.data.isVolunteer ? (
          <span className={classes.volunteerEventTag}>
            <strong>Volunteers Needed</strong>
          </span>
        ) : null}
      </Card.Title>

      <Card.Body>
        {props.data.tags ? (
          <div className={classes.cardTags}>
            {tags.map((tag, i) => (
              <div
                key={i}
                className={classes.cardTag + " " + backgroundColors[i]}
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

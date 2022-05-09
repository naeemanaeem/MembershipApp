import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import RegisterationForm from "./registration";
import parser from "html-react-parser";
import PropTypes from "prop-types";
import classes from "./eventDetail.module.css";
import { Row } from "react-bootstrap";
import VolunteerSignup from "./applyVolunteer.js";

const EventDetail = (props) => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showVolunteerForm, setShowVolunteerForm] = useState(false);
  const handleRegisteration = () => {
    setShowRegisterForm(true);
  };
  const handleAddVolunteers = () => {
    //routeChange(props.data.eventTitle);
    setShowVolunteerForm(true);
  };
  const eventStartDate = new Date(
    props.data.startDateTime
  ).toLocaleDateString();
  const eventEndDate = new Date(props.data.endDateTime).toLocaleDateString();
  const formatTime = (datetime) => {
    let timeArray = new Date(datetime).toLocaleTimeString().split("");
    timeArray.splice(4, 3);
    return timeArray.join("");
  };

  // const routeChange = (params) => {
  //   let path = `VolunteerSignup`;
  //   //history.push(path);
  //   setShowVolunteerForm(params);
  //   console.log(params);
  // };

  const eventStartTime = formatTime(props.data.startDateTime);
  const eventEndTime = formatTime(props.data.endDateTime);
  // cost is stored in the database as integer
  // so decimal number is multiplied by 100 to convert into integer before storing.
  const cost = (props.data.cost / 100).toFixed(2);
  const hideVolunteerSignup = () => {
    // showVolunteerForm = setShowVolunteerForm(false);
    setShowVolunteerForm(false);
  };

  if (showVolunteerForm) {
    return (
      <VolunteerSignup
        event={props.data}
        hideForm={hideVolunteerSignup}
        handleSelectedEvent={props.handleSelectedEvent}
      />
    );
  } else {
    return (
      <Container>
        {showRegisterForm ? (
          <RegisterationForm
            onClose={setShowRegisterForm}
            eventTitle={props.data.title}
            eventCost={cost}
            eventId={props.data._id}
          />
        ) : (
          <Card className={classes.card}>
            <Card.Header>
              <Card.Img variant="top" src={props.data.imageUrl} />
              <div className={classes.btnsContainer}>
                <Button
                  variant="warning"
                  size="small"
                  className={classes.btn}
                  onClick={() => {
                    props.onEdit(props.data._id);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  className={classes.btn}
                  size="small"
                  onClick={() => {
                    window.confirm(
                      "Are you sure you wish to delete this event?"
                    ) &&
                      props.onDelete(
                        props.data._id,
                        props.data.title,
                        props.data.imageSrc
                      );
                  }}
                >
                  Remove
                </Button>
              </div>
            </Card.Header>

            <Card.Body>
              <Card.Title className={classes.title}>
                {props.data.title}
              </Card.Title>
              <Card.Text></Card.Text>
              <Card.Text>
                <b>Registration: </b>
                <span
                  className={
                    classes.registrationStatus +
                    " " +
                    (props.data.registration === "Open"
                      ? classes.registrationOpen
                      : classes.registrationClose)
                  }
                >
                  <em>{props.data.registration}</em>
                </span>
              </Card.Text>

              <Card.Text>
                <b>Date: </b>
                {eventStartDate}{" "}
                {eventEndDate !== eventStartDate ? " - " + eventEndDate : ""}
              </Card.Text>
              <Card.Text>
                <b>Time: </b>
                {eventStartTime} - {eventEndTime}
              </Card.Text>
              <Card.Text>
                <b>Cost: $</b>
                {cost}
              </Card.Text>
              <Card.Text>
                <b>Program Information: </b>
                {props.data.description
                  ? parser(decodeURIComponent(props.data.description))
                  : ""}
              </Card.Text>

              <Card.Text>
                {props.data.isVolunteer ? (
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <b>
                      {/* <em>Volunteers Needed: {props.data.volunteersNeeded}</em> */}
                      <em>Volunteer Slots OPEN</em>
                    </b>
                    <Button
                      style={{ marginLeft: "30px" }}
                      onClick={handleAddVolunteers}
                      size="sm"
                      variant="warning"
                      // onClick={handleAddVolunteers}
                      disabled={
                        props.data.volunteersNeeded === 0 ? true : false
                      }
                    >
                      Apply
                    </Button>
                  </div>
                ) : null}
              </Card.Text>

              <Card.Text>
                {props.data.location &&
                Object.keys(props.data.location).length > 0 ? (
                  <React.Fragment>
                    <b>Location: </b>
                    <a
                      href={`https://www.google.com/maps/place/${props.data.location.street
                        .split(" ")
                        .join("+")},+${props.data.location.city
                        .split(" ")
                        .join("+")},+${props.data.location.state}+${
                        props.data.location.zip
                      }`}
                      target="blank"
                    >
                      {(props.data.location.street
                        ? props.data.location.street
                        : "") +
                        (props.data.location.city
                          ? ",  " + props.data.location.city
                          : "") +
                        (props.data.location.state
                          ? " " + props.data.location.state
                          : "") +
                        (props.data.location.zip
                          ? " " + props.data.location.zip + "."
                          : "")}
                    </a>
                  </React.Fragment>
                ) : null}
              </Card.Text>
              <Card.Text>
                {props.data.online ? (
                  <React.Fragment>
                    <b>Meeting Link: </b>
                    <a href={props.data.meetingLink}>
                      {props.data.meetingLink}
                    </a>
                  </React.Fragment>
                ) : null}
              </Card.Text>
              <Button variant="secondary" onClick={props.onCancel}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleRegisteration}
                disabled={props.data.registration === "Close" ? true : false}
              >
                Register Now
              </Button>
            </Card.Body>
            <Card.Footer>
              *If you need help registering please send an email to: {"  "}
              <em className={classes.contactEmail}>
                <a href={`mailto:${props.data.contactEmail}`}>
                  {props.data.contactEmail}
                </a>
              </em>
            </Card.Footer>
          </Card>
        )}
      </Container>
    );
  }
};
EventDetail.propTypes = {
  data: PropTypes.object,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onCancel: PropTypes.func,
  RegisterationForm: PropTypes.node,
};
export default EventDetail;

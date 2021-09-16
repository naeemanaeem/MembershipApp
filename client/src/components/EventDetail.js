import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import RegisterationForm from "./RegisterationForm";
import parser from "html-react-parser";
const EventDetail = (props) => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const handleRegisteration = () => {
    setShowRegisterForm(true);
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

  const eventStartTime = formatTime(props.data.startDateTime);
  const eventEndTime = formatTime(props.data.endDateTime);

  return (
    <Container>
      {showRegisterForm ? (
        <RegisterationForm
          onClose={setShowRegisterForm}
          eventTitle={props.data.title}
          eventCost={(props.data.cost / 100).toFixed(2)}
        />
      ) : (
        <Card
          style={{
            margin: "5% auto",
            width: "40rem",
            padding: "4%",
            fontFamily: "robo",
          }}
        >
          <Card.Header>
            <Card.Img variant="top" src={props.data.imageUrl} />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                margin: "2%",
              }}
            >
              <Button
                variant="warning"
                size="small"
                style={{ width: "16vw" }}
                onClick={() => {
                  props.onEdit(props.data._id);
                }}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                style={{ width: "16vw" }}
                size="small"
                onClick={() => props.onDelete(props.data._id, props.data.title)}
              >
                Remove
              </Button>
            </div>
          </Card.Header>

          <Card.Body>
            <Card.Title style={{ margin: "1.5% auto", fontSize: "2rem" }}>
              {props.data.title}
            </Card.Title>
            <Card.Text></Card.Text>
            <Card.Text>
              <b>Registration: </b>
              <span
                style={
                  props.data.registration === "Open"
                    ? {
                        backgroundColor: "lightgreen",
                        padding: "1%",
                        fontWeight: "bold",
                      }
                    : {
                        backgroundColor: "red",
                        padding: "1%",
                        fontWeight: "bold",
                      }
                }
              >
                <em>{props.data.registration}</em>
              </span>
            </Card.Text>

            <Card.Text>
              <b>Date: </b>
              {/* {props.data.startDate}{" "}
              {props.data.endDate ? " - " + props.data.endDate : ""} */}
              {eventStartDate}{" "}
              {eventEndDate !== eventStartDate ? " - " + eventEndDate : ""}
            </Card.Text>
            <Card.Text>
              <b>Time: </b>
              {/* {props.data.startTime} - {props.data.endTime} */}
              {eventStartTime} - {eventEndTime}
            </Card.Text>
            <Card.Text>
              <b>Cost: $</b>
              {(props.data.cost / 100).toFixed(2)}
            </Card.Text>
            <Card.Text>
              <b>Program Information: </b>
              {props.data.description
                ? parser(decodeURIComponent(props.data.description))
                : ""}
            </Card.Text>

            <Card.Text>
              {props.location && Object.keys(props.data.location).length > 0 ? (
                <React.Fragment>
                  <b>Location: </b>

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
                </React.Fragment>
              ) : null}
            </Card.Text>
            <Card.Text>
              {props.data.online ? (
                <React.Fragment>
                  <b>Meeting Link: </b>
                  {props.data.meetingLink}
                </React.Fragment>
              ) : null}
            </Card.Text>
            <Button variant="secondary" onClick={props.hideEventDetail}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleRegisteration}>
              Register Now
            </Button>
          </Card.Body>
          <Card.Footer>
            *If you need help registering please send an email to: {"  "}
            <em style={{ color: "#007bff" }}>
              <a href={`mailto:${props.data.contactEmail}`}>
                {props.data.contactEmail}
              </a>
            </em>
          </Card.Footer>
        </Card>
      )}
    </Container>
  );
};
export default EventDetail;

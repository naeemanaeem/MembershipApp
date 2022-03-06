import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import Volunteer from "./volunteer.jsx";
import Activity from "./activity";
import ActivityForm from "./createActivity";
import EventDetail from "./eventDetail";
import { Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import PropTypes from "prop-types";
import { Form, InputGroup, Button, Container } from "react-bootstrap";
import Classes from "./applyVolunteer.module.css";

function VolunteerSignup(props) {
  const [validated, setValidated] = useState(false);
  const [showInvalid, setShowInvalid] = useState(false);
  const [memberId] = useState(localStorage.googleId);
  const [fullName, setFullName] = useState(localStorage.user_displayName);
  const [email, setEmail] = useState(localStorage.user_email);
  const [event] = useState(props.event.title);

  const [hoursAvailable, setHoursAvailable] = useState("");
  const [comments, setComments] = useState("");
  const [volunteerPosts, setVolunteerPosts] = useState([]);

  const [selectedStartInterval, setSelectedStartInterval] = useState([]);
  const [selectedEndInterval, setSelectedEndInterval] = useState([]);
  const [updatedMaxVolunteers, setUpdatedMaxVolunteers] = useState([]);
  const [updatedVolunteerSlots, setUpdatedVolunteerSlots] = useState(
    props.event.volunteerSlots
  );

  let checkedArrayLength = new Array(props.event.startInterval.length).fill(
    false
  );
  const [checked, setChecked] = useState(checkedArrayLength);

  const validEmail = (val) =>
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/i.test(val);
  const validURL = (str) => {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  };

  const formatDateTime = (datetime) => {
    let timeArray = new Date(datetime).toLocaleTimeString().split("");
    let dateArray = new Date(datetime).toLocaleDateString();
    timeArray.splice(4, 3);

    return [dateArray, timeArray.join("")];
  };

  const handleClearForm = () => {
    setFullName("");
    setEmail("");
    setComments("");
    props.hideForm();
  };

  const handleChange = (e, i) => {
    let updatedChecked = [...checked];
    updatedChecked[i] = e.target.checked;
    setChecked(updatedChecked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedStartInterval = [];
    const updatedEndInterval = [];
    let updatedMaxVolunteer = [...props.event.volunteerSlots];
    checked.forEach((interval, i) => {
      if (interval) {
        updatedStartInterval.push(props.event.startInterval[i]);
        updatedEndInterval.push(props.event.endInterval[i]);
        updatedMaxVolunteer[i] = updatedMaxVolunteer[i] - 1;
      }
    });

    const form = e.currentTarget;

    let selectedDateTime = updatedStartInterval.map((interval, i) => {
      return {
        startInterval: interval,
        endInterval: updatedEndInterval[i],
      };
    });
    let data = {
      memberId: localStorage.googleId,
      fullName: fullName,
      email: email,
      event: event,
      selectedDateTime: selectedDateTime,
      comments: comments,
    };

    axios
      .patch(`/activities/${props.event._id}`, {
        volunteerSlots: updatedMaxVolunteer,
      })
      .then((res) => {
        axios.post(`/volunteer`, data).catch((error) => {
          console.log("ERROR:", error.message);
        });
      });
    props.hideForm();
  };

  return (
    <Card className={Classes.card}>
      <h1 className="ml-5 mt-3"> Volunteer Form </h1>
      <Form
        className="form"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <Form.Group md="4" controlId="validationCustom01">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please enter your full name.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group md="4" controlId="validationCustom02">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please enter a (legitimate) email
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group md="4" controlId="validationCustom02">
          <Form.Label>Event</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Event"
            value={event}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Volunteer Dates Available</Form.Label>
          {props.event.startInterval.map((interval, i) => {
            let startDateTime = formatDateTime(interval);
            let endDateTime = formatDateTime(props.event.endInterval[i]);
            let maxVolunteers = props.event.volunteerSlots[i];
            let inputId = `${interval}, ${props.event.endInterval[i]}, ${props.event.volunteerSlots[i]}`;
            const inputStyle = showInvalid
              ? "1px solid red"
              : "1px solid lightgrey";

            if (maxVolunteers > 0) {
              return (
                <div
                  style={{
                    padding: "5px",
                    borderRadius: "4px",
                    border: inputStyle,
                    margin: "3px",
                  }}
                >
                  <label>
                    <input
                      type="checkbox"
                      id={inputId}
                      disabled={false}
                      checked={checked[i]}
                      onChange={(e) => handleChange(e, i)}
                    />{" "}
                    <span className={Classes.checkboxLabel}>
                      <strong>{startDateTime[0]}</strong> ({startDateTime[1]})
                    </span>
                    to
                    <span className={Classes.checkboxLabel}>
                      <strong>{endDateTime[0]}</strong> ({endDateTime[1]})
                    </span>
                    <span className={Classes.checkboxLabel}>
                      Slots Left: <strong>{maxVolunteers}</strong>
                    </span>
                  </label>
                </div>
              );
            } else {
              return (
                <div
                  style={{
                    border: "1px solid lightgrey",
                    padding: "5px",
                    borderRadius: "4px",
                    margin: "3px",
                  }}
                >
                  <label>
                    <input type="checkbox" id={inputId} disabled={true} />{" "}
                    <span className={Classes.checkboxLabel}>
                      <strong>{startDateTime[0]}</strong> ({startDateTime[1]})
                    </span>
                    to
                    <span className={Classes.checkboxLabel}>
                      <strong>{endDateTime[0]}</strong> ({endDateTime[1]})
                    </span>
                    <span className={Classes.checkboxLabel}>
                      Slots Left: <strong>{maxVolunteers}</strong>
                    </span>
                  </label>
                </div>
              );
            }
          })}
          {showInvalid && (
            <div type="invalid" style={{ color: "red", fontSize: "13px" }}>
              <p>Please choose at least one open slot!</p>
            </div>
          )}
        </Form.Group>

        <br></br>
        <Form.Group md="3" controlId="validationCustom06">
          <Form.Label>Comments</Form.Label>
          <Form.Control
            type="text-area"
            placeholder="Enter Any Additional Comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        </Form.Group>

        <span>
          <Button variant="danger" size="lg" onClick={handleClearForm}>
            Cancel
          </Button>
          <Button variant="dark" size="lg" type="submit" onClick={handleSubmit}>
            Sign Up
          </Button>
        </span>
      </Form>
    </Card>
  );
}

export default VolunteerSignup;

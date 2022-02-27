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
  const [memberId] = useState(localStorage.googleId);
  const [fullName, setFullName] = useState(localStorage.user_displayName);
  const [email, setEmail] = useState(localStorage.user_email);
  const [event] = useState(props.event.title);
  // const [EventDate, setEventDate] = useState(props.event.startDateTime);
  const [hoursAvailable, setHoursAvailable] = useState("");
  const [comments, setComments] = useState("");
  const [volunteerPosts, setVolunteerPosts] = useState([]);

  const [checked, setChecked] = useState([]);

  const [selectedStartInterval, setSelectedStartInterval] = useState([]);
  const [selectedEndInterval, setSelectedEndInterval] = useState([]);
  const [updatedMaxVolunteers, setUpdatedMaxVolunteers] = useState([]);
  const [updatedVolunteerSlots, setUpdatedVolunteerSlots] = useState(
    props.event.volunteerSlots
  );
  // const startIntervalDate = new Date(
  //   props.event.startInterval
  // ).toLocaleDateString();
  // const startIntervalTime = formatTime(props.event.startDateTime);

  // const endIntervalDate = new Date(
  //   props.event.endInterval
  // ).toLocaleDateString();
  // const endIntervalTime = formatTime(props.event.endDateTime);

  //...

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

  const handleCheckboxes = (e, i) => {
    let data = e.target.id.split(",");
    // let newStartInterval = [...selectedStartInterval];
    // newStartInterval[i] = data[0];

    if (e.target.checked) {
      setSelectedStartInterval([
        ...selectedStartInterval,
        new Date(data[0].trim()),
      ]);
      setSelectedEndInterval([
        ...selectedEndInterval,
        new Date(data[1].trim()),
      ]);
      setUpdatedMaxVolunteers([
        ...updatedMaxVolunteers,
        (data[2] - 1).toString(),
      ]);
      let volunteerSlot = [...updatedVolunteerSlots];
      volunteerSlot[i] = Number(data[2]) - 1;
      setUpdatedVolunteerSlots(volunteerSlot);
    } else {
      // setUpdatedMaxVolunteers([...updatedMaxVolunteers, data[2].toString()]);
      let volunteerSlot = [...updatedVolunteerSlots];
      volunteerSlot[i] = Number(data[2]);
      setUpdatedVolunteerSlots(volunteerSlot);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // const form = event.currentTarget;

    // if (form.checkValidity() === false) {
    //   event.stopPropagation();
    // }
    // setValidated(true);

    let selectedDateTime = selectedStartInterval.map((interval, i) => {
      return {
        startInterval: interval,
        endInterval: selectedEndInterval[i],
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
        // volunteerSlots: [Number(...updatedMaxVolunteers)],
        volunteerSlots: updatedVolunteerSlots,
      })
      .then((res) => {
        axios.post(`/volunteer`, data).catch((error) => {
          console.log("ERROR:", error.message);
        });
      });
    props.hideForm();
  };

  // handleFetchData();

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const form = event.currentTarget;

  //   if (form.checkValidity() === false) {
  //     event.stopPropagation();
  //   }

  //   setValidated(true);

  //   const postData = {
  //     memberId,
  //     fullName,
  //     Email,
  //     Event,
  //     EventDate,
  //     hoursAvailable,
  //   };

  //   if (
  //     window.confirm("Are you sure you want to sign up? \nPress OK or Cancel.")
  //   ) {
  //     if (
  //       Event === "selectevent" ||
  //       EventDate === "" ||
  //       hoursAvailable === ""
  //     ) {
  //       alert(
  //         "You have an issue with your form.\nEvent, Date, and Hours must be entered."
  //       );
  //     } else {
  //       axios
  //         .get("/volunteer")
  //         .then((res) => {
  //           setVolunteerPosts(res.data);
  //           var totalHours = 0;
  //           {
  //             volunteerPosts.map((volunteer) => {
  //               if (
  //                 volunteer.Event === postData.Event &&
  //                 volunteer.hoursAvailable > 0
  //               ) {
  //                 totalHours += volunteer.hoursAvailable;
  //               }
  //             });
  //           }
  //           if (totalHours < 100) {
  //             axios
  //               .post("/volunteer", postData)
  //               .then((response) => {
  //                 routeChange();
  //               })
  //               .catch((err) => {
  //                 console.log("Error in Creating Volunteer!");
  //               });
  //           } else {
  //             alert(
  //               "You are not able to sign up for this volunteer opportunity as the maximum hours needed have been reached"
  //             );
  //             Promise.reject(
  //               "You are not able to sign up for this volunteer opportunity"
  //             );
  //           }
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     }
  //   } else {
  //     event.preventDefault();
  //   }
  // };

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
            //isInvalid={!!formErrors.title}
          />
          {/* <Form.Control.Feedback type="invalid">
            {formErrors.title}
          </Form.Control.Feedback> */}
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
            Please enter your email
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

        <div>
          <Form.Label>Volunteer Dates Available</Form.Label>
          {props.event.startInterval.map((interval, i) => {
            let startDateTime = formatDateTime(interval);
            let endDateTime = formatDateTime(props.event.endInterval[i]);
            let maxVolunteers = props.event.volunteerSlots[i];
            let inputId = `${interval}, ${props.event.endInterval[i]}, ${props.event.volunteerSlots[i]}`;
            if (maxVolunteers > 0) {
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
                    <input
                      type="checkbox"
                      id={inputId}
                      disabled={false}
                      onChange={(e) => handleCheckboxes(e, i)}
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
        </div>

        {/* <Form.Group md="6" controlId="validationCustom03">
          <InputGroup hasValidation>
              <Form.Control
                as="select"
                name="state"
                type="text"
                placeholder="EventDate"
                value={EventDate}
                aria-describedby="inputGroupPrepend"
                required
              >
                {renderDropdown()}
                <option value={EventDate}>{EventDate}</option>
              </Form.Control>
            </InputGroup>
        </Form.Group>  */}

        <br></br>
        <Form.Group md="3" controlId="validationCustom06">
          <Form.Label>Comments</Form.Label>
          <Form.Control
            type="text-area"
            placeholder="Enter Any Additional Comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <span>
          <Button variant="danger" size="lg" onClick={handleClearForm}>
            Cancel
          </Button>
          <Button variant="dark" size="lg" type="submit" onClick={handleSubmit}>
            Sign Up
          </Button>
        </span>

        {/* <Button
          variant="dark"
          size="lg"
          type="submit"
          onClick={(event) => {
            const newErrors = findFormErrors();
            if (Object.keys(newErrors).length > 0) {
              setErrors(newErrors);
              alert("Please correct erros in your form entries!");
            } else {
              {
                handleSubmit;
              }
            }
            //setData({});
          }}
        >
          Sign Up
        </Button> */}
      </Form>
    </Card>

    // <Container>

    // </Container>
  );
}

export default VolunteerSignup;

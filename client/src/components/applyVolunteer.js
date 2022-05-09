import React, { useState } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import Classes from "./applyVolunteer.module.css";

function VolunteerSignup(props) {
  const [showInvalid, setShowInvalid] = useState(false);
  const [fullName, setFullName] = useState(localStorage.user_displayName);
  const [email, setEmail] = useState(localStorage.user_email);
  const [event] = useState(props.event.title);
  const [comments, setComments] = useState("");
  const checkedArrayLength = new Array(props.event.startInterval.length).fill(
    false
  );
  const [checked, setChecked] = useState(checkedArrayLength);

  const validEmail = (val) =>
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/i.test(val);

  const errors = {
    fullName: "",
    email: "",
  };
  const [formErrors, setErrors] = useState(errors);
  const findFormErrors = () => {
    const newErrors = {};
    // fullName errors
    if (!fullName || fullName === "")
      newErrors.fullName = "Please enter your full name!";
    // email errors
    if (!email || email === "") newErrors.email = "Email cannot be blank!";
    else if (validEmail(email) === false)
      newErrors.email = "Invalid Email address!";
    return newErrors;
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
    setShowInvalid(false); // changes border color of input boxes to grey
    let updatedChecked = [...checked];
    updatedChecked[i] = e.target.checked;
    setChecked(updatedChecked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      alert("Please correct errors in your form entries!");
    } else {
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

      let selectedDateTime = updatedStartInterval.map((interval, i) => {
        return {
          startInterval: interval,
          endInterval: updatedEndInterval[i],
        };
      });
      if (selectedDateTime.length === 0) {
        // if no volunteering interval selected, change input box border color to red and throw invalid input error.
        setShowInvalid(true);
      } else {
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
            props.handleSelectedEvent(res.data);
            axios
              .post(`/volunteer`, data)
              .then((response) => {
                let volunteerHours = response.data.selectedDateTime.length;
                alert(
                  `Thank you for volunteering! 
                  \n You have registered for the ${response.data.event} event. 
                  \n Volunteer Hours: ${
                    volunteerHours === 1 ? `1 hour` : `${volunteerHours} hours`
                  }`
                );
              })
              .catch((error) => {
                console.log("ERROR:", error.message);
              });
          })
          .catch((error) => {
            console.log("ERROR:", error.message);
          });
        props.hideForm();
      }
    }
  };

  return (
    <Card className={Classes.card}>
      <h1 className="ml-5 mt-3"> Volunteer Form </h1>
      <Form className="form" onSubmit={handleSubmit}>
        <Form.Group md="4" controlId="validationCustom01">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Full Name"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              if (!!formErrors.fullName)
                setErrors({
                  ...formErrors,
                  fullName: null,
                });
            }}
            isInvalid={!!formErrors.fullName}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.fullName}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group md="4" controlId="validationCustom02">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (!!formErrors.email)
                setErrors({
                  ...formErrors,
                  email: null,
                });
            }}
            isInvalid={!!formErrors.email}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group md="4" controlId="validationCustom02">
          <Form.Label>Event</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Event"
            value={event}
            readOnly
            className={Classes.event_field}
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
                  key={i}
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
                  key={i}
                >
                  <label>
                    <input type="checkbox" id={inputId} disabled={true} />
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

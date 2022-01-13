import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import Volunteer from './volunteer.jsx';



//import Select from 'react-select'


import axios from 'axios';
import {
    Form,
    InputGroup,
    Button,

    Container,
} from "react-bootstrap";


function VolunteerSignup(props) {
    const history = useHistory();


    const routeChange = (params) => {
        let path = `VolunteerTable`;
        history.push(path);
    }
    const [validated, setValidated] = useState(false);
    const [memberId] = useState(localStorage.googleId)
    const [fullName] = useState(localStorage.user_displayName);
    const [Email] = useState(localStorage.user_email);
    const [Event, setEvent] = useState('');
    const [EventDate, setEventDate] = useState('');
    const [HoursAvailable, setHoursAvailable] = useState('');
    const [volunteerPosts, setVolunteerPosts] = useState([]);



    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
        }

        setValidated(true);

        const postData = {
            memberId,
            fullName,
            Email,
            Event,
            EventDate,
            HoursAvailable
        };

        if (window.confirm("Are you sure you want to sign up? \nPress OK or Cancel.")) {
            if (Event === "selectevent" || EventDate === '' || HoursAvailable === '') {
                alert("You have an issue with your form.\nEvent, Date, and Hours must be entered.");
            }
            else {
                axios
                    .get("/volunteer")
                    .then((res) => {
                        setVolunteerPosts(res.data);
                        var totalHours = 0;
                        volunteerPosts.map((volunteer) => {

                            if (volunteer.Event === postData.Event && volunteer.HoursAvailable > 0) {

                                totalHours += volunteer.HoursAvailable;
                            }
                        });
                        if (totalHours < 100) {
                            axios
                                .post("/volunteer", postData)
                                .then(response => {
                                    routeChange();
                                })
                                .catch(err => {
                                    console.log("Error in Creating Volunteer!");
                                })
                        } else {
                            alert("You are not able to sign up for this volunteer opportunity as the maximum hours needed have been reached");
                            Promise.reject("You are not able to sign up for this volunteer opportunity");
                        }

                    })
                    .catch((err) => {
                        console.log(err);
                    });


            }


        }

        else {
            event.preventDefault();

        }


    };




    return (
        <Container>
            <h1 className="ml-5 mt-3"> Volunteer Form </h1>
            <Form className="form" noValidate validated={validated} onSubmit={handleSubmit} >
                <Form.Group md="4" controlId="validationCustom01">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter Full Name"
                        value={fullName}

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
                        value={Email}

                    />

                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                        Please enter your email.
                    </Form.Control.Feedback>
                </Form.Group>




                <Form.Group>
                    <Form.Label>Event </Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control as="select" name="state" type="text"
                            placeholder="Event"
                            value={Event}
                            onChange={(e) => setEvent(e.target.value)}

                            aria-describedby="inputGroupPrepend"
                            required>
                            <option value="selectevent">Select Event</option>
                            <option value="Family Night Setup">Family Night Setup</option>
                            <option value="Family Night Cleanup">Family Night Cleanup</option>
                            <option value="Coding Tutor">Coding Tutor</option>
                            <option value="Soccer Referee">Soccer Referee</option>
                            <option value="Sunday School Setup">Sunday School Setup</option>
                            <option value="Sunday School Cleanup">Sunday School Cleanup</option>

                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            Please choose an event.
                        </Form.Control.Feedback>
                    </InputGroup>

                </Form.Group>

                <Form.Group md="6" controlId="validationCustom03">
                    <Form.Label>Date You Want To Volunteer</Form.Label>
                    <Form.Control type="date" placeholder="mm/dd/yyyy" value={EventDate} onChange={(e) => setEventDate(e.target.value)}

                        required />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid date.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group md="3" controlId="validationCustom05">
                    <Form.Label>Enter How Many Hours You Want To Volunteer For</Form.Label>
                    <Form.Control type="text" placeholder="Hours" value={HoursAvailable} onChange={(e) => setHoursAvailable(e.target.value)}
                        required />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>

                    <Form.Control.Feedback type="invalid">
                        Please enter how many hours.
                    </Form.Control.Feedback>
                </Form.Group>



                <Button variant="dark" size='lg' type="submit" >Sign Up</Button>
            </Form>
        </Container>
    );
}

export default VolunteerSignup;

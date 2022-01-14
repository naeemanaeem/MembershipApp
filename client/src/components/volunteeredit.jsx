import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'



//import Select from 'react-select'


import axios from 'axios';
import {
    Form,
    InputGroup,
    Button,
    Container,
} from "react-bootstrap";


function VolunteerEdit(props) {
    const history = useHistory();

    const routeChangeToVolunteer = (params) => {
        let path = `Volunteer`;
        history.push(path);
    }



    const [memberId, setMemberId] = useState(localStorage.googleId)
    const [validated, setValidated] = useState(false);
    const [fullName, setFullName] = useState(localStorage.user_displayName);
    const [Email, setEmail] = useState(localStorage.user_email);
    const [Event, setEvent] = useState('');
    const [EventDate, setEventDate] = useState('');
    const [HoursAvailable, setHoursAvailable] = useState('');
    const [volunteerPosts, setVolunteerPosts] = useState([]);



    useEffect(() => {
        fetchVolunteers(props.volunteerId);

    }, [props.volunteerId])


    const fetchVolunteers = (id) => {
        console.log(id);
        axios
            .get("/volunteer/" + id)
            .then((res) => {

                console.log(res.data)
                setVolunteerPosts(res.data);
                setFullName(res.data.fullName);
                setEvent(res.data.Event);
                setEmail(res.data.Email);
                setHoursAvailable(res.data.HoursAvailable);
                setEventDate(res.data.EventDate);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const deleteVolunteer = () => {
        if (window.confirm("Are you sure you want to delete? \nPress OK or Cancel.")) {
            axios
                .delete("/volunteer/" + props.volunteerId)
                .then((res) => {
                    // update your component state
                    let newVolunteerPosts = volunteerPosts.filter(
                        (volunteer) => volunteer._id !== props.volunteerId
                    );
                    setVolunteerPosts(newVolunteerPosts);
                })
                .catch((error) => {
                    console.log(error);
                });
            routeChangeToVolunteer();
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
        }

        const postData = {
            memberId,
            fullName,
            Email,
            Event,
            EventDate,
            HoursAvailable
        };

        setValidated(true);

        if (window.confirm("Are you sure you want to update? \nPress OK or Cancel.")) {
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
                                .put("/volunteer/" + props.volunteerId, postData)
                                .then(response => {
                                    routeChangeToVolunteer();
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
            <h1 className="ml-5 mt-3"> Update Your Volunteer Form </h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit} >
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



                <Button variant="dark" size='lg' type="submit" >Save</Button>
            </Form>
            <Button variant="danger" size='lg' type="submit" onClick={deleteVolunteer} >Delete</Button>

            <Button variant="dark" size='lg' type="submit" onClick={routeChangeToVolunteer} >Cancel</Button>



        </Container>
    );
}

export default VolunteerEdit;

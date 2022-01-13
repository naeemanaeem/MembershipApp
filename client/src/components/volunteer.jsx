import React, { useState } from 'react';

import { useHistory } from 'react-router-dom'

import {
    Button,
    Card,
    Container,
    ListGroup,
    ListGroupItem
} from "react-bootstrap";

/*creat object which holds all the events and sets the event name to that variable, 
when button onclick it should set the value of that button to the event name which leads to the 
form which has the event selected for you already
*/

const Volunteer = (props) => {


    const [events] = useState({
        event1: "Family Night Setup",
        event2: "Family Night Cleanup",
        event3: "Coding Tutor",
        event4: "Coding Tutor",
        event5: "Sunday School Setup",
        event6: "Soccer Referee",
    });

    const history = useHistory();

    const routeChange = (params) => {

        let path = `VolunteerSignup`;
        history.push(path);
    }

    const routeChangeToTable = (params) => {

        let path = `VolunteerTable`;
        history.push(path);
    }

    return (
        <div className="volunteerPage">
            <h1 className="ml-5 mt-3"> Volunteer Events </h1>
            <br></br>

            <Button variant="dark" onClick={routeChangeToTable} style={{ position: 'fixed', left: "45%" }}> View Your Signed Up Events </Button>
            <br></br>
            <Container>


                <Card style={{ position: 'absolute', left: '17%', top: '25%', height: '18rem', width: '24rem' }}>
                    <Card.Body>
                        <Card.Title>{events.event1}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Date: TBA | Location: Wicklund School </Card.Subtitle>
                        <Card.Text>
                            We need volunteers to help setup MHMA's family night.
                        </Card.Text>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem> - Prefer High Schoolers</ListGroupItem>
                            <ListGroupItem> - Need Around 10-15 Volunteers</ListGroupItem>

                        </ListGroup>
                        <Button style={{ position: 'absolute', left: '0%', top: '87%' }}
                            variant="dark" onClick={routeChange} block >Sign Up</Button>
                    </Card.Body>
                </Card>
                <Card style={{ position: 'absolute', left: '17%', top: '61%', height: '18rem', width: '24rem' }}>
                    <Card.Body>
                        <Card.Title>{events.event2}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Date: TBA | Location: Wicklund School </Card.Subtitle>
                        <Card.Text>
                            We need volunteers to help cleanup at MHMA's family night.
                        </Card.Text>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem> - Prefer High Schoolers</ListGroupItem>
                            <ListGroupItem> - Need Around 10-15 Volunteers</ListGroupItem>

                        </ListGroup>
                        <Button style={{ position: 'absolute', left: '0%', top: '87%' }} variant="dark" onClick={routeChange} block >Sign Up</Button>
                    </Card.Body>
                </Card>
                <Card style={{ position: 'absolute', left: '39%', top: '25%', height: '18rem', width: '24rem' }}>
                    <Card.Body>
                        <Card.Title>{events.event3}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Date: TBA | Location: MH Library </Card.Subtitle>
                        <Card.Text>
                            We need tutors to teach our kids fundamental coding skills.
                        </Card.Text>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem> - Prefer Experienced CS Students</ListGroupItem>
                            <ListGroupItem> - Need Around 3-5 Volunteers</ListGroupItem>

                        </ListGroup>
                        <Button style={{ position: 'absolute', left: '0', top: '87%' }} variant="dark" onClick={routeChange} block>Sign Up</Button>
                    </Card.Body>
                </Card>
                <Card style={{ position: 'absolute', left: '39%', top: '61%', height: '18rem', width: '24rem' }}>
                    <Card.Body>
                        <Card.Title>{events.event4}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Date: Friday 6pm | Location: Wicklund Park </Card.Subtitle>
                        <Card.Text>
                            We need volunteers to help referee at our youth soccer matches.
                        </Card.Text>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem> - Must Know Soccer Rules </ListGroupItem>
                            <ListGroupItem> - Need Around 3-5 Volunteers</ListGroupItem>

                        </ListGroup>
                        <Button style={{ position: 'absolute', left: '0', top: '87%' }} variant="dark" onClick={routeChange} block>Sign Up</Button>
                    </Card.Body>
                </Card>
                <Card style={{ position: 'absolute', left: '61%', top: '25%', height: '18rem', width: '24rem' }}>
                    <Card.Body>
                        <Card.Title>{events.event5}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Date: Sunday, 9am | Location: MHHS </Card.Subtitle>
                        <Card.Text>
                            We need volunteers to help setup for Sunday School.
                        </Card.Text>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem> - Prefer High Schoolers</ListGroupItem>
                            <ListGroupItem> - Need Around 10-15 Volunteers</ListGroupItem>
                        </ListGroup>
                        <Button style={{ position: 'absolute', left: '0', top: '87%' }} variant="dark" onClick={routeChange} block>Sign Up</Button>
                    </Card.Body>
                </Card>
                <Card style={{ position: 'absolute', left: '61%', top: '61%', height: '18rem', width: '24rem' }}>
                    <Card.Body>
                        <Card.Title>{events.event6}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Date: Sunday, 3pm | Location: MHHS </Card.Subtitle>
                        <Card.Text>
                            We need volunteers to help cleanup after Sunday School has finished.
                        </Card.Text>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem> - Prefer High Schoolers</ListGroupItem>
                            <ListGroupItem> - Need Around 10-15 Volunteers</ListGroupItem>

                        </ListGroup>
                        <Button style={{ position: 'absolute', left: '0', top: '87%' }} variant="dark" onClick={routeChange} block>Sign Up</Button>
                    </Card.Body>
                </Card>
            </Container>





        </div>

    );
};
export default Volunteer;

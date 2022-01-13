import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import axios from 'axios';
import { AiFillEdit } from "react-icons/ai";
import { FcCheckmark } from "react-icons/fc";
import { MdOutlineIncompleteCircle } from "react-icons/md";


const VolunteerTable = () => {
    const history = useHistory();


    const [volunteerPosts, setVolunteerPosts] = useState([]);
    const [showCheckmark, setShowCheckmark] = useState(false)

    useEffect(() => {
        fetchVolunteers();
    }, []);

    const fetchVolunteers = () => {

        axios
            .get("/volunteer/" + localStorage.idOfMember)
            .then((res) => {
                setVolunteerPosts(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };


    const routeChange = (_id) => {
        let path = `volunteeredit`;
        history.push(path);
    }

    const modalForm = () => {
        <Modal.Dialog>
            <Modal.Header closeButton>
                <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Modal body text goes here.</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary">Close</Button>
                <Button variant="primary">Save changes</Button>
            </Modal.Footer>
        </Modal.Dialog>

    }

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    console.log(today);

    function compareTime(myDate, today) {
        if (new Date(today) > new Date(myDate)) {
            return setShowCheckmark(!showCheckmark);
        }
        else {
            return setShowCheckmark(showCheckmark)
        }
    }

    function compareTime2(time2, today) {
        return new Date(today) > new Date(time2); // true if time1 is later
    }
    console.log(compareTime2('2019-01-20', today))


    return (
        <div>
            <br></br>
            <br></br>
            <h1>Your Volunteer Events</h1>
            <br></br>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }} >
                <Table striped bordered hover>
                    <thead  >
                        <tr >
                            <th style={{ textAlign: "center" }} >Id</th>

                            <th style={{ textAlign: "center" }} >Full Name</th>
                            <th style={{ textAlign: "center" }}>Email</th>
                            <th style={{ textAlign: "center" }}>Event</th>
                            <th style={{ textAlign: "center" }} >Event Date</th>
                            <th style={{ textAlign: "center" }} >Hours</th>
                            <th style={{ textAlign: "center" }}>Status</th>
                            <th style={{ textAlign: "center" }}>View Volunteer</th>

                        </tr>
                    </thead>
                    <tbody>

                        {volunteerPosts.map((volunteer) => (

                            <tr key={volunteer.id}>
                                <td style={{ textAlign: "center" }}>{volunteer._id}</td>

                                <td style={{ textAlign: "center" }}>{volunteer.fullName}</td>
                                <td style={{ textAlign: "center" }}>{volunteer.Email}</td>
                                <td style={{ textAlign: "center" }}>{volunteer.Event}</td>
                                <td style={{ textAlign: "center" }} >{volunteer.EventDate}</td>
                                <td style={{ textAlign: "center" }} >{volunteer.HoursAvailable}</td>
                                {showCheckmark ? (<td style={{ textAlign: "center" }}>  <h1><FcCheckmark /></h1> </td>) : (<td style={{ textAlign: "center" }}>  <h1>X</h1> </td>)}
                                <td style={{ textAlign: "center" }}>  <h1><AiFillEdit onClick={routeChange} /></h1> </td>

                            </tr>
                        ))}
                    </tbody>

                </Table>
            </div>
        </div>
    );
};
export default VolunteerTable;
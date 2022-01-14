import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import axios from 'axios';
import { AiFillEdit } from "react-icons/ai";
import { FcCheckmark } from "react-icons/fc";
import { MdOutlineIncompleteCircle } from "react-icons/md";
import VolunteerEdit from './volunteeredit';


const VolunteerTable = () => {
    const history = useHistory();
    console.log(localStorage.idOfMember)
    const [volunteerPosts, setVolunteerPosts] = useState([]);
    const [showCheckmark, setShowCheckmark] = useState(true)
    const [volunteerId, setVolunteerId] = useState(null)


    useEffect(() => {
        fetchVolunteers();
    }, []);


    const fetchVolunteers = () => {

        axios
            .get("/volunteer/?myuser=" + localStorage.googleId)
            .then((res) => {
                setVolunteerPosts(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };


    const routeChange = (id) => {
        let path = `volunteeredit`;
        // history.push(path);
        setVolunteerId(id);

        // <VolunteerEdit></VolunteerEdit>
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

    if (volunteerId) {
        return (
            <VolunteerEdit volunteerId={volunteerId} />
        )
    }
    else {

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


                                <th style={{ textAlign: "center" }} >Full Name</th>
                                <th style={{ textAlign: "center" }}>Email</th>
                                <th style={{ textAlign: "center" }}>Event</th>
                                <th style={{ textAlign: "center" }} >Event Date</th>
                                <th style={{ textAlign: "center" }} >Hours</th>
                                <th style={{ textAlign: "center" }}>Status</th>
                                <th style={{ textAlign: "center" }}>Edit Volunteer</th>

                            </tr>
                        </thead>
                        <tbody>

                            {volunteerPosts.map((volunteer) => (

                                <tr key={volunteer.id}>


                                    <td style={{ textAlign: "center" }}>{volunteer.fullName}</td>
                                    <td style={{ textAlign: "center" }}>{volunteer.Email}</td>
                                    <td style={{ textAlign: "center" }}>{volunteer.Event}</td>
                                    <td style={{ textAlign: "center" }} >{volunteer.EventDate}</td>
                                    <td style={{ textAlign: "center" }} >{volunteer.HoursAvailable}</td>
                                    {showCheckmark ? (<td style={{ textAlign: "center" }}>  <h1><FcCheckmark /></h1> </td>) : (<td style={{ textAlign: "center" }}>  <h1>X</h1> </td>)}
                                    <td style={{ textAlign: "center" }}>  <h1><AiFillEdit onClick={() => routeChange(volunteer._id)} /></h1> </td>

                                </tr>
                            ))}
                        </tbody>

                    </Table>
                </div>
            </div>
        );
    }
};
export default VolunteerTable;
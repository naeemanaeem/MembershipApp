import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table'
import axios from 'axios';



const VolunteerTable = () => {

    const [volunteerPosts, setVolunteerPosts] = useState([]);

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

    const deleteVolunteers = (id) => {
        axios
            .delete(`/volunteer/${id}`)
            .then((res) => {
                alert(`Deleted!`);

                // update your component state
                let newVolunteers = volunteerPosts.filter(
                    (volunteer) => volunteer._id !== id
                );
                setVolunteerPosts(setVolunteerPosts);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div>
            <br></br>
            <br></br>
            <h1>Your Volunteer Events</h1>
            <br></br>


            <Table striped bordered hover>
                <thead  >
                    <tr >
                        <th style={{ textAlign: "center" }} >Full Name</th>
                        <th style={{ textAlign: "center" }} >Email</th>
                        <th style={{ textAlign: "center" }} >Event</th>
                        <th style={{ textAlign: "center" }} >Event Date</th>
                        <th style={{ textAlign: "center" }} >Hours</th>

                    </tr>
                </thead>
                {volunteerPosts.map((volunteer) => (
                    <div key={volunteer.id}>
                        <tbody>
                            <tr >
                                <td>{volunteer.fullName}</td>
                                <td style={{ textAlign: "center" }}>{volunteer.Email}</td>
                                <td style={{ textAlign: "center" }}>{volunteer.Event}</td>
                                <td style={{ textAlign: "center" }}>{volunteer.EventDate}</td>
                                <td style={{ textAlign: "center" }}>{volunteer.HoursAvailable}</td>
                            </tr>
                        </tbody>
                    </div>
                ))}
            </Table>
        </div>
    );
};
export default VolunteerTable;
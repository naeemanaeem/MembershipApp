import React, { useState, useEffect } from "react";
import Activity from "./Activity";
import ActivityForm from "./CreateActivity";
import EventDetail from "./EventDetail";
import Container from "react-bootstrap/Container";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import PropTypes from "prop-types";

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState();
  const [showForm, setShowForm] = useState(false);
  const [eventDetail, setEventDetail] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/activities");
        setActivities(res.data);
      } catch (e) {
        setError(e.message);
        console.error("ERROR: ", error);
      }
    }
    fetchData();
  }, [error]);
  // Adds new activity to activities array
  const addActivityHandler = (data) => {
    setActivities(data);
  };
  //

  // closes event detail page and brings to landing page.
  const hideEventDetailHandler = () => {
    setSelectedEvent({}); // reinitialize selected event to {}
    setEventDetail((prevState) => !prevState);
  };
  // handles form (modal) opening / showing
  const showFormHandler = () => {
    setShowForm((prevState) => !prevState);
  };
  // handles form (modal) closing
  const hideFormHandler = () => {
    setSelectedEvent({}); // reinitialize selected event to {}
    setShowForm((prevState) => !prevState);
  };
  // deletes activity from database
  // and updates the activites array in the component's state
  const deleteActivityHandler = (id, title, imageSrc) => {
    axios
      .delete(`/activities/${id}`)
      .then((res) => {
        alert(`The "${title}" has been deleted!`);
        setSelectedEvent(() => {
          return {};
        });
        // update your component state
        axios
          .get("/activities")
          .then((response) => {
            setActivities(response.data);
            // Remove images associated with this event from /upload
            axios
              .delete(`/upload/${imageSrc.join(",")}`)
              .then(() => {})
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });

    setEventDetail((state) => !state);
  };
  //
  const editActivityHandler = (id) => {
    // first find the event to be updated by _id from the activities array
    const editedEvent = activities.reduce((acc, activity) => {
      if (activity._id === id) {
        acc = { ...activity };
      }
      return acc;
    }, {});
    // set selectedEvent to the event to be edited, it will be used by the activity form
    // to fill out the form fields with the selected event values
    setSelectedEvent(editedEvent);
    // To close eventDetail page
    setEventDetail((prevState) => !prevState);
    // show event create/edit form
    showFormHandler();
  };
  // If Error Fetching Data from Server
  if (error) {
    return (
      <center>
        <h1 style={{ color: "red", marginTop: "5%" }}>{error}</h1>
      </center>
    );
    // If eventDetail is false, render activities landing page
  } else if (!eventDetail) {
    return (
      <Container>
        {/* show activityForm Modal here*/}
        <ActivityForm
          showForm={showForm}
          addActivity={addActivityHandler}
          onCancel={hideFormHandler}
          selectedEvent={selectedEvent}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexFlow: "nowrap",
            justifyContent: "space-between",
            margin: "0 auto",
          }}
        >
          <h1
            style={{
              padding: "2%",
              color: "black",
              fontFamily: "robo",
            }}
          >
            MHMA Activites &amp; Events
          </h1>
          <span
            style={{
              hover: { opacity: "0.2" },
              marginTop: "3%",
              cursor: "pointer",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="42"
              height="42"
              fill="green"
              className="bi bi-plus-square-fill"
              viewBox="0 0 16 16"
              onClick={() => {
                setSelectedEvent({});
                showFormHandler();
              }}
            >
              <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
            </svg>
          </span>
        </div>
        <main>
          {activities.length ? (
            <Row xs={1} md={2} lg={3} className="g-4">
              {activities.map((activity) => (
                <Col key={activity._id}>
                  <Activity
                    onCardClick={setSelectedEvent}
                    onEventDetail={setEventDetail}
                    data={activity}
                  />
                </Col>
              ))}
            </Row>
          ) : (
            <center>
              <h1 style={{ color: "red", marginTop: "20px" }}>
                Activites coming soon!
              </h1>
            </center>
          )}
        </main>
      </Container>
    );
    // If eventDetail is true, render event detail page.
  } else {
    return (
      <EventDetail
        data={selectedEvent}
        onDelete={deleteActivityHandler}
        onEdit={editActivityHandler}
        onCancel={hideEventDetailHandler}
      />
    );
  }
};
Activities.propTypes = {
  ActivityForm: PropTypes.node,
  EventDetail: PropTypes.node,
  Activity: PropTypes.node,
};
export default Activities;

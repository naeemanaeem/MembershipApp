import React, { useState, useEffect } from "react";
import Activity from "./Activity";
import ActivityForm from "./CreateActivity";
import EventDetail from "./EventDetail";
import Container from "react-bootstrap/Container";
import { Row, Col } from "react-bootstrap";
import axios from "axios";

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
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const addActivityHandler = (data) => {
    setActivities(data);
  };
  const handleHideEventDetail = () => {
    setEventDetail((prevState) => !prevState);
    setSelectedEvent({});
  };
  const showFormHandler = () => {
    setShowForm((prevState) => !prevState);
  };
  const deleteActivityHandler = (id, title) => {
    axios
      .delete(`/activities/${id}`)
      .then((res) => {
        console.log("response:", res);
        alert(`Your Event with the Title "${title}" has been deleted!`);
        axios
          .get("/activities")
          .then((res) => {
            setActivities(res.data);
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
  const editActivityHandler = (id) => {
    const editedEvent = activities.reduce((acc, activity) => {
      if (activity._id === id) {
        acc = { ...activity };
      }
      return acc;
    }, {});

    setSelectedEvent(editedEvent);
    setEventDetail((prevState) => !prevState);

    showFormHandler();
  };
  if (!eventDetail) {
    return (
      <Container>
        {/* show activityForm Modal here on Edit click */}
        <ActivityForm
          showForm={showForm}
          addActivity={addActivityHandler}
          onCancel={showFormHandler}
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
  } else {
    return (
      <EventDetail
        data={selectedEvent}
        onDelete={deleteActivityHandler}
        onEdit={editActivityHandler}
        hideEventDetail={handleHideEventDetail}
      />
    );
  }
};
export default Activities;

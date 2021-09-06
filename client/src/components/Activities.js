import React, { useState } from "react";
import Activity from "./Activity";
import ActivityForm from "./CreateActivity";
import EventDetail from "./EventDetail";
import Container from "react-bootstrap/Container";
import { Row, Col } from "react-bootstrap";

const Activities = () => {
  console.log(localStorage);
  const [activities, setActivities] = useState([
    {
      title: "Kids Soccer",
      tagName: "Kids Event",
      id: JSON.stringify(Math.random()),
      startDate: "09/22/21",
      endDate: "09/22/21",
      startTime: "6:00 PM",
      endTime: "7:30 PM",
      location: {
        street: "Central Park",
        city: "Mountain House",
        state: "Ca",
        country: "USA",
        zip: "95132",
      },
      online: false,
      registration: "Open",
      meetingLinK: "zoomLink",
      contactEmail: "abc&xyz.com",
      cost: "$50",
      imageUrl:
        "https://images.freeimages.com/images/small-previews/a3c/kiddies-soccer-1313513.jpg",
      description:
        "lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum.lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum",
    },
    {
      title: "MH Fit",
      id: JSON.stringify(Math.random()),
      startDate: "09/22/21",
      endDate: "09/22/21",
      startTime: "6:00 PM",
      endTime: "7:30 PM",
      registration: "Close",
      contactEmail: "abc&xyz.com",
      location: {
        street: "Central Park",
        city: "",
        state: "",
        country: "",
        zip: "",
      },
      meetingLink: "",
      online: false,
      maxAttendees: "25",
      cost: "$0",
      recurring: true,
      imageUrl:
        "https://wacdn-img1.secure.footprint.net/media/28010/slider-image-1.jpg?v=637332651830000000",
      description:
        "lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum.lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum",
    },
    {
      title: "Family Night",
      id: JSON.stringify(Math.random()),
      startDate: "09/22/21",
      endDate: "09/22/21",
      startTime: "6:00 PM",
      endTime: "7:30 PM",
      registration: "Close",
      meetingLink: "zoom link",
      contactEmail: "abc&xyz.com",
      location: {
        street: "Central Park",
        city: "",
        state: "",
        country: "",
        zip: "",
      },
      online: true,
      cost: "$15 per adult, $7 per kid",
      imageUrl:
        "https://www.opkansas.org/wp-content/uploads/2020/09/Thompson-Park-Concert-Grass-web.jpg",
      description:
        "lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum.lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum",
    },
    {
      title: "Half Marathon",
      id: JSON.stringify(Math.random()),
      startDate: "09/22/21",
      endDate: "09/22/21",
      // date: "09/22/21",
      startTime: "6:00 PM",
      endTime: "7:30 PM",
      registration: "Close",
      contactEmail: "abc&xyz.com",
      location: {
        street: "",
        city: "Livermore",
        state: "CA",
        country: "",
        zip: "",
      },
      cost: "$0",
      online: false,
      meetingLink: "",
      imageUrl: "https://wmimg.azureedge.net/public/img/home/hp-4-min.jpg",
      description:
        "lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum.lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum",
    },
    {
      title: "Tafseer-e-Quran",
      id: JSON.stringify(Math.random()),
      startDate: "09/22/21",
      endDate: "09/22/21",
      startTime: "6:00 PM",
      endTime: "7:30 PM",
      registration: "Open",
      contactEmail: "abc&xyz.com",
      tagName: "Free Class",
      location: {
        street: "Mountain House Musallah",
        city: "",
        state: "",
        country: "",
        zip: "",
      },
      online: "true",
      meetingLink: "zoom link",
      cost: "$0",
      imageUrl:
        "https://st2.depositphotos.com/1904083/6499/i/950/depositphotos_64992431-stock-photo-quran-holy-book-of-islam.jpg",
      description:
        "lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum.lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum",
    },

    {
      title: "Basketball",
      id: JSON.stringify(Math.random()),
      startDate: "09/22/21",
      endDate: "09/22/21",
      startTime: "6:00 PM",
      endTime: "7:30 PM",
      contactEmail: "abc&xyz.com",
      location: {
        street: "Central Park",
        city: "",
        state: "",
        country: "",
        zip: "",
      },
      cost: "$0",
      tagName: "Women Only",
      imageUrl:
        "https://images.unsplash.com/photo-1576438162986-c685b1cfed7a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmFza2V0YmFsbCUyMG5ldHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
      description:
        "lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum.lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum lorum ipsum",
    },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [eventDetail, setEventDetail] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});

  const addActivityHandler = (data) => {
    if (Object.keys(selectedEvent).length > 0) {
      const newActivities = activities.map((activity) =>
        activity.id === selectedEvent.id ? { ...activity, ...data } : activity
      );
      setActivities(newActivities);
    } else {
      setActivities([...activities, data]);
    }
  };
  const handleHideEventDetail = () => {
    setEventDetail((prevState) => !prevState);
    setSelectedEvent({});
  };
  const showFormHandler = () => {
    setShowForm((prevState) => !prevState);
  };
  const deleteActivityHandler = (id) => {
    setActivities((prevState) =>
      prevState.filter((activity) => {
        console.log(activity.id);
        return activity.id !== id;
      })
    );
    setEventDetail((state) => !state);
  };
  const editActivityHandler = (id) => {
    const editedEvent = activities.reduce((acc, activity) => {
      if (activity.id === id) {
        acc = { ...activity };
      }
      return acc;
    }, {});
    console.log("editedEvent: ", editedEvent);
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
          <Row xs={1} md={2} lg={3} className="g-4">
            {activities.map((activity) => (
              <Col key={activity.id}>
                <Activity
                  onCardClick={setSelectedEvent}
                  onEventDetail={setEventDetail}
                  data={activity}
                />
              </Col>
            ))}
          </Row>
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

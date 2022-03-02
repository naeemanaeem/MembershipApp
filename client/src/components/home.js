import React from "react";
import { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import HomeCard from "./home_card_fun";
import { Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import vol from "./imgs/vol.jpeg";
import pay from "./imgs/pay.png";
import act from "./imgs/images.jpeg";
import slide_vol from "./imgs/community-work-day-flat-vector-illustration.jpg";
import slide_act from "./imgs/act.jpeg";
import slide_diverse from "./imgs/diverse_people.jpg";

import Classes from "./home.module.css";
import { Modal, Button } from "react-bootstrap";
function Home({ name, ...props }) {
  const [userActivities, setUserActivities] = useState([]);
  // const imageSources = [slide_vol, slide_act, slide_diverse];
  const [slides, setSlides] = useState([]);
  // const [slides, setSlides] = useState(imageSources);
  const [showForm, setShowForm] = useState(false);
  const [slide, setSlide] = useState("");

  const history = useHistory();
  const goToVolunteer = (params) => {
    let path = `Volunteer`;
    history.push(path);
  };
  const goToPayment = (params) => {
    let path = `payment`;
    history.push(path);
  };
  const goToActivities = (params) => {
    let path = `activities`;
    history.push(path);
  };

  useEffect(() => {
    axios.get("/slides").then((res) => {
      if (res.data) {
        setSlides([...res.data]);
      }
    });
  }, []);
  const addSlide = () => {
    // send post to server.
    axios.post("/slides/", { imageSrc: slide }).then((res) => {
      console.log(res.data);
      setSlides([...slides, { id: res.data._id, imageSrc: slide }]);
    });
    setSlide("");
    closeForm();
  };
  const closeForm = () => {
    setShowForm(false);
    setSlide("");
  };

  const displayName = localStorage.user_displayName;
  const data = [
    {
      title: "Make Payment",
      description:
        "Make a payment for MHMA membership fees, zakat, masjid donation, or sadaqah.",
      image: pay,
    },
    {
      title: "Activities",
      description:
        "Sign Up for MHMA Activities, such as Youth Soccer, Tafseer-E-Quran, or COVID Vaccination.",
      image: act,
    },
    {
      title: "Volunteer",
      description:
        "Volunteer for MHMA events, such as Sunday School setup/cleanup or youth soccer referee.",
      image: vol,
    },
  ];


  useEffect(() => {
    const fetchMemberActivites = async () => {
      // fetch all the activities the user has registered for.
      try {
        const activities = await axios.get(
          `http://localhost:3000/activities/registration-info/by-google-id`
        );
        // get activities titles from the response and update state.
        const registeredActivities = activities.data.map(
          (activity) => activity.activityId.title
        );

        setUserActivities([...new Set(registeredActivities)]);
      } catch (error) {
        console.log("error: ", error);
      }
    };
    fetchMemberActivites();
  }, []);

  return (
    <Container fluid>
      <h1 className="mt-5">Welcome to MCE - Muslims Centre of Excellence </h1>
      <h5 className="text-center mt-2">
        Mountain House Muslim Association is a local non-profit focused on
        serving the Muslim community in Mountain House.{" "}
      </h5>
      <h2 class="text-center mt-5">You Are {displayName}</h2>
      <div className={Classes.plus_btn_container}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="42"
          height="42"
          fill="black"
          className="bi bi-plus-square-fill"
          viewBox="0 0 16 16"
          onClick={() => {
            setShowForm(true);
          }}
        >
          <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
        </svg>
      </div>
      <Modal show={showForm} onHide={closeForm}>
        <Modal.Header closeButton>
          <Modal.Title>Add Slide To Carousel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <input
              onChange={(e) => setSlide(e.target.value)}
              value={slide}
              className={Classes.form_input}
              placeholder=" Add Image URL"
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeForm}>
            Cancel
          </Button>
          <Button variant="primary" onClick={addSlide}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Carousel fade className={Classes.carousel}>
        {slides.map((slide, i) => (
          <Carousel.Item key={slide._id}>
            <img
              className={Classes.image}
              src={slide.imageSrc}
              alt={`slide ${i + 1}`}
            />
          </Carousel.Item>
        ))}
      </Carousel>

      <div className={Classes.home_card}>
        {data.map((value) => (
          <HomeCard
            title={value.title}
            description={value.description}
            image={value.image}
            goToPayment={goToPayment}
            goToActivities={goToActivities}
            goToVolunteer={goToVolunteer}
          />
        ))}
      </div>
    </Container>
  );
}

export default Home;

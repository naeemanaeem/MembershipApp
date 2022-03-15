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
import Classes from "./home.module.css";
import { Modal, Button } from "react-bootstrap";

const Home = ({ name, ...props }) => {
  const [userActivities, setUserActivities] = useState([]);
  const [error, setError] = useState(null);
  const [slides, setSlides] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [slide, setSlide] = useState("");
  const [currentSlide, setCurrentSlide] = useState({});
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

  const addSlide = () => {
    // send post to server.
    axios
      .post("/slides/", { imageSrc: slide })
      .then((res) => {
        setSlides([...slides, res.data]);
      })
      .catch((error) => setError(error.message));
    setSlide("");
    closeForm();
  };
  const deleteSlide = (indx, e) => {
    setCurrentSlide({ imageSrc: e.target.id, alt: indx });
  };
  const confirmDelete = (id) => {
    axios
      .delete(`/slides/${id}`)
      .then((res) => {
        const updatedSlides = slides.filter((slide) => slide._id !== id);
        setSlides(updatedSlides);
      })
      .catch((error) => setError(error.message));
    closeAlertBox();
  };
  const closeForm = () => {
    setShowForm(false);
    setSlide("");
  };
  const showAlertBox = () => {
    setShowAlert(true);
  };
  const closeAlertBox = () => {
    setShowAlert(false);
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
  const fetchMemberActivites = async () => {
    // fetch all the activities the user has registered for.
    try {
      const activities = await axios.get(
        `http://localhost:3000/activities/registration-info/by-google-id`
      );
      if (activities && activities.data) {
        const registeredActivities = [];
        activities.data.forEach((activity) => {
          // filter any activity that has ended
          const date = new Date().toISOString();
          if (activity.activityId.endDateTime >= date) {
            registeredActivities.push(activity.activityId.title);
          }
        });
        setUserActivities([...new Set(registeredActivities)]);
      } else {
        throw Error("Error fetching registered activities!");
      }
    } catch (error) {
      console.log("error: ", error);
      setError(error.message);
    }
  };
  useEffect(() => {
    // fetch carousel slides
    axios
      .get("/slides")
      .then((res) => {
        setSlides([...res.data]);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
    // fetch all the activities the member has registered for
    fetchMemberActivites();
  }, []);

  if (error) {
    return <h3 className="text-danger mt-5">{error}</h3>;
  } else {
    return (
      <Container fluid>
        <h3 className="text-right m-3">{displayName}</h3>
        <h1 className="mt-5">Welcome to MCE - Muslims Centre of Excellence </h1>
        <h5 className="text-center mt-2 mb-5">
          Mountain House Muslim Association is a local non-profit focused on
          serving the Muslim community in Mountain House.{" "}
        </h5>

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

        <div className={Classes.carousel_container}>
          <Carousel fade>
            {slides.map((slide, i) => (
              <Carousel.Item key={slide._id} /*key={i}*/>
                <Modal show={showAlert} onHide={closeAlertBox}>
                  <Modal.Header closeButton>
                    <Modal.Title>Deleting slide:</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <img
                      height={100}
                      width={100}
                      src={currentSlide.imageSrc}
                      alt={currentSlide.alt}
                    />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={closeAlertBox}>
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => confirmDelete(slide._id)}
                    >
                      Delete
                    </Button>
                  </Modal.Footer>
                </Modal>

                <div className={Classes.slides_btn_container}>
                  <span className={Classes.trash_container}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="35"
                      height="30"
                      fill="white"
                      className={`bi bi-trash ${Classes.svg_btn}`}
                      viewBox="0 0 16 16"
                      id={slide.imageSrc}
                      onClick={(e) => {
                        deleteSlide(`slide ${i + 1}`, e);
                        showAlertBox();
                      }}
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                      <path
                        fillRule="evenodd"
                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                      />
                    </svg>
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="42"
                    height="42"
                    fill="black"
                    className={`bi bi-plus-square-fill  ${Classes.svg_btn}`}
                    viewBox="0 0 16 16"
                    onClick={() => {
                      setShowForm(true);
                    }}
                  >
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                  </svg>
                </div>
                <img
                  className={Classes.image}
                  src={slide.imageSrc}
                  alt={`slide ${i + 1}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
        <div className={Classes.home_card}>
          {data.map((value) => (
            <HomeCard
              key={value.title}
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
};

export default Home;

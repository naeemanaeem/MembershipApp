import React, { useState, useEffect, useCallback } from "react";
import Container from "react-bootstrap/Container";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import PropTypes from "prop-types";
import classes from "./activities.module.css";
import Card from "react-bootstrap/Card";
import ExternalActivityForm from "./createExternalActivity";
import { withRouter } from "react-router";
const ExternalActivities = () => {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState();
  const [showForm, setShowForm] = useState(false);

  const memoizedfetchData = useCallback(async () => {
    try {
      const res = await axios.get("/activities/external/");
      setActivities(res.data);
    } catch (e) {
      setError(e.message);
    }
  }, []);

  useEffect(() => {
    memoizedfetchData();
  }, [memoizedfetchData]);

  // Adds new activity to activities array
  const addActivityHandler = (data) => {
    setActivities([...activities, data]);
  };

  // handles form (modal) opening / showing
  const showFormHandler = () => {
    setShowForm((prevState) => !prevState);
  };

  // deletes activity from database
  // and updates the activites array in the component's state

  const deleteActivityHandler = (id, title) => {
    axios
      .delete(`/activities/external/${id}`)
      .then((res) => {
        alert(`The "${title}" has been deleted!`);

        // update your component state
        let newActivities = activities.filter(
          (activity) => activity._id !== id
        );
        setActivities(newActivities);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // If Error Fetching Data from Server
  if (error) {
    return (
      <center>
        <h1 className={classes.errorMsg}>{error}</h1>
      </center>
    );
  } else {
    return (
      <Container>
        {/* show activityForm Modal here*/}
        <ExternalActivityForm
          showForm={showForm}
          addActivity={addActivityHandler}
          onCancel={showFormHandler}
        />
        <div className={classes.header}>
          <h1 className={classes.title}>External Events</h1>
          <span className={classes.btnPlus}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="42"
              height="42"
              fill="green"
              className="bi bi-plus-square-fill"
              viewBox="0 0 16 16"
              onClick={() => {
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
                <Card className="m-2 p-2" key={activity._id}>
                  <Col className="d-flex justify-content-between align-items-center">
                    <a
                      href={activity.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <h4>{activity.title}</h4>
                    </a>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="23"
                      height="23"
                      fill="red"
                      className="bi bi-trash"
                      viewBox="0 0 16 16"
                      onClick={() =>
                        window.confirm(
                          "Are you sure you wish to delete this event?"
                        ) && deleteActivityHandler(activity._id, activity.title)
                      }
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                      <path
                        fillRule="evenodd"
                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                      />
                    </svg>
                  </Col>
                </Card>
              ))}
            </Row>
          ) : (
            <center>
              <h1 className={classes.emptyActivities}>
                Activites coming soon!
              </h1>
            </center>
          )}
        </main>
      </Container>
    );
  }
};
ExternalActivities.propTypes = {
  ExternalActivityForm: PropTypes.node,
};
export default withRouter(ExternalActivities);

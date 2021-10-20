import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Checkbox from "./Views/Checkbox";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import classes from "./registration.module.css";

const RegistrationForm = (props) => {
  const [members, setMembers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/members");
        setMembers(res.data);
      } catch (e) {
        setError(e.message);
      }
    }
    fetchData();
  }, []);
  const currentMember = members.find(
    (member) =>
      member.Firstname + " " + member.Lastname === localStorage.user_displayName
  );
  if (error) {
    return (
      <center>
        <h1 className={classes.errorMsg}>{error}</h1>
      </center>
    );
  } else {
    return (
      <React.Fragment>
        <Card className={classes.card}>
          <Card.Header>
            <div className={classes.cardHeader}>
              <span>
                <i>
                  Registering For:{"  "}
                  <b>{props.eventTitle}</b>
                </i>
              </span>
              <span>Your Balance: $</span>
            </div>
          </Card.Header>
          <Card.Body>
            <h5 className={classes.cardHeading}>
              Add Family / Child To the Program
            </h5>

            {currentMember ? (
              <Checkbox
                id="member"
                name={currentMember.Firstname + " " + currentMember.Lastname}
              />
            ) : null}

            {currentMember && currentMember.Dependents
              ? currentMember.Dependents.map((dependent, index) => (
                  <Checkbox
                    key={index}
                    id={index}
                    name={dependent.Firstname + " " + dependent.Lastname}
                  />
                ))
              : null}
            <div className={classes.transactionFee}>
              <Card.Text>Transaction Fee: </Card.Text>

              <Card.Text>
                <b>
                  {"   $"}
                  {props.eventCost}
                </b>
              </Card.Text>
            </div>
          </Card.Body>
          <Card.Footer>
            <Button size="lg" variant="outline-primary">
              Confirm
            </Button>
          </Card.Footer>
        </Card>
      </React.Fragment>
    );
  }
};

RegistrationForm.propTypes = {
  onClose: PropTypes.func,
  eventTitle: PropTypes.string,
  eventCost: PropTypes.string,
  Checkbox: PropTypes.node,
};
export default RegistrationForm;

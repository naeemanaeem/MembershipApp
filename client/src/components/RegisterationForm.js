import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Checkbox from "./Views/Checkbox";
import Button from "react-bootstrap/Button";
const RegistrationForm = (props) => {
  const [members, setMembers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/members");
        // const res = await axios.get("/members");
        console.log("res.data:", res.data);
        setMembers(res.data);
      } catch (e) {
        setError(e.message);
        console.error(e);
      }
    }
    fetchData();
  }, []);

  // console.log("members:", members, "error: ", error);
  const currentMember = members.find(
    (member) =>
      member.Firstname + " " + member.Lastname === localStorage.user_displayName
  );
  // console.log("currentMember: ", currentMember);
  return (
    <React.Fragment>
      <Card style={{ width: "70vw" }}>
        <Card.Header>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
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
          <h5 style={{ color: "grey", paddingTop: "3%", paddingBottom: "3%" }}>
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
          <div
            style={{
              display: "flex",
              marginTop: "100px",
              flexDirection: "row",
              fontSize: "1.2em",
              fontFamily: "robo",
            }}
          >
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
};
export default RegistrationForm;

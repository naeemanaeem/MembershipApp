import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Checkbox from "./Views/Checkbox";
import { Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import classes from "./registration.module.css";
import CreditcardLogo from "../images/creditcard_logos.png";
import StripeContainer from "./stripeContainerActivities";
import "./registration.css";
import SuccessPage from "./SuccessPage";
import PayPal from "./paypalActivities";
const RegistrationForm = (props) => {
  const [members, setMembers] = useState([]);
  const [memberId, setMemberId] = useState();
  const [memberEmail, setMemberEmail] = useState("");
  const [registeredMembersIds, setRegisteredMembersIds] = useState([]);
  const [error, setError] = useState("");
  const [paymentType, setPaymentType] = useState("n/a");
  const [showPaymentForm, setPaymentFormShow] = useState(false);
  const [showSuccessPage, setSuccessPageShow] = useState(false);
  // use setPaymentAmount for adjusting cost after applying coupon
  const [paymentAmount, setPaymentAmount] = useState("0.00");
  const [paypalButtonShow, setPaypalButtonShow] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/members");
        setMembers(res.data);
        const email = await localStorage.user_email;
        setMemberEmail(email);
      } catch (e) {
        setError(e.message);
      }
    }
    fetchData();
  }, []);
  const handlePostOfPaymentStatus = (paymentId, paymentMethodId) => {
    const data = {
      activityId: props.eventId,
      memberId: memberId,
      registeredMembersIds: registeredMembersIds,
      paymentIntentId: paymentId,
      paymentMethodId: paymentMethodId,
      paymentAmount: paymentAmount,
      paymentType: paymentType,
      description: "Registration for " + props.eventTitle,
    };

    try {
      axios
        .post("/activities/registration", data)
        .then((res) => {
          console.log("res in post: ", res.status);
          if (res && res.status === 200) {
            setError(null);
            setSuccessPageShow(true);
          } else {
            console.log("Error saving registration status in the database!");
            throw Error({
              message: "Error saving registration status in the database!",
            });
          }
        })
        .catch((err) => {
          if (Number(props.eventCost) > 0) {
            window.alert(
              "\nYour transaction has been processed but there was an error saving your registration status at our end.\nPlease consult our event organizer as soon as possible or email at: \nabc@xyz.com to update your registration status.\nWe are sorry for inconvenience."
            );
            setError(err.message);
          } else {
            window.alert(
              "\nThere was an error saving your registration status at our end.\nPlease consult our event organizer or email at: \nabc@xyz.com for registration.\nWe are sorry for inconvenience."
            );
            setError(err.message);
          }
        });
    } catch (err) {
      setError("Error in registration: " + err);
    }
  };
  const handlePayment = () => {
    if (registeredMembersIds.length === 0) {
      window.alert("No member has been selected for registration!");
      return;
    }
    if (Number(props.eventCost) <= 0) {
      handlePostOfPaymentStatus("n/a", "n/a");
    } else if (paymentType === "card") {
      setPaymentFormShow(true);
    } else if (paymentType === "paypal") {
      setPaypalButtonShow(true);
    }
  };
  const handleCheckbox = (e, memberId) => {
    let memberFound = registeredMembersIds.some((id) => id === memberId);
    if (e.target.checked && !memberFound) {
      setRegisteredMembersIds([...registeredMembersIds, memberId]);
      setPaymentAmount((state) => Number(state) + Number(props.eventCost));
    } else if (!e.target.checked && memberFound) {
      const updatedMembersIds = registeredMembersIds.filter(
        (id) => id !== memberId
      );
      setRegisteredMembersIds(updatedMembersIds);
      setPaymentAmount((state) => Number(state) - Number(props.eventCost));
    }
  };

  const currentMember = members.find(
    (member) =>
      member.Firstname.toLowerCase() + " " + member.Lastname.toLowerCase() ===
      localStorage.user_displayName.toLowerCase()
  );

  if (!memberId && currentMember) {
    setMemberId(currentMember._id);
  }

  if (error) {
    return (
      <center>
        <h1 className={classes.errorMsg}>{error}</h1>
      </center>
    );
  } else if (showSuccessPage) {
    return <SuccessPage eventTitle={props.eventTitle} />;
  } else {
    return (
      <React.Fragment>
        {showPaymentForm ? (
          <StripeContainer
            cost={paymentAmount}
            eventTitle={props.eventTitle}
            handlePostOfPaymentStatus={handlePostOfPaymentStatus}
            email={memberEmail}
          />
        ) : (
          <Card className={classes.card}>
            <Card.Header>
              <div className={classes.cardHeader}>
                <span>
                  <i>
                    Registering For:{"  "}
                    <b>{props.eventTitle}</b>
                  </i>
                </span>
                <span>
                  <i>
                    Cost: <b>${props.eventCost}</b>
                  </i>
                </span>
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
                  onClick={(e) => handleCheckbox(e, currentMember._id)}
                />
              ) : null}

              {currentMember && currentMember.Dependents.length
                ? currentMember.Dependents.map((dependentId, index) => {
                    let dependent = members.filter(
                      (member) => member._id === dependentId
                    );

                    return (
                      <Checkbox
                        key={index}
                        id={index}
                        name={
                          dependent[0].Firstname + " " + dependent[0].Lastname
                        }
                        onClick={(e) => handleCheckbox(e, dependent[0]._id)}
                      />
                    );
                  })
                : null}
              <div className={classes.subTotal}>
                <Card.Text>Transaction Fee:&nbsp; </Card.Text>

                <Card.Text>
                  <b>${paymentAmount}</b>
                </Card.Text>
              </div>

              <Form.Label className="mt-3 font-weight-bold ">
                Coupon Code (optional)
              </Form.Label>
              <div className={classes.couponContainer}>
                <Form.Control
                  placeholder="Enter a valid coupon code"
                  aria-label="coupon code"
                  aria-describedby="coupon code"
                  type="text"
                  disabled={Number(props.eventCost <= 0) ? true : false}
                  onChange={() => {}}
                  className={classes.couponInput}
                />

                <Button
                  size="sm"
                  variant="outline-primary"
                  disabled={Number(props.eventCost) ? false : true}
                  className={classes.couponBtn}
                >
                  Apply
                </Button>
              </div>
              <h5 className={classes.cardHeading}>Select a Payment Method</h5>
              <Form.Check
                className={classes.radioBtn}
                type="radio"
                disabled={Number(props.eventCost) ? false : true}
                label={
                  <img
                    src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_74x46.jpg"
                    height="40"
                    width="70"
                    border="0"
                    alt="PayPal Logo"
                  />
                }
                id="Paypal"
                name="paymentType"
                value="paypal"
                onChange={(e) => setPaymentType(e.target.value)}
              />
              <Form.Check
                className={classes.radioBtn}
                type="radio"
                disabled={Number(props.eventCost) ? false : true}
                label={
                  <img
                    src={CreditcardLogo}
                    alt="credit card logos"
                    height="40"
                  />
                }
                id="card"
                name="paymentType"
                value="card"
                onChange={(e) => setPaymentType(e.target.value)}
              />
            </Card.Body>
            <Card.Footer className={classes.footer}>
              <div className={classes.footerBtnContainer}>
                {paypalButtonShow ? (
                  <PayPal
                    eventCost={paymentAmount}
                    eventTitle={props.eventTitle}
                    setSuccessPageShow={setSuccessPageShow}
                    handlePostOfPaymentStatus={handlePostOfPaymentStatus}
                  />
                ) : (
                  <Button
                    size="lg"
                    variant="outline-success"
                    onClick={handlePayment}
                  >
                    Proceed to Checkout
                  </Button>
                )}
              </div>
              <div className={classes.footerBtnContainer}>
                <Button
                  size="lg"
                  variant="outline-danger"
                  className={classes.cancelBtn}
                  onClick={() => window.location.reload()}
                >
                  Cancel
                </Button>
              </div>
            </Card.Footer>
          </Card>
        )}
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

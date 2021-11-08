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
const RegistrationForm = (props) => {
  const [members, setMembers] = useState([]);
  const [memberId, setMemberId] = useState();
  const [registeredMembersIds, setRegisteredMembersIds] = useState([]);
  const [error, setError] = useState("");
  const [paymentType, setPaymentType] = useState("n/a");
  const [showPaymentForm, setPaymentFormShow] = useState(false);
  const [showSuccessPage, setSuccessPageShow] = useState(false);
  // use setPaymentAmount for adjusting cost after applying coupon
  const [paymentAmount, setPaymentAmount] = useState("0.00");
  // let transactionFee = (Number(paymentAmount) * 0.029 + 0.3).toFixed(2);
  // let totalAmount = (Number(transactionFee) + Number(paymentAmount)).toFixed(2);
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
  const handlePostOfPaymentStatus = (paymentId, paymentMethodId) => {
    // pass this handler as a prop to the stripeContainer component and paymentForm component
    // paymentResponse is an object that contains paymentIntegrationId, success message

    const data = {
      activityId: props.eventId,
      memberId: memberId,
      registeredMembersIds: registeredMembersIds,
      paymentIntentId: paymentId,
      paymentMethodId: paymentMethodId,
      paymentAmount: paymentAmount,
      // paymentAmount: totalAmount,
      paymentType: paymentType,
      description: "Registration for " + props.eventTitle,
    };

    // try {
    //   const response = axios.post("/activities/registration", data);
    //   if (response.status === 500) {
    //     throw Error("Registration Failed!");
    //   } else if (response) {
    //     console.log("success storing data: ", response);
    //     return response;
    //     // switch to payment confirmation page
    //   } else {
    //     throw Error("Registration Failed!");
    //   }
    // } catch (error) {
    //   console.log("Error: ", error.message);
    //   setError("Registration Failed!");

    //   // switch to error display page
    // }
    return axios
      .post("/activities/registration", data)
      .then((res, err) => {
        console.log("res in post: ", res.status);
        if (res.status === 200) {
          console.log("success storing data: ", res);
          return res;
        } else {
          console.log("Error:", err);
          return err;
          // throw new Error(err);
        }
      })
      .catch((err) => {
        console.log("Error: ", err);
        setError("Registration Failed!");
        // throw Error(error);
        // return error;
      });
  };
  const handlePayment = () => {
    if (registeredMembersIds.length === 0) {
      window.alert("No member has been selected for registration!");
      return;
    }
    if (Number(props.eventCost) <= 0) {
      try {
        handlePostOfPaymentStatus("n/a", "n/a")
          .then((successStoringData) => {
            console.log("successStoringData:", successStoringData);

            setSuccessPageShow(true);
          })

          .catch((e) => console.log(e));
      } catch (e) {
        console.log(e);
        setError("Registration Failed!");
      }
      // } catch (e) {
      //   console.log(e.message);
      //   setError("Registration Failed!");
      // }
    } else if (paymentType === "card") {
      // Number(props.eventCost);
      setPaymentFormShow(true);
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
  // console.log("currentMember: ", currentMember);
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
            // cost={totalAmount}
            eventTitle={props.eventTitle}
            handlePostOfPaymentStatus={handlePostOfPaymentStatus}
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
                {/* <Card.Text>Sub Total:&nbsp; </Card.Text> */}
                <Card.Text>Transaction Fee:&nbsp; </Card.Text>

                <Card.Text>
                  <b>${paymentAmount}</b>
                </Card.Text>
              </div>
              {/* <div className={classes.transactionFee}>
                <i>
                  <Card.Text>Transaction Fee:&nbsp; </Card.Text>
                </i>

                <Card.Text>
                  <b>${(Number(paymentAmount) * 0.029 + 0.3).toFixed(2)}</b>
                </Card.Text>
              </div> */}
              {/* <div className={classes.total}>
                <Card.Text>Total:&nbsp;</Card.Text>

                <Card.Text>
                  <b>
                    $
                    {(
                      Number(paymentAmount) +
                      (Number(paymentAmount) * 0.029 + 0.3)
                    ).toFixed(2)}
                  </b>
                </Card.Text>
              </div> */}

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
            <Card.Footer>
              <Button
                size="lg"
                variant="outline-success"
                onClick={handlePayment}
              >
                Proceed to Checkout
              </Button>
              <Button
                size="lg"
                variant="outline-danger"
                className={classes.cancelBtn}
              >
                <a href="/activities" className={classes.link}>
                  Cancel
                </a>
              </Button>
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

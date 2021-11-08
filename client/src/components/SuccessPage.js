import React from "react";
import Classes from "./SuccessPage.module.css";
import imageSrc from "../images/green_circle_checkmark.png";
const PaymentSuccess = (props) => {
  return (
    <div className={Classes.successPage}>
      <h4>
        You have successfully registered for the {props.eventTitle} event{" "}
      </h4>
      <img
        src={imageSrc}
        alt="green circle with checkmark"
        height="400"
        width="400"
      />
      <h2>Thank You!</h2>
      <a href="/activities">Return to Activity Hub</a>
    </div>
  );
};
export default PaymentSuccess;

import React from "react";
import Classes from "./SuccessPage.module.css";
import imageSrc from "../images/green_circle_checkmark.png";

const PaymentSuccess = (props) => {
  return (
    <div className={Classes.successPage}>
      <h4>You have successfully registered for the {props.eventTitle}.</h4>
      <img
        src={imageSrc}
        alt="green circle with checkmark"
        height="400"
        width="400"
      />
      <h2 style={{ marginTop: "10px" }}>Thank You!</h2>
      <button
        className={Classes.btn}
        onClick={() => window.location.reload(true)}
      >
        Return to Activity Hub
      </button>
    </div>
  );
};
export default PaymentSuccess;

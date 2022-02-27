import React from "react";
import Classes from "./SuccessPage.module.css";
import imageSrc from "../images/light-blue_checkmark.svg.png";
const PaymentSuccess = (props) => {
  return (
    <div className={Classes.successPage}>
      <h4>{props.message}</h4>
      <img
        src={imageSrc}
        alt="green circle with checkmark"
        height="340"
        width="340"
      />
      <h2 style={{ marginTop: "10px" }}>Thank You!</h2>
      <button
        className={Classes.btn}
        onClick={() => window.location.reload(true)}
      >
        {props.route && props.route === "Payment"
          ? "Return to Payment Page"
          : "Return to Activity Hub"}
      </button>
    </div>
  );
};
export default PaymentSuccess;

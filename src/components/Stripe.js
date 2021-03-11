import React from "react";
import "./Stripe.css";

const Stripe = (props) => {
  return (
    <div
      className="stripe"
      onClick={() => props.toggleControls()}
    >
      <div className="stripe-contents">  
        <div className="logo">ZS</div>
        <button className="controls-toggle">[controls]</button>
      </div>
    </div>
  );
};

export default Stripe;
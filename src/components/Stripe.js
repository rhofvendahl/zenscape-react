import React from "react";
import "./Stripe.css";

const Stripe = (props) => {
  return (
    <div className="stripe">
      <div className="stripe-contents">  
        <div className="stripe-logo">ZS</div>
        <button
          className="controls-toggle"
          onClick={() => props.toggleControls()}
        >[controls]</button>
      </div>
    </div>
  );
};

export default Stripe;
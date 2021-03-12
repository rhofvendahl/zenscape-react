import React from "react";
import "./Stripe.css";

const Stripe = ({toggleControls}) => {
  return (
    <div className="stripe">
      <div className="stripe-contents">  
        <div className="stripe-logo">ZS</div>
        <button
          className="controls-toggle"
          onClick={() => toggleControls()}
        >[controls]</button>
      </div>
    </div>
  );
};

export default Stripe;
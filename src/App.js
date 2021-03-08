import React, { useEffect, useState, useRef, useCallback } from "react";
import Stripe from "./Stripe";
import Controls from "./Controls";
import ScapeManager from "./ScapeManager";

const App = () => {
    return (
        <div className="app">
            <div className="viewport">
                <Stripe />
                <ScapeManager />
            </div>
            <Controls />
        </div>
    );
};

export default App;

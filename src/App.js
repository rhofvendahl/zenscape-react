import React, { useEffect, useState, useRef, useCallback } from "react";
import Controls from "./Controls";
import ScapeManager from "./ScapeManager";

const App = () => {
    return (
        <div className="app">
            <Controls />
            <ScapeManager />
        </div>
    );
};

export default App;

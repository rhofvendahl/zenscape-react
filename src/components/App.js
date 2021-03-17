import React, { useEffect, useState, useRef, useCallback } from "react";
import Stripe from "./Stripe";
import Controls from "./Controls";
import ScapeManager from "./ScapeManager";
import { INIT_VALUES } from "../constants"
import "../styles/App.css";

// Manages interactions between landscape and controls
const App = () => {
  const [xCells, setXCells] = useState(INIT_VALUES.X_CELLS);
  const [zCells, setZCells] = useState(INIT_VALUES.Z_CELLS);
  const [cellSize, setCellSize] = useState(INIT_VALUES.CELL_SIZE);
  const [waveHeight, setWaveHeight] = useState(INIT_VALUES.WAVE_HEIGHT);
  const [waveWidth, setWaveWidth] = useState(INIT_VALUES.WAVE_WIDTH);
  const [waveSpeed, setWaveSpeed] = useState(INIT_VALUES.WAVE_SPEED);
  const [controlsHidden, setControlsHidden] = useState(null);
  // Indicates whether controls "visibility" is set to "none" (occurs at end of "hide" animation)
  const [controlsRemoved, setControlsRemoved] = useState(false);

  // Ensures timeout has current value for controlsHidden
  const controlsHiddenRef = useRef(controlsHidden);
  useEffect(() => {
    controlsHiddenRef.current = controlsHidden;
  }, [controlsHidden]);

  const toggleControls = useCallback(() => {
    let prevControlsHidden = controlsHidden;
    // Sets to true if either false (visible) or null (initial state)
    setControlsHidden(!prevControlsHidden);
    if (prevControlsHidden) {
      setControlsRemoved(false);
    }
    else {
      setTimeout(() => {
        if (controlsHiddenRef.current) {
          setControlsRemoved(true);
        }
      }, 1000);  
    }
  }, [controlsHidden]);

  const getControlsClassName = () => {
    let className = "controls";
    if (controlsRemoved) {
      return className + " controls-removed";
    } else if (controlsHidden == null) {
      return className + " controls-initial";
    } else if (controlsHidden) {
      return className + " controls-hidden";
    } else {
      return className;
    }
  };

  // Ensures timeout has current value for toggleControls
  const toggleControlsRef = useRef(toggleControls);
  useEffect(() => {
    toggleControlsRef.current = toggleControls;
  }, [toggleControls]);  

  // Hides controls 2seconds after start of session (if they havne't already been hidden)
  useEffect(() => {
    setTimeout(() => {
      if (controlsHiddenRef.current == null) {
        toggleControlsRef.current();
      }
    }, 2000);
  }, []);

  const resetControls = () => {
    setXCells(INIT_VALUES.X_CELLS);
    setZCells(INIT_VALUES.Z_CELLS);
    setCellSize(INIT_VALUES.CELL_SIZE);
    setWaveHeight(INIT_VALUES.WAVE_HEIGHT);
    setWaveWidth(INIT_VALUES.WAVE_WIDTH);
    setWaveSpeed(INIT_VALUES.WAVE_SPEED);
  };

  const controlsHandlers = {
    onSizeChange: (newXCellsFloat) => {
      setCellSize(Math.round(400 / newXCellsFloat));
      setXCells(Math.round(newXCellsFloat));
      setZCells(Math.round(newXCellsFloat));
    },
    onHeightChange: (newHeight) => {
      setWaveHeight(newHeight);
    },
    onWidthChange: (newWidth) => {
      setWaveWidth(newWidth);
    },
    onSpeedChange: (newSpeed) => {
      setWaveSpeed(newSpeed);
    },
  };

  return (
    <div className="app">
      <div className="viewport">
        <Stripe
          toggleControls={toggleControls}
        />
        <ScapeManager
          xCells={xCells}
          zCells={zCells}
          cellSize={cellSize}
          clickMemory={INIT_VALUES.CLICK_MEMORY}
          updateInterval={INIT_VALUES.UPDATE_INTERVAL}
          waveValues={{
            height: waveHeight,
            width: waveWidth,
            speed: waveSpeed,
          }}
        />
        <div className="guide-wrapper">
          <div className="guide">^ click scape ^</div>
        </div>
      </div>
      <Controls
        className={getControlsClassName()}
        handlers={controlsHandlers}
        values={{
          size: xCells,
          height: waveHeight,
          width: waveWidth,
          speed: waveSpeed,
        }}
        reset={resetControls}
      />
    </div>
  );
};

export default App;
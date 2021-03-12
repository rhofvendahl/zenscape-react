import React, { useEffect, useState, useRef, useCallback } from "react";
import Stripe from "./Stripe";
import Controls from "./Controls";
import ScapeManager from "./ScapeManager";
import "./App.css";

const INIT = {
  X_CELLS: 20,
  Z_CELLS: 20,
  CELL_SIZE: 20,
  CLICK_MEMORY: 5,
  UPDATE_INTERVAL: 100,
  WAVE_HEIGHT: 1,
  WAVE_WIDTH: 1,
  WAVE_SPEED: 1,
};

const CONTROLS_LIMITS = {
  SIZE: {
    MIN: 10,
    MAX: 40,
  },
  HEIGHT: {
    MIN: .25,
    MAX: 2,
  },
  WIDTH: {
    MIN: .5,
    MAX: 2,
  },
  SPEED: {
    MIN: .1,
    MAX: 10,
  },
}

// Manages interactions between landscape and controls
const App = () => {
  const [xCells, setXCells] = useState(INIT.X_CELLS);
  const [zCells, setZCells] = useState(INIT.Z_CELLS);
  const [cellSize, setCellSize] = useState(INIT.CELL_SIZE);
  const [clickMemory, setClickMemory] = useState(INIT.CLICK_MEMORY);
  const [updateInterval, setUpdateInterval] = useState(INIT.UPDATE_INTERVAL);
  const [waveHeight, setWaveHeight] = useState(INIT.WAVE_HEIGHT);
  const [waveWidth, setWaveWidth] = useState(INIT.WAVE_WIDTH);
  const [waveSpeed, setWaveSpeed] = useState(INIT.WAVE_SPEED);
  const [controlsHidden, setControlsHidden] = useState(null);
  // Indicates whether controls "visibility" set to "none" (occurs at end of "hide" animation)
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
  
  useEffect(() => {
    setTimeout(() => {
      if (controlsHiddenRef.current == null) {
        toggleControlsRef.current();
      }
    }, 2000);
  }, []);

  const resetControls = () => {
    setXCells(INIT.X_CELLS);
    setZCells(INIT.Z_CELLS);
    setCellSize(INIT.CELL_SIZE);
    setWaveHeight(INIT.WAVE_HEIGHT);
    setWaveWidth(INIT.WAVE_WIDTH);
    setWaveSpeed(INIT.WAVE_SPEED);
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
          clickMemory={clickMemory}
          updateInterval={updateInterval}
          wave={{
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
        limits={CONTROLS_LIMITS}
        reset={resetControls}
      />
    </div>
  );
};

export default App;
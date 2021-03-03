import React, { useEffect, useState, useRef, useCallback } from "react";
import Scape from "./Scape";

const INIT = {
  X_CELLS: 20,
  Z_CELLS: 20,
  CELL_SIZE: 20,
  CLICK_MEMORY: 5,
  UPDATE_INTERVAL: 100,
}

// Responsible for landscape interactivity.
const ScapeManager = () => {
  const [clickLog, setClickLog] = useState([
    [5, 6, Date.now()],
    [5, 6, Date.now()],
    [14, 14, Date.now() + 500],
    [16, 4, Date.now() + 1000],
  ]);

  const [scapeMap, setScapeMap] = useState(
    new Array(INIT.X_CELLS).fill(0).map(() => new Array(INIT.Z_CELLS).fill(0))
  );

  const handleClick = (boxName) => {
    const click = [
      parseInt(boxName.split("-")[0]),
      parseInt(boxName.split("-")[1]),
      Date.now(),
    ];
    setClickLog(clickLog.concat([click]));
  }

  // Calculates the desired height for each cell.
  // Each cell is calculated individually, based on its distance from the locations of recent clicks.
  // useCallback is used to return a memoized function, as updateScapeMap would otherwise re-calculate each render cycle.
  const updateScapeMap = useCallback(() => {
    const newScapeMap = new Array(INIT.X_CELLS).fill(0).map(() => new Array(INIT.Z_CELLS).fill(0));
    for (let x = 0; x < newScapeMap.length; x++) {
      for (let z = 0; z < newScapeMap[0].length; z++) {

        // For each click, add to the current cell's height.
        for (let i = 0; (i < INIT.CLICK_MEMORY) && (i < clickLog.length); i++) {
          const click = clickLog[clickLog.length - 1 - i];
          const seconds = (Date.now() - click[2]) / 1000;
          const distance = Math.pow((Math.pow(x - click[0], 2) + Math.pow(z - click[1], 2)), 1 / 2);

          // If the current click is both close enough and recent enough, add an amount to the cell's height
          // corresponding to its position on a 2D cosine curve which started out centered on the clicked
          // cell and has since moved toward (and past) the current cell.
          if (Math.abs(distance / 2 - seconds) < Math.PI) {
            newScapeMap[x][z] += (Math.cos(distance / 2 - seconds) + 1) / 2;
          }
        };
      };
    };
    setScapeMap(newScapeMap);
  }, [clickLog]);


  // Create a reference to updateScapeMap that can be used within setInterval.
  const updateScapeMapRef = useRef(updateScapeMap);

  // Update this reference each time updateScapeMap changes.
  useEffect(() => {
    updateScapeMapRef.current = updateScapeMap;
  }, [updateScapeMap]);

  // Create an update loop at the start of this component's lifecycle.
  useEffect(() => {
    const updateTimer = setInterval(() => {
      updateScapeMapRef.current();
    }, INIT.UPDATE_INTERVAL);
    return () => {
      clearInterval(updateTimer);
    };
  }, []);

  return (
    <Scape
      cellSize={INIT.CELL_SIZE}
      handleClick={(boxName) => handleClick(boxName)}
      scapeMap={scapeMap}
    />
  );
};

export default ScapeManager;
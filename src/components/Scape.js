import React from "react";
import { SCAPE_PALLETES as PALLETES } from "../constants.js";
import Box from "./Box";

const getPallete = (height) => {
  const snowLine = 3;
  if (height <= .2 * snowLine) {
    return PALLETES.WATER
  } else if (height <= .3 * snowLine) {
    return PALLETES.SAND
  } else if (height <= .6 * snowLine) {
    return PALLETES.FOLIAGE
  } else if (height <= snowLine) {
    return PALLETES.ROCK
  } else {
    return PALLETES.SNOW
  };
};

// Responsible for rendering landscape.
const Scape = ({scapeMap, cellSize, handleClick}) => { 
  const cells = [];
  for (let x = 0; x < scapeMap.length; x++) {
    for (let z = 0; z < scapeMap[0].length; z++) {
      const boxName = x + "-" + z;
      const roundCorners = {
        backTopLeft: (x == 0 && z == 0) || scapeMap[x][z],
        backTopRight: (x == scapeMap.length - 1 && z == 0) || scapeMap[x][z],
        frontBottomLeft: (x == 0 && z == scapeMap[0].length - 1) || scapeMap[x][z],
        frontBottomRight: (x == scapeMap.length - 1 && z == scapeMap[0].length - 1) || scapeMap[x][z],
      };
      cells.push(<Box
        key={boxName}
        boxName={boxName}
        dimensions={{
          x: cellSize,
          y: cellSize,
          z: cellSize,
        }}
        coordinates={{
          x: x * cellSize,
          y: scapeMap[x][z] * cellSize,
          z: z * cellSize,
        }}
        handleClick={() => handleClick(boxName)}
        pallete={getPallete(scapeMap[x][z])}
        roundCorners={roundCorners}
      />);
    }
  }

  return (
    <div
      className="scape object"
      style={{
        marginLeft: (-scapeMap.length * cellSize / 2) + "px",
        marginTop: (-scapeMap[0].length * cellSize / 2) + "px",
        transform: "rotateX(-30deg)",
        top: "50%",
      }}
    >
      {cells}
      <Box
        className="base"
        dimensions={{
          x: scapeMap.length * cellSize,
          y: cellSize,
          z: scapeMap[0].length * cellSize,
        }}
        coordinates={{
          x: 0,
          y: -cellSize * 1.5,
          z: 0,
        }}
        pallete={PALLETES.BASE}
        roundCorners={{
            backTopLeft: true,
            backTopRight: true,
            frontBottomLeft: true,
            frontBottomRight: true,    
        }}
      />
    </div>
  );
};

export default Scape;
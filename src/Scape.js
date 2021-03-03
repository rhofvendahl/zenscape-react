import React from "react";
import Box from "./Box";

const PALLETES = {
  WATER: {
    light: "#4081f2",
    medium: "#346dc7",
    dark: "#275799",
  },
  SAND: {
    light: "#FFF089",
    medium: "#C1B367",
    dark: "#817847",
  },
  FOLIAGE: {
    light: "#2aa330",
    medium: "#1f8c28",
    dark: "#106e1f",
  },
  ROCK: {
    light: "#BEBEBE",
    medium: "#8E8E8E",
    dark: "#606060",
  },
  SNOW: {
    light: "#FFFFFF",
    medium: "#BEBEBE",
    dark: "#7F7F7F",
  },
  BASE: {
    light: "#9e9c9c",
    medium: "#807f7e",
    dark: "#4f4e4e",
  },
};

function getPallete(height) {
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
}

// Responsible for rendering landscape.
const Scape = (props) => {
  const cells = [];
  for (let x = 0; x < props.scapeMap.length; x++) {
    for (let z = 0; z < props.scapeMap[0].length; z++) {
      const boxName = x + "-" + z;
      cells.push(<Box
        key={boxName}
        boxName={boxName}
        dimensions={{
          x: props.cellSize,
          y: props.cellSize,
          z: props.cellSize,
        }}
        coordinates={{
          x: x * props.cellSize,
          y: props.scapeMap[x][z] * props.cellSize,
          z: z * props.cellSize,
        }}
        handleClick={() => props.handleClick(boxName)}
        pallete={getPallete(props.scapeMap[x][z])}
      />);
    }
  }

  return (
    <div
      className="scape object"
      style={{
        marginLeft: (-props.scapeMap.length * props.cellSize / 2) + "px",
        marginTop: (-props.scapeMap[0].length * props.cellSize / 2) + "px",
        transform: "rotateX(-27deg)"
      }}
    >
      {cells}
      <Box
        className="base"
        dimensions={{
          x: props.scapeMap.length * props.cellSize,
          y: props.cellSize,
          z: props.scapeMap[0].length * props.cellSize,
        }}
        coordinates={{
          x: 0,
          y: -props.cellSize * 1.5,
          z: 0,
        }}
        pallete={PALLETES.BASE}
      />
    </div>
  )
}

export default Scape;
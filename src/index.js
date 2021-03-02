import React from "react";
import ReactDOM from "react-dom";
import "./index.css";


// Renders background.
function Background(props) {
  return (
    <div className="stripe">
      <div className="logo">ZS</div>
      <div className="guide">[click]</div>
    </div>
  )
}

// Constructs a box face.
function Face(props) {
  const transformString = `translate3d(${props.translate.x}px, ${props.translate.y}px, ${props.translate.z}px)`
    + ` rotateX(${props.rotate.x}deg) rotateY(${props.rotate.y}deg) rotateZ(${props.rotate.z}deg)`;
  return (
    <div
      className={`${props.shade} face object`}
      style={{
        width: props.width,
        height: props.height,
        marginLeft: -props.width/2,
        marginTop: -props.height/2,
        transform: transformString,
        backgroundColor: props.color,
      }}
    ></div>
  )
}

// Constructs a box object.
// Some faces commented to reduce latency.
function Box(props) {
  return (
    <div
      className={`${props.boxName} box object`}
      onClick={props.handleClick}
    >
      {/* orthogonal to y axis (y points down) */}
      <Face
        color={props.pallete.light}
        width={props.dimensions.x}
        height={props.dimensions.z}
        translate={{x: (props.coordinates.x+props.dimensions.x/2), y: -(props.coordinates.y+props.dimensions.y), z: (props.coordinates.z+props.dimensions.z/2)}}
        rotate={{x: 90, y: 0, z: 0}}
      />

      {/* orthogonal to z axis (z points out at screen) */}
      <Face
        color={props.pallete.medium}
        width={props.dimensions.x}
        height={props.dimensions.y}
        translate={{x: (props.coordinates.x+props.dimensions.x/2), y: -(props.coordinates.y+props.dimensions.y/2), z: (props.coordinates.z+props.dimensions.z)}}
        rotate={{x: 0, y: 0, z: 0}}
      />
    </div>
  )
}

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
};

// Responsible for rendering landscape.
class Scape extends React.Component {
  getPallete(height) {
    const snowLine = 3;
    if (height <= .2*snowLine) {
      return PALLETES.WATER
    } else if (height <= .3*snowLine) {
      return PALLETES.SAND
    } else if (height <= .6*snowLine) {
      return PALLETES.FOLIAGE
    } else if (height <= snowLine) {
      return PALLETES.ROCK
    } else {
      return PALLETES.SNOW
    };
  }

  render() {
    const cells = [];
    for (let x=0; x<this.props.map.length; x++) {
      for (let z=0; z<this.props.map[0].length; z++) {
        const boxName = x + "-" + z;
        cells.push(<Box
          key={boxName}
          boxName={boxName}
          dimensions={{
            x: this.props.cellSize,
            y: this.props.cellSize,
            z: this.props.cellSize,
          }}
          coordinates={{
            x: x*this.props.cellSize,
            y: this.props.map[x][z]*this.props.cellSize,
            z: z*this.props.cellSize,
          }}
          handleClick={() => this.props.handleClick(boxName)}
          pallete={this.getPallete(this.props.map[x][z])}
        />);
      }
    }

    return (
      <div
        className="scape object"
        style={{
          marginLeft: (-this.props.map.length*this.props.cellSize/2) + "px",
          marginTop: (-this.props.map[0].length*this.props.cellSize/2) + "px",      
          transform: "rotateX(-27deg)"
        }}
      >
        {cells}
        <Box
          className="base"
          dimensions={{
            x: this.props.map.length*this.props.cellSize,
            y: this.props.cellSize,
            z: this.props.map[0].length*this.props.cellSize,
          }}
          coordinates={{
            x: 0,
            y: -this.props.cellSize*1.5,
            z: 0,
          }}
          pallete={{
            light: "#9e9c9c",
            medium: "#807f7e",
            dark: "#4f4e4e",
          }}
        />
      </div>
    )
  }
}

const INIT = {
  X_CELLS: 20,
  Z_CELLS: 20,
  CELL_SIZE: 20,
  CLICK_MEMORY: 20,
  UPDATE_INTERVAL: 200,
}

// Responsible for landscape interactivity.
class ScapeManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickLog: [
        [5, 6, Date.now()],
        [5, 6, Date.now()],
        [14, 14, Date.now()+500],
        [16, 4, Date.now()+1000],
      ],
      map: new Array(INIT.X_CELLS).fill(0).map(() => new Array(INIT.Z_CELLS).fill(0)),
    };
    this.updateTimer = undefined;
  }

  handleClick(boxName) {
    const click = [
      parseInt(boxName.split("-")[0]),
      parseInt(boxName.split("-")[1]),
      Date.now(),
    ];
    this.setState({
      clickLog: this.state.clickLog.concat([click]),
    });
    console.log(this.state.clickLog);
  }

  // Calculates the desired height for each cell.
  // Each cell is calculated individually, based on its distance from the locations of recent clicks.
  updateMap() {
    const map = new Array(INIT.X_CELLS).fill(0).map(() => new Array(INIT.Z_CELLS).fill(0));
    for (let x=0; x<map.length; x++) {
      for (let z=0; z<map[0].length; z++) {

        // For each click, add to the current cell's height.
        for (let i = 0; (i < INIT.CLICK_MEMORY) && (i < this.state.clickLog.length); i++) {
          const click = this.state.clickLog[this.state.clickLog.length-1-i];
          const seconds = (Date.now() - click[2])/1000;
          const distance = Math.pow((Math.pow(x-click[0], 2)+Math.pow(z-click[1], 2)), 1/2);

          // If the current click is both close enough and recent enough, add an amount to the cell's height
          // corresponding to its position on a 2D cosine curve which started out centered on the clicked
          // cell and has since moved toward (and past) the current cell.
          if (Math.abs(distance/2 - seconds) < Math.PI) {
            map[x][z] += (Math.cos(distance/2 - seconds) + 1)/2;
          }
        };
      };
    };
    this.setState({
      map: map,
    });
  }

  componentDidMount() {
    this.updateTimer = setInterval(()=>{
      this.updateMap();
    }, INIT.UPDATE_INTERVAL);
  }

  componentWillUnmount() {
    clearInterval(this.updateTimer);
  }

  render() {
    return (
      <Scape 
        cellSize={INIT.CELL_SIZE}
        handleClick={(boxName)=>this.handleClick(boxName)}
        map={this.state.map}
      />
    )
  }
}

ReactDOM.render((
  <React.Fragment>
    <Background />
    <ScapeManager />,
  </React.Fragment>
), document.getElementById("root"));

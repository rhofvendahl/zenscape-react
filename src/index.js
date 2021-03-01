import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Background(props) {
  return (
    <div className="stripe">
      <div className="logo">ZS</div>
      <div className="guide">[click]</div>
    </div>
  )
}

// Constructs an object face.
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
      {/* <Face
        color={props.pallete.dark}
        width={props.dimensions.x}
        height={props.dimensions.z}
        translate={{x: (props.coordinates.x+props.dimensions.x/2), y: -(props.coordinates.y), z: (props.coordinates.z+props.dimensions.z/2)}}
        rotate={{x: 90, y: 0, z: 0}}
      /> */}

      {/* orthogonal to z axis (z points out at screen) */}
      <Face
        color={props.pallete.medium}
        width={props.dimensions.x}
        height={props.dimensions.y}
        translate={{x: (props.coordinates.x+props.dimensions.x/2), y: -(props.coordinates.y+props.dimensions.y/2), z: (props.coordinates.z+props.dimensions.z)}}
        rotate={{x: 0, y: 0, z: 0}}
      />
      {/* <Face
        color={props.pallete.medium}
        width={props.dimensions.x}
        height={props.dimensions.y}
        translate={{x: (props.coordinates.x+props.dimensions.x/2), y: -(props.coordinates.y+props.dimensions.y/2), z: (props.coordinates.z)}}
        rotate={{x: 0, y: 0, z: 0}}
      /> */}

      {/* orthogonal to x axis (x points to the right) */}
      {/* <Face
        color={props.pallete.light}
        width={props.dimensions.z}
        height={props.dimensions.y}
        translate={{x: (props.coordinates.x+props.dimensions.x), y: -(props.coordinates.y+props.dimensions.y/2), z: (props.coordinates.z+props.dimensions.z/2)}}
        rotate={{x: 0, y: 90, z: 0}}
      /> */}
      {/* <Face
        color={props.pallete.dark}
        width={props.dimensions.z}
        height={props.dimensions.y}
        translate={{x: (props.coordinates.x), y: -(props.coordinates.y+props.dimensions.y/2), z: (props.coordinates.z+props.dimensions.z/2)}}
        rotate={{x: 0, y: 90, z: 0}}
      /> */}
    </div>
  )
}

// Responsible for rendering landscape.
class Scape extends React.Component {
  getPallete(height) {
    const snowLine = 3;
    if (height <= .2*snowLine) { // water
      return {
        light: "#4081f2",
        medium: "#346dc7",
        dark: "#275799",
      }
    } else if (height <= .3*snowLine) { // sand
      return {
        light: "#FFF089",
        medium: "#C1B367",
        dark: "#817847",
      }
    } else if (height <= .6*snowLine) { // foliage
      return {
        light: "#2aa330",
        medium: "#1f8c28",
        dark: "#106e1f",
      }
    } else if (height <= snowLine) { // rock
      return {
        light: "#BEBEBE",
        medium: "#8E8E8E",
        dark: "#606060",
      }
    } else { // snow
      return {
        light: "#FFFFFF",
        medium: "#BEBEBE",
        dark: "#7F7F7F",
      }
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

// Responsible for landscape interactivity.
class Manager extends React.Component {
  constructor(props) {
    super(props);
    this.xCells = 20;
    this.zCells = 20;
    this.cellSize = 20;
    this.state = {
      clickLog: [
        [5, 6, Date.now()],
        [5, 6, Date.now()],
        [14, 14, Date.now()+500],
        [16, 4, Date.now()+1000],
      ],
      map: new Array(this.xCells).fill(0).map(() => new Array(this.zCells).fill(0)),
    };
    this.memory = 5;
    this.updateTimer = undefined;
    this.updateInterval = 100;
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

  updateMap() {
    const map = new Array(this.xCells).fill(0).map(() => new Array(this.zCells).fill(0));
    for (let x=0; x<map.length; x++) {
      for (let z=0; z<map[0].length; z++) {
        for (let i = 0; (i < this.memory) && (i < this.state.clickLog.length); i++) {
          const click = this.state.clickLog[this.state.clickLog.length-1-i];
          const seconds = (Date.now() - click[2])/1000;
          const distance = Math.pow((Math.pow(x-click[0], 2)+Math.pow(z-click[1], 2)), 1/2);
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
    }, this.updateInterval);
  }

  componentWillUnmount() {
    clearInterval(this.updateTimer);
  }

  render() {
    return (
      <Scape 
        cellSize={this.cellSize}
        handleClick={(boxName)=>this.handleClick(boxName)}
        map={this.state.map}
      />
    )
  }
}

ReactDOM.render((
  <React.Fragment>
    <Background />
    <Manager />,
  </React.Fragment>
), document.getElementById("root"));

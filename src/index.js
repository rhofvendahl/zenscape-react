import { render } from "ejs";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

// // class Square extends React.Component {
// //   render() {
// //     return (
// //       <button className="square" onClick={function() { alert("click"); }}>
// //         {this.props.value}
// //       </button>
// //     );
// //   }
// // }

// // class Square extends React.Component {
// //   render() {
// //     return (
// //       <button
// //         className="square"
// //         onClick={ () => this.props.onClick() }
// //       >
// //         {this.props.value}
// //       </button>
// //     );
// //   }
// // }


// function Square(props) {
//   return (
//     <button
//       className="square"
//       onClick={props.onClick}
//     >
//       {props.value}
//     </button>
//   );
// }

// class Background extends React.Component {
//   // constructor(props) {
//   //   super(props);
//   //   this.state = {
//   //     squares: Array(0).fill(null),
//   //     xIsNext: true,
//   //   };
//   // }

//   renderSquare(i) {
//     return (
//       <Square 
//         value={this.props.squares[i]}
//         onClick={ () => this.props.onClick(i) }
//       />
//     );
//   }

//   render() {
//     const winner = calculateWinner(this.props.squares);
//     let status;
//     if (winner) {
//       status = "Winner: " + winner;
//     } else {
//       status = "Next player: " + (this.props.xIsNext ? "X" : "O");
//     }

//     return (
//       <div>
//         {/* <div className="status">{status}</div> */}
//         <div className="board-row">
//           {this.renderSquare(0)}
//           {this.renderSquare(1)}
//           {this.renderSquare(2)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(3)}
//           {this.renderSquare(4)}
//           {this.renderSquare(5)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(6)}
//           {this.renderSquare(7)}
//           {this.renderSquare(8)}
//         </div>
//       </div>
//     );
//   }
// }

// class Game extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       history: [{
//         squares: Array(0).fill(null),
//       }],
//       xIsNext: true,
//     }
//   }

//   handleClick(i) {
//     const history = this.state.history;
//     const current = history[history.length - 1];
//     const squares = current.squares.slice();
//     if (calculateWinner(squares) || squares[i]) {
//       return;
//     }
//     squares[i] = this.state.xIsNext ? "X" : "O";
//     this.setState({
//       history: history.concat([{
//         squares: squares,
//       }]),
//       xIsNext: !this.state.xIsNext,
//     });
//   }

//   render() {
//     const history = this.state.history;
//     const current = history[history.length - 1];
//     const winner = calculateWinner(current.squares);
//     let status;
//     if (winner) {
//       status = "Winner: " + winner;
//     } else {
//       status = "Next player: " + (this.state.xIsNext ? "X" : "O");
//     }
//     return (
//       <div className="game">
//         <div className="game-board">
//           <Board 
//             squares={current.squares}
//             onClick={ (i) => this.handleClick(i)}
//           />
//         </div>
//         <div className="game-info">
//           <div>{status}</div>
//           <ol>{/* TODO */}</ol>
//         </div>
//       </div>
//     );
//   }
// }

// function calculateWinner(squares) {
//   const lines = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
//   ];
//   for (let i = 0; i < lines.length; i++) {
//     const [a, b, c] = lines[i];
//     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//       return squares[a];
//     }
//   }
//   return null;
// }

function Background(props) {
  return (
    <div className="stripe">
      <div className="logo">ZS</div>
      <div className="guide">[click]</div>
    </div>
  )
}

// function Face() {

// }

function Face(props) {
  const transformString = `translate3d(${props.translate.x}px, ${props.translate.y}px, ${props.translate.z}px)`
    + ` rotateX(${props.rotate.x}deg) rotateY(${props.rotate.y}deg) rotateZ(${props.rotate.z}deg)`;
  console.log(transformString);
  return (
    <div
      className={`${props.shade} face object`}
      style={{
        width: props.width,
        height: props.height,
        marginLeft: -props.width/2,
        marginTop: -props.height/2,
        transform: transformString,
      }}
    ></div>
  )
}

// TODO refactor, keep it short and DRY
function Box(props) {
  // console.log(props.className, props.dimensions, props.coordinates);
  return (
    <div className={`${props.className} box object`}>
      {/* comment faces to reduce latency */}

      {/* orthogonal to y axis (y points down) */}
      <Face
        shade="light"
        width={props.dimensions.x}
        height={props.dimensions.z}
        translate={{x: (props.coordinates.x+props.dimensions.x/2), y: -(props.coordinates.y+props.dimensions.y), z: (props.coordinates.z+props.dimensions.z/2)}}
        rotate={{x: 90, y: 0, z: 0}}
      />
      <Face
        shade="dark"
        width={props.dimensions.x}
        height={props.dimensions.z}
        translate={{x: (props.coordinates.x+props.dimensions.x/2), y: -(props.coordinates.y), z: (props.coordinates.z+props.dimensions.z/2)}}
        rotate={{x: 90, y: 0, z: 0}}
      />

      {/* orthogonal to z axis (z points out at screen) */}
      <Face
        shade="medium"
        width={props.dimensions.x}
        height={props.dimensions.y}
        translate={{x: (props.coordinates.x+props.dimensions.x/2), y: -(props.coordinates.y+props.dimensions.y/2), z: (props.coordinates.z+props.dimensions.z)}}
        rotate={{x: 0, y: 0, z: 0}}
      />
      <Face
        shade="medium"
        width={props.dimensions.x}
        height={props.dimensions.y}
        translate={{x: (props.coordinates.x+props.dimensions.x/2), y: -(props.coordinates.y+props.dimensions.y/2), z: (props.coordinates.z)}}
        rotate={{x: 0, y: 0, z: 0}}
      />

      {/* orthogonal to x axis (x points to the right) */}
      <Face
        shade="light"
        width={props.dimensions.z}
        height={props.dimensions.y}
        translate={{x: (props.coordinates.x+props.dimensions.x), y: -(props.coordinates.y+props.dimensions.y/2), z: (props.coordinates.z+props.dimensions.z/2)}}
        rotate={{x: 0, y: 90, z: 0}}
      />
      <Face
        shade="dark"
        width={props.dimensions.z}
        height={props.dimensions.y}
        translate={{x: (props.coordinates.x), y: -(props.coordinates.y+props.dimensions.y/2), z: (props.coordinates.z+props.dimensions.z/2)}}
        rotate={{x: 0, y: 90, z: 0}}
      />
    </div>
  )
}

class Scape extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xCells: props.cellSize,
      zCells: props.zCells,
      cellSize: props.cellSize,
      memory: props.memory,
      map: new Array(this.props.xCells).fill(new Array(this.props.zCells).fill(0)),
      clickLog: [],
    }
  }

  render() {
    // console.log(this.state.map);
    let cells = []
    for (let x=0; x<this.state.map.length; x++) {
      for (let z=0; z<this.state.map[0].length; z++) {
        const boxName = x + "-" + z;
        cells.push(<Box
          key={boxName}
          className={boxName}
          dimensions={{
            x: this.props.cellSize,
            y: this.props.cellSize,
            z: this.props.cellSize,
          }}
          coordinates={{
            x: x*this.props.cellSize,
            y: this.state.map[x][z]*this.props.cellSize,
            z: z*this.props.cellSize,
          }}
        />)
      }
    }

    return (
      <div
        className="scape object"
        style={{
          marginLeft: (-this.state.xCells*this.state.cellSize/2) + "px",
          marginTop: (-this.state.zCells*this.state.cellSize/2) + "px",      
          transform: "rotateX(-27deg)"
        }}
      >
        {/* LATER: wrap this in "cells" div */}
        {cells}
        <Box
          className="base"
          dimensions={{
            x: this.state.map.length*this.props.cellSize,
            y: this.props.cellSize,
            z: this.state.map[0].length*this.props.cellSize,
          }}
          coordinates={{
            x: 0,
            y: -this.props.cellSize,
            z: 0,
          }}
        />
      </div>
    )
  }
}

ReactDOM.render((
  <React.Fragment>
    <Background />
    <Scape 
      xCells={20}
      zCells={20}
      cellSize={20}
      memory={5}
    />
  </React.Fragment>
), document.getElementById("root"));

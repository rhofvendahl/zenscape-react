import React from "react";
import Scape from "./Scape";

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

  export default ScapeManager;
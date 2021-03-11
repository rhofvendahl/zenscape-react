import React from "react";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';
import "./Controls.css";

const Controls = ({ className, onSizeChange, onHeightChange, onWidthChange, onSpeedChange, sizeValue, waveValues, resetControls }) => {
  return (
    <div
      className={className}
    >
      <div className="controls-contents">
        <div className="control control-size">
          <div className="control-label">size</div>
          <Slider
            onChange={onSizeChange}
            value={sizeValue}
          />
        </div>
        <div className="control control-height">
          <div className="control-label">height</div>
          <Slider
            onChange={onHeightChange}
            value={waveValues.height}
          />
        </div>
        <div className="control control-width">
          <div className="control-label">width</div>
          <Slider
            onChange={onWidthChange}
            value={waveValues.width}
          />
        </div>
        <div className="control control-speed">
          <div className="control-label">speed</div>
          <Slider
            onChange={onSpeedChange}
            value={waveValues.speed}
          />
        </div>
        <div className="controls-reset"
          onClick={()=>resetControls()}
        >
          [reset]
        </div>
      </div>
    </div>
  );
};

export default Controls;

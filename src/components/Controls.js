import React from "react";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';
import { CONTROLS_LIMITS as LIMITS } from "../constants"
import "../styles/Controls.css";

const Controls = ({ className, handlers, values, reset }) => {
  return (
    <div
      className={className}
    >
      <div className="controls-contents">
        <div className="control control-size">
          <div className="control-label">size</div>
          <Slider
            onChange={handlers.onSizeChange}
            value={values.size}
            step={.01}
            min={LIMITS.SIZE.MIN}
            max={LIMITS.SIZE.MAX}
          />
        </div>
        <div className="control control-height">
          <div className="control-label">height</div>
          <Slider
            onChange={handlers.onHeightChange}
            value={values.height}
            step={.01}
            min={LIMITS.HEIGHT.MIN}
            max={LIMITS.HEIGHT.MAX}
          />
        </div>
        <div className="control control-width">
          <div className="control-label">width</div>
          <Slider
            onChange={handlers.onWidthChange}
            value={values.width}
            step={.01}
            min={LIMITS.WIDTH.MIN}
            max={LIMITS.WIDTH.MAX}
          />
        </div>
        <div className="control control-speed">
          <div className="control-label">speed</div>
          <Slider
            onChange={handlers.onSpeedChange}
            value={values.speed}
            step={.01}
            min={LIMITS.SPEED.MIN}
            max={LIMITS.SPEED.MAX}
          />
        </div>
        <div className="controls-reset"
          onClick={()=>reset()}
        >
          [reset]
        </div>
      </div>
    </div>
  );
};

export default Controls;

import Face from "./Face";

// Constructs a box object.
const Box = ({boxName, handleClick, pallete, dimensions, coordinates, roundCorners}) => {
  const borderRadiusValue = dimensions.y / 8 + "px";
  return (
    <div
      className={`${boxName} box object`}
      onMouseDown={handleClick}
    >
      {/* Top */}
      <Face
        backgroundColor={pallete.light}
        width={dimensions.x}
        height={dimensions.z}
        translate={{ x: (coordinates.x + dimensions.x / 2), y: -(coordinates.y + dimensions.y), z: (coordinates.z + dimensions.z / 2) }}
        rotate={{ x: 90, y: 0, z: 0 }}
        borderRadius={`${roundCorners.backTopLeft ? borderRadiusValue : "0"} ${roundCorners.backTopRight ? borderRadiusValue : "0"} 0 0`}
      />

      {/* Front */}
      <Face
        backgroundColor={pallete.medium}
        width={dimensions.x}
        height={dimensions.y}
        translate={{ x: (coordinates.x + dimensions.x / 2), y: -(coordinates.y + dimensions.y / 2), z: (coordinates.z + dimensions.z) }}
        rotate={{ x: 0, y: 0, z: 0 }}
        borderRadius={`0 0 ${roundCorners.frontBottomRight ? borderRadiusValue : "0"} ${roundCorners.frontBottomLeft ? borderRadiusValue : "0"}`}
      />
    </div>
  );
};

export default Box;
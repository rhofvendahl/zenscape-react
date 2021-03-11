import Face from "./Face";

// Constructs a box object.
const Box = ({boxName, handleClick, pallete, dimensions, coordinates}) => {
  return (
    <div
      className={`${boxName} box object`}
      onMouseDown={handleClick}
    >
      {/* orthogonal to y axis (y points down) */}
      <Face
        backgroundColor={pallete.light}
        width={dimensions.x}
        height={dimensions.z}
        translate={{ x: (coordinates.x + dimensions.x / 2), y: -(coordinates.y + dimensions.y), z: (coordinates.z + dimensions.z / 2) }}
        rotate={{ x: 90, y: 0, z: 0 }}
      />

      {/* orthogonal to z axis (z points out at screen) */}
      <Face
        backgroundColor={pallete.medium}
        width={dimensions.x}
        height={dimensions.y}
        translate={{ x: (coordinates.x + dimensions.x / 2), y: -(coordinates.y + dimensions.y / 2), z: (coordinates.z + dimensions.z) }}
        rotate={{ x: 0, y: 0, z: 0 }}
      />
    </div>
  );
};

export default Box;
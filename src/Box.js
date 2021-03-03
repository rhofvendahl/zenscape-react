import Face from "./Face";

// Constructs a box object.
// Some faces commented to reduce latency.
const Box = (props) => {
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
        translate={{ x: (props.coordinates.x + props.dimensions.x / 2), y: -(props.coordinates.y + props.dimensions.y), z: (props.coordinates.z + props.dimensions.z / 2) }}
        rotate={{ x: 90, y: 0, z: 0 }}
      />

      {/* orthogonal to z axis (z points out at screen) */}
      <Face
        color={props.pallete.medium}
        width={props.dimensions.x}
        height={props.dimensions.y}
        translate={{ x: (props.coordinates.x + props.dimensions.x / 2), y: -(props.coordinates.y + props.dimensions.y / 2), z: (props.coordinates.z + props.dimensions.z) }}
        rotate={{ x: 0, y: 0, z: 0 }}
      />
    </div>
  )
}

export default Box;
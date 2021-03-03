
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
  
  export default Face;
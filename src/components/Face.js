// Constructs a box face.
const Face = ({translate, rotate, width, height, backgroundColor}) => {
  const transform = `translate3d(${translate.x}px, ${translate.y}px, ${translate.z}px)`
    + ` rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) rotateZ(${rotate.z}deg)`;

  return (
    <div
      className="face object"
      style={{
        width,
        height,
        marginLeft: -width/2,
        marginTop: -height/2,
        transform,
        backgroundColor,
      }}
    ></div>
  );
};

export default Face;
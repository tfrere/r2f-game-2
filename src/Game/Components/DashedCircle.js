export default function DashedLine({ ...props }) {
  const lineRef = useRef();
  const points = [];

  var items = 64;
  var radius = 3;
  var center = [0, 0];
  for (var i = 0; i <= items; i++) {
    var x = center[0] + radius * Math.cos((2 * Math.PI * i) / items);
    var y = center[1] + radius * Math.sin((2 * Math.PI * i) / items);
    points.push(new THREE.Vector3(x, 0, y));
  }

  useFrame((_, delta) => {
    lineRef.current.material.uniforms.dashOffset.value -= delta;
  });

  // return <QuadraticBezierLine ref={lineRef} start={[5, 0, 0]} end={[0, 0, 5]} mid={[13, 15, 13]} segments={5} color={'white'} lineWidth={2} dashed={true} />
  return (
    <Line
      ref={lineRef}
      points={points}
      segments={6}
      color={"white"}
      lineWidth={2}
      dashed={true}
      {...props}
    />
  );
}

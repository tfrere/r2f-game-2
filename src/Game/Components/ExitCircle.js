import { TextureLoader, Vector3 } from "three";
import React, { useRef, useEffect, useContext, useState } from "react";
import { useThree, useFrame, useLoader } from "@react-three/fiber";
import { Text, Segments, Segment, Line, Circle } from "@react-three/drei";
import config from "static/config.json";

import EventEmitter from "context/EventEmitter";

export default function EndCircle({ ...props }) {
  const [isOpen, setIsOpen] = useState(false);

  const eventEmitter = useContext(EventEmitter);
  const lineRef = useRef();
  const points = [];

  useEffect(() => {
    eventEmitter.subscribe(props.name, (data) => {
      setIsOpen(data.value);
    });
  }, [isOpen]);

  var items = 64;
  var radius = props.args[0];
  var center = [0, 0];
  for (var i = 0; i <= items; i++) {
    var x = center[0] + radius * Math.cos((2 * Math.PI * i) / items);
    var y = center[1] + radius * Math.sin((2 * Math.PI * i) / items);
    points.push(new Vector3(x, 0, y));
  }

  useFrame((_, delta) => {
    if (isOpen) {
      lineRef.current.material.uniforms.dashOffset.value -= delta;
    }
  });

  return (
    <>
      {isOpen ? (
        <>
          <Line
            ref={lineRef}
            points={points}
            segments={6}
            color={"white"}
            lineWidth={2}
            dashed={true}
            {...props}
          />
          <Circle
            args={[props.args[0], 32]}
            position={[
              props.position[0],
              props.position[1] - 0.05,
              props.position[2],
            ]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <meshStandardMaterial color={config.colors.exit} />
          </Circle>
        </>
      ) : null}
    </>
  );
}

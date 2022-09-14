import { Vector3 } from "three";
import React, { useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
import { Text, Text3D, Segments, Segment, Box } from "@react-three/drei";
import { Physics, usePlane, useBox } from "@react-three/cannon";

import { clamp } from "lodash-es";
import pingSound from "sounds/ping.mp3";

function Trigger(props) {
  const [isTriggered, setIsTriggered] = useState(false);
  const [timeoutInstance, setTimeoutInstance] = useState(false);
  const ping = new Audio(pingSound);
  const [ref, api] = useBox(
    () => ({
      onCollide: (e) => {
        console.log("contact", e.contact);
        ping.currentTime = 0;
        ping.volume = clamp(e.contact.impactVelocity / 20, 0, 1);
        ping.play();
      },
      onCollideBegin: (e) => {
        setIsTriggered(true);
        setTimeoutInstance(false);
      },
      onCollideEnd: (e) => {
        setTimeoutInstance(
          window.setTimeout(() => {
            setIsTriggered(false);
          }, 200)
        );
      },
      args: [5, isTriggered ? 0.2 : 0.4, 5],
      type: "Static",
      ...props,
    }),
    useRef(null)
  );

  return (
    <Box args={[5, isTriggered ? 0.2 : 0.4, 5]} ref={ref}>
      <meshStandardMaterial color={isTriggered ? "orange" : "red"} />
    </Box>
  );
}

export default Trigger;

import { CustomToneMapping, TextureLoader } from "three";
import React, { useRef, useState, useContext, useEffect } from "react";
import { Box, Plane } from "@react-three/drei";
import { useBox } from "@react-three/cannon";
import { useLoader } from "@react-three/fiber";
import EventEmitter from "context/EventEmitter";

import { clamp } from "lodash-es";
import pingSound from "sounds/ping.mp3";

let timeout = null;

import triggerGravity from "images/trigger-gravity.png";
import triggerExit from "images/trigger-exit.png";

function Trigger(props) {
  const [isTriggered, setIsTriggered] = useState(false);
  const eventEmitter = useContext(EventEmitter);
  const map = useLoader(
    TextureLoader,
    props.name === "gravity" ? triggerGravity : triggerExit
  );
  const ping = new Audio(pingSound);
  const [ref, api] = useBox(
    () => ({
      onCollide: (e) => {
        if (
          e.collisionFilters.targetFilterGroup ===
          e.collisionFilters.bodyFilterGroup
        ) {
          setIsTriggered(true);
          clearTimeout(timeout);
          ping.currentTime = 0;
          ping.volume = clamp(e.contact.impactVelocity / 20, 0, 1);
          ping.play();
        }
      },
      onCollideEnd: (e) => {
        console.log(e.target.geometry.attributes.position);

        timeout = setTimeout(() => {
          setIsTriggered(false);
        }, props.timeout || 800);
      },
      collisionFilterGroup: props.collisionFilterGroup,
      args: props.args,
      type: "Static",
      isTrigger: true,
      tolerance: 100,
      //   shouldInvalidate: false,
      ...props,
    }),
    useRef(null)
  );

  useEffect(() => {
    eventEmitter.emit(props.name, {
      value: isTriggered,
    });
  }, [isTriggered, ref]);

  return (
    <>
      <Plane
        {...props}
        position={[
          props.position[0],
          props.position[1] + 0.05,
          props.position[2],
        ]}
        args={[props.args[0], props.args[2]]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial map={map} transparent={true} />
      </Plane>

      <Box args={props.args} ref={ref}>
        <meshStandardMaterial
          opacity={!isTriggered ? 0 : 1}
          transparent={true}
          color={"white"}
        />
      </Box>
    </>
  );
}

export default Trigger;

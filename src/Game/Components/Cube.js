import { CustomToneMapping, TextureLoader } from "three";
import React, { useRef, useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { Box, CubeCamera } from "@react-three/drei";
import { useBox } from "@react-three/cannon";

import cubeTextureA from "images/cube-a.jpg";
import cubeTextureB from "images/cube-b.jpg";
import cubeTextureC from "images/cube-c.jpg";
import cubeTextureD from "images/cube-d.jpg";

import { clamp, random } from "lodash-es";

import brickSound from "sounds/bricks/brick-1.mp3";

const textures = [cubeTextureA, cubeTextureB, cubeTextureC, cubeTextureD];

function Cube(props) {
  const brick = new Audio(brickSound);
  console.log("rerender cube");
  const [ref, api] = useBox(
    () => ({
      onCollide: (e) => {
        brick.currentTime = 0;
        brick.volume = clamp(e.contact.impactVelocity / 20, 0, 1);
        brick.play();
      },
      collisionFilterGroup: props.collisionFilterGroup,
      args: props.args,
      mass: 0.2,
      ...props,
    }),
    useRef(null)
  );

  const map = useLoader(
    TextureLoader,
    textures[props.collisionFilterGroup - 21]
  );

  // const map = useMemo(
  //   () => useLoader(TextureLoader, textures[props.collisionFilterGroup - 21]),
  //   []
  // );

  return (
    <Box args={props.args} ref={ref}>
      <meshStandardMaterial map={map} />
    </Box>
  );
}

export default Cube;

import { CustomToneMapping, TextureLoader } from "three";
import React, { useRef, useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { Box, CubeCamera } from "@react-three/drei";
import { useBox } from "@react-three/cannon";

import cubeTextureA from "images/cube-a.jpg";
import cubeTextureB from "images/cube-b.jpg";
import cubeTextureC from "images/cube-c.jpg";
import cubeTextureD from "images/cube-d.jpg";

import { random } from "lodash-es";

const textures = [cubeTextureA, cubeTextureB, cubeTextureC, cubeTextureD];

function Cube(props) {
  const [ref, api] = useBox(
    () => ({ args: props.args, mass: 0.05, ...props }),
    useRef(null)
  );

  const map = useMemo(
    () => useLoader(TextureLoader, textures[random(0, 3)]),
    []
  );

  return (
    <Box args={props.args} ref={ref}>
      <meshStandardMaterial map={map} />
    </Box>
  );
}

export default Cube;

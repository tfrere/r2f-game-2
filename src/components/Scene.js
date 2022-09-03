import * as THREE from "three";

import React from "react";
import { useThree } from "@react-three/fiber";

import { Sparkles, OrbitControls, GizmoHelper } from "@react-three/drei";

import Player from "./Player";

const Scene = () => {
  useThree(({ camera }) => {
    console.log(camera);
  });
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight intensity={0.5} position={[300, 300, 4000]} />
      <Sparkles
        scale={new THREE.Vector3(10, 10, 10)}
        size={10}
        color="#00ff00"
        count={50}
      />
      <OrbitControls />
      <axesHelper />
      <gridHelper />
      <GizmoHelper />
      <Player />
    </>
  );
};

export default Scene;

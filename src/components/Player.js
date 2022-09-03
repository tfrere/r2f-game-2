import * as THREE from "three";
import React from "react";

const Player = () => {
  return (
    <mesh position={new THREE.Vector3(0, 0, 0)}>
      <sphereGeometry />
      <meshStandardMaterial />
    </mesh>
  );
};

export default Player;

import React, { useRef, useContext, useEffect } from "react";
import { Physics, usePlane, useBox } from "@react-three/cannon";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import config from "static/config.json";
import { TextureLoader, Vector3 } from "three";

import useStore from "Game/Store/Store.js";
import Cube from "Game/Components/Cube.js";
import Debug from "Game/Components/Debug.js";
import InvisibleWalls from "Game/Components/InvisibleWalls.js";

const LevelOne = () => {
  const isPaused = useStore((state) => state.isPaused);
  const isDebug = useStore((state) => state.isDebug);
  const gravity = useStore((state) => state.gravity);
  const hasStarted = useStore((state) => state.hasStarted);

  useThree(({ camera }) => {
    camera.position.set(
      config.camera.position[0],
      config.camera.position[1],
      config.camera.position[2]
    );
    camera.lookAt(new Vector3(0, 0, 0));
  });

  return (
    <Physics
      isPaused={isPaused}
      allowSleep
      gravity={gravity}
      defaultContactMaterial={{ restitution: 0.2 }}
    >
      {isDebug ? <Debug /> : null}
      {hasStarted && (
        <>
          <Cube
            collisionFilterGroup={21}
            position={[8, 0.1, -12]}
            args={[2, 2, 2]}
          />
          {/* BOX */}
          <InvisibleWalls args={[50, 50, 2]} />
        </>
      )}
    </Physics>
  );
};

export default LevelOne;

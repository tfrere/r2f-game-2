import React, { useRef, useContext, useEffect } from "react";
import { Physics, usePlane, useBox } from "@react-three/cannon";

import useStore from "Game/Store/Store.js";
import Cube from "Game/Components/Cube.js";
import Debug from "Game/Components/Debug.js";
import Player from "Game/Components/Player.js";
import Trigger from "Game/Components/Trigger.js";
import ExitCircle from "Game/Components/ExitCircle.js";
import InvisibleWalls from "Game/Components/InvisibleWalls.js";
import EventEmitter from "context/EventEmitter";

const LevelOne = () => {
  const isPaused = useStore((state) => state.isPaused);
  const isDebug = useStore((state) => state.isDebug);
  const gravity = useStore((state) => state.gravity);
  const setGravity = useStore((state) => state.setGravity);
  const hasStarted = useStore((state) => state.hasStarted);
  const eventEmitter = useContext(EventEmitter);

  useEffect(() => {
    let eventSubscription = eventEmitter.subscribe("gravity", (data) => {
      if (data.value === true) {
        if (useStore.getState().gravity[1] === -50) {
          setGravity([0, 50, 0]);
        } else {
          setGravity([0, -50, 0]);
        }
      }
    });
    return eventSubscription.unsubscribe;
  }, []);

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
          <Player
            collisionFilterGroup={22}
            position={[0, 5, 10]}
            args={[3, 32, 32]}
          />

          <Trigger
            color={"yellow"}
            name={"exit"}
            collisionFilterGroup={22}
            timeout={800}
            args={[5, 0.1, 5]}
            position={[-7.5, 0.1, -17.5]}
          />

          <Cube
            collisionFilterGroup={22}
            position={[7.5, 0.1, -17.5]}
            args={[4, 4, 4]}
          />

          <ExitCircle name={"exit"} args={[5, 0.1, 5]} position={[0, 0.1, 0]} />

          <InvisibleWalls args={[50, 50, 2]} />
        </>
      )}
    </Physics>
  );
};

export default LevelOne;

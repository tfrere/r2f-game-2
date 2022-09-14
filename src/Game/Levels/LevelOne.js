import { Vector3 } from "three";
import React, { useRef } from "react";
import { useThree } from "@react-three/fiber";
import { Text, Text3D, Segments, Segment, Box } from "@react-three/drei";
import { Physics, usePlane, useBox } from "@react-three/cannon";

import fontUrl from "fonts/1.woff";
import fontUrl3d from "fonts/helvetica.json";
import config from "static/config.json";

import useStore from "Game/Store/Store.js";
import Cube from "Game/Components/Cube.js";
import Debug from "Game/Components/Debug.js";
import Player from "Game/Components/Player.js";
import Trigger from "Game/Components/Trigger.js";

function Plane(props) {
  const [ref] = usePlane(() => ({ type: "Static", ...props }), useRef(null));

  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry args={props.args} />
      <meshLambertMaterial color={config.colors.background} />
    </mesh>
  );
}

function InvisibleWall(props) {
  const [ref] = useBox(() => ({ type: "Static", ...props }), useRef(null));

  return (
    <mesh ref={ref}>
      <planeBufferGeometry args={props.args} />
      <meshLambertMaterial transparent={true} opacity={0} />
    </mesh>
  );
}

const LevelOne = () => {
  const isPaused = useStore((state) => state.isPaused);
  const isDebug = useStore((state) => state.isDebug);
  const toggleIsDebug = useStore((state) => state.toggleIsDebug);
  const hasStarted = useStore((state) => state.hasStarted);

  useThree(({ camera }) => {
    camera.position.set(
      config.cameraPosition[0],
      config.cameraPosition[1],
      config.cameraPosition[2]
    );
    camera.lookAt(new Vector3(0, 0, 0));
  });

  return (
    <Physics
      isPaused={isPaused}
      allowSleep
      gravity={[0, -50, 0]}
      defaultContactMaterial={{ restitution: 0.2 }}
    >
      {isDebug ? <Debug /> : null}
      {hasStarted && (
        <>
          <Player position={[0, 5, 0]} args={[2, 32, 32]} />

          <Cube position={[-2.1, 0.1, -10]} args={[2, 2, 2]} />
          <Cube position={[0, 0.1, -10]} args={[2, 2, 2]} />
          <Cube position={[2.1, 0.1, -10]} args={[2, 2, 2]} />
          <Cube position={[-1.1, 2.1, -10]} args={[2, 2, 2]} />
          <Cube position={[1.1, 2.1, -10]} args={[2, 2, 2]} />
          <Cube position={[0.1, 4.1, -10]} args={[2, 2, 2]} />

          <Segments limit={60} lineWidth={2.0}>
            <Segment start={[-25, 0, -25]} end={[25, 0, -25]} color={"white"} />
            <Segment start={[25, 0, -25]} end={[25, 0, 25]} color={"white"} />
            <Segment start={[25, 0, 25]} end={[-25, 0, 25]} color={"white"} />
            <Segment start={[-25, 0, -25]} end={[-25, 0, 25]} color={"white"} />
          </Segments>

          <Trigger position={[8, -0.1, -17]} />
          <Plane
            receiveShadow
            args={[10000, 10000]}
            position={[0, -0.1, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
          />
          <Plane
            receiveShadow
            args={[10000, 10000]}
            position={[0, 50, 0]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <InvisibleWall position={[0.1, 0.1, -50 / 2]} args={[50, 50, 2]} />
          <InvisibleWall position={[0.1, 0.1, 50 / 2]} args={[50, 50, 2]} />
          <InvisibleWall
            position={[-25, 0.1, 0.1]}
            args={[50, 50, 2]}
            rotation={[0, Math.PI / 2, 0]}
          />
          <InvisibleWall
            position={[25, 0.1, 0.1]}
            args={[50, 50, 2]}
            rotation={[0, -Math.PI / 2, 0]}
          />
          {/* <Text3D
            font={fontUrl3d}
            color={["#ff00ff"]}
            bevelEnabled
            bevelSize={0.05}
            fontSize={5}
            scale={[2, 2, 2]}
          >
            Text 3D
          </Text3D> */}
          <Text
            position={[-22, 0, 20]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={6}
            fillOpacity={0.25}
            color={config.colors.player}
            anchorX="left"
            font={fontUrl}
          >
            LEVEL 1
          </Text>
        </>
      )}
    </Physics>
  );
};

export default LevelOne;

import { TextureLoader, Vector3 } from "three";
import React, { useRef, useEffect, useContext, useState } from "react";
import { useThree, useFrame, useLoader } from "@react-three/fiber";
import { Text, Segments, Segment } from "@react-three/drei";
import { Physics, usePlane, useBox } from "@react-three/cannon";
import { useKey } from "react-use";

import fontUrl from "fonts/1.woff";
import config from "static/config.json";

import useStore from "Game/Store/Store.js";
import Cube from "Game/Components/Cube.js";
import Debug from "Game/Components/Debug.js";
import Player from "Game/Components/Player.js";

import LevelOne from "Game/Levels/LevelOne.js";
import { Canvas } from "@react-three/fiber";

const Scene = () => {
  const score = useStore((state) => state.score);
  const isPaused = useStore((state) => state.isPaused);
  const toggleIsPaused = useStore((state) => state.toggleIsPaused);
  const isDebug = useStore((state) => state.isDebug);
  const toggleIsDebug = useStore((state) => state.toggleIsDebug);
  const hasStarted = useStore((state) => state.hasStarted);
  const setStart = useStore((state) => state.setStart);
  const [isLoadingLevel, setIsLoadingLevel] = useState();

  // d to debug state
  useKey("d", () => {
    toggleIsDebug();
    console.log(`isDebug -> ${isDebug}`);
  });

  // the value is a single space to catch 'space' key
  useKey(" ", () => {
    if (!useStore.getState().hasStarted) {
      setStart();
      setIsLoadingLevel(true);
      window.setTimeout(() => {
        setIsLoadingLevel(false);
      }, 1000);
      console.log("start game");
    } else {
      toggleIsPaused();
      console.log(`isPaused -> ${useStore.getState().isPaused}`);
    }
  });

  useKey("r", () => {
    setStart();
    setIsLoadingLevel(true);
    window.setTimeout(() => {
      setIsLoadingLevel(false);
    }, 1000);
    console.log("restart game");
  });

  return (
    <>
      <div className="ui-text ui-pause">{isPaused ? "game paused" : null}</div>
      <div className="ui-text ui-score">
        <span className="ui-label">SCORE </span>
        <span className="ui-value">{Math.round(score)}</span>
      </div>
      {!hasStarted && !isLoadingLevel && (
        <div className="ui-text ui-start">
          <span className="ui-start__content">
            Press <span className="key-box">space</span> to start
          </span>
        </div>
      )}
      {isLoadingLevel && (
        <div className="ui-text ui-start">
          <span className="ui-start__content">Loading level 1</span>
        </div>
      )}
      <Canvas
        gl={{
          powerPreference: "high-performance",
          antialias: false,
          alpha: true,
        }}
        resize={{ scroll: true, debounce: { scroll: 50, resize: 50 } }}
      >
        <ambientLight intensity={0.7} />
        {/* <color attach="background" args={[config.colors.background]} /> */}
        <spotLight
          position={[0, 5, 0]}
          angle={Math.PI / 4}
          penumbra={0.9}
          intensity={0.5}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        {/* <EffectComposer>
        <DepthOfField target={[0, 0, 3]} focusRange={0.15} bokehScale={4} />
      </EffectComposer> */}
        {!isLoadingLevel && <LevelOne />}
      </Canvas>
    </>
  );
};

export default Scene;

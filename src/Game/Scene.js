import React, { useRef, useEffect, useContext, useState } from "react";
import { useKey } from "react-use";

import useStore from "Game/Store/Store.js";
import Timer from "Game/Components/Timer.js";

import LevelOne from "Game/Levels/LevelOne.js";
import LevelTwo from "Game/Levels/LevelTwo.js";
import { Canvas } from "@react-three/fiber";

import {
  EffectComposer,
  DepthOfField,
  Bloom,
} from "@react-three/postprocessing";

const Scene = () => {
  const time = useStore((state) => state.time);
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
    }
    // disable pause
    // else {
    //   toggleIsPaused();
    //   console.log(`isPaused -> ${useStore.getState().isPaused}`);
    // }
  });

  useKey("r", () => {
    setStart();
    setIsLoadingLevel(true);
    window.setTimeout(() => {
      setIsLoadingLevel(false);
    }, 10);
    console.log("restart game");
  });

  return (
    <>
      <div className="ui-text ui-pause">{isPaused ? "game paused" : null}</div>
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
        dpr={[1, 1.5]}
        camera={{ fov: 75, near: 0.1, far: 100, position: [0, 0, 5] }}
        resize={{ scroll: true, debounce: { scroll: 50, resize: 50 } }}
      >
        <ambientLight intensity={0.7} />
        {/* <color attach="background" args={[config.colors.background]} /> */}
        {/* <spotLight
          position={[0, 5, 0]}
          angle={Math.PI / 4}
          penumbra={0.9}
          intensity={0.5}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        /> */}
        {/* <EffectComposer> */}
        {/* <DepthOfField
            target={[8, 0.1, -12]}
            height={480}
            focusRange={10}
            bokehScale={8}
          /> */}
        {/* <Bloom
            luminanceThreshold={0.8}
            luminanceSmoothing={0.9}
            height={300}
          /> */}
        {/* </EffectComposer> */}
        {!isLoadingLevel && <LevelOne />}
      </Canvas>
    </>
  );
};

export default Scene;

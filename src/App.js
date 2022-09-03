import * as THREE from "three";
import React from "react";
import Scene from "./components/Scene";
import { Canvas } from "@react-three/fiber";

import "./styles.css";

const App = () => {
  return (
    <div id="app">
      <Canvas>
        <Scene />
      </Canvas>
    </div>
  );
};

export default App;

// ReactDOM.render(<App />, document.getElementById('root'))

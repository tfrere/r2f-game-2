import * as THREE from "three";
import React, { useContext } from "react";
import Scene from "./Game/Scene";
import "./styles/styles.css";

import JoystickContext from "./context/JoystickContext";

const App = () => {
  const joystickValue = useContext(JoystickContext);

  return (
    <div id="app">
      <JoystickContext.Provider value={joystickValue}>
        <Scene />
      </JoystickContext.Provider>
    </div>
  );
};

export default App;

import React from "react";
import nipplejs from "nipplejs";

export const controls = {
  x: 0,
  y: 0,
  velocity: 0,
  angle: 0,
};

class Joystick {
  constructor() {
    let self = this;
    self.player = {
      x: 0,
      y: 0,
      velocity: 0,
      angle: 0,
    };
    self.staticNipple = nipplejs.create({
      zone: document.getElementById("root"),
      mode: "static",
      // shape: "square",
      restJoystick: true,
      position: { left: "50%", top: "50%" },
      // position: {left: "100px", bottom: "100px" },
    });

    self.staticNipple["0"].on("move", function (evt, data) {
      self.player = {
        x: data.vector.x,
        y: data.vector.y,
        velocity: Math.max(data.force, 0),
        angle: data.angle.radian,
      };
    });

    self.staticNipple["0"].on("end", function (evt) {
      self.player = {
        x: 0,
        y: 0,
        velocity: 0,
        angle: 0,
      };
    });
  }
}

const joystick = new Joystick();

const JoystickContext = React.createContext(joystick);

export default JoystickContext;

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Stats from "stats.js";
import nipplejs from "nipplejs";
import App from "./App";

var stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

function animate() {
  stats.begin();
  stats.end();
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

var staticNipple = nipplejs.create({
  zone: document.getElementById("root"),
  mode: "static",
  position: { left: "100px", bottom: "100px" },
  color: "red"
});

let fwdValue, bkdValue, lftValue, rgtValue;

staticNipple["0"].on("move", function (evt, data) {
  const forward = data.vector.y;
  const turn = data.vector.x;

  if (forward > 0) {
    fwdValue = Math.abs(forward);
    bkdValue = 0;
  } else if (forward < 0) {
    fwdValue = 0;
    bkdValue = Math.abs(forward);
  }

  if (turn > 0) {
    lftValue = 0;
    rgtValue = Math.abs(turn);
  } else if (turn < 0) {
    lftValue = Math.abs(turn);
    rgtValue = 0;
  }
});

staticNipple["0"].on("end", function (evt) {
  bkdValue = 0;
  fwdValue = 0;
  lftValue = 0;
  rgtValue = 0;
});

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

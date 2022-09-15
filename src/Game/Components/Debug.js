import { Stats } from "@react-three/drei";
import { useControls } from "leva";
import config from "static/config.json";
import useStore from "Game/Store/Store.js";
import { useEffect } from "react";

function Debug(props) {
  const isDebug = useStore((state) => state.isDebug);
  const setSpeed = useStore((state) => state.setSpeed);
  const setJump = useStore((state) => state.setJump);
  const setMass = useStore((state) => state.setMass);
  const { guiSpeed, guiJumpVelocity, guiMass } = useControls({
    guiSpeed: config.player.speed + 0,
    guiMass: config.player.mass + 0,
    guiJumpVelocity: config.player.jumpVelocity + 0,
  });

  useEffect(() => {
    setSpeed(guiSpeed);
    setMass(guiMass);
    setJump(guiJumpVelocity);
  }, [guiSpeed, guiJumpVelocity, guiMass]);

  return (
    <>
      <Stats className="stats" />
    </>
  );
}

export default Debug;

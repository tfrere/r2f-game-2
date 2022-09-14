import { Stats } from "@react-three/drei";
import { useControls } from "leva";
import config from "static/config.json";
import useStore from "Game/Store/Store.js";
import { useEffect } from "react";

function Debug(props) {
  const hasStarted = useStore((state) => state.hasStarted);
  const setSpeed = useStore((state) => state.setSpeed);
  const setJump = useStore((state) => state.setJump);
  const { guiSpeed, guiJump } = useControls({ guiSpeed: 2, guiJump: 200 });

  useEffect(() => {
    setSpeed(guiSpeed);
    setJump(guiJump);
  }, [guiSpeed, guiJump]);

  return (
    <>
      <Stats className="stats" />
      {hasStarted ?? (
        <gridHelper
          args={[50, 20, config.colors.player, config.colors.player]}
        />
      )}
    </>
  );
}

export default Debug;

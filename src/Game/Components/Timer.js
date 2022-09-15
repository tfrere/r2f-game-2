import React, { useState } from "react";
import useStore from "Game/Store/Store.js";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Plane, Text, Text3D, Segments, Segment, Box } from "@react-three/drei";
import fontUrl from "fonts/1.woff";
import config from "static/config.json";

dayjs.extend(relativeTime);

const Timer = () => {
  const [timeValue, setTimeValue] = useState(0);
  const time = useStore((state) => state.time);
  const hasStarted = useStore((state) => state.hasStarted);

  setInterval(() => {
    setTimeValue(dayjs().subtract(useStore.getState().time).format("mm:ss"));
  }, 1000);

  return (
    <>
      <Text
        position={[-2, 7.9, -25]}
        rotation={[0, 0, 0]}
        fontSize={1.2}
        letterSpacing={0.25}
        fillOpacity={0.5}
        color={config.colors.player}
        anchorX="left"
        font={fontUrl}
      >
        TIME
      </Text>
      <Text
        position={[-2, 6.1, -25]}
        rotation={[0, 0, 0]}
        fontSize={2}
        color={config.colors.player}
        anchorX="left"
        font={fontUrl}
      >
        {timeValue || "00:00"}
      </Text>
    </>
  );
};

export default Timer;

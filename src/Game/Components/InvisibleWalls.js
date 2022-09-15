import { DoubleSide, MeshStandardMaterial } from "three";
import React, { useRef, useMemo } from "react";
import { useBox, usePlane } from "@react-three/cannon";
import useStore from "Game/Store/Store.js";
import config from "static/config.json";
import { Text, Text3D, Segments, Segment, Box } from "@react-three/drei";
import fontUrl from "fonts/1.woff";
import TexturedPlane from "Game/Components/TexturedPlane";
import Timer from "Game/Components/Timer.js";

function InvisibleWall(props) {
  const isDebug = useStore((state) => state.isDebug);
  console.log("rerender wall");
  const [ref] = useBox(
    () => ({ type: "Static", args: props.args, position: props.position }),
    useRef(null)
  );
  const wireframeMat = new MeshStandardMaterial({
    wireframe: true,
    color: "white",
  });
  const invisibleMat = new MeshStandardMaterial({
    wireframe: true,
    transparent: true,
    opacity: 0,
  });
  return (
    <Box
      args={props.args}
      ref={ref}
      material={isDebug ? wireframeMat : invisibleMat}
    ></Box>
  );
}

function InvisibleWalls(props) {
  return (
    <>
      <Timer />
      <TexturedPlane args={[50, 50]} position={[0, 25, -25]} />
      <gridHelper args={[50, 10, config.colors.player, "#95D3BA"]} />
      <gridHelper
        position={[0, 50, 0]}
        args={[50, 10, config.colors.player, "#95D3BA"]}
      />

      <InvisibleWall
        position={[0, -1, 0]}
        args={[props.args[0], props.args[2], props.args[0]]}
      />
      <InvisibleWall
        position={[0, 51, 0]}
        args={[props.args[0], props.args[2], props.args[0]]}
      />
      <InvisibleWall
        position={[0, props.args[0] / 2, -props.args[0] / 2]}
        args={props.args}
      />
      <InvisibleWall
        position={[0, props.args[0] / 2, props.args[0] / 2]}
        args={props.args}
      />

      <InvisibleWall
        position={[-props.args[0] / 2, props.args[0] / 2, 0]}
        args={[props.args[2], props.args[0], props.args[0]]}
      />
      <InvisibleWall
        position={[props.args[0] / 2, props.args[0] / 2, 0]}
        args={[props.args[2], props.args[0], props.args[0]]}
      />

      <Segments limit={60} lineWidth={2.0}>
        <Segment
          start={[-25, 0, -25]}
          end={[25, 0, -25]}
          color={config.colors.line}
        />
        <Segment
          start={[25, 0, -25]}
          end={[25, 0, 25]}
          color={config.colors.line}
        />
        <Segment
          start={[25, 0, 25]}
          end={[-25, 0, 25]}
          color={config.colors.line}
        />
        <Segment
          start={[-25, 0, -25]}
          end={[-25, 0, 25]}
          color={config.colors.line}
        />
        <Segment
          start={[-25, 50, -25]}
          end={[25, 50, -25]}
          color={config.colors.line}
        />
        <Segment
          start={[25, 50, -25]}
          end={[25, 50, 25]}
          color={config.colors.line}
        />
        <Segment
          start={[25, 50, 25]}
          end={[-25, 50, 25]}
          color={config.colors.line}
        />

        <Segment
          start={[-25, 50, -25]}
          end={[-25, 50, 25]}
          color={config.colors.line}
        />

        <Segment
          start={[-25, 0, 25]}
          end={[-25, 50, 25]}
          color={config.colors.line}
        />
        <Segment
          start={[25, 0, -25]}
          end={[25, 50, -25]}
          color={config.colors.line}
        />

        <Segment
          start={[25, 0, 25]}
          end={[25, 50, 25]}
          color={config.colors.line}
        />
        <Segment
          start={[-25, 0, -25]}
          end={[-25, 50, -25]}
          color={config.colors.line}
        />
      </Segments>
    </>
  );
}

export default InvisibleWalls;

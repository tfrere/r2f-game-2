import { TextureLoader, Vector3, MeshStandardMaterial } from "three";
import React, { useRef, useEffect, useContext, useState } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useSphere, useContactMaterial } from "@react-three/cannon";
import { useSpring, animated } from "@react-spring/three";
import JoystickContext from "context/JoystickContext";
import { Trail } from "@react-three/drei";
import ballTexture from "images/ball.jpg";
import config from "static/config.json";

import useStore from "Game/Store/Store.js";
import { useKey } from "react-use";

function Player(props) {
  const joystick = useContext(JoystickContext);
  const map = useLoader(TextureLoader, ballTexture);
  const hasJumped = useStore((state) => state.hasJumped);
  const speed = useStore((state) => state.speed);
  const mass = useStore((state) => state.mass);
  const jump = useStore((state) => state.jump);
  const setScore = useStore((state) => state.setScore);
  const setHasJumped = useStore((state) => state.setHasJumped);
  const pos = useRef([0, 0, 0]);
  const [hasPop, setHasPop] = useState(false);

  useThree(({ camera }) => {
    camera.position.set(
      config.camera.position[0],
      config.camera.position[1] + 5,
      config.camera.position[2]
    );
    camera.lookAt(new Vector3(0, 5, 0));
  });

  const [ref, api] = useSphere(
    () => ({
      args: props.args,
      onCollide: (e) => {
        setHasJumped(false);
      },
      mass: mass,
      collisionFilterGroup: props.collisionFilterGroup,
      position: props.position,
    }),
    useRef(null)
  );

  const { scale } = useSpring({
    scale: hasPop ? [1, 1, 1] : [0, 0, 0],
    delay: 200,
    config: { tension: 180, friction: 12 },
  });

  useKey(" ", () => {
    if (!useStore.getState().hasJumped) {
      console.log(
        joystick.player.x * useStore.getState().speed,
        useStore.getState().jump,
        -joystick.player.y * useStore.getState().speed
      );
      setHasJumped(true);
      api.applyImpulse(
        [
          joystick.player.x * useStore.getState().speed,
          useStore.getState().gravity[1] === -50
            ? useStore.getState().jump
            : -useStore.getState().jump,
          -joystick.player.y * useStore.getState().speed,
        ],
        [0, 0, 0]
      );
    }
  });

  useEffect(() => {
    let test = api.position.subscribe((v) => (pos.current = v));
  }, []);

  useFrame(({ clock, camera }) => {
    api.applyImpulse(
      [joystick.player.x * speed, 0, -joystick.player.y * speed],
      [-joystick.player.x, 0, joystick.player.y]
    );
    camera.position.x = pos.current[0]
      ? config.camera.position[0] + pos.current[0]
      : config.camera.position[0];
    camera.position.y = pos.current[1]
      ? config.camera.position[1] + pos.current[1]
      : config.camera.position[1];
    camera.position.z = pos.current[2]
      ? config.camera.position[2] + pos.current[2]
      : config.camera.position[2];
    setHasPop(true);
  });

  const groundMaterial = "ground";

  useContactMaterial(groundMaterial, groundMaterial, {
    contactEquationRelaxation: 3,
    contactEquationStiffness: 1e8,
    friction: 1,
    frictionEquationStiffness: 1e8,
    restitution: 0.3,
  });
  const mat = new MeshStandardMaterial({
    transparent: true,
    opacity: 0.5,
    color: "white",
  });

  return (
    <>
      <Trail
        material={mat}
        width={30}
        length={8}
        color={config.colors.playerTrail}
        attenuation={(t) => {
          return t * t * t * t * t * t * t * t;
        }}
        target={ref}
      >
        <animated.mesh
          scale={scale}
          castShadow
          ref={ref}
          material={groundMaterial}
        >
          <sphereGeometry args={props.args} />
          <meshStandardMaterial map={map} />
        </animated.mesh>
      </Trail>
    </>
  );
}

export default Player;

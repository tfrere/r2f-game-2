import * as THREE from "three";
import { CustomToneMapping, TextureLoader } from "three";
import React, { useRef, useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { Plane } from "@react-three/drei";

import level1 from "images/level-1.png";

function TexturedPlane(props) {
  const map = useLoader(TextureLoader, level1);

  return (
    <Plane {...props}>
      <meshStandardMaterial
        map={map}
        transparent={true}
        // blending={THREE.CustomBlending}
        // blendEquation={THREE.AddEquation}
        // blendSrc={THREE.OneFactor}
        // blendDst={THREE.OneMinusSrcAlphaFactor}
        // blendSrcAlpha={THREE.OneFactor}
        // blendDstAlpha={THREE.OneMinusSrcAlphaFactor}
      />
    </Plane>
  );
}

export default TexturedPlane;

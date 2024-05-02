import {
  Float,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  OrbitControls,
  Scroll,
  ScrollControls,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { motion } from "framer-motion-3d";
import { useEffect, useState } from "react";
import { framerMotionConfig } from "../app/config";

import { Device } from "./Device";
import DiscThree from "./DiscThree";
import { ScrollManager } from "./ScrollManager";

export const Experience = (props) => {
    const { section,setSection } = props;
// console.log("check",section)
  const { viewport } = useThree();

  // const cameraPositionX = useMotionValue();
  // const cameraLookAtX = useMotionValue();

  // useEffect(() => {
  //   animate(cameraPositionX, menuOpened ? -5 : 0, {
  //     ...framerMotionConfig,
  //   });
  //   animate(cameraLookAtX, menuOpened ? 5 : 0, {
  //     ...framerMotionConfig,
  //   });
  // }, [menuOpened]);

  // useFrame((state) => {
  //   state.camera.position.x = cameraPositionX.get();
  //   state.camera.lookAt(cameraLookAtX.get(), 0, 0);
  // });

  return (
    <>
      <ambientLight intensity={1} />
      {/* <pointLight position={[10, 10, 10]} /> */}

      {/* <OrbitControls enableZoom={false} enablePan={false} enableRotate={true}> */}
      <ScrollControls pages={4} damping={0.1}>
        <ScrollManager section={section} onSectionChange={setSection} />
        <Scroll>
          <DiscThree position={[0, 0, 4.8]} />
        </Scroll>
      </ScrollControls>

      <motion.group
        // position={[1.5, 2, 3]}
        // scale={[0.9, 0.9, 0.9]}
        // rotation-y={-Math.PI / 4}
        initial={{
          scale: 0,
        }}
        animate={{
          //   y: section === 0 ? 0 : -1,
          scale: 1,
        }}
      >
        <Device
          position={[0, -0.45, 4.4]}
          rotation={[Math.PI / 2.6, 0, 0]}

          // scale={[1.2,1.2,1.2]}
        />
      </motion.group>
    </>
  );
};

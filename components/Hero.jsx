"use client";
import React, { Suspense, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence,MotionConfig } from "framer-motion";
import useSound from "use-sound";
import { useState } from "react";
import { MouseOverImages, companies, companyLists } from "@/libs/data";
import { BubbleText } from "./BubbleText";
import { MouseImageTrail } from "./MouseImage";
import { useRouter } from "next/navigation";

import { Canvas, useFrame } from "@react-three/fiber";
import { Experience } from "./Experience";
import { ScrollManager } from "./ScrollManager";
import { Leva } from "leva";
import { Scroll, ScrollControls } from "@react-three/drei";
import { framerMotionConfig } from "@/app/config";

export default function Hero() {
  const [section, setSection] = useState(0);

  return (
        <div id="threed" className=" w-screen h-screen">
        <MotionConfig
          transition={{
            ...framerMotionConfig,
          }}
        >
          <Canvas>
            <ScrollControls pages={4} damping={0.1}>
              <ScrollManager section={section} onSectionChange={setSection} />
              <Scroll>
                <Experience />
              </Scroll>
              {/* <Scroll html>
              <Interface />
            </Scroll> */}
            </ScrollControls>
          </Canvas>
        </MotionConfig>
        <Leva hidden />
      </div>
  )
}

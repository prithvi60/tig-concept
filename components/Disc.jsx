"use client";
import React, { Suspense, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
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
const Disc = () => {
  const [scrollDown, setScrollDown] = useState(false);
  const [brand, setBrand] = useState("tigital");
  const [section, setSection] = useState(0);
  const [data, setData] = useState(companyLists[0]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dynamicRoute, setDynamicRoute] = useState("");
  const [progressValue, setProgressValue] = useState(0);
  // const [mute, setMute] = useState(true);
  const router = useRouter();

  // const [play, { stop }] = useSound(
  //   "https://ik.imagekit.io/webibee/tig-intro.mp3",
  //   {
  //     volume: 0.04,
  //     loop: true,
  //   }
  // );
  // useEffect(() => {
  //   console.log("update sec", section);
  // }, [section]);

  useEffect(() => {
    if (scrollDown === true) {
      let intervalId1 = setInterval(() => {
        if (progressValue < 100) {
          setProgressValue((o) => o + 20);
        } else {
          setProgressValue(0);
        }
        progressValue === 100 &&
          setCurrentSlide(
            (prevTabIndex) => (prevTabIndex + 1) % companies.length
          );
        // console.log("progress", progressValue);
      }, 1000);

      let value = companies[currentSlide].title;
      const sortedBy = companyLists.filter((val) =>
        val.companyName.includes(value)
      );
      setData(sortedBy[0]); // We are currently in the process of filtering the data obtained from the companyList data.

      return () => clearInterval(intervalId1); // Cleanup function to prevent memory leaks
    }
  }, [currentSlide, scrollDown, data, progressValue]);

  const handleDynamicRoute = (value) => {
    setDynamicRoute(value);
  };

  useEffect(() => {
    // wheel event callBack function for desktop
    const handleDeskTopRoute = () => {
      router.push(`/${dynamicRoute.toLowerCase()}`);
      setScrollDown(true);
    };

    // Touch event callBack function for mobile
    const handleTouchStart = (event) => {
      if (dynamicRoute !== "") {
        const touchStartY = event.touches[0].clientY;
        const touchMove = (moveEvent) => {
          const deltaY = moveEvent.touches[0].clientY - touchStartY;
          // console.log(deltaY);
          if (deltaY < -80) {
            // console.log("swiped Down",);
            router.push(`/${dynamicRoute.toLowerCase()}`);
            setScrollDown(true);
            document.removeEventListener("touchmove", touchMove);
          }
        };
        document.addEventListener("touchmove", touchMove);
      }
    };

    // The event listener will be triggered only when the dynamic route's state value is not empty.
    if (dynamicRoute !== "") {
      window.addEventListener("wheel", handleDeskTopRoute);
      window.addEventListener("touchstart", handleTouchStart);
    }

    // Cleanup function to prevent memory leaks
    return () => {
      window.removeEventListener("wheel", handleDeskTopRoute);
      window.removeEventListener("touchstart", handleTouchStart);
    };
    // console.log(dynamicRoute);
  }, [router, scrollDown, dynamicRoute]);
  useEffect(() => {
    section === 0
      ? setBrand(`${companies[0].title.toLowerCase()}`)
      : section === 1
      ? setBrand(`${companies[1].title.toLowerCase()}`)
      : section === 2
      ? setBrand(`${companies[2].title.toLowerCase()}`)
      : section === 3
      ? setBrand(`${companies[3].title.toLowerCase()}`)
      : setBrand(`${companies[0].title.toLowerCase()}`);
  }, [section]);
  return (
    <section
      style={{
        // background:
        //   "linear-gradient(to bottom right, #090101 30%, #793122 65%, #090101 90% )",
        background:
          section === 0
            ? "linear-gradient(to bottom right, #090101 30%, #793122 65%, #090101 90%)"
            : section === 1
            ? "linear-gradient(to bottom right, #ff0000, #00ff00)"
            : section === 2
            ? "linear-gradient(to bottom right, #0000ff, #ffff00)"
            : section === 3
            ? "linear-gradient(to bottom right, #ff00ff, #00ffff)"
            : "initial",
      }}
      className="relative z-20 flex flex-col items-center justify-center w-full space-y-3 overflow-hidden h-dvh md:gap-6 xl:gap-8 select-none"
    >
      {/* Mouse Move Effect */}
      {/* <MouseImageTrail
        renderImageBuffer={50}
        rotationRange={25}
        images={MouseOverImages}
        scrollDown={scrollDown}
      ></MouseImageTrail> */}

      {/* Main Company Name */}
      <AnimatePresence>
        <motion.div
          initial={{ y: 150, opacity: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ y: -150, opacity: 0 }}
          transition={{ duration: 1, ease: "backInOut", delay: 0.25 }}
          className={`mt-24 h-auto tracking-wide text-red-600 capitalize font-tiltNeon text-2xl md:text-4xl xl:text-6xl text-center cursor-pointer px-4 ${
            !scrollDown ? "block" : "hidden"
          }`}
        >
          <BubbleText value={"The Internet Generation"} />
          <p className="text-sm text-white">
            Empower your brand with our dynamic digital marketing solutions.
            From SEO to social media management, we drive results that elevate
            your online presence. Let us amplify your digital footprint today.
            Empower your brand with our dynamic digital marketing solutions.
          </p>

          <button
            className={`text-xs md:text-base px-4 py-2 rounded-xl ${"bg-red-600 text-white capitalize"}`}
            onClick={() => {
              router.push(`/${brand}`);
            }}
          >
            Visit {brand}
          </button>
          {/* {dynamicRoute === "" && (
            // <AnimatePresence>

            <motion.p
              // layout
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              // exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="flex flex-col-reverse md:flex-row items-center justify-center md:gap-1.5 text-sm font-bold tracking-wide text-center text-white font-belanosima animate-pulse"
            >
              Click a company name to visit their website
              <span>
                <Image
                  src={"/pointing-up-hand.svg"}
                  alt="play button"
                  height={50}
                  width={50}
                  className="md:mt-3.5 animate-bounce"
                />
              </span>
            </motion.p>
            // </AnimatePresence>
          )} */}
        </motion.div>
      </AnimatePresence>

      {/* 3D Disc Component makwe responsive */}
      <div id="threed" className=" w-screen h-screen">
        <MotionConfig
          transition={{
            ...framerMotionConfig,
          }}
        >
          <Canvas
            shadows
            camera={{
              position: [0, 0, 8],
              fov: 30,
            }}
          >
            <Experience section={section} setSection={setSection} />
            {/* <ScrollControls pages={4} damping={0.1}>
              <ScrollManager section={section} onSectionChange={setSection} />
              <Scroll>
              </Scroll>
              {/* <Scroll html>
              <Interface />
            </Scroll> */}
            {/* </ScrollControls> */}
          </Canvas>
        </MotionConfig>
        <Leva hidden />
      </div>

      {/* <RotatingDisc
        scrollDown={scrollDown}
        dynamicRoute={dynamicRoute}
        companies={companies}
        handleDynamicRoute={handleDynamicRoute}
        rotation={rotation}
        setRotation={setRotation}
      /> */}
      {/* <NewDisc/> */}
      {/* Play Button */}
      {dynamicRoute === "" ? (
        ""
      ) : (
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            initial={{ y: 150, opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: "easeIn",
              type: "spring",
              bounce: 0.5,
              stiffness: 100,
            }}
            exit={{
              y: -550,
              scale: 0.5,
              opacity: 0,
              transition: { duration: 1, delay: 0.5 },
            }}
            className={`text-base lg:text-2xl xl:text-3xl text-white capitalize font-belanosima px-5 py-2 mt-5 ${
              !scrollDown ? "block" : "hidden"
            }`}
          >
            <h3 className="hidden text-center md:block">scroll down</h3>
            <h3 className="block text-center md:hidden">swipe up</h3>
            <Image
              src={"/pointing-down-hand.svg"}
              alt="down arrow"
              height={60}
              width={60}
              className="mx-auto animate-bounce"
            />
          </motion.div>
        </AnimatePresence>
      )}
    </section>
  );
};

export default Disc;

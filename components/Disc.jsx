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
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorPositionForMobile, setCursorPositionForMobile] = useState({
    x: 0,
    y: 0,
  });

  // shadow cursor Effect
  useEffect(() => {
    const handleMouseMove = (event) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };
    const handleTouchMove = (event) => {
      const touch = event.touches[0];
      setCursorPositionForMobile({ x: touch.clientX, y: touch.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

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
      className="relative z-20 flex flex-col items-center justify-center w-full pt-20 space-y-3 overflow-hidden select-none md:pt-6 h-dvh md:gap-6 xl:gap-8"
    >
      {/* Mouse Move Effect */}
      {/* <MouseImageTrail
        renderImageBuffer={50}
        rotationRange={25}
        images={MouseOverImages}
        scrollDown={scrollDown}
      ></MouseImageTrail> */}

      {/* Main Company Name */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1.2, delay: 0.5, ease: "backOut" }}
        style={{
          top: cursorPosition.y || cursorPositionForMobile.y,
          left: cursorPosition.x || cursorPositionForMobile.x,
        }}
        className="absolute -translate-x-1/2 -translate-y-1/2 bg-white rounded-full w-36 h-36 md:w-72 md:h-72 opacity-20 blur-md -z-10"
      ></motion.div>
      <div className="flex items-center justify-center gap-4 px-5 py-3 bg-black rounded-full shadow-sm shadow-white md:gap-10 md:px-10 md:py-3">
        {companies.map((list) => (
          <h5 className="text-sm text-white md:text-lg" key={list.id}>
            {list.title}
          </h5>
        ))}
      </div>
      <AnimatePresence>
        <motion.div
          initial={{ y: 150, opacity: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ y: -150, opacity: 0 }}
          transition={{ duration: 1, ease: "backInOut", delay: 0.25 }}
          className={`mt-24 h-auto tracking-wide text-red-600 capitalize font-tiltNeon text-2xl md:text-4xl xl:text-6xl text-center  px-4 ${
            !scrollDown ? "block" : "hidden"
          }`}
        >
          <BubbleText value={"The Internet Generation"} />
          <p className="mx-8 text-sm text-white md:mx-36">
            Empower your brand with our dynamic digital marketing solutions.
            From SEO to social media management, we drive results that elevate
            your online presence. Let us amplify your digital footprint today.
            Empower your brand with our dynamic digital marketing solutions.
          </p>

          <motion.button
            key={section}
            initial={{ scale: 1.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut", type: "spring", stiffness: 200 }}
            onClick={() => {
              router.push(`/${brand}`);
            }}
          >
            <h4
              className={`text-xs md:text-base px-4 py-2 rounded-xl cursor-pointer hover:bg-black hover:text-white hover:scale-110 hover:px-6  ${"bg-red-600 text-white capitalize"}`}
            >
              Visit {brand}
            </h4>
          </motion.button>

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
      <div id="threed" className="w-screen h-screen ">
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

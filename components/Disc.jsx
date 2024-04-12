"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import useSound from "use-sound";
import { useState } from "react";
import { BackgroundSlider } from "./BackgroundSlider";
import { MouseOverImages, companies, companyLists } from "@/libs/data";
import { BubbleText } from "./BubbleText";
import { RotatingDisc } from "./RotatingDisc";
import { MouseImageTrail } from "./MouseImage";
import { useRouter } from "next/navigation";
const Disc = () => {
  const [bgSound, setBgSound] = useState(false);
  const [data, setData] = useState(companyLists[0]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dynamicRoute, setDynamicRoute] = useState(companies[0].title);
  const [progressValue, setProgressValue] = useState(0);
  const [mute, setMute] = useState(true);
  const [hide, setHide] = useState(false);
  const router = useRouter();
  const [play, { stop }] = useSound(
    "https://ik.imagekit.io/webibee/tig-intro.mp3",
    {
      volume: 0.04,
      loop: true,
    }
  );

  useEffect(() => {
    if (bgSound === true) {
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
  }, [currentSlide, bgSound, data, progressValue]);

  useEffect(() => {
    if (mute) {
      stop();
    } else {
      play();
    }
  }, [mute, play, stop]);

  useEffect(() => {
    window.addEventListener("wheel", (event) => {
      event.preventDefault();
      router.push(`/${dynamicRoute.toLowerCase()}`);
      // setBgSound(!bgSound);
    });
    // window.removeEventListener("wheel", (event) => {
    //   event.preventDefault();
    // });
  }, [router, bgSound, dynamicRoute]);

  return (
    <section
      className="relative z-20 flex flex-col items-center justify-center w-full space-y-3 overflow-hidden h-dvh md:gap-6 xl:gap-14"
      // className="w-full h-screen overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, x: -600 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 3, delay: 1.5 }}
        className={`fixed top-0 w-full h-screen overflow-hidden -z-10 ${
          bgSound ? "block" : "hidden"
        }`}
      >
        <AnimatePresence>
          <motion.img
            key={data.id}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 1, delay: 0.5, ease: "easeIn" },
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            src={data.img}
            alt="rotating_disc_svg"
            className="object-cover object-center w-full h-full"
          />
        </AnimatePresence>
      </motion.div>
      <MouseImageTrail
        renderImageBuffer={50}
        rotationRange={25}
        images={MouseOverImages}
        bgSound={bgSound}
      ></MouseImageTrail>
      {/* {hide && ( */}
      <AnimatePresence mode="popLayout">
        <motion.h1
          initial={{ y: 150, opacity: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ y: -150, opacity: 0, transition: { duration: 1 } }}
          transition={{ duration: 1, ease: "backInOut" }}
          className={`h-auto tracking-wide text-red-600 capitalize font-tiltNeon text-2xl md:text-4xl xl:text-6xl text-center cursor-pointer ${
            !bgSound ? "block" : "hidden"
          }`}
        >
          <BubbleText value={"The Internet Generation"} />
          <div className="flex items-center justify-center gap-4">
            {companies.map((list) => (
              <button
                key={list.id}
                className={`text-base px-4 py-2 rounded-xl ${
                  dynamicRoute === list.title
                    ? "bg-white text-red-600"
                    : "bg-red-600 text-white "
                }`}
                onClick={() => setDynamicRoute(list.title)}
              >
                {list.title}
              </button>
            ))}
          </div>
        </motion.h1>
      </AnimatePresence>
      {/* ) } */}
      {/* Disc Svg Component */}
      <RotatingDisc
        bgSound={bgSound}
        setBgSound={setBgSound}
        setHide={setHide}
        setMute={setMute}
        mute={mute}
      />
      {/* Play Button */}
      <AnimatePresence mode="popLayout">
        <motion.div
          layout
          initial={{ y: 150, opacity: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2, ease: "backInOut" }}
          exit={{
            y: -550,
            scale: 0.5,
            opacity: 0,
            transition: { duration: 1, delay: 0.5 },
          }}
          className={`text-xl lg:text-3xl xl:text-4xl text-white capitalize font-belanosima px-5 py-2 animate-bounce ${
            !bgSound ? "block" : "hidden"
          }`}
        >
          <h3>use scroll down</h3>
          <Image
            src={"/down-arrow.svg"}
            alt="down arrow"
            height={30}
            width={30}
            className="mx-auto"
          />
        </motion.div>
      </AnimatePresence>
      {/* background slider will be triggered, after disc play button is clicked*/}

      {bgSound && (
        <BackgroundSlider
          setMute={setMute}
          mute={mute}
          data={data}
          currentSlide={currentSlide}
          progressValue={progressValue}
        />
      )}
    </section>
  );
};

export default Disc;

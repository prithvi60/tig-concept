"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import useSound from "use-sound";
import { useState } from "react";
import { BackgroundSlider } from "./BackgroundSlider";
import { companies, companyLists } from "@/libs/data";
import { BubbleText } from "./BubbleText";
import { RotatingDisc } from "./RotatingDisc";
const Disc = () => {
  const [bgSound, setBgSound] = useState(false);
  const [data, setData] = useState(companyLists[0]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progressValue, setProgressValue] = useState(0);
  const [mute, setMute] = useState(true);
  const [play, { stop }] = useSound(
    "https://ik.imagekit.io/webibee/tig-intro.mp3",
    {
      volume: 0.04,
      loop: true,
    }
  );

  const handleClick = () => {
    setMute(false);
    setBgSound(true);
  };

  const handleClickForMute = () => {
    setMute(true);
    setBgSound(true);
  };

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

  return (
    <section className="relative z-20 flex flex-col items-center justify-center w-full space-y-3 overflow-hidden h-dvh md:gap-6 xl:gap-14">
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
            animate={{ opacity: 1, transition: { duration: 1, delay: 0.5,ease:"easeIn" } }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            src={data.img}
            alt="rotating_disc_svg"
            className="object-cover object-center w-full h-full"
          />
        </AnimatePresence>
      </motion.div>
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
        </motion.h1>
      </AnimatePresence>
      {/* Disc Svg Component */}
      <RotatingDisc bgSound={bgSound} />
      {/* Play Button */}
      <AnimatePresence mode="popLayout">
        <motion.h3
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
          className={`text-xl lg:text-3xl xl:text-4xl text-white capitalize font-belanosima border-2 border-red-600 px-5 py-2 rounded-xl ${
            !bgSound ? "block" : "hidden"
          }`}
        >
          Play{" "}
          <span>
            <button
              className="mx-1.5 md:mx-2.5 font-extrabold text-white hover:animate-pulse"
              onClick={handleClick}
            >
              With{" "}
            </button>
          </span>
          /
          <span>
            <button
              className="mx-1.5 md:mx-2.5 font-extrabold text-red-600 hover:animate-pulse"
              onClick={handleClickForMute}
            >
              Without
            </button>
          </span>{" "}
          music
        </motion.h3>
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

"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import useSound from "use-sound";
import { useState } from "react";
import { BackgroundSlider } from "./BackgroundSlider";
import { companyLists } from "@/libs/data";
import { BubbleText } from "./BubbleText";
const Disc = () => {
  const [bgSound, setBgSound] = useState(false);
  const [data, setData] = useState(companyLists[0]);
  const [mute, setMute] = useState(true);
  const [play] = useSound("https://ik.imagekit.io/webibee/tig-intro.mp3", {
    volume: 0.2,
    soundEnabled: mute,
  });

  const discVariants = {
    hidden: {
      y: 300,
      scale: 0.3,
      opacity: 0,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 2,
        delay: 0.5,
        ease: "circInOut",
      },
    },
    exit: {
      y: -240,
      scale: 1,
      opacity: 1,
      rotate: "360deg",
      transition: bgSound === true && {
        duration: 2.5,
        ease: "easeOut",
      },
    },
  };

  const discAfterPlayVariant = {
    animate: {
      rotate: "360deg",
      transition: {
        repeat: Infinity,
        duration: 2.5,
        ease: "easeOut",
      },
    },
    exit: { y: 0 },
  };

  const handleClick = () => {
    play();
    setBgSound(true);
  };

  const handleClickForMute = () => {
    setMute(false);
    setBgSound(true);
  };

  useEffect(()=>{
console.log("handle mute",mute)
play({forceSoundEnabled:mute})
  },[mute, play])

  return (
    <section className="relative z-20 flex flex-col items-center justify-center w-full h-screen space-y-3 overflow-hidden md:gap-6 xl:gap-14">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        className={`fixed top-0 w-full h-screen overflow-hidden -z-10 ${
          bgSound ? "block" : "hidden"
        }`}
      >
        <Image
          fill
          src={data.img}
          alt="rotating_disc_svg"
          className="object-cover object-center"
        />
      </motion.div>
      <AnimatePresence mode="popLayout">
        <motion.h1
          initial={{ y: 150, opacity: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ y: -150, opacity: 0, transition: { duration: 1 } }}
          transition={{ duration: 1, ease: "backInOut" }}
          className={`h-auto tracking-wide text-red-400 capitalize font-SpaceGrotesk text-2xl md:text-4xl xl:text-6xl text-center ${
            !bgSound ? "block" : "hidden"
          }`}
        >
        <BubbleText/>
        </motion.h1>
      </AnimatePresence>
      {/* Disc Svg Component */}
      <motion.div
        layout
        variants={discVariants}
        initial={"hidden"}
        animate="animate"
        exit={"exit"}
        className={`w-full h-[50vh] flex items-center justify-center ${
          bgSound ? "fixed top-20" : "top-0"
        }`}
      >
        <motion.div
          layout
          variants={discAfterPlayVariant}
          animate={"animate"}
          className={`w-[300px] h-[300px] md:w-[350px] md:h-[350px] xl:w-[450px] xl:h-[450px] overflow-hidden absolute ${
            bgSound && "-top-[245px] md:-top-[270px] xl:-top-[320px]"
          }
            `}
        >
          <Image
            fill
            priority
            src={"/disc1.png"}
            alt="rotating_disc_svg"
            className="object-contain"
          />

          {/* <motion.button
            onClick={handleClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
            className="absolute p-2 bg-black rounded-full top-[150px] left-[152px] animate-pulse"
          >
            <Image
              src={"/play-svgrepo-com.svg"}
              alt="play button"
              height={32}
              width={32}
              className="cursor-pointer opacity-60 hover:opacity-100 hover:animate-pulse"
            />
          </motion.button> */}
        </motion.div>
        {/* <motion.div
          layout
          animate={bgSound === true && { y: -280 }}
          transition={
            bgSound === true && {
              // repeat: Infinity,
              duration: 1,
              // delay: 0.5,
              ease: "easeInOut",
            }
          }
          className="bg-slate-200 w-[350px] h-[350px] flex justify-center items-center rounded-full shadow-lg shadow-white/20 overflow-hidden"
        >

          <motion.button
            onClick={handleClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
            className="flex items-center justify-center w-40 h-40 text-lg font-semibold text-white rounded-full shadow-md font-SpaceGrotesk bg-slate-700 shadow-black"
          >
            Let&apos;s Rock 🎸
          </motion.button>

        </motion.div> */}
      </motion.div>

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
          className={`text-base lg:text-xl xl:text-2xl text-white capitalize font-SpaceGrotesk ${
            !bgSound ? "block" : "hidden"
          }`}
        >
          Play{" "}
          <span>
            <button
              className="mx-1 text-green-700 hover:animate-pulse"
              onClick={handleClick}
            >
              With{" "}
            </button>
          </span>
          /
          <span>
            <button
              className="mx-1 text-red-700 line-through hover:animate-pulse"
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
          play={play}
          setData={setData}
          data={data}
        />
      )}
    </section>
  );
};

export default Disc;

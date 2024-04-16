"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { BubbleText } from "./BubbleText";
import useSound from "use-sound";
import { useEffect, useState } from "react";
import SpecificPageDisc from "./SpecificPageDisc";
export const BackgroundSlider = ({
  // setMute,
  // mute,
  data,
  // progressValue,
  // currentSlide,
}) => {
  // const [play] = useSound("https://ik.imagekit.io/webibee/click-sound.mp3", {
  //   volume: 0.06,
  // });
  const [mute, setMute] = useState(false);
  const [play, { stop }] = useSound(
    "https://ik.imagekit.io/webibee/tig-intro.mp3",
    {
      volume: 0.04,
      loop: true,
    }
  );

  useEffect(() => {
    if (mute) {
      stop();
    } else {
      play();
    }
  }, [mute, play, stop]);

  const handleMute = () => {
    play();
    setMute(false);
  };

  const handleUnMute = () => {
    play();
    setMute(true);
  };

  return (
    <AnimatePresence mode="popLayout">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2, delay: 0.25 }}
        className="flex items-center justify-center w-full h-full"
      >
        {/* Background image Fade out Effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className={`fixed top-0 w-full h-screen overflow-hidden -z-10 bg-black`}
        >
          <AnimatePresence>
            <motion.img
              key={data?.id}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { duration: 1, delay: 0.5, ease: "easeIn" },
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              src={data?.img}
              alt="rotating_disc_svg"
              className="object-cover object-center w-full h-full"
            />
          </AnimatePresence>
        </motion.div>
        {/* Rotating disc for specific route page */}
        <SpecificPageDisc setMute={setMute} />

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
          className="fixed flex items-center justify-center w-full h-auto px-10 bottom-20 md:bottom-48 md:px-20 "
        >
          <motion.div
            key={data?.id}
            initial={{ x: -50, opacity: 0 }}
            animate={{
              x: 0,
              opacity: 1,
              transition: { duration: 2, delay: 0.5, ease: "easeInOut" },
            }}
            transition={{
              duration: 1,
              delay: 1,
              type: "spring",
              bounce: 0.5,
              stiffness: 50,
            }}
            // exit={{x: 50,opacity: 0}}
            className="flex flex-col items-start justify-center w-full h-auto gap-5 text-white font-tiltNeon"
          >
            <h1
              transition={{ duration: 1 }}
              className="w-full text-5xl font-extrabold text-center capitalize font-tiltNeon md:text-7xl"
            >
              <BubbleText value={data?.companyName} />
            </h1>
            <p className="w-full mx-auto text-base font-medium tracking-wide text-center font-belanosima md:text-lg lg:w-1/2">
              {data?.desc}
            </p>
          </motion.div>

          {/* <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{
            duration: 1.5,
            delay: 1,
            type: "spring",
            bounce: 0.5,
            stiffness: 20,
          }}
          // className="grid grid-cols-2 gap-x-10 gap-y-5 md:gap-6 md:space-y-3 md:block w-[30%]"
          className="space-y-3 grid grid-cols-2 md:block w-full md:w-[60%] lg:w-[30%] gap"
        >
          {companies.map((list) => (
            <HoverLink
              key={list.id}
              heading={list.title}
              imgSrc={list.hoverImg}
              href={list.href}
              currentSlide={currentSlide}
              list={list}
            />
          ))}
        </motion.div> */}
        </motion.section>
        {/* mute && unmute button */}
        <div className="fixed flex items-center gap-6 text-lg right-3 top-16 animate-pulse md:top-1 md:right-5">
          {!mute ? (
            <Image
              src={"/mute-2-svgrepo-com.svg"}
              alt="pause button"
              height={30}
              width={30}
              onClick={handleUnMute}
              className="cursor-pointer opacity-60 hover:opacity-100 hover:animate-pulse"
            />
          ) : (
            <Image
              src={"/volume-svgrepo-com.svg"}
              alt="play button"
              height={30}
              width={30}
              onClick={handleMute}
              className="cursor-pointer opacity-60 hover:opacity-100 hover:animate-pulse"
            />
          )}
        </div>
        {/* Progress Bar */}
        {/* <div
        style={{ width: `${progressValue}%`, transformOrigin: "left" }}
        className="absolute left-0 h-1 transition-all ease-out bg-red-600 bottom-0.5 md:bottom-0 duration-600 rounded-xl"
      ></div> */}
      </motion.section>
    </AnimatePresence>
  );
};

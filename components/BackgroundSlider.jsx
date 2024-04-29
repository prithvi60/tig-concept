"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { BubbleText } from "./BubbleText";
import useSound from "use-sound";
import { useEffect, useState } from "react";
import SpecificPageDisc from "./SpecificPageDisc";
import { slideImages } from "@/libs/data";
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
          transition={{ duration: 2, delay: 0.8 }}
          style={{
            background:
              "linear-gradient(to bottom right, #090101 30%, #793122 65%, #090101 90% )",
          }}
          className={`fixed top-0 w-full h-screen overflow-hidden -z-10`}
        >
          {/* <AnimatePresence>
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
          </AnimatePresence> */}
        </motion.div>
        {/* Rotating disc for specific route page */}
        {/* <SpecificPageDisc setMute={setMute} /> */}

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
          className="fixed flex flex-col items-center justify-center w-full h-auto px-10 top-28 md:px-20 gap-8 md:gap-10"
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
            className="flex flex-col items-start justify-center w-full h-auto gap-6 text-white font-tiltNeon"
          >
            <div className="space-y-5 md:space-y-10 text-center w-full">
              <h1
                transition={{ duration: 1 }}
                className="w-full text-5xl font-extrabold text-center !text-transparent capitalize font-tiltNeon md:text-7xl xl:text-8xl text_Outline"
              >
                {data?.companyName}
                {/* <BubbleText value={data?.companyName} /> */}
              </h1>
              <motion.button
                whileHover={{
                  scale: 1.1,
                  transition: {
                    duration: 0.3,
                  },
                }}
                whileTap={{
                  scale: 0.8,
                  transition: {
                    duration: 0.3,
                  },
                }}
                className="rounded-3xl px-3.5 py-2 md:px-6 md:py-3 text-sm md:text-base bg-[#D5E5A3] text-black"
              >
                Check us Out
              </motion.button>
            </div>
            <p className="w-full mx-auto text-base font-medium tracking-wide font-belanosima md:text-lg md:w-9/12 xl:w-1/2 text-center">
              {data?.desc}
            </p>
          </motion.div>
          {/* Slide Images */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
              delay: 1,
            }}
            className="flex items-center gap-5 w-full overflow-x-auto h-full"
          >
            {slideImages.map((src, id) => (
              <motion.div
                initial={{ opacity: 0, y: -300 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.6, delay: id * 0.8, ease: "easeIn" }}
                className="mb-5 min-h-56 min-w-64 lg:min-h-64 xl:h-72 xl:w-80 relative overflow-hidden rounded-3xl cursor-pointer"
                key={id}
              >
                <Image
                  fill
                  src={src}
                  alt={`slide ${id}`}
                  className="object-cover object-center hover:scale-110  transition-all ease-in-out duration-700 rounded-3xl"
                />
              </motion.div>
            ))}
            {/* <div className="h-60 w-72 rounded-xl relative">
              <Image
                fill
                src={"/hover.png"}
                alt="slide 1"
                className="object-cover object-center  rounded-3xl"
              />
            </div> */}
          </motion.div>
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

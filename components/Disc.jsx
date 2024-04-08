"use client";
import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import { motion } from "framer-motion";
import useSound from "use-sound";
import { useState } from "react";
import { BackgroundSlider } from "./BackgroundSlider";
const Disc = () => {
  const [bgSound, setBgSound] = useState(false);
  const [pauseable, setPauseable] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [play,{ pause, stop }] = useSound(
    "https://ik.imagekit.io/webibee/tig-intro.mp3",
    { volume: 0.5 }
  );

  const discVariants = {
    hidden: {
      y: -600,
      scale: 0.3,
    },
    animate: {
      //   opacity: 1,
      y: 0,
      //   rotate: "360deg",
      scale: 1,
      transition: {
        duration: 2,
        // delay: 0.5,
        ease: "easeInOut",
        // repeatType: "loop",
      },
    },
  };

  let settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleClick = () => {
    play();
    setBgSound(true);
  };

  return (
    <section className="relative z-20 flex flex-col items-center justify-center w-full space-y-10 h-dvh">
      {/* Disc Svg Component */}
      <motion.div
        variants={discVariants}
        initial="hidden"
        animate="animate"
        className="relative flex items-center justify-center w-full h-dvh"
      >
        <motion.div
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
          className=" w-[350px] h-[350px] overflow-hidden relative"
        >
          <Image
            fill
            src={"/disc.svg"}
            alt="rotating_disc_svg"
            className="absolute object-contain"
          />

          <motion.button
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
          </motion.button>
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
      {/* background slider will be triggered, after disc play button is clicked*/}
      {bgSound && (
        <>
          {/* <Slider {...settings} className="absolute w-full h-screen"> */}
            <div className="absolute w-full h-screen overflow-hidden -top-11 -z-10">
              <Image
                fill
                src={"/bg 1.png"}
                alt="rotating_disc_svg"
                className="object-cover object-center"
              />
            </div>
            {/* <div className="absolute w-full h-screen overflow-hidden -top-11">
              <Image
                fill
                src={"/bg 2.png"}
                alt="rotating_disc_svg"
                className="object-cover object-center"
              />
            </div>
            <div className="absolute w-full h-screen overflow-hidden -top-11">
              <Image
                fill
                src={"/bg 3.png"}
                alt="rotating_disc_svg"
                className="object-cover object-center"
              />
            </div> */}
          {/* </Slider> */}
          <BackgroundSlider
            pauseable={pauseable}
            setPauseable={setPauseable}
            play={play}
            pause={pause}
            stop={stop}
            currentSlide={currentSlide}
          />
        </>
      )}
    </section>
  );
};

export default Disc;

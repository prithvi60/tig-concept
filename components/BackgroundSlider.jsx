"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { companies, companyLists } from "@/libs/data";
import { useState } from "react";
export const BackgroundSlider = ({ setMute, mute, play, setData, data }) => {
  const [currentSlide, setCurrentSlide] = useState("tigital");
  // const handlePause = () => {
  //   pause();
  //   setPauseable(true);
  // };
  // const handlePlay = () => {
  //   play();
  //   setPauseable(false);
  // };
  const handleMute = () => {
    setMute(!mute);
    // setPauseable(true);
  };
  const handleUnMute = () => {
    setMute(!mute);
    mute === true && play();
    // setPauseable(false);
  };

  const handleSortBy = (value) => {
    setCurrentSlide(value);
    const sortedBy = companyLists.filter((val) =>
      val.companyName.includes(value)
    );
    setData(sortedBy[0]);
  };
  return (
    <>
      <div className="fixed flex flex-col items-start justify-between w-full h-auto gap-10 px-10 bottom-10 md:bottom-20 md:px-20 md:gap-2 md:flex-row">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{
            duration: 1.5,
            // delay: 0.5,
            type: "spring",
            bounce: 0.5,
            stiffness: 20,
          }}
          className="flex flex-col items-start justify-start w-full h-auto gap-5 text-white lg:w-1/2 font-SpaceGrotesk"
        >
          <h1 className="text-5xl font-bold capitalize md:text-7xl">{data.companyName}</h1>
          <p className="w-full text-base font-medium tracking-wide md:text-lg md:w-1/2">
            {data.desc}
          </p>
        </motion.div>
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{
            duration: 1.5,
            delay: 1,
            type: "spring",
            bounce: 0.5,
            stiffness: 20,
          }}
          className="grid grid-cols-2 gap-x-10 gap-y-5 md:gap-6 md:space-y-3 md:block"
        >
          {companies.map((list, i) => (
            <h3
              key={i}
              className="w-32 py-3 text-lg text-center text-white capitalize border-2 border-red-500 cursor-pointer rounded-3xl font-SpaceGrotesk"
              onClick={() => handleSortBy(list)}
            >
              {list}
            </h3>
          ))}
        </motion.div>
      </div>
      <div className="fixed flex items-center gap-6 text-lg right-3 top-16 animate-pulse md:top-1 md:right-5">
        {/* <Image src={"/public/"} alt="" height={32} width={32} className="cursor-pointer opacity-60 hover:opacity-100 hover:animate-pulse"/> */}
        {/* <FaRegPauseCircle
         onClick={handlePause}
        className="text-3xl text-white cursor-pointer opacity-30 hover:opacity-75 hover:animate-pulse"
       /> */}
        {/* <FaRegPlayCircle
           onClick={handlePlay}
           className="text-3xl text-white cursor-pointer opacity-30 hover:opacity-75 hover:animate-pulse"
         /> */}
        {!mute ? (
          <Image
            src={"/mute-2-svgrepo-com.svg"}
            alt="pause button"
            height={30}
            width={30}
            onClick={handleMute}
            className="cursor-pointer opacity-60 hover:opacity-100 hover:animate-pulse"
          />
        ) : (
          <Image
            src={"/volume-svgrepo-com.svg"}
            alt="play button"
            height={30}
            width={30}
            onClick={handleUnMute}
            className="cursor-pointer opacity-60 hover:opacity-100 hover:animate-pulse"
          />
        )}
        {/* <Image
          src={"/stop-circle-svgrepo-com.svg"}
          alt="play button"
          height={32}
          width={32}
          onClick={handleStop}
          className="cursor-pointer opacity-60 hover:opacity-100 hover:animate-pulse"
        />
        <Image
          src={"/mute-svgrepo-com.svg"}
          alt="play button"
          height={32}
          width={32}
          onClick={handleMute}
          className="cursor-pointer opacity-60 hover:opacity-100 hover:animate-pulse"
        /> */}
      </div>
    </>
  );
};

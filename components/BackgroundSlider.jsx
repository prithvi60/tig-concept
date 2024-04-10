import Image from "next/image";
import { motion } from "framer-motion";
import { companies } from "@/libs/data";
import { BubbleText } from "./BubbleText";
import { HoverLink } from "./HoverLinks";
export const BackgroundSlider = ({
  setMute,
  mute,
  data,
  progressValue,
  currentSlide,
}) => {
  const handleMute = () => {
    console.log("mute", mute);
    setMute(false);
  };
  const handleUnMute = () => {
    console.log("unmute", mute);
    setMute(true);
  };

  return (
    <>
      <div className="fixed flex flex-col items-start justify-between w-full h-auto gap-10 px-10 bottom-10 md:bottom-20 md:px-20 md:gap-2 md:flex-row
       place-content-center
      ">
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
          <h1 className="text-5xl font-bold capitalize md:text-7xl">
            <BubbleText value={data.companyName} />
          </h1>
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
          // className="grid grid-cols-2 gap-x-10 gap-y-5 md:gap-6 md:space-y-3 md:block w-[30%]"
          className="space-y-3 block w-[75%] md:w-[60%] lg:w-[20%]"
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
        </motion.div>
      </div>
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
      <div
        style={{ width: `${progressValue}%`, transformOrigin: "left" }}
        className="absolute left-0 bottom-0 h-1 transition-all duration-600 ease-out bg-red-600 rounded-xl"
      ></div>
    </>
  );
};

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { companies } from "@/libs/data";
import { BubbleText } from "./BubbleText";
import { HoverLink } from "./HoverLinks";
import useSound from "use-sound";
export const BackgroundSlider = ({
  setMute,
  mute,
  data,
  progressValue,
  currentSlide,
}) => {
  const [play] = useSound("https://ik.imagekit.io/webibee/click-sound.mp3", {
    volume: 0.06,
  });
  const handleMute = () => {
    play();
    setMute(false);
  };
  const handleUnMute = () => {
    play();
    setMute(true);
  };

  return (
    <>
      <div className="fixed flex flex-col items-start justify-between w-full h-auto gap-10 px-10 bottom-10 md:bottom-20 md:px-20 md:gap-2 md:flex-row place-content-center ">
        {/* <AnimatePresence> */}
        <motion.div
          key={data.id}
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
          className="flex flex-col items-start justify-start w-full h-auto gap-5 text-white lg:w-1/2 font-SpaceGrotesk"
        >
          <h1
            transition={{ duration: 1 }}
            className="text-5xl font-bold capitalize md:text-7xl"
          >
            <BubbleText value={data.companyName} />
          </h1>
          <p className="w-full text-base font-medium tracking-wide md:text-lg md:w-1/2">
            {data.desc}
          </p>
        </motion.div>
        {/* </AnimatePresence> */}
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
          className="space-y-3 grid grid-cols-2 md:block w-full md:w-[60%] lg:w-[20%] gap"
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
      <div
        style={{ width: `${progressValue}%`, transformOrigin: "left" }}
        className="absolute bottom-0 left-0 h-1 transition-all ease-out bg-red-600 duration-600 rounded-xl"
      ></div>
    </>
  );
};

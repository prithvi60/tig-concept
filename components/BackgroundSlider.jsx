import Image from "next/image";
import { motion } from "framer-motion";
export const BackgroundSlider = ({
  pauseable,
  setPauseable,
  play,
  pause,
  stop
}) => {
  const handlePause = () => {
    pause();
    setPauseable(true);
  };
  const handlePlay = () => {
    play();
    setPauseable(false);
  };
  const handleStop = () => {
    stop();
    setPauseable(true);
  };
//   const handleMute = () => {
//     mute();
//     setPauseable(true);
//   };
  return (
    <>
      <div className="flex flex-col items-start justify-between w-full h-full gap-10 px-10 md:px-20 md:gap-2 md:flex-row ">
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
          className="flex flex-col items-start justify-start h-auto gap-5 space-y-5 text-white w-max font-SpaceGrotesk"
        >
          <h1 className="font-bold text-7xl">TIG</h1>
          <p className="w-1/3 text-lg font-medium md:w-1/4">
            Music doesn&apos;t lie. If there is something to be changed in this
            world, then it can only happen through music.
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
          className="space-y-5"
        >
          <h3 className="py-3 text-lg text-white border border-red-500 cursor-pointer rounded-xl font-SpaceGrotesk px-7 w-max">
            Title 1
          </h3>
          <h3 className="py-3 text-lg text-white border border-red-500 cursor-pointer rounded-xl font-SpaceGrotesk px-7 w-max">
            Title 2
          </h3>
          <h3 className="py-3 text-lg text-white border border-red-500 cursor-pointer rounded-xl font-SpaceGrotesk px-7 w-max">
            Title 3
          </h3>
        </motion.div>
      </div>
      <div className="absolute flex items-center gap-6 text-lg -top-4 right-5">
        {/* <Image src={"/public/"} alt="" height={32} width={32} className="cursor-pointer opacity-60 hover:opacity-100 hover:animate-pulse"/> */}
        {/* <FaRegPauseCircle
         onClick={handlePause}
        className="text-3xl text-white cursor-pointer opacity-30 hover:opacity-75 hover:animate-pulse"
       /> */}
        {/* <FaRegPlayCircle
           onClick={handlePlay}
           className="text-3xl text-white cursor-pointer opacity-30 hover:opacity-75 hover:animate-pulse"
         /> */}
        {!pauseable ? (
          <Image
            src={"/pause-circle-svgrepo-com.svg"}
            alt="pause button"
            height={32}
            width={32}
            onClick={handlePause}
            className="cursor-pointer opacity-60 hover:opacity-100 hover:animate-pulse"
          />
        ) : (
          <Image
            src={"/play-svgrepo-com.svg"}
            alt="play button"
            height={32}
            width={32}
            onClick={handlePlay}
            className="cursor-pointer opacity-60 hover:opacity-100 hover:animate-pulse"
          />
        )}
        <Image
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
        //   onClick={handleMute}
          className="cursor-pointer opacity-60 hover:opacity-100 hover:animate-pulse"
        />
      </div>
    </>
  );
};

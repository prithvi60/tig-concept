import Image from "next/image";
import { motion } from "framer-motion";
import { companies, companyLists } from "@/libs/data";
import { BubbleText } from "./BubbleText";
import { HoverLink } from "./HoverLinks";
export const BackgroundSlider = ({
  setMute,
  mute,
  play,
  setData,
  data,
  setCurrentSlide,
  currentSlide,
}) => {
  // const handlePause = () => {
  //   pause();
  //   setPauseable(true);
  // };
  // const handlePlay = () => {
  //   play();
  //   setPauseable(false);
  // };
  const handleMute = () => {
    console.log("mute", mute);
    setMute(false);
    // setPauseable(true);
  };
  const handleUnMute = () => {
    console.log("unmute", mute);

    setMute(true);
    // mute === true && play();
    // setPauseable(false);
  };

  // const handleSortBy = (value,i) => {
  //   setCurrentSlide(i);
  //   const sortedBy = companyLists.filter((val) =>
  //     val.companyName.includes(value)
  //   );
  //   setData(sortedBy[0]);
  //   // console.log(currentSlide);
  // };

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
            // <h3
            //   key={list.id}
            //   className={`w-32 py-3 text-lg text-center text-white capitalize border-2 border-red-500 cursor-pointer rounded-3xl font-SpaceGrotesk ${
            //     currentSlide === list.id - 1 ? "bg-black text-red-500" : ""
            //   }`}
            //   // onClick={() => handleSortBy(list,i)}
            // >
            //   {list.title}
            // </h3>
            // <motion.span
            //   key={i}
            //   // variants={{
            //   //   initial: { x: 0 },
            //   //   whileHover: { x: -16 },
            //   // }}
            //   initial={{ x: 0 }}
            //   animate={{ x: -16 }}
            //   transition={{
            //     type: "spring",
            //     staggerChildren: 0.075,
            //     delayChildren: 0.25,
            //   }}
            //   className="relative z-10 block text-4xl font-bold transition-colors duration-500 text-neutral-500 group-hover:text-neutral-50 md:text-6xl"
            // >
            //   {list.title.split("").map((l, i) => (
            //     <motion.span
            //       // variants={{
            //       //   initial: { x: 0 },
            //       //   whileHover: { x: 16 },
            //       // }}
            //       initial={{ x: 0 }}
            //       animate={{ x: 16 }}
            //       transition={{ type: "spring" }}
            //       className="inline-block"
            //       key={i}
            //     >
            //       {l}
            //     </motion.span>
            //   ))}
            // </motion.span>
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
      {/* Progress Bar */}
      <div
        style={{ width: "30%", transformOrigin: "left" }}
        className="fixed bottom-0 h-1 transition-all duration-1000 ease-in-out bg-red-600 rounded-xl"
        // role="progressbar"
        // aria-valuemax={100}
        // aria-valuemin={0}
        // aria-valuenow={50}
      ></div>
    </>
  );
};

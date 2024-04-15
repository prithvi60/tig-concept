"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import useSound from "use-sound";
import { useState } from "react";
import { BackgroundSlider } from "./BackgroundSlider";
import { MouseOverImages, companies, companyLists } from "@/libs/data";
import { BubbleText } from "./BubbleText";
import { RotatingDisc } from "./RotatingDisc";
import { MouseImageTrail } from "./MouseImage";
import { useRouter } from "next/navigation";
const Disc = () => {
  const [bgSound, setBgSound] = useState(false);
  const [data, setData] = useState(companyLists[0]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dynamicRoute, setDynamicRoute] = useState("");
  const [progressValue, setProgressValue] = useState(0);
  // const [mute, setMute] = useState(true);
  const router = useRouter();

  // const [play, { stop }] = useSound(
  //   "https://ik.imagekit.io/webibee/tig-intro.mp3",
  //   {
  //     volume: 0.04,
  //     loop: true,
  //   }
  // );

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

  // useEffect(() => {
  //   if (mute) {
  //     stop();
  //   } else {
  //     play();
  //   }
  // }, [mute, play, stop]);

  const handleDynamicRoute = (value) => {
    setDynamicRoute(value);
  };

  useEffect(() => {
    if (dynamicRoute !== "") {
      window.addEventListener("wheel", (event) => {
        event.preventDefault();
        router.push(`/${dynamicRoute.toLowerCase()}`);
        setBgSound(true);
      });
    }
  }, [router, bgSound, dynamicRoute]);

  return (
    <section
      className="relative z-20 flex flex-col items-center justify-center w-full space-y-3 overflow-hidden h-dvh md:gap-6 xl:gap-14"
      // className="w-full h-screen overflow-hidden"
    >
      {/* Background image Fade out Effect
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
            animate={{
              opacity: 1,
              transition: { duration: 1, delay: 0.5, ease: "easeIn" },
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            src={data.img}
            alt="rotating_disc_svg"
            className="object-cover object-center w-full h-full"
          />
        </AnimatePresence>
      </motion.div> */}
      {/* Mouse Move Effect */}
      <MouseImageTrail
        renderImageBuffer={50}
        rotationRange={25}
        images={MouseOverImages}
        bgSound={bgSound}
      ></MouseImageTrail>

      {/* Main Company Name */}
      <AnimatePresence>
        <motion.div
          initial={{ y: 150, opacity: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ y: -150, opacity: 0 }}
          transition={{ duration: 1, ease: "backInOut", delay: 0.25 }}
          className={`h-auto tracking-wide text-red-600 capitalize font-tiltNeon text-2xl md:text-4xl xl:text-6xl text-center cursor-pointer px-4 ${
            !bgSound ? "block" : "hidden"
          }`}
        >
          <BubbleText value={"The Internet Generation"} />
          <div className="flex flex-wrap items-center justify-center gap-4 my-10 md:mt-2">
            {companies.map((list) => (
              <button
                key={list.id}
                className={`text-xs md:text-base px-4 py-2 rounded-xl ${
                  dynamicRoute === list.title
                    ? "bg-white text-red-600"
                    : "bg-red-600 text-white "
                }`}
                onClick={() => handleDynamicRoute(list.title)}
              >
                {list.title}
              </button>
            ))}
          </div>
          {dynamicRoute === "" && (
            // <AnimatePresence>
              <motion.p
                // layout
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                // exit={{ opacity: 0, y: -100 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="flex flex-col-reverse md:flex-row items-center justify-center md:gap-1.5 text-sm font-bold tracking-wide text-center text-white font-belanosima animate-pulse"
              >
                Click a company name to visit their website
                <span>
                  <Image
                    src={"/pointing-up-hand.svg"}
                    alt="play button"
                    height={50}
                    width={50}
                    className="md:mt-3.5 animate-bounce"
                  />
                </span>
              </motion.p>
            // </AnimatePresence>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Disc Svg Component */}
      <RotatingDisc
        bgSound={bgSound}
        setBgSound={setBgSound}
        // setMute={setMute}
        // mute={mute}
      />
      {/* Play Button */}
      {dynamicRoute === "" ? (
        ""
      ) : (
        <AnimatePresence mode="sync">
          <motion.div
            layout
            initial={{ y: 150, opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: "easeIn",
              type: "spring",
              bounce: 0.5,
              stiffness: 100,
            }}
            exit={{
              y: -550,
              scale: 0.5,
              opacity: 0,
              transition: { duration: 1, delay: 0.5 },
            }}
            className={`text-base lg:text-2xl xl:text-3xl text-white capitalize font-belanosima px-5 py-2 mt-5 ${
              !bgSound ? "block" : "hidden"
            }`}
          >
            <h3>scroll down</h3>
            <Image
              src={"/pointing-down-hand.svg"}
              alt="down arrow"
              height={60}
              width={60}
              className="mx-auto animate-bounce"
            />
          </motion.div>
        </AnimatePresence>
      )}
    </section>
  );
};

export default Disc;

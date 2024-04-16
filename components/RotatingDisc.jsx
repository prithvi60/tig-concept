"use client";
import Image from "next/image";
import useSound from "use-sound";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";

export const RotatingDisc = ({ scrollDown, dynamicRoute }) => {
  const [mute, setMute] = useState(false);
  const [hide, setHide] = useState(false);
  const [play, { stop }] = useSound(
    "https://ik.imagekit.io/webibee/tig-intro.mp3",
    {
      volume: 0.04,
      loop: true,
    }
  );

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
    },
    exit: {
      y: 0,
      scale: 0.5,
      opacity: 0,
      // transition: {
      //   duration: 1,
      //   ease: "easeOut",
      // },
    },
  };

  const discAfterPlayVariant = {
    hidden: {
      // opacity: 0,
    },
    animate: {
      // opacity: 1,
      rotate: "360deg",
    },
    exit: { rotate: "0deg" },
  };

  const handleClick = () => {
    if (mute === false) {
      play();
    }
    setHide(true);

    // React Hot Toast
    if (dynamicRoute === "") {
      toast.success("Click a company name button", {
        style: {
          border: "2px solid #f03e1a",
          padding: "12px",
          color: "#f03e1a",
          backgroundColor: "#f5f5f5",
          textTransform: "capitalize",
        },
        iconTheme: {
          primary: "#f03e1a",
          secondary: "#f5f5f5",
        },
      });
    }
  };

  const handleMute = () => {
    play();
    setMute(false);
  };

  const handleUnMute = () => {
    stop();
    setMute(true);
  };

  return (
    // <section className="relative w-max h-[50vh] flex items-center justify-center ">
    <>
      <AnimatePresence>
        <motion.div
          // layout
          variants={discVariants}
          initial="hidden"
          animate="animate"
          exit="hidden"
          transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
          className={`w-max h-[50vh] flex items-center justify-center top-0 `}
        >
          <div className="relative flex items-center justify-center w-auto my-14">
            {/* Rotating disc */}
            <div
              // layout
              // variants={discAfterPlayVariant}
              // animate={"animate"}
              // transition={{
              //   repeat: Infinity,
              //   duration: 1.5,
              //   ease: "easeOut",
              // }}
              // exit={"exit"}
              // whileHover={{
              //   scale: 1.1,
              //   transition: {
              //     duration: 0.3,
              //   },
              // }}
              // whileTap={{
              //   scale: 0.8,
              //   transition: {
              //     duration: 0.3,
              //   },
              // }}
              className={`w-[280px] h-[280px] md:w-[350px] md:h-[350px] xl:w-[450px] xl:h-[450px] overflow-hidden cursor-pointer  ${
                scrollDown &&
                "absolute -top-[245px] md:-top-[250px] xl:-top-[320px]"
              }
            `}
              onClick={handleClick}
            >
              <Image
                fill
                priority
                src={"/disc1.png"}
                alt="rotating_disc_svg"
                className="object-contain"
              />
            </div>
            {/* Tone arm */}
            <motion.div
              // layout
              initial={{ opacity: 0, rotate: "0deg" }}
              animate={{ opacity: 1, rotate: "45deg" }}
              transition={{ duration: 1.5, delay: 2 }}
              exit={{ opacity: 0, y: 0 }}
              className={`w-[200px] h-[200px] md:w-[250px] md:h-[250px] xl:w-[350px] xl:h-[350px] overflow-hidden absolute  !z-50 ${
                scrollDown
                  ? "-top-[11rem] -right-[17rem] md:-right-[22rem] xl:-top-64  xl:-right-[30rem]"
                  : "top-10 -right-40 md:-right-48 xl:-right-[17rem]"
              }
            `}
              // onClick={() => play()}
            >
              <Image
                fill
                priority
                src={"/Tone_arm.png"}
                alt="rotating_disc_svg"
                className="object-contain"
              />
            </motion.div>
            {/* </AnimatePresence> */}
          </div>
        </motion.div>
      </AnimatePresence>
      <Toaster position="top-center" reverseOrder="false" />
      {hide && (
        <div className="fixed flex items-center gap-6 text-lg right-3 top-16 animate-pulse md:top-5 md:right-8">
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
      )}
    </>
    // </section>
  );
};

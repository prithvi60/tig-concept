"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useSound from "use-sound";

const SpecificPageDisc = ({setMute}) => {
  const router = useRouter();
  const [hide, setHide] = useState(false);
  const [play] = useSound("https://ik.imagekit.io/webibee/dj-disc-sound.mp3", {
    volume: 0.06,
  });

  const discVariants = {
    hidden: {
      y: 125,
      opacity: 0,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 2,
        delay: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      y: -100,
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
      rotate: "0deg",
    },
    animate: {
      rotate: "360deg",
    },
    exit: { rotate: "0deg" },
  };

  const handleClick = () => {
    // setScrollDown(!scrollDown);
    play();
    router.replace("/");
    setMute(true)
  };

  return (
    <AnimatePresence>
      <motion.div
        layout
        variants={discVariants}
        initial="hidden"
        animate="animate"
        exit="hidden"
        // transition={{ duration: 2, delay: 0.5 }}
        className={`w-max h-[50vh] flex items-center justify-center ${
          !hide ? "fixed -top-28" : "top-0"
        }`}
      >
        <div className="relative flex items-center justify-center w-auto my-14">
          {/* <AnimatePresence> */}
            <motion.div
              layout
              variants={discAfterPlayVariant}
              initial="hidden"
              animate={"animate"}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeOut",
              }}
              exit={"exit"}
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
                !hide && "absolute -top-[205px] md:-top-[250px] xl:-top-[320px]"
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
            </motion.div>
          {/* </AnimatePresence> */}
          {/* <AnimatePresence mode="popLayout"> */}
          <motion.div
            layout
            initial={{ opacity: 0, rotate: "0deg" }}
            animate={{ opacity: 1, rotate: "45deg" }}
            transition={{ duration: 1.5, delay: 2 }}
            // exit={{ opacity: 0 }}
            className={`w-[200px] h-[200px] md:w-[250px] md:h-[250px] xl:w-[350px] xl:h-[350px] overflow-hidden absolute  !z-50 ${
              !hide
                ? "-top-[11rem] -right-[17rem] md:-right-[22rem] xl:-top-64  xl:-right-[30rem]"
                : "top-10 -right-36 md:-right-48 xl:-right-[17rem]"
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
  );
};

export default SpecificPageDisc;

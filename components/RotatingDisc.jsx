import Image from "next/image";
import useSound from "use-sound";
import { motion, AnimatePresence } from "framer-motion";

export const RotatingDisc = ({ bgSound }) => {
  const [play] = useSound("https://ik.imagekit.io/webibee/dj-disc-sound.mp3", {
    volume: 0.06,
  });

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
      transition: {
        duration: 2,
        delay: 0.5,
        ease: "circInOut",
      },
    },
    exit: {
      y: -240,
      scale: 1,
      opacity: 1,
      rotate: "360deg",
      transition: bgSound === true && {
        duration: 2.5,
        ease: "easeOut",
      },
    },
  };

  const discAfterPlayVariant = {
    animate: {
      rotate: "360deg",
      transition: {
        repeat: Infinity,
        duration: 2.5,
        ease: "easeOut",
      },
    },
    exit: { y: 0 },
  };


  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        layout
        variants={discVariants}
        initial={"hidden"}
        animate="animate"
        exit={"exit"}
        className={`w-full h-[50vh] flex items-center justify-center ${
          bgSound ? "fixed top-20" : "top-0"
        }`}
      >
        <motion.div
          layout
          variants={discAfterPlayVariant}
          animate={"animate"}
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
          className={`w-[300px] h-[300px] md:w-[350px] md:h-[350px] xl:w-[450px] xl:h-[450px] overflow-hidden absolute cursor-pointer  ${
            bgSound && "-top-[245px] md:-top-[270px] xl:-top-[320px]"
          }
            `}
            onClick={()=>play()}
        >
          <Image
            fill
            priority
            src={"/disc1.png"}
            alt="rotating_disc_svg"
            className="object-contain"
          />

          {/* <motion.button
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
          </motion.button> */}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

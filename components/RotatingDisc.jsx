import Image from "next/image";
import useSound from "use-sound";
import { motion, AnimatePresence } from "framer-motion";

export const RotatingDisc = ({ bgSound, setBgSound, setHide,setMute,mute }) => {
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

  const handleClick = () => {
    setBgSound(!bgSound);
    setHide(true);
    setMute(!mute);
  };

  return (
    <>
      <AnimatePresence mode="popLayout">
        <motion.div
          layout
          variants={discVariants}
          initial={"hidden"}
          animate="animate"
          exit={"exit"}
          className={`w-max h-[50vh] flex items-center justify-center ${
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
        </motion.div>
      </AnimatePresence>
      {/* <AnimatePresence mode="popLayout">
        <motion.div
          layout
          variants={discVariants}
          initial={"hidden"}
          animate="animate"
          exit={"exit"}
          className={`w-max h-[50vh] flex gap-5 !z-50 items-center justify-center relative ${
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
            onClick={() => setBgSound(!bgSound)}
          >
            <Image
              fill
              priority
              src={"/disc1.png"}
              alt="rotating_disc_svg"
              className="object-contain"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence> */}
      <AnimatePresence mode="popLayout">
        <motion.div
          layout
          initial={{ opacity: 0, rotate: "0deg" }}
          animate={{ opacity: 1, rotate: "45deg" }}
          transition={{ duration: 3.5, delay: 2 }}
          exit={{ opacity: 0 }}
          className={`w-[300px] h-[300px] md:w-[250px] md:h-[250px] xl:w-[350px] xl:h-[350px] overflow-hidden absolute cursor-pointer right-[320px] !z-50  ${
            bgSound && "-top-[245px] md:-top-[270px] xl:-top-[320px]"
          }
            `}
          onClick={() => play()}
        >
          <Image
            fill
            priority
            src={"/Tone_arm.png"}
            alt="rotating_disc_svg"
            className="object-contain"
          />
        </motion.div>
      </AnimatePresence>
    </>
  );
};

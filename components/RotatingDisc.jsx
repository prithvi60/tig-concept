import Image from "next/image";
import useSound from "use-sound";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

export const RotatingDisc = ({ bgSound, setBgSound, setMute, mute }) => {
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
        ease: "easeOut",
      },
    },
    exit: {
      y: -300,
      scale: 0.5,
      opacity: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
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
    // setBgSound(!bgSound);
    // setMute(!mute);
    play();
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
  };

  return (
    // <section className="relative w-max h-[50vh] flex items-center justify-center ">
    <AnimatePresence>
      <motion.div
        layout
        variants={discVariants}
        initial="hidden"
        animate="animate"
        exit="hidden"
        // transition={{ duration: 2, delay: 0.5 }}
        className={`w-max h-[50vh] flex items-center justify-center ${
          bgSound ? "fixed -top-28" : "top-0"
        }`}
      >
        <div className="relative flex items-center justify-center w-auto my-14">
          {/* Rotating disc */}
          <motion.div
            layout
            variants={discAfterPlayVariant}
            animate={"animate"}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeOut",
            }}
            exit={"exit"}
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
            className={`w-[280px] h-[280px] md:w-[350px] md:h-[350px] xl:w-[450px] xl:h-[450px] overflow-hidden cursor-pointer  ${
              bgSound && "absolute -top-[245px] md:-top-[250px] xl:-top-[320px]"
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
          {/* Tone arm */}
          <motion.div
            // layout
            initial={{ opacity: 0, rotate: "0deg" }}
            animate={{ opacity: 1, rotate: "45deg" }}
            transition={{ duration: 1.5, delay: 2 }}
            exit={{ opacity: 0, y: 0 }}
            className={`w-[200px] h-[200px] md:w-[250px] md:h-[250px] xl:w-[350px] xl:h-[350px] overflow-hidden absolute  !z-50 ${
              bgSound
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
      <Toaster position="top-center" reverseOrder="false" />
    </AnimatePresence>
    // </section>
  );
};

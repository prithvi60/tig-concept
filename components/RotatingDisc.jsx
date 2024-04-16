/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import useSound from "use-sound";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useRef, useState } from "react";

export const RotatingDisc = ({ scrollDown, dynamicRoute }) => {
  const [rotateGesure, setRotateGesture] = useState(false);
  const rotateBtnRef = useRef(null);
  const [origin, setOrigin] = useState();
  const [mouseOldPos, setMouseOldPos] = useState();
  const [rotation, setRotation] = useState(0);
  const imgRef = useRef(null);
  const [mute, setMute] = useState(false);
  const [hide, setHide] = useState(false);
  const [play, { stop }] = useSound(
    "https://ik.imagekit.io/webibee/technology-logo-.mp3",
    {
      volume: 0.06,
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

  const handleClick = () => {
    if (mute === false) {
      play();
    } else {
      stop();
    }
    setMute(true);
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
    setMute(false);
    stop();
  };

  const handleUnMute = () => {
    play();
    setMute(true);
  };

  const handleRotate = ({ mouseViewportX, mouseViewportY }) => {
    const angle1 = getAngle({
      x: mouseViewportX - origin.x,
      y: origin.y - mouseViewportY,
    });
    const angle2 = getAngle({
      x: mouseOldPos.x - origin.x,
      y: origin.y - mouseOldPos.y,
    });
    const delta = angle2 - angle1;
    setRotation(rotation + delta);
  };

  const onMouseMove = (event) => {
    const flags = event.buttons !== undefined ? event.buttons : event.which;
    const primaryMouseButtonDown = (flags & 1) === 1;
    const mouseViewportX = event.pageX - window.scrollX;
    const mouseViewportY = event.pageY - window.scrollY;
    setMouseOldPos({ x: mouseViewportX, y: mouseViewportY });

    if (primaryMouseButtonDown) {
      if (rotateGesure) {
        handleRotate({ mouseViewportX, mouseViewportY });
        return;
      }

      const insideRotate = isPointInsideElement(
        {
          x: mouseViewportX,
          y: mouseViewportY,
        },
        rotateBtnRef.current
      );
      if (insideRotate) {
        setRotateGesture(true);
        return;
      }
    } else {
      setRotateGesture(false);
    }
  };

  useEffect(() => {
    const rect = imgRef.current.getBoundingClientRect();
    setOrigin({
      x: rect.left - window.scrollX + rect.width / 2,
      y: rect.top - window.scrollY + rect.height / 2,
    });
  }, []);

  return (
    <>
      {/* <AnimatePresence> */}
      <motion.div
        // layout
        variants={discVariants}
        initial="hidden"
        animate="animate"
        // exit="hidden"
        transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
        className={`w-max h-[50vh] flex items-center justify-center `}
        onMouseMove={onMouseMove}
      >
        <div className="relative flex items-center justify-center w-full my-14">
          {/* Rotating disc */}
          <div
            className={`relative w-[280px] h-[280px] md:w-[350px] md:h-[350px] xl:w-[450px] xl:h-[450px] overflow-hidden cursor-pointer  ${
              scrollDown &&
              "absolute -top-[245px] md:-top-[250px] xl:-top-[320px]"
            }
            `}
            onClick={handleClick}
            style={{ rotate: `${rotation}deg` }}
          >
            <img
              draggable={false}
              ref={imgRef}
              src={"/disc1.png"}
              alt="rotating_disc_svg"
              className="relative object-contain w-full h-full"
            />
            <div
              ref={rotateBtnRef}
              className="absolute w-16 h-16 top-7 left-48 "
            >
              <img
                src="/hover.png"
                alt="image 1"
                className="w-full h-full rounded-2xl"
              />
            </div>
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
      {/* </AnimatePresence> */}
      <Toaster position="bottom-center" reverseOrder="false" />
      {hide && (
        <div className="fixed flex items-center gap-6 text-lg right-3 top-16 animate-pulse md:top-5 md:right-8">
          {mute ? (
            <Image
              src={"/mute-2-svgrepo-com.svg"}
              alt="pause button"
              height={30}
              width={30}
              onClick={handleMute}
              className="cursor-pointer opacity-60 hover:opacity-100 hover:animate-pulse"
            />
          ) : (
            <Image
              src={"/volume-svgrepo-com.svg"}
              alt="play button"
              height={30}
              width={30}
              onClick={handleUnMute}
              className="cursor-pointer opacity-60 hover:opacity-100 hover:animate-pulse"
            />
          )}
        </div>
      )}
    </>
    // </section>
  );
};

function isPointInsideElement(point, element) {
  const rect = element.getBoundingClientRect();
  return (
    point.x > rect.left &&
    point.x < rect.right &&
    point.y > rect.top &&
    point.y < rect.bottom
  );
}

function getAngle(point) {
  if (point.x < 0 && point.y > 0) {
    return 180 + (Math.atan(point.y / point.x) * 180) / Math.PI;
  }
  if (point.x > 0 && point.y < 0) {
    return 360 + (Math.atan(point.y / point.x) * 180) / Math.PI;
  }
  if (point.x < 0 && point.y < 0) {
    return 180 + (Math.atan(point.y / point.x) * 180) / Math.PI;
  }
  return (Math.atan(point.y / point.x) * 180) / Math.PI;
}

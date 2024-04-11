"use client";
import {
  useMotionValue,
  motion,
  useSpring,
  useTransform,
  useAnimate,
  stagger,
} from "framer-motion";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import useSound from "use-sound";

export const HoverLink = ({ heading, imgSrc, href, currentSlide, list }) => {
  const [play] = useSound("https://ik.imagekit.io/webibee/click-sound.mp3", {
    volume: 0.06,
  });
  const [scope, animate] = useAnimate();
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const top = useTransform(mouseYSpring, [0.5, -0.5], ["0%", "0%"]);
  const left = useTransform(mouseXSpring, [0.5, -0.5], ["-40%", "-40%"]);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  useEffect(() => {
    if (currentSlide === list.id - 1) {
      const animation = async () => {
        await animate(
          scope.current,
          { opacity: [0, 1], x: [0, -16] },
          {
            duration: 0.5,
            type: "spring",
            delay: stagger(0.25),
          }
        );
        await animate(
          "#Target",
          { opacity: [0, 1], x: [0, 16] },
          {
            duration: 0.5,
            type: "spring",
            delay: stagger(0.25, { from: "first", ease: "linear" }),
            stiffness: 100,
          }
        );
      };
      animation();
    }
  }, [animate, currentSlide, list, scope]);

  return (
    <motion.a
      href={href}
      ref={ref}
      onMouseMove={handleMouseMove}
      initial="initial"
      whileHover="whileHover"
      className={`relative flex items-center justify-between p-2 md:py-2 transition-colors duration-500 border-b-2 group border-neutral-700 hover:border-red-600 w-max md:w-full ${
        currentSlide === list.id - 1 ? "!border-red-600" : ""
      }`}
      onClick={() => play()}
    >
      <div>
        <motion.span
          ref={scope}
          variants={{
            initial: { x: 0 },
            whileHover: { x: -16 },
          }}
          transition={{
            type: "spring",
            staggerChildren: 0.075,
            delayChildren: 0.25,
          }}
          className={`relative z-10 block text-xl font-bold transition-colors duration-500 text-neutral-500 group-hover:text-neutral-50 md:text-3xl ${
            currentSlide === list.id - 1 ? "!text-white" : ""
          }`}
          //   className="relative z-10 block text-xl font-bold transition-colors duration-500 text-neutral-500 group-hover:text-neutral-50 md:text-3xl"
        >
          {heading.split("").map((l, i) => (
            <motion.span
              id="Target"
              variants={{
                initial: { x: 0 },
                whileHover: { x: 16 },
              }}
              transition={{ type: "spring" }}
              className="inline-block first:capitalize font-belanosima"
              key={i}
            >
              {l}
            </motion.span>
          ))}
        </motion.span>
        {/* <span className="relative z-10 block mt-2 text-base transition-colors duration-500 text-neutral-500 group-hover:text-neutral-50">
          {subheading}
        </span> */}
      </div>

      <motion.img
        style={{
          top,
          left,
          translateX: "-50%",
          translateY: "-50%",
        }}
        variants={{
          initial: { scale: 0, rotate: "-12.5deg" },
          whileHover: { scale: 1, rotate: "12.5deg" },
        }}
        transition={{ type: "spring" }}
        src={"/hover.png"}
        className="absolute !z-50 object-cover w-20 h-20 rounded-lg md:h-28 md:w-32"
        alt={`Image representing a link for ${heading}`}
      />

      <motion.div
        variants={{
          initial: {
            x: "25%",
            opacity: 0,
          },
          whileHover: {
            x: "0%",
            opacity: 1,
          },
        }}
        transition={{ type: "spring" }}
        className="relative z-10 hidden p-2 md:block"
      >
        {/* <FiArrowRight className="text-5xl text-neutral-50" /> */}
        <Image
          src={"/arrow-right-svgrepo-com.svg"}
          alt="arrow"
          height={36}
          width={36}
          className={`cursor-pointer opacity-60 hover:opacity-100 group-hover:animate-bounce block rotate-180 transition-all duration-700 ease-in-out`}
        />
      </motion.div>
    </motion.a>
  );
};

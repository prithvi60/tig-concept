"use client";
import { useMotionValue, motion, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";
import Image from "next/image";


export const HoverLink = ({ heading, imgSrc, href, currentSlide, list }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const top = useTransform(mouseYSpring, [0.5, -0.5], ["0%", "0%"]);
  const left = useTransform(mouseXSpring, [0.5, -0.5], ["-20%", "-20%"]);

//   const handleMouseMove = (e) => {
//     const rect = ref.current.getBoundingClientRect();

//     const width = rect.width;
//     const height = rect.height;

//     const mouseX = e.clientX - rect.left;
//     const mouseY = e.clientY - rect.top;

//     const xPct = mouseX / width - 0.5;
//     const yPct = mouseY / height - 0.5;

//     x.set(xPct);
//     y.set(yPct);
//   };

  return (
    <motion.a
      href={href}
      ref={ref}
    //   onMouseMove={handleMouseMove}
      initial="initial"
      whileHover="whileHover"
        className={`relative flex items-center justify-between py-2 transition-colors duration-500 border-b-2 group border-neutral-700 hover:border-neutral-50 w-100% ${
          currentSlide === list.id - 1 && "border-neutral-50"
        }`}
    //   className="relative flex items-center justify-between py-2 transition-colors duration-500 border-b-2 group border-neutral-700 hover:border-neutral-50"
    >
      <div>
        <motion.span
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
              currentSlide === list.id - 1 && "text-neutral-50"
            }`}
        //   className="relative z-10 block text-xl font-bold transition-colors duration-500 text-neutral-500 group-hover:text-neutral-50 md:text-3xl"
        >
          {heading.split("").map((l, i) => (
            <motion.span
              variants={{
                initial: { x: 0 },
                whileHover: { x: 16 },
              }}
              transition={{ type: "spring" }}
              className="inline-block first:capitalize"
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
        src={imgSrc}
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
        className="relative z-10 p-2"
      >
        {/* <FiArrowRight className="text-5xl text-neutral-50" /> */}
        <Image
          src={"/arrow-right-svgrepo-com.svg"}
          alt="arrow"
          height={36}
          width={36}
          className={`cursor-pointer opacity-60 hover:opacity-100 animate-bounce ${
            currentSlide === list.id - 1 ? "block" : "hidden"
          }`}
        //   className={`cursor-pointer opacity-60 hover:opacity-100 hover:animate-bounce`}
        />
      </motion.div>
    </motion.a>
  );
};

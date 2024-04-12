"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const page = () => {
  return (
    <AnimatePresence mode="popLayout">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{duration: 1}}
      className="flex items-center justify-center w-full text-6xl text-white bg-black h-dvh"
    >
      hello Tigital
    </motion.div>
    </AnimatePresence>
  );
};

export default page;

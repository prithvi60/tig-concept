"use client"
import { AnimatePresence, motion } from "framer-motion";
import Disc from "./Disc";
const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <AnimatePresence >
        <motion.div
          className="bg-black w-96 h-96"
          initial={{ opacity: 0, borderRadius: "100%", y: 0, scale: 0 }}
          animate={{
            opacity: 1,
            width: "100%",
            height: "100%",
            borderRadius: 0,
            y: [-1000, 150, 0],
            scale: 1,
          }}
          exit={{
            opacity: 0,
            borderRadius: "100%",
            y: 0,
            scale: 0,
          }}
          transition={{ duration: 1.5 }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1.5, staggerChildren: 0.09, delayChildren: 0.5,ease :"easeIn" }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-between px-10 py-10 text-lg font-semibold text-white bg-black border-b-2 border-slate-900 font-Montserrat"
          >
            <h3>Home</h3>
            <h3>Contact</h3>
          </motion.div>
          <Disc/>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Loading;

import React from "react";
import { motion, stagger } from "motion/react";
import FeatureCard from "./featureCard.jsx";
import { useNavigate } from "react-router-dom";
import featuresData from "../data/features.json";
import { ArrowUpRight } from "lucide-react";

function Hero() {
  const navigate = useNavigate();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const items = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="mt-10 pt-10 pb-2 flex flex-col gap-10 justify-center items-center w-[90vw] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="flex flex-col gap-5 text-center"
      >
        <h1 className="text-3xl sm:text-5xl">
          <span className="text-cyan-400">Playra</span> - where every play
          counts.
        </h1>
        <p className="text-base sm:text-xl">
          Playra brings storytelling, creativity, and community together in one
          seamless video experience.
        </p>
      </motion.div>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col sm:flex-row gap-8 sm:14 lg:gap-20 px-4 sm:px-12 sm:mt-2"
      >
        {featuresData.map((item) => (
          <FeatureCard
            key={item.number}
            variant={items}
            number={item.number}
            title={item.title}
            description={item.description}
          />
        ))}
      </motion.div>
      <div>
        <motion.button
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover={{
            scale: 1.1,
            borderWidth: "2px",
            borderColor: "cyan-400",
          }}
          onClick={() => navigate("/register")}
          className="p-4 cursor-pointer rounded-full flex gap-1 justify-between bg-[#121212] text-cyan-400"
        >
          <span>Get Started</span>
          <ArrowUpRight />
        </motion.button>
      </div>
    </div>
  );
}

export default Hero;

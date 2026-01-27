import React from "react";
import { motion } from "motion/react";

function FeatureCard({ variant, number, title, description }) {
  return (
    <motion.div
      variants={variant}
      whileHover={{ backgroundColor: "#0F2024", scale: 1.05 }}
      className="flex hover:cursor-pointer items-center text-center gap-4 flex-col py-5 px-2 border border-cyan-400 rounded-xl"
    >
      <p className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-cyan-400 border border-white text-lg font-bold">
        {number}
      </p>
      <h1 className="text-3xl">{title}</h1>
      <p className="text-sm">{description}</p>
    </motion.div>
  );
}

export default FeatureCard;

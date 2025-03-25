"use client";
import React from "react";
import { motion } from "framer-motion";
import WaveDivider from "./WaveDivider";
import { BookOpen, ChefHat } from "lucide-react";
import Link from "next/link";

const Hero = ({ title, description }) => {
  return (
    <div className="relative bg-gradient-to-r from-teal-500 to-teal-600 overflow-hidden">
      <div className="py-12 md:py-24 relative z-10">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {title}
          </motion.h1>
          <motion.p
            className="text-teal-100 text-lg md:text-xl mb-6 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {description}
          </motion.p>
          <motion.div
            className="flex space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Link
              href="/resources/guides/fodmap"
              className="flex items-center space-x-2 bg-white text-teal-600 px-4 py-2 rounded-lg shadow-lg hover:bg-teal-50 transition"
            >
              <BookOpen className="w-4 h-4" />
              <span className="text-sm">Explore Guide</span>
            </Link>
            <Link
              href="/recipes"
              className="flex items-center space-x-2 bg-teal-700 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-teal-800 transition"
            >
              <ChefHat className="w-4 h-4" />
              <span className="text-sm">Find recipes</span>
            </Link>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <WaveDivider />
      </div>
    </div>
  );
};

export default Hero;

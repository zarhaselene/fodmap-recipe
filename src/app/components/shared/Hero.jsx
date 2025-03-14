"use client";
import React from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import WaveDivider from "./WaveDivider";

const Hero = ({ title, description, searchPlaceholder }) => {
  return (
    <div className="relative bg-gradient-to-r from-teal-500 to-teal-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="md:flex md:items-center md:justify-between">
          <motion.div
            className="md:w-1/2 text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {title}
            </motion.h1>
            <motion.p
              className="text-teal-100 text-lg md:text-xl mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {description}
            </motion.p>
          </motion.div>

          {/* Search bar */}
          <motion.div
            className="md:w-2/5 bg-white rounded-lg shadow-xl p-1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
          >
            <form role="search" aria-labelledby="search-bar">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="search-bar"
                  aria-label="Search input"
                  className="block w-full pl-10 pr-3 py-4 text-gray-800 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-base"
                  placeholder={searchPlaceholder}
                  aria-placeholder={searchPlaceholder}
                />
                <motion.button
                  type="submit"
                  aria-label="Submit search"
                  className="absolute inset-y-0 right-0 flex items-center px-4 text-white bg-teal-500 hover:bg-teal-600 rounded-r-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Search
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Wave shape divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <WaveDivider />
      </div>
    </div>
  );
};

export default Hero;

"use client";

import React from "react";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const TestimonialCard = ({
  name,
  memberSince,
  review,
  rating,
  bgColor,
  avatar,
}) => {
  const getColorClasses = (bgColorName) => {
    const colorMap = {
      teal: "bg-teal-200 text-teal-600",
      amber: "bg-amber-200 text-amber-600",
      purple: "bg-purple-200 text-purple-600",
    };

    return colorMap[bgColorName] || "bg-blue-200 text-blue-600";
  };

  const colorClasses = getColorClasses(bgColor);
  const [bgClass, textClass] = colorClasses.split(" ");

  // Animation for star ratings
  const starVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex">
          {[...Array(5)].map((_, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={starVariants}
              initial="hidden"
              animate="visible"
            >
              <Star
                className="h-5 w-5 text-amber-400"
                fill={index < rating ? "currentColor" : "none"}
              />
            </motion.div>
          ))}
        </div>
        <motion.div
          className={`h-8 w-8 rounded-full ${bgClass} ${textClass} flex items-center justify-center`}
          initial={{ rotate: -20, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Quote className="h-4 w-4" />
        </motion.div>
      </div>

      <motion.p
        className="text-gray-600 mb-6 text-sm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        "{review}"
      </motion.p>

      <motion.div
        className="flex items-center pt-4 border-t border-gray-100"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <motion.div
          className={`w-10 h-10 rounded-full overflow-hidden flex items-center justify-center ${bgClass}`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className={`text-lg font-medium ${textClass}`}>
              {name.charAt(0).toUpperCase()}
            </span>
          )}
        </motion.div>
        <motion.div
          className="ml-3"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h4 className="font-medium text-gray-800">{name}</h4>
          <p className="text-xs text-gray-500">Member since {memberSince}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default TestimonialCard;

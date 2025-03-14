"use client";
import React from "react";
import { Star, Clock, Tag } from "lucide-react";
import { motion } from "framer-motion";

const RecipeCard = ({
  level,
  image,
  title,
  rating,
  reviews,
  totalTime,
  category,
  dietaryNeeds,
}) => {
  const filledStars = Math.floor(rating);
  const emptyStars = 5 - filledStars;

  // Animation variants
  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  };

  const categoryVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.1 } },
  };

  const starVariants = {
    initial: { opacity: 0, scale: 0.5 },
    animate: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: 0.2 + i * 0.1, duration: 0.3 },
    }),
  };

  const dietaryNeedsVariants = {
    initial: { opacity: 0, y: 5 },
    animate: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.5 + i * 0.05, duration: 0.3 },
    }),
    hover: { scale: 1.05 },
  };

  return (
    <motion.div
      className="bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="h-48 bg-gray-200 relative overflow-hidden">
        <motion.div
          className={`absolute top-2 right-2 bg-teal-500 text-white text-xs font-medium px-2 py-1 rounded shadow-sm`}
          variants={categoryVariants}
          initial="initial"
          animate="animate"
        >
          {category}
        </motion.div>
        <motion.img
          src={image}
          alt={title}
          className="object-cover w-full h-full"
          variants={imageVariants}
          whileHover="hover"
        />
      </div>
      <div className="p-5">
        <motion.h3
          className="text-xl font-bold text-gray-900 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {title}
        </motion.h3>
        <div className="flex items-center mb-3">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={starVariants}
                initial="initial"
                animate="animate"
              >
                <Star
                  className="h-4 w-4"
                  fill={i < filledStars ? "currentColor" : "none"}
                />
              </motion.div>
            ))}
          </div>
          <motion.span
            className="text-gray-600 text-xs ml-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            {rating} ({reviews} reviews)
          </motion.span>
        </div>
        <motion.div
          className="flex justify-between items-center mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <span className="text-sm text-gray-600 flex items-center">
            <Clock className="h-4 w-4 mr-1 text-gray-400" />
            {totalTime} min
          </span>
        </motion.div>

        {dietaryNeeds && dietaryNeeds.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {dietaryNeeds.map((need, index) => (
              <motion.span
                key={index}
                custom={index}
                variants={dietaryNeedsVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                className="text-xs bg-blue-50 text-teal-700 px-2 py-1 rounded"
              >
                {need}
              </motion.span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default RecipeCard;

"use client";
import { Star, Clock, Heart } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSavedRecipes } from "@/app/context/SavedRecipesContext";

const RecipeCard = ({
  id,
  image,
  title,
  rating,
  reviews,
  totalTime,
  category,
  dietaryNeeds,
}) => {
  const { addSavedRecipe, removeSavedRecipe, isSaved } = useSavedRecipes();

  const filledStars = Math.floor(rating);
  const emptyStars = 5 - filledStars;

  // Animation variants

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

  // Favorite toggle handler
  const handleFavoriteToggle = (e) => {
    e.stopPropagation();
    const recipeToSave = {
      id,
      title,
      image,
      rating,
      reviews,
      category,
    };

    if (isSaved(id)) {
      removeSavedRecipe(id);
    } else {
      addSavedRecipe(recipeToSave);
    }
  };

  return (
    <motion.div
      className="bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden relative group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.button
        onClick={handleFavoriteToggle}
        className="absolute top-3 right-3 z-10 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Heart
          className={`h-5 w-5 transition-colors duration-300 ${
            isSaved(id)
              ? "fill-current text-red-500"
              : "text-gray-500 hover:text-red-500"
          }`}
          fill={isSaved(id) ? "currentColor" : "none"}
          stroke={isSaved(id) ? "none" : "currentColor"}
        />
      </motion.button>

      <div className="h-48 bg-gray-200 relative overflow-hidden">
        <motion.div
          className={`absolute bottom-2 left-2 bg-teal-500 text-white text-xs font-medium px-2 py-1 rounded shadow-sm`}
          variants={categoryVariants}
          initial="initial"
          animate="animate"
        >
          {category}
        </motion.div>
        <img src={image} alt={title} className="object-cover w-full h-full" />
      </div>
      <Link href={`/recipes/${id}`}>
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
      </Link>
    </motion.div>
  );
};

export default RecipeCard;

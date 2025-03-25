"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Printer,
  Share2,
  Heart,
  CheckCircle,
  Info,
} from "lucide-react";
import { motion } from "framer-motion";

import RecipeStats from "@/app/components/recipes/RecipeStats";
import NutritionFacts from "@/app/components/recipes/NutritionFacts";
import RecipeTabs from "@/app/components/recipes/RecipeTabs";
import RecipeCard from "@/app/components/shared/RecipeCard";

import { useRecipeContext } from "@/app/context/RecipeContext";
import { useSavedRecipes } from "@/app/context/SavedRecipesContext";

export default function RecipeDetail() {
  // Extract recipe ID from URL parameters
  const params = useParams();
  const id = params.id;

  // Use context hooks for recipes and saved recipes
  const { recipes, loading, error } = useRecipeContext();
  const { addSavedRecipe, removeSavedRecipe, isSaved } = useSavedRecipes();

  // State management for recipe details
  const [recipe, setRecipe] = useState(null);
  const [relatedRecipes, setRelatedRecipes] = useState([]);
  const [servings, setServings] = useState(4);
  const [useUSMeasurements, setUseUSMeasurements] = useState(false);

  // Utility functions for measurement conversions
  const fractionToDecimal = {
    "½": 0.5,
    "1/2": 0.5,
    "⅓": 1 / 3,
    "1/3": 1 / 3,
    "¼": 0.25,
    "1/4": 0.25,
    "¾": 0.75,
    "3/4": 0.75,
  };

  const decimalToFraction = {
    0.5: "½",
    0.25: "¼",
    0.75: "¾",
    0.333: "⅓",
  };

  // Find related recipes and set current recipe
  useEffect(() => {
    if (id && recipes.length > 0) {
      const foundRecipe = recipes.find((r) => r.id === parseInt(id));
      setRecipe(foundRecipe);

      if (foundRecipe) {
        // Find related recipes in the same category
        const related = recipes.filter(
          (r) => r.category === foundRecipe.category && r.id !== foundRecipe.id
        );
        // Limit to 3 related recipes
        setRelatedRecipes(related.slice(0, 3));
      }
    }
  }, [id, recipes]);

  // Print recipe handler
  const handlePrint = () => {
    window.print();
  };

  // Share recipe handler
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: recipe.title,
          text: `Check out this delicious ${recipe.title} recipe!`,
          url: window.location.href,
        })
        .catch(console.error);
    } else {
      // Fallback for browsers without Web Share API
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert("Recipe link copied to clipboard!");
      });
    }
  };

  // Favorite toggle handler
  const handleFavoriteToggle = (e) => {
    e.stopPropagation(); // Prevent unintended events
    const recipeToSave = {
      id,
      title: recipe?.title,
      image: recipe?.image,
      rating: recipe?.rating,
      reviews: recipe?.reviews,
      category: recipe?.category,
    };

    if (isSaved(id)) {
      removeSavedRecipe(id);
    } else {
      addSavedRecipe(recipeToSave);
    }
  };

  // Animation variants for page and content transitions
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <motion.div
          className="border-t-4 border-teal-500 border-solid w-8 h-8 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        ></motion.div>
      </div>
    );
  }

  // Recipe not found state
  if (!recipe) {
    return (
      <motion.div
        className="min-h-screen flex flex-col items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-xl mb-4">Recipe not found</div>
        <Link href="/recipes" className="text-teal-500 hover:underline">
          Return to recipes
        </Link>
      </motion.div>
    );
  }

  // Ingredient amount scaling function
  const updateIngredientAmount = (ingredient, servings, originalServings) => {
    const parts = ingredient.split(" ");
    let amount = parts[0].replace(",", ".");

    // Convert fraction or parse number
    if (fractionToDecimal[amount]) {
      amount = fractionToDecimal[amount];
    } else if (!isNaN(amount)) {
      amount = parseFloat(amount);
    } else {
      return ingredient;
    }

    // Scale ingredient amount
    let scaledAmount = amount * (servings / originalServings);

    // Convert back to fraction or round
    if (decimalToFraction[scaledAmount]) {
      scaledAmount = decimalToFraction[scaledAmount];
    } else {
      scaledAmount =
        scaledAmount % 1 === 0
          ? scaledAmount.toFixed(0)
          : scaledAmount.toFixed(2);
    }

    return `${scaledAmount} ${parts.slice(1).join(" ")}`;
  };

  // Toggle measurement system
  const toggleMeasurementSystem = () => {
    setUseUSMeasurements(!useUSMeasurements);
  };

  // Select ingredients based on measurement system
  const currentIngredients = useUSMeasurements
    ? recipe.ingredients.us
    : recipe.ingredients.eu;

  return (
    <motion.div
      className="min-h-screen"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      {/* Back to Recipes Navigation */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <motion.div
          whileHover={{ x: -5 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <Link
            href="/recipes"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            <ChevronLeft size={16} className="mr-1" />
            <span>Back to recipes</span>
          </Link>
        </motion.div>
      </div>

      {/* Main Recipe Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          className="bg-white rounded-lg shadow-md overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Recipe Image */}
          <motion.div
            className="h-64 sm:h-80 bg-gray-200 relative"
            variants={itemVariants}
          >
            <motion.img
              src={recipe.image}
              alt={recipe.title}
              className="object-cover w-full h-full"
              initial={{ scale: 1.1, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
            {/* Category Badge */}
            <motion.div
              className="absolute bottom-4 left-4 bg-teal-600 text-white text-xs px-2 py-1 rounded"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {recipe.category}
            </motion.div>
            {/* Favorite Button */}
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
          </motion.div>

          {/* Recipe Content */}
          <div className="p-6">
            {/* Title and Action Buttons */}
            <motion.div
              className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4"
              variants={itemVariants}
            >
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 lg:mb-0">
                {recipe.title}
              </h1>
              <div className="flex space-x-2">
                {[
                  { action: "Print", icon: Printer, handler: handlePrint },
                  { action: "Share", icon: Share2, handler: handleShare },
                ].map(({ action, icon: Icon, handler }) => (
                  <motion.button
                    key={action}
                    onClick={handler}
                    className="flex items-center px-3 py-1 rounded bg-gray-200 hover:bg-teal-600 hover:text-white cursor-pointer"
                  >
                    <Icon size={16} className="mr-1" />
                    <span className="text-sm">{action}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Rating */}
            <motion.div
              className="flex flex-wrap items-center mb-6"
              variants={itemVariants}
            >
              <div className="flex items-center mr-4">
                <div className="flex text-yellow-400 mr-1">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * i, duration: 0.3 }}
                      >
                        <Star
                          size={16}
                          fill={
                            i < Math.floor(recipe.rating)
                              ? "currentColor"
                              : "none"
                          }
                          className={
                            i < Math.floor(recipe.rating) ? "" : "text-gray-300"
                          }
                        />
                      </motion.div>
                    ))}
                </div>
                <span className="text-gray-600 text-sm">
                  ({recipe.reviews} reviews)
                </span>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div variants={itemVariants}>
              <p className="text-gray-700 mb-8">{recipe.description}</p>
            </motion.div>

            {/* Recipe Stats */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
              variants={itemVariants}
            >
              <RecipeStats
                recipe={recipe}
                servings={servings}
                setServings={setServings}
              />
            </motion.div>

            {/* FODMAP Information */}
            <motion.div
              className="bg-blue-50 border-l-4 border-teal-400 p-4 mb-8 rounded"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="flex">
                <Info
                  size={20}
                  className="text-teal-500 mr-3 flex-shrink-0 mt-1"
                />
                <div>
                  <h3 className="font-medium text-teal-800 mb-2">
                    FODMAP Information
                  </h3>
                  <ul className="text-teal-700 text-sm space-y-1">
                    {recipe.fodmapTips.map((tip, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                      >
                        <CheckCircle
                          size={16}
                          className="text-teal-500 mr-2 flex-shrink-0 mt-1"
                        />
                        <span>{tip}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Nutrition Facts */}
            <motion.div className="mb-8" variants={itemVariants}>
              <NutritionFacts recipe={recipe} />
            </motion.div>

            {/* Recipe Tabs */}
            <motion.div
              className="border-gray-200 mb-6"
              variants={itemVariants}
            >
              <RecipeTabs
                recipe={{ ...recipe, ingredients: currentIngredients }}
                servings={servings}
                updateIngredientAmount={updateIngredientAmount}
                useUSMeasurements={useUSMeasurements}
                toggleMeasurementSystem={toggleMeasurementSystem}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Related Recipes Section */}
        <motion.div
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <div className="flex items-baseline justify-between">
            <motion.h2
              className="text-2xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              You Might Also Like
            </motion.h2>
            {/* View All Recipes Link */}
            <motion.div
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Link
                href="/recipes"
                className="inline-flex items-center text-sm font-medium text-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                View all <ChevronRight className="h-5 w-5 ml-1" />
              </Link>
            </motion.div>
          </div>

          {/* Related Recipes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedRecipes.slice(0, 3).map((recipe, index) => (
              <motion.div
                key={recipe.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.2, duration: 0.5 }}
              >
                <RecipeCard
                  id={recipe.id}
                  image={recipe.image}
                  title={recipe.title}
                  rating={recipe.rating}
                  reviews={recipe.reviews}
                  totalTime={recipe.time}
                  category={recipe.category}
                  dietaryNeeds={recipe.dietaryNeeds}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

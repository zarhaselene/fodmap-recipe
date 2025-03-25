"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Hero from "@/app/components/shared/Hero";
import { useSavedRecipes } from "@/app/context/SavedRecipesContext";
import RecipeCard from "@/app/components/shared/RecipeCard";

export default function FavoritesPage() {
  const { savedRecipes, removeSavedRecipe } = useSavedRecipes();
  
  // State for category filtering
  const [filter, setFilter] = useState("All");

  // Get unique categories from saved recipes
  const categories = [
    "All",
    ...new Set(savedRecipes.map((recipe) => recipe.category)),
  ];

  // Filter recipes based on selected category, with most recent first
  const filteredRecipes =
    filter === "All"
      ? [...savedRecipes].reverse()
      : savedRecipes.filter((recipe) => recipe.category === filter).reverse();

  // Page transition animations
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 }
  };

  // Item animation for individual recipe cards
  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      transition={pageVariants.transition}
      className="min-h-screen"
    >
      <Hero 
        title="Favorite Recipes" 
        description="Your saved recipes" 
      />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filter */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex space-x-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-3 py-1 rounded text-sm transition-colors duration-200 ${
                  filter === category
                    ? "bg-teal-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Recipes Grid or Empty State */}
        {filteredRecipes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <Heart className="mx-auto text-gray-300 mb-4" size={64} />
            <p className="text-xl text-gray-600">
              You haven't saved any recipes yet
            </p>
            <Link
              href="/recipes"
              className="mt-4 inline-block text-teal-600 hover:underline"
            >
              Explore Recipes
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe, index) => (
              <motion.div
                key={recipe.id}
                initial="initial"
                animate="animate"
                variants={itemVariants}
                transition={{ 
                  delay: index * 0.1, 
                  duration: 0.5 
                }}
                className="relative group"
              >
                <RecipeCard
                  id={recipe.id}
                  image={recipe.image}
                  title={recipe.title}
                  rating={recipe.rating}
                  reviews={recipe.reviews}
                  time={recipe.time}
                  category={recipe.category}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
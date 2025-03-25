"use client";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import RecipeCard from "../shared/RecipeCard";
import { useRecipeContext } from "../../context/RecipeContext";
import { motion } from "framer-motion";

const FeaturedRecipes = () => {
  const { recipes, loading, error } = useRecipeContext();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <motion.div
          className="border-t-4 border-teal-500 border-solid w-8 h-8 rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
        ></motion.div>
      </div>
    );
  }
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-teal-700">
            Featured Recipes
          </h2>
          <motion.div
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Link
              href="/recipes"
              className="text-teal-700 hover:text-teal-900 flex items-center font-medium"
            >
              View all <ChevronRight className="h-5 w-5 ml-1" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {recipes.slice(0, 3).map((recipe, index) => (
            <motion.div key={recipe.id} variants={itemVariants}>
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
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedRecipes;

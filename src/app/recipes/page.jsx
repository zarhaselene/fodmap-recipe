"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "../components/shared/Hero";
import FilterOptions from "../components/recipes/FilterOptions";
import RecipeCard from "../components/shared/RecipeCard";
import Pagination from "../components/shared/Pagination";
import Link from "next/link";
import { useRecipeContext } from "../context/RecipeContext";

const Recipes = () => {
  const { recipes, loading, error } = useRecipeContext();

  const [activeDietaryNeeds, setActiveDietaryNeeds] = useState([]);
  const [activeMealTypes, setActiveMealTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  useEffect(() => {
    // Update itemsPerPage based on screen size
    const handleResize = () => {
      setItemsPerPage(window.innerWidth < 640 ? 4 : 8);
    };

    handleResize(); // Set the initial itemsPerPage
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
        />
      </div>
    );
  }
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesDietary =
      activeDietaryNeeds.length === 0 ||
      activeDietaryNeeds.every((need) => recipe.dietaryNeeds.includes(need));

    const matchesMealType =
      activeMealTypes.length === 0 || activeMealTypes.includes(recipe.category);

    return matchesDietary && matchesMealType;
  });

  const searchedRecipes = filteredRecipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(searchedResources.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Calculate recipes to display per page
  const indexOfLastRecipe = currentPage * itemsPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - itemsPerPage;
  const currentRecipes = searchedRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  // Animation variants - matching the FeaturedRecipes component
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

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  };

  return (
    <motion.div
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Hero
        title="Find FODMAP friendly foods & recipes"
        description="Search our database of foods and discover delicious recipes that won't trigger your symptoms"
        searchPlaceholder="Search for a food or ingredient..."
        onSearch={handleSearch}
      />
      <motion.div
        className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <FilterOptions
          activeDietaryNeeds={activeDietaryNeeds}
          setActiveDietaryNeeds={setActiveDietaryNeeds}
          activeMealTypes={activeMealTypes}
          setActiveMealTypes={setActiveMealTypes}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={pageTransition}
          >
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {currentRecipes.length > 0 ? (
                currentRecipes.map((recipe) => (
                  <motion.div key={recipe.id} variants={itemVariants}>
                    <Link href={`/recipes/${recipe.id}`}>
                      <RecipeCard {...recipe} />
                    </Link>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  className="col-span-3 text-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-gray-500">
                    No recipes match your current filters.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {searchedRecipes.length > itemsPerPage && (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            nextPage={nextPage}
            previousPage={previousPage}
            totalPages={Math.ceil(searchedRecipes.length / itemsPerPage)}
            totalItems={searchedRecipes.length}
            itemsPerPage={itemsPerPage}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

export default Recipes;

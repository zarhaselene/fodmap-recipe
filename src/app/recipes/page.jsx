"use client";

import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import FilterOptions from "../components/recipes/FilterOptions";
import RecipeCard from "../components/RecipeCard";
import Pagination from "../components/recipes/Pagination";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeDietaryNeeds, setActiveDietaryNeeds] = useState([]);
  const [activeFodmapLevels, setActiveFodmapLevels] = useState([]);
  const [activeMealTypes, setActiveMealTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8); 

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("/recipes.json");
        if (!response.ok) throw new Error("Failed to fetch recipes");
        const data = await response.json();
        setRecipes(data.recipes);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    // Update itemsPerPage based on screen size
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(4); // Mobile: 4 items per page
      } else {
        setItemsPerPage(8); // Default: 8 items per page
      }
    };

    handleResize(); // Set the initial itemsPerPage
    window.addEventListener("resize", handleResize); // Listen for window resize

    return () => {
      window.removeEventListener("resize", handleResize); // Clean up the event listener
    };
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesDietary =
      activeDietaryNeeds.length === 0 ||
      activeDietaryNeeds.every((need) => recipe.dietaryNeeds.includes(need));

    const matchesFodmap =
      activeFodmapLevels.length === 0 ||
      activeFodmapLevels.includes(recipe.level);

    const matchesMealType =
      activeMealTypes.length === 0 || activeMealTypes.includes(recipe.category);

    return matchesDietary && matchesFodmap && matchesMealType;
  });

  const searchedRecipes = filteredRecipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset page when search term changes
  };

  // Calculate the recipes to display based on the current page
  const indexOfLastRecipe = currentPage * itemsPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - itemsPerPage;
  const currentRecipes = searchedRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  // Pagination handlers
  const nextPage = () => {
    if (currentPage < Math.ceil(searchedRecipes.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen">
      <Hero
        title="Find FODMAP friendly foods & recipes"
        description="Search our database of foods and discover delicious recipes that won't trigger your symptoms"
        searchPlaceholder="Search for a food or ingredient..."
        onSearch={handleSearch}
      />
      <div className="container mx-auto px-4 py-8">
        <FilterOptions
          activeDietaryNeeds={activeDietaryNeeds}
          setActiveDietaryNeeds={setActiveDietaryNeeds}
          activeFodmapLevels={activeFodmapLevels}
          setActiveFodmapLevels={setActiveFodmapLevels}
          activeMealTypes={activeMealTypes}
          setActiveMealTypes={setActiveMealTypes}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {currentRecipes.length > 0 ? (
            currentRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                image={recipe.image}
                tag={recipe.level}
                title={recipe.title}
                category={recipe.category}
                rating={recipe.rating}
                reviews={recipe.reviews}
                time={recipe.time}
                dietaryNeeds={recipe.dietaryNeeds}
              />
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-gray-500">
                No recipes match your current filters.
              </p>
            </div>
          )}
        </div>

        {searchedRecipes.length > 0 && (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            nextPage={nextPage}
            previousPage={previousPage}
            totalPages={Math.ceil(searchedRecipes.length / itemsPerPage)}
          />
        )}
      </div>
    </div>
  );
};

export default Recipes;

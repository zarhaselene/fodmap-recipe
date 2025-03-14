"use client";

import { useState, useEffect } from "react";
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
        <div className="border-t-4 border-teal-500 border-solid w-8 h-8 rounded-full animate-spin"></div>
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

  // Calculate recipes to display per page
  const indexOfLastRecipe = currentPage * itemsPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - itemsPerPage;
  const currentRecipes = searchedRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  return (
    <div className="min-h-screen">
      <Hero
        title="Find FODMAP friendly foods & recipes"
        description="Search our database of foods and discover delicious recipes that won't trigger your symptoms"
        searchPlaceholder="Search for a food or ingredient..."
        onSearch={handleSearch}
      />
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FilterOptions
          activeDietaryNeeds={activeDietaryNeeds}
          setActiveDietaryNeeds={setActiveDietaryNeeds}
          activeMealTypes={activeMealTypes}
          setActiveMealTypes={setActiveMealTypes}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {currentRecipes.length > 0 ? (
            currentRecipes.map((recipe) => (
              <Link key={recipe.id} href={`/recipes/${recipe.id}`}>
                <RecipeCard {...recipe} />
              </Link>
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
            nextPage={() =>
              setCurrentPage((prev) =>
                prev < Math.ceil(searchedRecipes.length / itemsPerPage)
                  ? prev + 1
                  : prev
              )
            }
            previousPage={() =>
              setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
            }
            totalPages={Math.ceil(searchedRecipes.length / itemsPerPage)}
          />
        )}
      </div>
    </div>
  );
};

export default Recipes;

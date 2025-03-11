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

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const filteredRecipes = recipes.filter((recipe) => {
    // check if each active need is included in the recipe's dietary needs
    const matchesDietary =
      activeDietaryNeeds.length === 0 ||
      activeDietaryNeeds.every((need) => recipe.dietaryNeeds.includes(need));

    // check if the recipe's level is one of the active levels
    const matchesFodmap =
      activeFodmapLevels.length === 0 ||
      activeFodmapLevels.includes(recipe.level);

    // check if the recipe's category matches any active meal type
    const matchesMealType =
      activeMealTypes.length === 0 || activeMealTypes.includes(recipe.category);

    return matchesDietary && matchesFodmap && matchesMealType;
  });

  const searchedRecipes = filteredRecipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (term) => {
    setSearchTerm(term);
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {searchedRecipes.length > 0 ? (
            searchedRecipes.map((recipe) => (
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
        {searchedRecipes.length > 0 && <Pagination />}
      </div>
    </div>
  );
};

export default Recipes;

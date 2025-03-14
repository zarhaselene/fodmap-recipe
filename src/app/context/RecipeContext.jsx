"use client";

import { createContext, useContext, useEffect, useState } from "react";

const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeDietaryNeeds, setActiveDietaryNeeds] = useState([]);
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
    const handleResize = () => {
      setItemsPerPage(window.innerWidth < 640 ? 4 : 8);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

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

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        loading,
        error,
        activeDietaryNeeds,
        setActiveDietaryNeeds,
        activeMealTypes,
        setActiveMealTypes,
        searchTerm,
        handleSearch,
        currentPage,
        setCurrentPage,
        itemsPerPage,
        searchedRecipes,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipeContext = () => useContext(RecipeContext);

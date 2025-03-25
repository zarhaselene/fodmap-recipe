"use client";

import { createContext, useContext, useState, useEffect } from "react";

// Create the context
const SavedRecipesContext = createContext(undefined);

// Provider component
export const SavedRecipesProvider = ({ children }) => {
  const [savedRecipes, setSavedRecipes] = useState([]);

  // Load saved recipes from localStorage on initial load
  useEffect(() => {
    const storedRecipes = localStorage.getItem("savedRecipes");
    if (storedRecipes) {
      setSavedRecipes(JSON.parse(storedRecipes));
    }
  }, []);

  // Update localStorage whenever savedRecipes changes
  useEffect(() => {
    localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
  }, [savedRecipes]);

  const addSavedRecipe = (recipe) => {
    // Prevent duplicates
    if (!savedRecipes.some((r) => r.id === recipe.id)) {
      setSavedRecipes([...savedRecipes, recipe]);
    }
  };

  const removeSavedRecipe = (recipeId) => {
    setSavedRecipes(savedRecipes.filter((r) => r.id !== recipeId));
  };

  const isSaved = (recipeId) => {
    return savedRecipes.some((r) => r.id === recipeId);
  };

  return (
    <SavedRecipesContext.Provider
      value={{
        savedRecipes,
        addSavedRecipe,
        removeSavedRecipe,
        isSaved,
      }}
    >
      {children}
    </SavedRecipesContext.Provider>
  );
};

// Custom hook to use the context
export const useSavedRecipes = () => {
  const context = useContext(SavedRecipesContext);
  if (context === undefined) {
    throw new Error(
      "useSavedRecipes must be used within a SavedRecipesProvider"
    );
  }
  return context;
};

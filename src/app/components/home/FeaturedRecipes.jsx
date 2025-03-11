"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import RecipeCard from "../RecipeCard";

const FeaturedRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="border-t-4 border-teal-500 border-solid w-8 h-8 rounded-full animate-spin"></div>
      </div>
    );
  }
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-teal-700">
            Featured Recipes
          </h2>
          <Link
            href="/recipes"
            className="text-teal-700 hover:text-teal-900 flex items-center font-medium"
          >
            View all <ChevronRight className="h-5 w-5 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.slice(0, 3).map((recipe) => (
            <Link href={`/recipes/${recipe.id}`} key={recipe.id}>
              <RecipeCard
                key={recipe.id}
                level={recipe.level}
                image={recipe.image}
                title={recipe.title}
                rating={recipe.rating}
                reviews={recipe.reviews}
                totalTime={recipe.totalTime}
                category={recipe.category}
                dietaryNeeds={recipe.dietaryNeeds}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRecipes;

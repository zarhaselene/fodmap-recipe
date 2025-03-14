"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Star,
  Printer,
  Share2,
  Heart,
  CheckCircle,
  Info,
} from "lucide-react";

import RecipeStats from "@/app/components/recipes/RecipeStats";
import NutritionFacts from "@/app/components/recipes/NutritionFacts";
import RecipeTabs from "@/app/components/recipes/RecipeTabs";
import RecipeCard from "@/app/components/shared/RecipeCard";

export default function RecipeDetail() {
  const params = useParams();
  const id = params.id;

  const [recipe, setRecipe] = useState(null);
  const [relatedRecipes, setRelatedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [servings, setServings] = useState(4);
  const [useUSMeasurements, setUseUSMeasurements] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("/recipes.json");
        if (!response.ok) throw new Error("Failed to fetch recipes");
        const data = await response.json();

        const foundRecipe = data.recipes.find((r) => r.id === parseInt(id));
        setRecipe(foundRecipe);

        // Find related recipes based on category
        const related = data.recipes.filter(
          (r) => r.category === foundRecipe.category && r.id !== foundRecipe.id
        );
        setRelatedRecipes(related.slice(0, 3)); // Get only 3 related recipes
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRecipes();
    }
  }, [id]);

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

  const euToUSConversions = {
    ml: (val) => `${(val / 236.588).toFixed(2)} cups`,
    cl: (val) => `${(val / 23.6588).toFixed(2)} cups`,
    dl: (val) => `${(val / 2.36588).toFixed(2)} cups`,
    l: (val) => `${(val * 4.22675).toFixed(2)} cups`,
    g: (val) =>
      val < 5
        ? `${(val / 5).toFixed(2)} teaspoons`
        : `${(val / 28.3495).toFixed(2)} oz`,
    kg: (val) => `${(val * 2.20462).toFixed(2)} lb`,
  };

  const usToEUConversions = {
    cup: (val) => `${(val * 236.588).toFixed(0)} ml`,
    cups: (val) => `${(val * 236.588).toFixed(0)} ml`,
    tablespoon: (val) => `${(val * 15).toFixed(0)} ml`,
    tablespoons: (val) => `${(val * 15).toFixed(0)} ml`,
    tbsp: (val) => `${(val * 15).toFixed(0)} ml`,
    teaspoon: (val) => `${(val * 5).toFixed(0)} ml`,
    teaspoons: (val) => `${(val * 5).toFixed(0)} ml`,
    tsp: (val) => `${(val * 5).toFixed(0)} ml`,
    oz: (val) => `${(val * 28.3495).toFixed(0)} g`,
    ounce: (val) => `${(val * 28.3495).toFixed(0)} g`,
    ounces: (val) => `${(val * 28.3495).toFixed(0)} g`,
    lb: (val) => `${(val * 0.453592).toFixed(2)} kg`,
    pound: (val) => `${(val * 0.453592).toFixed(2)} kg`,
    pounds: (val) => `${(val * 0.453592).toFixed(2)} kg`,
  };

  const updateIngredientAmount = (ingredient, servings, originalServings) => {
    const parts = ingredient.split(" ");

    let amount = parts[0].replace(",", ".");

    if (fractionToDecimal[amount]) {
      amount = fractionToDecimal[amount];
    } else if (!isNaN(amount)) {
      amount = parseFloat(amount);
    } else {
      return ingredient;
    }

    let scaledAmount = amount * (servings / originalServings);

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

  const toggleMeasurementSystem = () => {
    setUseUSMeasurements(!useUSMeasurements);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="border-t-4 border-teal-500 border-solid w-8 h-8 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-xl mb-4">Recipe not found</div>
        <Link href="/recipes" className="text-teal-500 hover:underline">
          Return to recipes
        </Link>
      </div>
    );
  }

  const currentIngredients = useUSMeasurements
    ? recipe.ingredients.us
    : recipe.ingredients.eu;

  return (
    <div className="min-h-screen">
      {/* Back button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link
          href="/recipes"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none 
          focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        >
          <ArrowLeft size={16} className="mr-1" />
          <span>Back to recipes</span>
        </Link>
      </div>

      {/* Recipe container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Recipe image and badge */}
          <div className="h-64 sm:h-80 bg-gray-200 relative">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="object-cover w-full h-full"
            />
            <div className="absolute top-4 left-4 bg-green-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
              {recipe.level}
            </div>
          </div>

          {/* Recipe content */}
          <div className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 lg:mb-0">
                {recipe.title}
              </h1>
              <div className="flex space-x-2">
                <button className="flex items-center px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded">
                  <Printer size={16} className="mr-1" />
                  <span className="text-sm">Print</span>
                </button>
                <button className="flex items-center px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded">
                  <Share2 size={16} className="mr-1" />
                  <span className="text-sm">Share</span>
                </button>
                <button className="flex items-center px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded">
                  <Heart size={16} className="mr-1" />
                  <span className="text-sm">Save</span>
                </button>
              </div>
            </div>

            {/* Rating and category */}
            <div className="flex flex-wrap items-center mb-6">
              <div className="flex items-center mr-4">
                <div className="flex text-yellow-400 mr-1">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
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
                    ))}
                </div>
                <span className="text-gray-600 text-sm">
                  ({recipe.reviews} reviews)
                </span>
              </div>
              <span className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded">
                {recipe.category}
              </span>
            </div>

            {/* Description */}
            <div>
              <p className="text-gray-700 mb-8">{recipe.description}</p>
            </div>

            {/* Recipe details */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <RecipeStats
                recipe={recipe}
                servings={servings}
                setServings={setServings}
              />
            </div>

            {/* FODMAP info box */}
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8 rounded">
              <div className="flex">
                <Info
                  size={20}
                  className="text-blue-500 mr-3 flex-shrink-0 mt-1"
                />
                <div>
                  <h3 className="font-medium text-blue-800 mb-2">
                    FODMAP Information
                  </h3>
                  <ul className="text-blue-700 text-sm space-y-1">
                    {recipe.fodmapTips.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle
                          size={16}
                          className="text-blue-500 mr-2 flex-shrink-0 mt-1"
                        />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Nutrition Facts */}
            <div className="mb-8">
              <NutritionFacts recipe={recipe} />
            </div>

            {/* Tabs */}
            <div className="border-gray-200 mb-6">
              <RecipeTabs
                recipe={{ ...recipe, ingredients: currentIngredients }}
                servings={servings}
                updateIngredientAmount={updateIngredientAmount}
                useUSMeasurements={useUSMeasurements}
                toggleMeasurementSystem={toggleMeasurementSystem}
              />
            </div>
          </div>
        </div>
        {/* Related recipes section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedRecipes.slice(0, 3).map((recipe) => (
              <RecipeCard
                key={recipe.id}
                level={recipe.level}
                image={recipe.image}
                title={recipe.title}
                rating={recipe.rating}
                reviews={recipe.reviews}
                time={recipe.time}
                category={recipe.category}
              />
            ))}
          </div>
          {/* View all recipes button */}
          <div className="mt-8 text-center">
            <Link
              href="/recipes"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              View All Recipes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

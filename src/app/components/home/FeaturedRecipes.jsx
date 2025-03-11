import Link from "next/link";
import { ChevronRight } from "lucide-react";
import RecipeCard from "../RecipeCard";

const FeaturedRecipes = () => {
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
          {/* Replace with dynamic data later */}
          <RecipeCard
            tag="Low FODMAP"
            image="/images/recipe1.jpg"
            title="Lemon Herb Grilled Chicken"
            rating={2}
            reviews={42}
            time="25 min"
            category="Dinner"
          />
          <RecipeCard
            tag="Low FODMAP"
            image="/images/recipe1.jpg"
            title="Lemon Herb Grilled Chicken"
            rating={2}
            reviews={42}
            time="25 min"
            category="Dinner"
          />
          <RecipeCard
            tag="Low FODMAP"
            image="/images/recipe1.jpg"
            title="Lemon Herb Grilled Chicken"
            rating={2}
            reviews={42}
            time="25 min"
            category="Dinner"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedRecipes;

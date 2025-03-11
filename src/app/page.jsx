import Link from "next/link";
import Hero from "./components/Hero";
import FeaturedRecipes from "./components/home/FeaturedRecipes";
import FodmapGuide from "./components/home/FodmapGuide";
import Testimonials from "./components/home/Testimonials";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="hero">
        <Hero
          title={"Find FODMAP friendly foods & recipes"}
          description={
            "Search our database of foods and discover delicious recipes that won't trigger your symptoms"
          }
          searchPlaceholder={"Search for a food or ingredient..."}
        />
      </section>
      {/* Featured Recipes Section */}
      <FeaturedRecipes />

      {/* Quick FODMAP Guide Section */}
      <FodmapGuide />

      {/* Testimonials */}
      <Testimonials />
    </div>
  );
}

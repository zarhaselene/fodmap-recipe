import Hero from "./components/shared/Hero";
import FeaturedRecipes from "./components/home/FeaturedRecipes";
import FodmapGuide from "./components/home/FodmapGuide";
import DietSelector from "./components/home/DietSelector"; 

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="hero">
        <Hero
          title="Find FODMAP friendly foods & recipes"
          description="Search our database of foods and discover delicious recipes that won't trigger your symptoms"
        />
      </section>

      {/* Featured Recipes Section */}
      <FeaturedRecipes />

      {/* Quick FODMAP Guide Section */}
      <FodmapGuide />

      {/* New Diet Selector Section */}
      <DietSelector />
    </div>
  );
}

import Hero from "./components/Hero";

export default function Home() {
  return (
    <div>
      <Hero
        title={"Find FODMAP friendly foods & recipes"}
        description={
          "Search our database of foods and discover delicious recipes that won't trigger your symptoms"
        }
        searchPlaceholder={"Search for a food or ingredient..."}
      />
    </div>
  );
}

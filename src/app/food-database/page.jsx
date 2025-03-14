import React from "react";
import Hero from "../components/shared/Hero";

const page = () => {
  return (
    <div>
      <Hero
        title={"FODMAP Food Database"}
        description={
          "Search and filter foods to find out their FODMAP content and safe serving sizes."
        }
        searchPlaceholder={"Search for a food or ingredient..."}
      />
    </div>
  );
};

export default page;

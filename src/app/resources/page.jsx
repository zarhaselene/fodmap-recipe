import React from "react";
import Hero from "../components/Hero";

const page = () => {
  return (
    <div>
      <div>
        <Hero
          title={"FODMAP Diet Resources & Tools"}
          description={
            "Access guides, meal plans, tracking tools and more to help you navigate the low FODMAP diet with confidence"
          }
          searchPlaceholder={"Search resources..."}
        />
      </div>
    </div>
  );
};

export default page;

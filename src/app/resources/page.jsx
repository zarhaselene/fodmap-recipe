"use client";
import { useState, useEffect } from "react";
import { useResources } from "../context/ResourcesContext";
import { useSearchParams } from "next/navigation";
import Hero from "../components/shared/Hero";
import DietPhases from "../components/resources/DietPhases";
import MealPlanning from "../components/resources/MealPlanning";
import ResourcesSection from "../components/resources/ResourcesSection";
import FAQSection from "../components/resources/FAQ";

const Resources = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const searchParams = useSearchParams();

  const {
    activeCategory,
    setActiveCategory,
    searchTerm,
    setSearchTerm,
    searchedResources,
    resourceCategories,
  } = useResources();

  // Check for category in URL params on initial load
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam && resourceCategories.includes(categoryParam)) {
      setActiveCategory(categoryParam);

      // Scroll to resources section
      setTimeout(() => {
        const resourcesElement = document.getElementById("resources-section");
        if (resourcesElement) {
          resourcesElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [searchParams, resourceCategories, setActiveCategory]);

  const faqs = [
    {
      id: 1,
      question: "What is the low FODMAP diet?",
      answer:
        "The low FODMAP diet is an elimination diet that helps identify food triggers for digestive symptoms in people with IBS. FODMAP stands for Fermentable Oligosaccharides, Disaccharides, Monosaccharides, and Polyols, which are types of carbohydrates that can be poorly absorbed in the small intestine.",
    },
    {
      id: 2,
      question: "How long should I follow the elimination phase?",
      answer:
        "The elimination phase typically lasts for 2-6 weeks. It's important not to stay in this phase longer than necessary, as it's quite restrictive. Once your symptoms have improved, you should move on to the reintroduction phase with guidance from a healthcare professional.",
    },
    {
      id: 3,
      question: "What happens during the reintroduction phase?",
      answer:
        "During reintroduction, you systematically test each FODMAP subgroup one at a time while maintaining a low FODMAP diet otherwise. This helps identify which specific FODMAPs trigger your symptoms and which ones you can tolerate, allowing you to develop a personalized long-term diet.",
    },
    {
      id: 4,
      question: "How do I create a meal plan for the low FODMAP diet?",
      answer:
        "Creating a FODMAP-friendly meal plan involves selecting recipes with approved ingredients, batch cooking, and proper meal prep to make the diet manageable. Our meal planning resources provide weekly plans, shopping lists, and preparation tips to simplify the process.",
    },
    {
      id: 5,
      question: "Do I need to work with a dietitian?",
      answer:
        "Yes, it's highly recommended to work with a FODMAP-trained dietitian who can provide personalized guidance, ensure nutritional adequacy, and help you navigate the challenges of the diet. They can also support you through the reintroduction and personalization phases.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero
        title={"FODMAP Diet Resources & Tools"}
        description={
          "Access guides, meal plans, tracking tools and more to help you navigate the low FODMAP diet with confidence"
        }
        searchPlaceholder={"Search resources..."}
      />

      {/* FODMAP Diet Phases Section */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1">
        <h2 className="text-2xl md:text-3xl font-bold text-teal-700 my-12 text-center md:text-left">
          Understanding the FODMAP Diet Journey
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <DietPhases setActiveCategory={setActiveCategory} />
        </div>
      </div>

      {/* Meal Planning Section */}
      <div className="bg-teal-100/15 mt-12">
        <div className="py-16 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <MealPlanning setActiveCategory={setActiveCategory} />
        </div>
      </div>
      <div id="resources-section" className="bg-white">
        <ResourcesSection
          {...{
            resourceCategories,
            activeCategory,
            setActiveCategory,
            searchedResources,
          }}
        />
      </div>

      {/* FAQ Section */}
      <div className="pb-16 to-white">
        <div className=" px-4">
          <FAQSection {...{ faqs, expandedFaq, setExpandedFaq }} />
        </div>
      </div>
    </div>
  );
};

export default Resources;

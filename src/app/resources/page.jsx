"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

// Context and component imports
import { useResources } from "../context/ResourcesContext";
import Hero from "../components/shared/Hero";
import DietPhases from "../components/resources/DietPhases";
import MealPlanning from "../components/resources/MealPlanning";
import ResourcesSection from "../components/resources/ResourcesSection";
import FAQSection from "../components/resources/FAQ";

const Resources = () => {
  // State for managing expanded FAQ
  const [expandedFaq, setExpandedFaq] = useState(null);
  const searchParams = useSearchParams();

  // Destructure context values
  const {
    activeCategory,
    setActiveCategory,
    searchedResources,
    resourceCategories,
  } = useResources();

  // URL parameter handling for initial category selection
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam && resourceCategories.includes(categoryParam)) {
      setActiveCategory(categoryParam);

      // Smooth scroll to resources section after category selection
      setTimeout(() => {
        const resourcesElement = document.getElementById("resources-section");
        if (resourcesElement) {
          resourcesElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [searchParams, resourceCategories, setActiveCategory]);

  // FAQ data - could potentially be moved to a separate file
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

  // Framer Motion animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with entrance animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Hero
          title="FODMAP Diet Resources & Tools"
          description="Access guides, meal plans, tracking tools and more to help you navigate the low FODMAP diet with confidence"
        />
      </motion.div>

      {/* FODMAP Diet Phases Section */}
      <motion.div
        className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-teal-700 my-12 text-center md:text-left"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Understanding the FODMAP Diet Journey
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <DietPhases setActiveCategory={setActiveCategory} />
        </motion.div>
      </motion.div>

      {/* Meal Planning Section */}
      <div className="bg-teal-100/15 mt-12">
        <motion.div
          className="py-16 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <MealPlanning setActiveCategory={setActiveCategory} />
        </motion.div>
      </div>

      {/* Resources Section */}
      <motion.div
        id="resources-section"
        className="bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <ResourcesSection
          resourceCategories={resourceCategories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          searchedResources={searchedResources}
        />
      </motion.div>

      {/* FAQ Section */}
      <div className="pb-16 to-white">
        <motion.div
          className="px-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <FAQSection
            faqs={faqs}
            expandedFaq={expandedFaq}
            setExpandedFaq={setExpandedFaq}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Resources;

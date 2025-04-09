"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, X, ChevronDown, ChevronUp } from "lucide-react";
import Hero from "../components/shared/Hero";
import RecipeCard from "../components/shared/RecipeCard";
import Pagination from "../components/shared/Pagination";
import { useRecipeContext } from "../context/RecipeContext";

const Recipes = () => {
  const { recipes, loading, error } = useRecipeContext();
  const [filters, setFilters] = useState({
    dietaryNeeds: [],
    mealTypes: [],
    searchTerm: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isDesktopFilterOpen, setIsDesktopFilterOpen] = useState(false);
  const [activeFilterSection, setActiveFilterSection] = useState(null);

  // Refs for click outside detection
  const filterButtonRef = useRef(null);
  const filterDropdownRef = useRef(null);

  // Handle clicks outside the filter dropdown to close it
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        isDesktopFilterOpen &&
        filterDropdownRef.current &&
        filterButtonRef.current &&
        !filterDropdownRef.current.contains(event.target) &&
        !filterButtonRef.current.contains(event.target)
      ) {
        setIsDesktopFilterOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDesktopFilterOpen]);

  // Dynamically adjust items per page based on screen size
  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth < 640 ? 4 : 9);
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters.dietaryNeeds, filters.mealTypes, filters.searchTerm]);

  // Memoized filtered recipes for performance
  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesSearch =
        filters.searchTerm === "" ||
        recipe.title.toLowerCase().includes(filters.searchTerm.toLowerCase());

      const matchesDietary =
        filters.dietaryNeeds.length === 0 ||
        filters.dietaryNeeds.every((need) =>
          recipe.dietaryNeeds.includes(need)
        );

      const matchesMealType =
        filters.mealTypes.length === 0 ||
        filters.mealTypes.includes(recipe.category);

      return matchesSearch && matchesDietary && matchesMealType;
    });
  }, [recipes, filters]);

  // Pagination calculations
  const indexOfLastRecipe = currentPage * itemsPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - itemsPerPage;
  const currentRecipes = filteredRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  // Derive unique dietary needs from recipes
  const availableDietaryNeeds = [
    ...new Set(recipes.flatMap((recipe) => recipe.dietaryNeeds || [])),
  ];

  // Predefined meal types
  const availableMealTypes = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Snack",
    "Dessert",
  ];

  // Reset all filters to initial state
  const resetFilters = () => {
    setFilters({
      dietaryNeeds: [],
      mealTypes: [],
      searchTerm: "",
    });
    setIsMobileFilterOpen(false);
    setIsDesktopFilterOpen(false);
  };

  // Mobile filter toggle for sections
  const toggleFilterSection = (section) => {
    setActiveFilterSection(activeFilterSection === section ? null : section);
  };

  // Toggle desktop filter dropdown
  const toggleDesktopFilter = () => {
    setIsDesktopFilterOpen(!isDesktopFilterOpen);
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <motion.div
          className="border-t-4 border-teal-500 border-solid w-8 h-8 rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    );
  }

  // Error state
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <motion.div
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero section */}
      <Hero
        title="Find FODMAP friendly recipes"
        description="Search our database of recipes that won't trigger your symptoms"
      />

      <motion.div
        className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {/* Page header and search/filter section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 mt-12">
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-teal-700 mb-4 md:mb-0"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            FODMAP Friendly Recipes
          </motion.h2>

          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            {/* Search Input */}
            <div className="w-full sm:w-auto mb-4 sm:mb-0">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Search recipes..."
                  value={filters.searchTerm}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      searchTerm: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            {/* Desktop Filter Button */}
            <div className="relative">
              <button
                ref={filterButtonRef}
                onClick={() => {
                  // Mobile view
                  if (window.innerWidth < 768) {
                    setIsMobileFilterOpen(true);
                  }
                  // Desktop view
                  else {
                    toggleDesktopFilter();
                  }
                }}
                className={`flex items-center ${
                  isDesktopFilterOpen ? "bg-gray-200" : "bg-gray-100"
                } hover:bg-gray-200 px-3 py-2 rounded-md transition`}
              >
                <Filter className="mr-2 h-5 w-5" />
                Filters
                <ChevronDown className="ml-2 h-4 w-4" />
              </button>

              {/* Desktop Filter Dropdown */}
              <AnimatePresence>
                {isDesktopFilterOpen && (
                  <motion.div
                    ref={filterDropdownRef}
                    className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg p-4 z-20"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Meal Types Filter */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">
                        Meal Types
                      </label>
                      <div className="space-y-2">
                        {availableMealTypes.map((mealType) => (
                          <div key={mealType} className="flex items-center">
                            <input
                              type="checkbox"
                              id={mealType}
                              checked={filters.mealTypes.includes(mealType)}
                              onChange={() =>
                                setFilters((prev) => ({
                                  ...prev,
                                  mealTypes: prev.mealTypes.includes(mealType)
                                    ? prev.mealTypes.filter(
                                        (type) => type !== mealType
                                      )
                                    : [...prev.mealTypes, mealType],
                                }))
                              }
                              className="mr-2"
                            />
                            <label htmlFor={mealType}>{mealType}</label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Dietary Needs Filter */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Dietary Needs
                      </label>
                      <div className="space-y-2">
                        {availableDietaryNeeds.map((need) => (
                          <div key={need} className="flex items-center">
                            <input
                              type="checkbox"
                              id={need}
                              checked={filters.dietaryNeeds.includes(need)}
                              onChange={() =>
                                setFilters((prev) => ({
                                  ...prev,
                                  dietaryNeeds: prev.dietaryNeeds.includes(need)
                                    ? prev.dietaryNeeds.filter(
                                        (n) => n !== need
                                      )
                                    : [...prev.dietaryNeeds, need],
                                }))
                              }
                              className="mr-2"
                            />
                            <label htmlFor={need}>{need}</label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Reset Filters Button */}
                    <button
                      onClick={resetFilters}
                      className="mt-4 w-full bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md transition flex items-center justify-center"
                    >
                      <X className="mr-2 h-5 w-5" /> Reset Filters
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile Filter Overlay */}
        <AnimatePresence>
          {isMobileFilterOpen && (
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
            >
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 15, stiffness: 200 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Filters</h3>
                  <button onClick={() => setIsMobileFilterOpen(false)}>
                    <X className="h-6 w-6 text-gray-600" />
                  </button>
                </div>

                {/* Mobile Meal Types Filter */}
                <div className="mb-4">
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleFilterSection("mealTypes")}
                  >
                    <label className="text-sm font-medium">Meal Types</label>
                    {activeFilterSection === "mealTypes" ? (
                      <ChevronUp />
                    ) : (
                      <ChevronDown />
                    )}
                  </div>
                  {activeFilterSection === "mealTypes" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.2 }}
                      className="space-y-2 mt-2"
                    >
                      {availableMealTypes.map((mealType) => (
                        <div key={mealType} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`mobile-${mealType}`}
                            checked={filters.mealTypes.includes(mealType)}
                            onChange={() =>
                              setFilters((prev) => ({
                                ...prev,
                                mealTypes: prev.mealTypes.includes(mealType)
                                  ? prev.mealTypes.filter(
                                      (type) => type !== mealType
                                    )
                                  : [...prev.mealTypes, mealType],
                              }))
                            }
                            className="mr-2"
                          />
                          <label htmlFor={`mobile-${mealType}`}>
                            {mealType}
                          </label>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </div>

                {/* Mobile Dietary Needs Filter */}
                <div>
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleFilterSection("dietaryNeeds")}
                  >
                    <label className="text-sm font-medium">Dietary Needs</label>
                    {activeFilterSection === "dietaryNeeds" ? (
                      <ChevronUp />
                    ) : (
                      <ChevronDown />
                    )}
                  </div>
                  {activeFilterSection === "dietaryNeeds" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.2 }}
                      className="space-y-2 mt-2"
                    >
                      {availableDietaryNeeds.map((need) => (
                        <div key={need} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`mobile-${need}`}
                            checked={filters.dietaryNeeds.includes(need)}
                            onChange={() =>
                              setFilters((prev) => ({
                                ...prev,
                                dietaryNeeds: prev.dietaryNeeds.includes(need)
                                  ? prev.dietaryNeeds.filter((n) => n !== need)
                                  : [...prev.dietaryNeeds, need],
                              }))
                            }
                            className="mr-2"
                          />
                          <label htmlFor={`mobile-${need}`}>{need}</label>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </div>

                {/* Reset and Apply Filters */}
                <div className="flex space-x-4 mt-6">
                  <button
                    onClick={resetFilters}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md transition flex items-center justify-center"
                  >
                    <X className="mr-2 h-5 w-5" /> Reset
                  </button>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="flex-1 bg-teal-500 text-white hover:bg-teal-600 px-3 py-2 rounded-md transition"
                  >
                    Apply
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Recipes Display */}
        {filteredRecipes.length === 0 ? (
          // No recipes found state
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <Search className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <p className="text-gray-600 text-lg mb-4">No recipes found</p>
            <p className="text-gray-500">
              Try adjusting your search or filters to find what you're looking
              for.
            </p>
            <button
              onClick={resetFilters}
              className="mt-4 bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          // Recipes grid and pagination
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {currentRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} {...recipe} />
              ))}
            </div>

            {/* Show pagination only if there are more recipes than items per page */}
            {filteredRecipes.length > itemsPerPage && (
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                nextPage={() =>
                  setCurrentPage((prev) =>
                    prev < Math.ceil(filteredRecipes.length / itemsPerPage)
                      ? prev + 1
                      : prev
                  )
                }
                previousPage={() =>
                  setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
                }
                totalPages={Math.ceil(filteredRecipes.length / itemsPerPage)}
                totalItems={filteredRecipes.length}
                itemsPerPage={itemsPerPage}
              />
            )}
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Recipes;

"use client";
import { useState, useEffect } from "react";

import { X } from "lucide-react";
import { motion } from "framer-motion";

import Hero from "../components/shared/Hero";
import FilterSidebar from "../components/foodDatabase/FilterSidebar";
import SearchBar from "../components/foodDatabase/SearchBar";
import ViewOptions from "../components/foodDatabase/ViewOptions";
import FoodList from "../components/foodDatabase/FoodList";
import Pagination from "../components/shared/Pagination";
import FodmapInfo from "../components/foodDatabase/FodmapInfo";

const FODMAPDatabasePage = () => {
  const [filters, setFilters] = useState({
    fodmapLevel: [],
    categories: [],
    dietaryRestrictions: [],
  });
  const [viewMode, setViewMode] = useState("list"); // list or grid (default: list)
  const [sortBy, setSortBy] = useState("alphabetical");
  const [currentPage, setCurrentPage] = useState(1);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [fodmapFilter, setFodmapFilter] = useState("All");
  const [foods, setFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFood, setSelectedFood] = useState(null);
  const [categories, setCategories] = useState(["All"]);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/fodmap.json");
        if (!response.ok) throw new Error("Failed to load data");

        const data = await response.json();

        // Access the foods array from the data object
        const foodsData = data.foods || [];

        // Pre-process dietary properties for consistent filtering
        const processedFoodsData = foodsData.map((food) => ({
          ...food,
          // Normalize dietary_properties to an array if it exists
          processed_dietary_properties:
            processAndNormalizeDietaryProperties(food),
        }));

        setFoods(processedFoodsData);

        // Extract unique categories
        const uniqueCategories = [
          "All",
          ...new Set(foodsData.map((item) => item.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching FODMAP data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to process and normalize dietary properties
  const processAndNormalizeDietaryProperties = (food) => {
    if (
      food.dietary_restrictions &&
      typeof food.dietary_restrictions === "object"
    ) {
      // Convert object keys with true values to array of strings
      return Object.entries(food.dietary_restrictions)
        .filter(([_, value]) => value === true)
        .map(([key]) => key.replace("_", "-").toLowerCase());
    }

    // Keep the existing logic for backward compatibility
    if (!food.dietary_properties) return [];

    if (Array.isArray(food.dietary_properties)) {
      return food.dietary_properties.map((prop) => prop.toLowerCase());
    }

    if (typeof food.dietary_properties === "string") {
      return food.dietary_properties
        .split(",")
        .map((prop) => prop.trim().toLowerCase());
    }

    return [];
  };
  const filteredFoods = foods.filter((food) => {
    // Case-insensitive search
    const matchesSearch = food.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      filters.categories.length === 0 ||
      filters.categories.some((category) => {
        // Handle case where food.category might be capitalized differently
        return (
          food.category &&
          food.category.toLowerCase() === category.toLowerCase()
        );
      });

    // More flexible FODMAP level matching
    const matchesFodmap =
      filters.fodmapLevel.length === 0 ||
      filters.fodmapLevel.some((level) => {
        // Handle case where food.fodmap_level might have different capitalization or format
        if (!food.fodmap_level) return false;

        const foodLevel = food.fodmap_level.toLowerCase();
        const filterLevel = level.toLowerCase();

        return foodLevel === filterLevel;
      });

    // Improved dietary restrictions matching using normalized data
    const matchesDietaryRestrictions =
      filters.dietaryRestrictions.length === 0 ||
      filters.dietaryRestrictions.some((restriction) => {
        // Use the pre-processed dietary properties array
        const normalizedRestriction = restriction.toLowerCase();

        // If we're checking for lactose-free, also match dairy-free foods
        if (normalizedRestriction === "lactose-free") {
          return food.processed_dietary_properties.some(
            (prop) => prop === "lactose-free" || prop === "dairy-free"
          );
        }

        return food.processed_dietary_properties.some(
          (prop) =>
            prop === normalizedRestriction ||
            // Handle common variations
            (normalizedRestriction === "gluten-free" &&
              prop.includes("gluten free")) ||
            (normalizedRestriction === "dairy-free" &&
              (prop.includes("dairy free") || prop.includes("non-dairy"))) ||
            (normalizedRestriction === "vegan" &&
              prop.includes("plant-based")) ||
            (normalizedRestriction === "vegetarian" &&
              prop.includes("plant-based"))
        );
      });

    return (
      matchesSearch &&
      matchesCategory &&
      matchesFodmap &&
      matchesDietaryRestrictions
    );
  });

  const handleSearch = (query) => {
    setSearchTerm(query);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleFilterChange = (newFilters) => {
    // Debug logging to check what filters are being applied
    console.log("New filters applied:", newFilters);
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  // Sort the filtered foods
  const sortedFoods = [...filteredFoods].sort((a, b) => {
    if (sortBy === "alphabetical") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "fodmap-low-high") {
      // Sort by FODMAP level (Low, Medium, High)
      const levels = { Low: 1, Medium: 2, Moderate: 2, High: 3 };
      return levels[a.fodmap_level] - levels[b.fodmap_level];
    } else if (sortBy === "fodmap-high-low") {
      // Sort by FODMAP level (High, Medium, Low)
      const levels = { Low: 1, Medium: 2, Moderate: 2, High: 3 };
      return levels[b.fodmap_level] - levels[a.fodmap_level];
    }
    return 0;
  });

  // Paginate the sorted foods
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedFoods.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedFoods.length / itemsPerPage);

  // Function to get FODMAP level color
  const getFodmapColor = (level) => {
    switch (level) {
      case "Low":
        return "bg-green-100 text-green-800";
      case "Medium":
      case "Moderate":
        return "bg-yellow-100 text-yellow-800";
      case "High":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Debug logging to check filtering results
  useEffect(() => {
    if (filters.dietaryRestrictions.length > 0) {
      console.log("Active dietary filters:", filters.dietaryRestrictions);
      console.log("Number of filtered foods:", filteredFoods.length);
      console.log(
        "Sample filtered foods:",
        filteredFoods.slice(0, 3).map((f) => f.name)
      );
    }
  }, [filters.dietaryRestrictions, filteredFoods]);

  const handleResetFilters = () => {
    setFilters({
      fodmapLevel: [],
      categories: [],
      dietaryRestrictions: [],
    });
    setCurrentPage(1);
  };
  return (
    <div className="min-h-screen">
      <Hero
        title={"FODMAP Food Database"}
        description={
          "Search and filter foods to find out their FODMAP content and safe serving sizes."
        }
      />
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:grid md:grid-cols-12 md:gap-8">
          {/* Filter Sidebar */}
          <div className="md:col-span-3">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              categories={categories}
            />
          </div>

          {/* Main Content */}
          <div className="md:col-span-9 mt-8 md:mt-0">
            {/* Search Bar */}
            <SearchBar onSearch={handleSearch} />

            {searchTerm && (
              <div className="mb-4 px-2 py-1 bg-teal-50 text-teal-700 rounded inline-flex items-center">
                <span>Search: {searchTerm}</span>
                <button
                  onClick={() => handleSearch("")}
                  className="ml-2 text-teal-500 hover:text-teal-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* Active Filters Display */}
            {filters.dietaryRestrictions.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {filters.dietaryRestrictions.map((restriction) => (
                  <div
                    key={restriction}
                    className="px-2 py-1 bg-teal-50 text-teal-700 rounded inline-flex items-center text-sm"
                  >
                    <span>{restriction.replace("-", " ")}</span>
                    <button
                      onClick={() =>
                        handleFilterChange({
                          ...filters,
                          dietaryRestrictions:
                            filters.dietaryRestrictions.filter(
                              (r) => r !== restriction
                            ),
                        })
                      }
                      className="ml-2 text-teal-500 hover:text-teal-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* View Options and Sort */}
            <ViewOptions
              currentView={viewMode}
              onViewChange={handleViewModeChange}
              currentSort={sortBy}
              onSortChange={handleSortChange}
            />

            {/* Food Items */}
            {isLoading ? (
              <div className="text-center py-12">Loading...</div>
            ) : filteredFoods.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p>No foods match your current filters.</p>
                <button
                  onClick={handleResetFilters}
                  className="mt-4 text-teal-600 hover:text-teal-800 underline"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <FoodList
                items={currentItems}
                viewMode={viewMode}
                getFodmapColor={getFodmapColor}
                onSelectFood={setSelectedFood}
              />
            )}
            <div className="mt-8">
              {/* Pagination */}
              {!isLoading && filteredFoods.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={sortedFoods.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          </div>
        </div>
        {/* FODMAP Info */}
        <FodmapInfo />
      </div>
    </div>
  );
};

export default FODMAPDatabasePage;

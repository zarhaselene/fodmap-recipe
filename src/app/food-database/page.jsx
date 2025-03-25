"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Hero from "../components/shared/Hero";
import FilterSidebar from "../components/foodDatabase/FilterSidebar";
import SearchBar from "../components/foodDatabase/SearchBar";
import ViewOptions from "../components/foodDatabase/ViewOptions";
import FoodList from "../components/foodDatabase/FoodList";
import Pagination from "../components/shared/Pagination";

const FODMAPDatabasePage = () => {
  const [filters, setFilters] = useState({
    fodmapLevel: [],
    categories: [],
    dietaryRestrictions: [],
  });
  const [viewMode, setViewMode] = useState("list");
  const [sortBy, setSortBy] = useState("alphabetical");
  const [currentPage, setCurrentPage] = useState(1);

  const [searchTerm, setSearchTerm] = useState("");
  const [foods, setFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState(["All"]);
  const itemsPerPage = 10;

  // Consolidated dietary properties processing
  const processAndNormalizeDietaryProperties = (food) => {
    if (food.dietary_restrictions) {
      return Object.entries(food.dietary_restrictions)
        .filter(([_, value]) => value === true)
        .map(([key]) => key.replace("_", "-").toLowerCase());
    }
    return [];
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/fodmap.json");
        if (!response.ok) throw new Error("Failed to load data");

        const data = await response.json();
        const foodsData = data.foods || [];

        const processedFoodsData = foodsData.map((food) => ({
          ...food,
          processed_dietary_properties:
            processAndNormalizeDietaryProperties(food),
        }));

        setFoods(processedFoodsData);

        const uniqueCategories = [
          "All",
          ...new Set(foodsData.map((item) => item.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching food data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Consolidated filtering logic
  const filteredFoods = foods.filter((food) => {
    const matchesSearch = food.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      filters.categories.length === 0 ||
      filters.categories.some(
        (category) => food.category?.toLowerCase() === category.toLowerCase()
      );

    const matchesFodmap =
      filters.fodmapLevel.length === 0 ||
      filters.fodmapLevel.some(
        (level) => food.fodmap_level?.toLowerCase() === level.toLowerCase()
      );

    const matchesDietaryRestrictions =
      filters.dietaryRestrictions.length === 0 ||
      filters.dietaryRestrictions.some((restriction) => {
        const normalizedRestriction = restriction.toLowerCase();
        const properties = food.processed_dietary_properties;

        return properties.some((prop) => {
          const specialCases = {
            "lactose-free": ["lactose-free", "dairy-free"],
            "gluten-free": prop.includes("gluten free"),
            "dairy-free":
              prop.includes("dairy free") || prop.includes("non-dairy"),
            vegan: prop.includes("plant-based"),
            vegetarian: prop.includes("plant-based"),
          };

          return (
            prop === normalizedRestriction ||
            specialCases[normalizedRestriction]
          );
        });
      });

    return (
      matchesSearch &&
      matchesCategory &&
      matchesFodmap &&
      matchesDietaryRestrictions
    );
  });

  // Sorting logic
  const sortedFoods = [...filteredFoods].sort((a, b) => {
    const levelOrder = { Low: 1, Medium: 2, Moderate: 2, High: 3 };

    if (sortBy === "alphabetical") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "fodmap-low-high") {
      return (
        (levelOrder[a.fodmap_level] || 0) - (levelOrder[b.fodmap_level] || 0)
      );
    } else if (sortBy === "fodmap-high-low") {
      return (
        (levelOrder[b.fodmap_level] || 0) - (levelOrder[a.fodmap_level] || 0)
      );
    }
    return 0;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedFoods.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedFoods.length / itemsPerPage);

  // Helper function for FODMAP level color
  const getFodmapColor = (level) => {
    const colorMap = {
      Low: "bg-green-100 text-green-800",
      Medium: "bg-yellow-100 text-yellow-800",
      Moderate: "bg-yellow-100 text-yellow-800",
      High: "bg-red-100 text-red-800",
    };
    return colorMap[level] || "bg-gray-100 text-gray-800";
  };

  // Event Handlers
  const handleSearch = (query) => {
    setSearchTerm(query);
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

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
        title="FODMAP Food Database"
        description="Search and filter foods to find out their FODMAP content and safe serving sizes."
      />
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
            <SearchBar onSearch={handleSearch} />

            {/* Search Term Display */}
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

            {/* View Options */}
            <ViewOptions
              currentView={viewMode}
              onViewChange={setViewMode}
              currentSort={sortBy}
              onSortChange={setSortBy}
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
              />
            )}

            {/* Pagination */}
            {!isLoading && filteredFoods.length > 0 && (
              <div className="mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={sortedFoods.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FODMAPDatabasePage;

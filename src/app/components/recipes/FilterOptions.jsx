import React, { useState, useRef, useEffect } from "react";
import { Filter, ChevronDown, X, RefreshCw } from "lucide-react";

const FilterOptions = ({
  activeDietaryNeeds,
  setActiveDietaryNeeds,
  activeMealTypes,
  setActiveMealTypes,
}) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  const dietaryNeedsOptions = [
    "Gluten-Free",
    "Vegetarian",
    "Vegan",
    "Dairy-Free",
    "Nut-Free",
    "Soy-Free",
    "Sugar-Free",
  ];
  const mealTypes = ["Breakfast", "Lunch", "Dinner", "Desserts", "Snacks"];

  const toggleDropdown = (type) => {
    setOpenDropdown(openDropdown === type ? null : type);
  };

  const toggleDietaryFilter = (filter) => {
    setActiveDietaryNeeds((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const toggleMealTypeFilter = (filter) => {
    setActiveMealTypes((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  // Reset all filters
  const resetAllFilters = () => {
    setActiveDietaryNeeds([]);
    setActiveMealTypes([]);
  };

  // Helper function to get toggle function based on filter type
  const getToggleFunction = (type, option) => {
    if (type === "dietary") return () => toggleDietaryFilter(option);
    if (type === "meal") return () => toggleMealTypeFilter(option);
  };

  // Helper function to check if option is active
  const isFilterActive = (type, option) => {
    if (type === "dietary") return activeDietaryNeeds.includes(option);
    if (type === "meal") return activeMealTypes.includes(option);
    return false;
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get all active filters
  const allActiveFilters = [...activeDietaryNeeds, ...activeMealTypes];

  // Helper function to remove filter based on its type
  const removeFilter = (filter) => {
    if (dietaryNeedsOptions.includes(filter)) {
      toggleDietaryFilter(filter);
    } else if (mealTypes.includes(filter)) {
      toggleMealTypeFilter(filter);
    }
  };

  return (
    <div className="mt-6 mb-8" ref={dropdownRef}>
      {/* Filter buttons in the top row with reset button */}
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex flex-wrap items-baseline">
          <Filter size={18} className="text-gray-500 mr-2" />
          <span className="text-gray-700 mr-6">Filters</span>

          {/* Dropdown Buttons */}
          {[
            { label: "Meal Type", type: "meal", options: mealTypes },
            {
              label: "Dietary Needs",
              type: "dietary",
              options: dietaryNeedsOptions,
            },
          ].map(({ label, type, options }) => (
            <div className="relative mr-4 mb-2" key={type}>
              <button
                className="flex items-center bg-white rounded px-4 py-2 text-sm"
                onClick={() => toggleDropdown(type)}
              >
                {label}
                <ChevronDown size={16} className="ml-2" />
              </button>
              {openDropdown === type && (
                <div className="absolute mt-2 left-0 w-48 bg-white shadow-lg rounded z-10">
                  {options.map((option) => (
                    <label key={option} className="block px-4 py-2 text-sm">
                      <input
                        type="checkbox"
                        checked={isFilterActive(type, option)}
                        onChange={getToggleFunction(type, option)}
                        className="mr-2"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Reset filters button - only show when filters are active */}
        {allActiveFilters.length > 0 && (
          <button
            onClick={resetAllFilters}
            className="bg-teal-500 text-white rounded px-4 py-2 flex items-center text-sm mb-2 hover:bg-teal-600 transition-colors"
          >
            <RefreshCw size={16} className="mr-1" />
            Reset filters
          </button>
        )}
      </div>

      {/* Display active filters in a separate row below */}
      {allActiveFilters.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {allActiveFilters.map((filter) => (
            <div
              key={filter}
              className="bg-teal-500 text-white rounded px-4 py-2 flex items-center text-sm"
            >
              {filter}
              <button
                onClick={() => removeFilter(filter)}
                className="ml-2 text-white"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterOptions;

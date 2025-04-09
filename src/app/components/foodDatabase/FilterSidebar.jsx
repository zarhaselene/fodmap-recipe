import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function FilterSidebar({
  filters,
  onFilterChange,
  categories = [],
}) {
  const [localFilters, setLocalFilters] = useState({
    fodmapLevel: filters.fodmapLevel || [],
    categories: filters.categories || [],
    dietaryRestrictions: filters.dietaryRestrictions || [],
  });
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [availableCategories, setAvailableCategories] = useState([]);

  useEffect(() => {
    if (categories.length > 0) {
      const processed = categories
        .filter((cat) => cat !== "All")
        .map((cat) => ({ value: cat.toLowerCase(), label: cat }));
      setAvailableCategories(processed);
    }
  }, [categories]);

  const handleCheckboxChange = (filterType, value) => {
    const updated = localFilters[filterType].includes(value)
      ? localFilters[filterType].filter((item) => item !== value)
      : [...localFilters[filterType], value];

    const newFilters = { ...localFilters, [filterType]: updated };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleResetFilters = () => {
    const reset = { fodmapLevel: [], categories: [], dietaryRestrictions: [] };
    setLocalFilters(reset);
    onFilterChange(reset);
  };

  const renderCheckboxGroup = (title, filterType, options) => (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-700 mb-3">{title}</h3>
      <div className="space-y-2">
        {options.map(({ value, label }) => (
          <div key={value} className="flex items-center">
            <input
              id={value}
              type="checkbox"
              checked={localFilters[filterType].includes(value)}
              onChange={() => handleCheckboxChange(filterType, value)}
              className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded cursor-pointer"
            />
            <label
              htmlFor={value}
              className="ml-2 text-sm text-gray-700 cursor-pointer"
            >
              {label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-gray-800">Filters</h2>
        <button
          className="text-sm text-teal-600 hover:text-teal-700 cursor-pointer"
          onClick={handleResetFilters}
        >
          Reset All
        </button>
      </div>

      {renderCheckboxGroup("FODMAP Level", "fodmapLevel", [
        { value: "Low", label: "Low FODMAP" },
        { value: "Moderate", label: "Moderate FODMAP" },
        { value: "High", label: "High FODMAP" },
      ])}

      {/* Categories Section */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Food Categories
        </h3>
        <div className="space-y-2">
          {(showAllCategories
            ? availableCategories
            : availableCategories.slice(0, 6)
          ).map(({ value, label }) => (
            <div key={value} className="flex items-center">
              <input
                id={value}
                type="checkbox"
                checked={localFilters.categories.includes(value)}
                onChange={() => handleCheckboxChange("categories", value)}
                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
              />
              <label htmlFor={value} className="ml-2 text-sm text-gray-700">
                {label}
              </label>
            </div>
          ))}
        </div>
        {availableCategories.length > 6 && (
          <button
            className="mt-2 text-sm text-teal-600 hover:text-teal-700 flex items-center"
            onClick={() => setShowAllCategories(!showAllCategories)}
          >
            {showAllCategories ? "Show less" : "Show more"}
            <ChevronDown
              className={`ml-1 h-4 w-4 transform transition-transform ${
                showAllCategories ? "rotate-180" : ""
              }`}
            />
          </button>
        )}
      </div>

      {renderCheckboxGroup("Dietary Restrictions", "dietaryRestrictions", [
        { value: "gluten-free", label: "Gluten Free" },
        { value: "lactose-free", label: "Lactose Free" },
        { value: "dairy-free", label: "Dairy Free" },
        { value: "vegan", label: "Vegan" },
        { value: "vegetarian", label: "Vegetarian" },
      ])}
    </div>
  );
}

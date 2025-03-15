import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function FilterSidebar({
  filters,
  onFilterChange,
  categories = [],
}) {
  const [fodmapLevel, setFodmapLevel] = useState(filters.fodmapLevel || []);
  const [selectedCategories, setSelectedCategories] = useState(
    filters.categories || []
  );
  const [dietaryRestrictions, setDietaryRestrictions] = useState(
    filters.dietaryRestrictions || []
  );
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [availableCategories, setAvailableCategories] = useState([]);

  useEffect(() => {
    if (categories && categories.length > 0) {
      // Filter out "All" and transform the rest to lowercase
      const processedCategories = categories
        .filter((cat) => cat !== "All")
        .map((cat) => ({
          value: cat.toLowerCase(),
          label: cat,
        }));

      setAvailableCategories(processedCategories);
    }
  }, [categories]);

  // Categories shown when "Show more" is clicked
  const additionalCategories = [
    "Beverages",
    "Condiments",
    "Snacks",
    "Prepared Foods",
  ];

  const handleCheckboxChange = (type, value) => {
    let updatedValues;

    switch (type) {
      case "fodmapLevel":
        updatedValues = fodmapLevel.includes(value)
          ? fodmapLevel.filter((item) => item !== value)
          : [...fodmapLevel, value];
        setFodmapLevel(updatedValues);

        // Immediate filtering
        onFilterChange({
          fodmapLevel: updatedValues,
          categories: selectedCategories,
          dietaryRestrictions: dietaryRestrictions,
        });
        break;

      case "categories":
        updatedValues = selectedCategories.includes(value)
          ? selectedCategories.filter((item) => item !== value)
          : [...selectedCategories, value];
        setSelectedCategories(updatedValues);

        // Immediate filtering
        onFilterChange({
          fodmapLevel: fodmapLevel,
          categories: updatedValues,
          dietaryRestrictions: dietaryRestrictions,
        });
        break;

      case "dietaryRestrictions":
        updatedValues = dietaryRestrictions.includes(value)
          ? dietaryRestrictions.filter((item) => item !== value)
          : [...dietaryRestrictions, value];
        setDietaryRestrictions(updatedValues);

        // Immediate filtering
        onFilterChange({
          fodmapLevel: fodmapLevel,
          categories: selectedCategories,
          dietaryRestrictions: updatedValues,
        });
        break;

      default:
        return;
    }
  };

  const handleResetFilters = () => {
    setFodmapLevel([]);
    setSelectedCategories([]);
    setDietaryRestrictions([]);
    onFilterChange({
      fodmapLevel: [],
      categories: [],
      dietaryRestrictions: [],
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-gray-800">Filters</h2>
        <button
          className="text-sm text-teal-600 hover:text-teal-700"
          onClick={handleResetFilters}
        >
          Reset All
        </button>
      </div>

      {/* FODMAP Level Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">FODMAP Level</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              id="low"
              name="fodmap-level"
              type="checkbox"
              checked={fodmapLevel.includes("Low")}
              onChange={() => handleCheckboxChange("fodmapLevel", "Low")}
              className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
            />
            <label htmlFor="low" className="ml-2 text-sm text-gray-700">
              Low FODMAP
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="moderate"
              name="fodmap-level"
              type="checkbox"
              checked={fodmapLevel.includes("Moderate")}
              onChange={() => handleCheckboxChange("fodmapLevel", "Moderate")}
              className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
            />
            <label htmlFor="moderate" className="ml-2 text-sm text-gray-700">
              Moderate FODMAP
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="high"
              name="fodmap-level"
              type="checkbox"
              checked={fodmapLevel.includes("High")}
              onChange={() => handleCheckboxChange("fodmapLevel", "High")}
              className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
            />
            <label htmlFor="high" className="ml-2 text-sm text-gray-700">
              High FODMAP
            </label>
          </div>
        </div>
      </div>

      {/* Food Categories */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Food Categories
        </h3>
        <div className="space-y-2">
          {/* Initial categories using data from parent */}
          {availableCategories.slice(0, 6).map((category) => (
            <div key={category.value} className="flex items-center">
              <input
                id={category.value}
                name="category"
                type="checkbox"
                checked={selectedCategories.includes(category.value)}
                onChange={() =>
                  handleCheckboxChange("categories", category.value)
                }
                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
              />
              <label
                htmlFor={category.value}
                className="ml-2 text-sm text-gray-700"
              >
                {category.label}
              </label>
            </div>
          ))}

          {/* Additional categories that appear when "Show more" is clicked */}
          {showAllCategories &&
            availableCategories.slice(6).map((category) => (
              <div key={category.value} className="flex items-center">
                <input
                  id={category.value}
                  name="category"
                  type="checkbox"
                  checked={selectedCategories.includes(category.value)}
                  onChange={() =>
                    handleCheckboxChange("categories", category.value)
                  }
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <label
                  htmlFor={category.value}
                  className="ml-2 text-sm text-gray-700"
                >
                  {category.label}
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
            <ChevronDown className="ml-1 h-4 w-4" />
          </button>
        )}
      </div>

      {/* Dietary Restrictions */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Dietary Restrictions
        </h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              id="gluten-free"
              name="restrictions"
              type="checkbox"
              checked={dietaryRestrictions.includes("gluten-free")}
              onChange={() =>
                handleCheckboxChange("dietaryRestrictions", "gluten-free")
              }
              className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
            />
            <label htmlFor="gluten-free" className="ml-2 text-sm text-gray-700">
              Gluten Free
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="lactose-free"
              name="restrictions"
              type="checkbox"
              checked={dietaryRestrictions.includes("lactose-free")}
              onChange={() =>
                handleCheckboxChange("dietaryRestrictions", "lactose-free")
              }
              className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
            />
            <label
              htmlFor="lactose-free"
              className="ml-2 text-sm text-gray-700"
            >
              Lactose Free
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="dairy-free"
              name="restrictions"
              type="checkbox"
              checked={dietaryRestrictions.includes("dairy-free")}
              onChange={() =>
                handleCheckboxChange("dietaryRestrictions", "dairy-free")
              }
              className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
            />
            <label htmlFor="dairy-free" className="ml-2 text-sm text-gray-700">
              Dairy Free
            </label>
          </div>

          <div className="flex items-center">
            <input
              id="vegan"
              name="restrictions"
              type="checkbox"
              checked={dietaryRestrictions.includes("vegan")}
              onChange={() =>
                handleCheckboxChange("dietaryRestrictions", "vegan")
              }
              className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
            />
            <label htmlFor="vegan" className="ml-2 text-sm text-gray-700">
              Vegan
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="vegetarian"
              name="restrictions"
              type="checkbox"
              checked={dietaryRestrictions.includes("vegetarian")}
              onChange={() =>
                handleCheckboxChange("dietaryRestrictions", "vegetarian")
              }
              className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
            />
            <label htmlFor="vegetarian" className="ml-2 text-sm text-gray-700">
              Vegetarian
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

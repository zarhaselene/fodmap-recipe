// components/FoodDatabase/FoodList.jsx
import React from "react";
import FoodItem from "./FoodItem";

export default function FoodList({
  items,
  viewMode,
  getFodmapColor,
  onSelectFood,
}) {
  // Render food items based on the selected view mode
  const renderFoodItems = () => {
    if (!items || items.length === 0) {
      return (
        <div className="p-6 text-center text-gray-500">
          No foods found matching your criteria.
        </div>
      );
    }

    if (viewMode === "grid") {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <FoodItem
              key={item.name}
              item={item}
              viewMode="grid"
              getFodmapColor={getFodmapColor}
              onClick={() => onSelectFood && onSelectFood(item)}
            />
          ))}
        </div>
      );
    } else {
      // Default to list view
      return (
        <div>
          {items.map((item) => (
            <FoodItem
              key={item.name}
              item={item}
              viewMode="list"
              getFodmapColor={getFodmapColor}
              onClick={() => onSelectFood && onSelectFood(item)}
            />
          ))}
        </div>
      );
    }
  };

  return <>{renderFoodItems()}</>;
}

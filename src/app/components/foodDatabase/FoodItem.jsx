// components/FoodDatabase/FoodItem.jsx
import { Info } from "lucide-react";

export default function FoodItem({ item, viewMode, getFodmapColor, onClick }) {
  // Use the provided getFodmapColor function or fallback to the local one
  const getBadgeClass =
    getFodmapColor ||
    ((level) => {
      switch (level.toLowerCase()) {
        case "low":
          return "bg-green-100 text-green-800 border border-green-200";
        case "moderate":
        case "medium":
          return "bg-yellow-100 text-yellow-800 border border-yellow-200";
        case "high":
          return "bg-red-100 text-red-800 border border-red-200";
        default:
          return "bg-gray-100 text-gray-800 border border-gray-200";
      }
    });

  // Determine text color for serving size based on FODMAP level
  const getServingSizeClass = (level) => {
    switch (level.toLowerCase()) {
      case "low":
        return "text-green-600 font-semibold";
      case "moderate":
      case "medium":
        return "text-yellow-600 font-semibold";
      case "high":
        return "text-red-600 font-semibold";
      default:
        return "text-gray-600 font-semibold";
    }
  };

  if (viewMode === "grid") {
    // Grid view layout
    return (
      <div
        className="border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
        onClick={onClick}
      >
        <div className="p-5 flex flex-col items-center">
          <h3 className="text-lg font-semibold text-gray-900 text-center">
            {item.name}
          </h3>
          <div className="mt-3 flex items-center justify-center">
            <span
              className={`inline-flex items-center px-3 py-1 rounded text-xs font-medium ${getBadgeClass(
                item.fodmap_level
              )}`}
            >
              {item.fodmap_level} FODMAP
            </span>
          </div>
          <span className="mt-2 text-sm text-gray-500 font-medium uppercase tracking-wide">
            {item.category}
          </span>
          <div className="mt-4 text-center bg-gray-50 w-full py-2 px-3 rounded-md">
            <span className="text-sm font-medium text-gray-700">
              Safe serving:
            </span>
            <span
              className={`block mt-1 ${getServingSizeClass(
                item.fodmap_level
              )} text-base`}
            >
              {item.safe_serving_size}
            </span>
          </div>
          <p className="mt-3 text-sm text-gray-600 text-center italic">
            {item.serving_size}
          </p>
          <button className="mt-4 flex-shrink-0 p-2 rounded-full bg-gray-100 text-gray-500 hover:text-teal-600 hover:bg-teal-50 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500">
            <Info className="h-5 w-5" />
          </button>
        </div>
      </div>
    );
  }

  // Default to list view
  return (
    <div
      className="border-b border-gray-200 p-6 cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={onClick}
    >
      <div className="md:flex md:items-center md:justify-between">
        <div className="md:flex md:items-center">
          <div className="mt-4 md:mt-0">
            <div className=" flex items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                {item.name}
              </h3>
              <span className="ml-2 text-sm text-gray-500 font-medium">
                ({item.category})
              </span>
            </div>
            <div className="mt-1">
              <span
                className={`inline-flex items-center px-3 py-1 rounded text-xs font-medium ${getBadgeClass(
                  item.fodmap_level
                )}`}
              >
                {item.fodmap_level} FODMAP
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex flex-col items-end">
          <div className="text-right bg-gray-50 px-4 py-2 rounded-md">
            <span className="text-sm font-medium text-gray-700">
              Safe serving:
            </span>
            <span
              className={`ml-2 ${getServingSizeClass(
                item.fodmap_level
              )} text-base`}
            >
              {item.safe_serving_size}
            </span>
          </div>
          <p className="mt-2 text-sm text-gray-600 max-w-md italic">
            {item.serving_size}
          </p>
          <button className="mt-3 flex-shrink-0 p-2 rounded-full bg-gray-100 text-gray-500 hover:text-teal-600 hover:bg-teal-50 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500">
            <Info className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

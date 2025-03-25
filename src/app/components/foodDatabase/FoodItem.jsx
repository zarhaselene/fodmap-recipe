import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

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

  // State to toggle additional information
  const [showDetails, setShowDetails] = useState(false);

  if (viewMode === "grid") {
    // Grid view layout
    return (
      <div
        className="border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 relative group"
        onClick={() => setShowDetails(!showDetails)}
      >
        <div className="p-5 flex flex-col items-center py-12">
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

          {/* Expandable indicator */}
          <div
            className="absolute bottom-2 left-1/2 transform -translate-x-1/2 
            bg-gray-100 bg-opacity-70 rounded p-2 
            group-hover:bg-opacity-100 transition-all duration-300 
            flex items-center justify-center"
          >
            <span className="text-xs text-gray-600 mr-1 group-hover:text-gray-800 transition-colors">
              {showDetails ? "Collapse" : "More Info"}
            </span>
            {showDetails ? (
              <ChevronUp className="h-4 w-4 text-gray-600 group-hover:text-gray-800" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-600 group-hover:text-gray-800" />
            )}
          </div>

          {showDetails && (
            <div className="mt-4 w-full bg-gray-100 rounded-md p-4">
              <div className="mb-2">
                <h4 className="text-sm font-semibold text-gray-800">
                  FODMAP Types:
                </h4>
                <p className="text-sm text-gray-600">
                  {item.fodmap_types?.join(", ") || "Not specified"}
                </p>
              </div>

              {item.low_fodmap_alternatives && (
                <div className="mb-2">
                  <h4 className="text-sm font-semibold text-gray-800">
                    Low FODMAP Alternatives:
                  </h4>
                  <p className="text-sm text-gray-600">
                    {item.low_fodmap_alternatives.join(", ")}
                  </p>
                </div>
              )}

              {item.dietary_restrictions && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-800">
                    Dietary Info:
                  </h4>
                  <div className="text-sm text-gray-600">
                    {Object.entries(item.dietary_restrictions)
                      .filter(([_, value]) => value)
                      .map(([key]) => (
                        <span
                          key={key}
                          className="inline-block bg-teal-100 text-teal-800 px-2 py-1 rounded-full mr-2 mt-1 text-xs"
                        >
                          {key
                            .replace(/_/g, " ")
                            .replace(/\b\w/g, (l) => l.toUpperCase())}
                        </span>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Default to list view
  return (
    <div
      className="border-b border-gray-200 p-6 cursor-pointer hover:bg-gray-50 transition-colors relative group"
      onClick={() => setShowDetails(!showDetails)}
    >
      <div className="py-8 md:flex md:items-center md:justify-between">
        <div className="md:flex md:items-center">
          <div className="mt-4 md:mt-0">
            <div className="flex items-center">
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

          {/* Enhanced expandable indicator */}
          <div
            className="absolute bottom-3 right-6 
            bg-gray-100 bg-opacity-70 rounded px-3 py-1 
            group-hover:bg-opacity-100 transition-all duration-300 
            flex items-center justify-center"
          >
            <span className="text-xs text-gray-600 mr-1 group-hover:text-gray-800 transition-colors">
              {showDetails ? "Collapse" : "More Info"}
            </span>
            {showDetails ? (
              <ChevronUp className="h-4 w-4 text-gray-600 group-hover:text-gray-800" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-600 group-hover:text-gray-800" />
            )}
          </div>
        </div>
      </div>

      {showDetails && (
        <div className="mt-4 bg-gray-100 rounded p-4 mb-8">
          <div className="mb-2">
            <h4 className="text-sm font-semibold text-gray-800">
              FODMAP Types:
            </h4>
            <p className="text-sm text-gray-600">
              {item.fodmap_types?.join(", ") || "Not specified"}
            </p>
          </div>

          {item.low_fodmap_alternatives && (
            <div className="mb-2">
              <h4 className="text-sm font-semibold text-gray-800">
                Low FODMAP Alternatives:
              </h4>
              <p className="text-sm text-gray-600">
                {item.low_fodmap_alternatives.join(", ")}
              </p>
            </div>
          )}

          {item.dietary_restrictions && (
            <div>
              <h4 className="text-sm font-semibold text-gray-800">
                Dietary Info:
              </h4>
              <div className="text-sm text-gray-600">
                {Object.entries(item.dietary_restrictions)
                  .filter(([_, value]) => value)
                  .map(([key]) => (
                    <span
                      key={key}
                      className="inline-block bg-teal-100 text-teal-800 px-2 py-1 rounded-full mr-2 mt-1 text-xs"
                    >
                      {key
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </span>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

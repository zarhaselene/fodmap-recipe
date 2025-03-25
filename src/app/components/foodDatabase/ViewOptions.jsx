import React from "react";
import { LayoutGrid, AlignJustify } from "lucide-react";

export default function ViewOptions({
  currentView,
  onViewChange,
  currentSort,
  onSortChange,
}) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
      <div className="flex space-x-2 mb-4 md:mb-0">
        <button
          className={`inline-flex items-center px-3 py-2 border rounded-md text-sm font-medium ${
            currentView === "list"
              ? "border-transparent bg-teal-600 text-white"
              : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          }`}
          onClick={() => onViewChange("list")}
        >
          <AlignJustify className="h-5 mr-1" />
          List
        </button>
        <button
          className={`inline-flex items-center px-2 py-2 border rounded-md text-sm font-medium ${
            currentView === "grid"
              ? "border-transparent bg-teal-600 text-white"
              : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          }`}
          onClick={() => onViewChange("grid")}
        >
          <LayoutGrid className="h-5 mr-1" />
          Grid
        </button>
      </div>

      <div className="flex items-center">
        <span className="text-sm text-gray-600 mr-2">Sort by:</span>
        <select
          className="border border-gray-300 rounded-md text-sm pl-3 pr-8 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          value={currentSort}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="alphabetical">Alphabetical</option>
          <option value="fodmap-low-high">FODMAP Level (Low to High)</option>
          <option value="fodmap-high-low">FODMAP Level (High to Low)</option>
        </select>
      </div>
    </div>
  );
}

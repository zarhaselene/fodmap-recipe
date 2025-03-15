// import React from "react";

// export default function ViewOptions({ currentView, onViewChange, currentSort, onSortChange }) {
//   return (
//     <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
//       <div className="flex space-x-2 mb-4 sm:mb-0">
//         <button
//           className={`inline-flex items-center px-3 py-2 border rounded-md text-sm font-medium ${
//             currentView === "list"
//               ? "border-transparent bg-teal-600 text-white"
//               : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
//           }`}
//           onClick={() => onViewChange("list")}
//         >
//           <svg
//             className="h-5 w-5 mr-1"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M4 6h16M4 10h16M4 14h16M4 18h16"
//             ></path>
//           </svg>
//           List
//         </button>
//         <button
//           className={`inline-flex items-center px-3 py-2 border rounded-md text-sm font-medium ${
//             currentView === "grid"
//               ? "border-transparent bg-teal-600 text-white"
//               : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
//           }`}
//           onClick={() => onViewChange("grid")}
//         >
//           <svg
//             className="h-5 w-5 mr-1"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
//             ></path>
//           </svg>
//           Grid
//         </button>

//       </div>

//       <div className="flex items-center">
//         <span className="text-sm text-gray-600 mr-2">Sort by:</span>
//         <select
//           className="border border-gray-300 rounded-md text-sm pl-3 pr-8 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//           value={currentSort}
//           onChange={(e) => onSortChange(e.target.value)}
//         >
//           <option value="alphabetical">Alphabetical</option>
//           <option value="fodmap-low-high">FODMAP Level (Low to High)</option>
//           <option value="fodmap-high-low">FODMAP Level (High to Low)</option>
//         </select>
//       </div>
//     </div>
//   );
// }

import React from "react";

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
          <svg
            className="h-5 w-5 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 10h16M4 14h16M4 18h16"
            ></path>
          </svg>
          List
        </button>
        <button
          className={`inline-flex items-center px-3 py-2 border rounded-md text-sm font-medium ${
            currentView === "grid"
              ? "border-transparent bg-teal-600 text-white"
              : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          }`}
          onClick={() => onViewChange("grid")}
        >
          <svg
            className="h-5 w-5 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            ></path>
          </svg>
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

import React from "react";
import { Search } from "lucide-react";
import WaveDivider from "./WaveDivider";
const Hero = ({ title, description, searchPlaceholder }) => {
  return (
    <div className="relative bg-gradient-to-r from-teal-500 to-teal-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="md:flex md:items-center md:justify-between">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6">
              {title}
            </h1>
            <p className="text-teal-100 text-lg md:text-xl mb-8">
              {description}
            </p>
          </div>

          {/* Search bar */}
          <div className="md:w-2/5 bg-white rounded-lg shadow-xl p-1">
            <form role="search" aria-labelledby="search-bar">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="search-bar"
                  aria-label="Search input"
                  className="block w-full pl-10 pr-3 py-4 text-gray-800 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-base"
                  placeholder={searchPlaceholder}
                  aria-placeholder={searchPlaceholder}
                />
                <button
                  type="submit"
                  aria-label="Submit search"
                  className="absolute inset-y-0 right-0 flex items-center px-4 text-white bg-teal-500 hover:bg-teal-600 rounded-r-lg"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Wave shape divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <WaveDivider />
      </div>
    </div>
  );
};

export default Hero;

import React from "react";
import { Search } from "lucide-react";

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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 220"
          className="w-full h-auto"
          aria-hidden="true"
        >
          <path
            fill="#F8F5F0"
            fillOpacity="1"
            d="M0,96L48,106.7C96,117,192,139,288,138.7C384,139,480,117,576,117.3C672,117,768,139,864,144C960,149,1056,139,1152,122.7C1248,107,1344,85,1392,74.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;

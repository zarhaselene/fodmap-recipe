"use client";
import { useState, useEffect, useRef } from "react";
import { Search, ChevronDown } from "lucide-react";
import ResourcesCard from "./ResourcesCard";
import Pagination from "../shared/Pagination";
import { useResources } from "@/app/context/ResourcesContext";
import { useRouter, useSearchParams } from "next/navigation";

const ResourcesSection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sectionRef = useRef(null);

  const {
    activeCategory,
    setActiveCategory,
    searchTerm,
    setSearchTerm,
    searchedResources,
    resourceCategories,
    loading,
    error,
  } = useResources();

  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const categoryParam = searchParams.get("category");

    if (
      categoryParam &&
      resourceCategories.includes(decodeURIComponent(categoryParam))
    ) {
      setActiveCategory(decodeURIComponent(categoryParam));

      // Only scroll if it's coming from an external navigation
      if (isInitialLoad && sectionRef.current) {
        // Scroll to the section with a slight delay to ensure content is rendered
        setTimeout(() => {
          sectionRef.current.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }

    if (isInitialLoad) {
      setIsInitialLoad(false);
    }
  }, [searchParams, resourceCategories, setActiveCategory, isInitialLoad]);

  // Handle category change and update URL
  const handleCategoryChange = (category) => {
    setActiveCategory(category);

    // Update URL with new category
    const params = new URLSearchParams(searchParams);
    if (category === "All") {
      params.delete("category");
    } else {
      params.set("category", category);
    }

    // Avoid adding to browser history stack
    router.replace(`/resources?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(4); // Mobile: 4 items per page
      } else {
        setItemsPerPage(6); // Default: 6 items per page
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchTerm]);

  const nextPage = () => {
    if (currentPage < Math.ceil(searchedResources.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const indexOfLastResource = currentPage * itemsPerPage;
  const indexOfFirstResource = indexOfLastResource - itemsPerPage;
  const currentResources = searchedResources.slice(
    indexOfFirstResource,
    indexOfLastResource
  );

  return (
    <div className="min-h-screen" ref={sectionRef}>
      {/* Resources Section */}
      <div className="bg-white py-16">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-teal-700 mb-4 md:mb-0">
              FODMAP Resources Library
            </h2>
            <div className="flex flex-col sm:flex-row w-full md:w-auto space-y-4 sm:space-y-0 sm:space-x-4">
              {/* Search input field */}
              <div className="relative w-full sm:w-auto">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="relative md:hidden">
                <button
                  onClick={() => setShowMobileFilter(!showMobileFilter)}
                  className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700"
                >
                  <span>{activeCategory}</span>
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                </button>
                {showMobileFilter && (
                  <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1">
                    {resourceCategories.map((category) => (
                      <button
                        key={category}
                        className={`block w-full text-left px-4 py-2 ${
                          activeCategory === category
                            ? "bg-teal-100 text-teal-800"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={() => {
                          handleCategoryChange(category);
                          setShowMobileFilter(false);
                        }}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Desktop Category Filter */}
          <div className="hidden md:flex border-b border-gray-200 mb-8">
            {resourceCategories.map((category) => (
              <button
                key={category}
                className={`py-3 px-5 font-medium text-sm focus:outline-none ${
                  activeCategory === category
                    ? "text-teal-600 border-b-2 border-teal-600"
                    : "text-gray-600 hover:text-gray-900 border-b-2 border-transparent"
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Render resources or loading/error messages */}
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-red-500 mb-4">{error.message}</div>
              <button
                className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-md"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              {searchedResources.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-500 mb-4">
                    No resources found matching your search.
                  </div>
                  <button
                    className="text-teal-500 hover:text-teal-600 font-medium"
                    onClick={() => {
                      setSearchTerm("");
                      handleCategoryChange("All");
                    }}
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentResources.map((resource) => (
                      <ResourcesCard key={resource.id} resource={resource} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {searchedResources.length > itemsPerPage && (
                    <div className="mt-8">
                      <Pagination
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        nextPage={nextPage}
                        previousPage={previousPage}
                        totalPages={Math.ceil(
                          searchedResources.length / itemsPerPage
                        )}
                      />
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourcesSection;

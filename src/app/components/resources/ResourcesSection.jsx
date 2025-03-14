"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Download,
  Star,
  ChevronDown,
  ArrowRight,
  Video,
  BookText,
  FileText,
  NotebookPen,
  FileCheck2,
} from "lucide-react";
import Pagination from "../shared/Pagination";

const ResourcesSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch("/resources.json");
        if (!response.ok) {
          throw new Error("Failed to fetch resources");
        }
        const data = await response.json();
        const resourcesData = data.resources || data;
        setResources(resourcesData);
        setLoading(false);
      } catch (err) {
        console.error("Error loading resources:", err);
        setError("Failed to load resources. Please try again later.");
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(4); // Mobile: 4 items per page
      } else {
        setItemsPerPage(6); // Default: 6 items per page
      }
    };

    handleResize(); // Set the initial itemsPerPage
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchTerm]);

  const resourceCategories = [
    "All",
    "FODMAP Guide",
    "Elimination Phase",
    "Reintroduction",
    "Meal Planning",
    "Printables",
  ];

  const categoryStyles = {
    "FODMAP Guide": "bg-teal-100 text-teal-800",
    "Elimination Phase": "bg-purple-100 text-purple-800",
    Reintroduction: "bg-green-100 text-green-800",
    "Meal Planning": "bg-amber-100 text-amber-800",
    Printables: "bg-red-100 text-red-800",
  };

  const filteredResources =
    resources.length > 0
      ? activeCategory === "All"
        ? resources
        : resources.filter(
            (resource) =>
              resource.category === activeCategory ||
              (activeCategory === "Printables" && resource.downloadable)
          )
      : [];

  const searchedResources = filteredResources.filter(
    (resource) =>
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const featuredResources =
    resources.length > 0 ? resources.filter((r) => r.id <= 3) : [];

  return (
    <div className="min-h-screen">
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
                          setActiveCategory(category);
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
                onClick={() => setActiveCategory(category)}
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
              <div className="text-red-500 mb-4">{error}</div>
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
                      setActiveCategory("All");
                    }}
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentResources.map((resource) => (
                      <div
                        key={resource.id}
                        className="bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                      >
                        <div className="h-48 bg-gray-200 relative">
                          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-teal-50 to-indigo-50">
                            {resource.type === "PDF Guide" && (
                              <FileText className="h-16 w-16 text-teal-400" />
                            )}
                            {resource.type === "Interactive Guide" && (
                              <FileCheck2 className="h-16 w-16 text-purple-400" />
                            )}
                            {resource.type === "Workbook" && (
                              <NotebookPen className="h-16 w-16 text-green-400" />
                            )}
                            {resource.type === "eBook" && (
                              <BookText className="h-16 w-16 text-amber-400" />
                            )}
                            {resource.type === "Video Guide" && (
                              <Video className="h-16 w-16 text-red-400" />
                            )}
                          </div>
                          <div className="absolute top-2 right-2 bg-teal-500 shadow-sm text-white text-xs font-medium px-2 py-1 rounded">
                            {resource.type}
                          </div>
                        </div>
                        <div className="p-5">
                          <div className="flex justify-between items-start mb-2">
                            <span
                              className={`inline-block text-xs font-medium px-2.5 py-0.5 rounded-full ${
                                categoryStyles[resource.category] ||
                                "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {resource.category}
                            </span>
                            {resource.downloadable && (
                              // Fix later: Download file
                              // <a href={} download>
                              <Download className="h-4 w-4 text-gray-400" />
                              // </a>
                            )}
                          </div>
                          <Link href={`/resources/${resource.id}`}>
                            <h3 className="text-xl font-bold text-teal-800 mb-2">
                              {resource.title}
                            </h3>
                          </Link>

                          <p className="text-gray-600 text-sm mb-4">
                            {resource.description}
                          </p>
                          <div className="flex items-center mb-3">
                            <div className="flex text-amber-400">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="h-4 w-4"
                                  fill={
                                    i < Math.floor(resource.rating)
                                      ? "currentColor"
                                      : "none"
                                  }
                                />
                              ))}
                            </div>
                            <span className="text-gray-600 text-xs ml-2">
                              {resource.rating} ({resource.reviews} reviews)
                            </span>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">
                              {resource.fileSize}
                            </span>
                            <Link
                              href={`/resources/${resource.id}`}
                              className="text-teal-600 hover:text-teal-800 font-medium text-sm inline-flex items-center"
                            >
                              Read more
                              <ArrowRight className="ml-1 h-3 w-3" />
                            </Link>
                          </div>
                        </div>
                      </div>
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

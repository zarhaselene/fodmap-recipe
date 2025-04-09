"use client";
import { useState, useEffect, useRef, Suspense } from "react";
import { Search, ChevronDown } from "lucide-react";
import ResourcesCard from "./ResourcesCard";
import Pagination from "../shared/Pagination";
import { useResources } from "@/app/context/ResourcesContext";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

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
        setItemsPerPage(4);
      } else {
        setItemsPerPage(6);
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const searchAnimationVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, delay: 0.2 },
    },
  };

  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
        </div>
      }
    >
      <motion.div
        className="min-h-screen"
        ref={sectionRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Resources Section */}
        <div className="bg-white py-16">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <motion.h2
                className="text-2xl md:text-3xl font-bold text-teal-700 mb-4 md:mb-0"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                FODMAP Resources Library
              </motion.h2>
              <motion.div
                className="flex flex-col sm:flex-row w-full md:w-auto space-y-4 sm:space-y-0 sm:space-x-4"
                variants={searchAnimationVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Search input field */}
                <div className="relative w-full sm:w-auto">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Search resources..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="relative md:hidden">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowMobileFilter(!showMobileFilter)}
                    className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700"
                  >
                    <span>{activeCategory}</span>
                    <motion.div
                      animate={{ rotate: showMobileFilter ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    </motion.div>
                  </motion.button>
                  <AnimatePresence>
                    {showMobileFilter && (
                      <motion.div
                        className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {resourceCategories.map((category) => (
                          <motion.button
                            key={category}
                            whileHover={{ backgroundColor: "#f3f4f6" }}
                            whileTap={{ scale: 0.98 }}
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
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>

            {/* Desktop Category Filter */}
            <motion.div
              className="hidden md:flex border-b border-gray-200 mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {resourceCategories.map((category, index) => (
                <motion.button
                  key={category}
                  className={`py-3 px-5 font-medium text-sm focus:outline-none cursor-pointer ${
                    activeCategory === category
                      ? "text-teal-600 border-b-2 border-teal-600"
                      : "text-gray-600 hover:text-gray-900 border-b-2 border-transparent"
                  }`}
                  onClick={() => handleCategoryChange(category)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  {category}
                </motion.button>
              ))}
            </motion.div>

            {/* Render resources or loading/error messages */}
            {loading ? (
              <motion.div
                className="flex justify-center items-center h-48"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="rounded-full h-12 w-12 border-b-2 border-teal-500"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                ></motion.div>
              </motion.div>
            ) : error ? (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-red-500 mb-4">{error.message}</div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-md"
                  onClick={() => window.location.reload()}
                >
                  Try Again
                </motion.button>
              </motion.div>
            ) : (
              <>
                {searchedResources.length === 0 ? (
                  <motion.div
                    className="text-center py-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="text-gray-500 mb-4">
                      No resources found matching your search.
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-teal-500 hover:text-teal-600 font-medium"
                      onClick={() => {
                        setSearchTerm("");
                        handleCategoryChange("All");
                      }}
                    >
                      Clear filters
                    </motion.button>
                  </motion.div>
                ) : (
                  <>
                    <motion.div
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {currentResources.map((resource, index) => (
                        <motion.div
                          key={resource.id}
                          variants={itemVariants}
                          custom={index}
                        >
                          <ResourcesCard resource={resource} />
                        </motion.div>
                      ))}
                    </motion.div>

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
                          totalItems={searchedResources.length}
                          itemsPerPage={itemsPerPage}
                        />
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </motion.div>
    </Suspense>
  );
};

export default ResourcesSection;

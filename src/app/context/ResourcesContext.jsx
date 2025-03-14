"use client";
import { createContext, useContext, useState, useEffect } from "react";

const ResourcesContext = createContext();

export const ResourcesProvider = ({ children }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch("/resources.json");
        if (!response.ok) throw new Error("Failed to fetch resources");
        const data = await response.json();
        setResources(data.resources);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  const resourceCategories = [
    "All",
    "FODMAP Guides",
    "Elimination Phase",
    "Reintroduction",
    "Meal Planning",
    "Printables",
  ];

  const filteredResources =
    activeCategory === "All"
      ? resources
      : activeCategory === "Printables"
      ? resources.filter((resource) => resource.downloadable === true) // Show only downloadable resources for "Printables"
      : resources.filter((resource) => resource.category === activeCategory); // Filter by category for other tabs

  const searchedResources = filteredResources.filter(
    (resource) =>
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ResourcesContext.Provider
      value={{
        activeCategory,
        setActiveCategory,
        searchTerm,
        setSearchTerm,
        searchedResources,
        resourceCategories,
        loading,
        error,
      }}
    >
      {children}
    </ResourcesContext.Provider>
  );
};

export const useResources = () => useContext(ResourcesContext);

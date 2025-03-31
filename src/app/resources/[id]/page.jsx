"use client";
import { useState, useEffect } from "react";
import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Download,
  ChevronLeft,
  Star,
  Tag,
  Video,
  BookText,
  FileText,
  NotebookPen,
  FileCheck2,
} from "lucide-react";
import { useResources } from "@/app/context/ResourcesContext";
import { motion } from "framer-motion";

export default function ResourcePage({ params }) {
  // Unwrap params using React.use()
  const resourceId = use(params).id;

  // Destructure context values
  const {
    searchedResources,
    loading: contextLoading,
    error: contextError,
  } = useResources();

  // State for current resource and related resources
  const [resource, setResource] = useState(null);
  const [relatedResources, setRelatedResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch and set resource data when component mounts or resources change
  useEffect(() => {
    // Only proceed if searchedResources is loaded from context
    if (!contextLoading && !contextError && searchedResources.length > 0) {
      try {
        // Find the current resource from the context data
        const currentResource = searchedResources.find(
          (res) => res.id === parseInt(resourceId)
        );

        if (!currentResource) {
          throw new Error("Resource not found");
        }

        setResource(currentResource);

        // Find related resources from the context data
        if (currentResource.relatedResources?.length > 0) {
          const related = searchedResources.filter((res) =>
            currentResource.relatedResources.includes(res.id)
          );
          setRelatedResources(related);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  }, [resourceId, searchedResources, contextLoading, contextError]);

  // Render loading spinner
  if (contextLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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
      </div>
    );
  }

  // Render error message
  if (contextError || error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-2xl font-bold text-red-500">Error</h1>
          <p className="mt-2">{contextError?.message || error}</p>
          <Link
            href="/resources"
            className="mt-4 inline-block text-teal-500 hover:underline"
          >
            <span className="flex items-center">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Return to Resources
            </span>
          </Link>
        </motion.div>
      </div>
    );
  }

  // Render "Resource Not Found" if no resource is found
  if (!resource) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-2xl font-bold">Resource Not Found</h1>
          <Link
            href="/resources"
            className="mt-4 inline-block text-teal-500 hover:underline"
          >
            <span className="flex items-center">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Return to Resources
            </span>
          </Link>
        </motion.div>
      </div>
    );
  }

  // Main resource page render
  return (
    <motion.div
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header Section */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-300">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 py-16">
          {/* Back to Resources Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: -5 }}
            transition={{ type: "spring", stiffness: 400, duration: 0.5 }}
          >
            <Link
              href="/resources"
              className="inline-flex items-center text-white mb-6 hover:underline"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Resources
            </Link>
          </motion.div>

          {/* Resource Header Content */}
          <div className="flex flex-col md:flex-row items-center">
            {/* Left Column - Resource Info */}
            <motion.div
              className="md:w-1/2 mb-8 md:mb-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="inline-block bg-white/20 text-white px-3 py-1 rounded text-sm font-medium mb-4">
                {resource.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {resource.title}
              </h1>

              {/* Resource Metadata */}
              <div className="flex items-center text-white mb-4">
                <div className="flex items-center mr-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 15,
                      delay: 0.3,
                    }}
                  >
                    <Star className="h-5 w-5 text-yellow-300 fill-current mr-1" />
                  </motion.div>
                  <span className="font-medium">{resource.rating}</span>
                  <span className="ml-1 text-sm">
                    ({resource.reviews} reviews)
                  </span>
                </div>
                <div className="text-sm">
                  Updated: {new Date(resource.lastUpdated).toLocaleDateString()}
                </div>
              </div>
              <p className="text-white/90 text-lg">{resource.description}</p>
            </motion.div>

            {/* Right Column - Resource Image and Download */}
            <motion.div
              className="md:w-1/2 md:pl-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-48 w-full flex items-center justify-center bg-gradient-to-r from-teal-50 to-indigo-50">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      delay: 0.1,
                      type: "spring",
                      stiffness: 100,
                    }}
                  >
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
                  </motion.div>
                </div>
                <div className="p-6">
                  {/* Resource Author and Type */}
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <span className="text-sm text-gray-500">Created by</span>
                      <p className="font-medium">{resource.author}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-gray-500">
                        Resource Type
                      </span>
                      <p className="font-medium">{resource.type}</p>
                    </div>
                  </div>

                  {/* Download Button */}
                  {resource.downloadable && (
                    <motion.button
                      className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      <Download className="h-5 w-5 mr-2" />
                      Download Resource
                      {resource.fileSize && (
                        <span className="ml-2 text-sm text-white/80">
                          ({resource.fileSize})
                        </span>
                      )}
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Resource Details */}
          <div className="md:col-span-2">
            {/* About This Resource */}
            <motion.div
              className="bg-white rounded-lg shadow-sm p-6 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-teal-800 mb-4">
                About This Resource
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {resource.longDescription}
              </p>

              {/* Optional Resource Metadata */}
              {resource.pages && (
                <div className="flex items-center text-gray-600 mb-2">
                  <span className="font-medium mr-2">Length:</span>{" "}
                  {resource.pages} pages
                </div>
              )}

              {resource.duration && (
                <div className="flex items-center text-gray-600 mb-2">
                  <span className="font-medium mr-2">Duration:</span>{" "}
                  {resource.duration}
                </div>
              )}
            </motion.div>

            {/* Tags Section */}
            {resource.tags && resource.tags.length > 0 && (
              <motion.div
                className="bg-white rounded-lg shadow-sm p-6 mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h3 className="text-lg font-bold text-teal-800 mb-4">
                  Topics Covered
                </h3>
                <div className="flex flex-wrap gap-2">
                  {resource.tags.map((tag, index) => (
                    <motion.span
                      key={tag}
                      className="bg-gray-100 text-teal-800 px-3 py-1 rounded text-sm inline-flex items-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      whileHover={{ backgroundColor: "#e6f7f5" }}
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column - Related Resources */}
          <div>
            <motion.div
              className="bg-white rounded-lg shadow-sm p-6 sticky top-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <h3 className="text-lg font-bold text-teal-800 mb-4">
                Related Resources
              </h3>

              {/* Related Resources List */}
              {relatedResources.length > 0 ? (
                <div className="space-y-4">
                  {relatedResources.map((related, index) => (
                    <motion.div
                      key={related.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                    >
                      <Link
                        href={`/resources/${related.id}`}
                        className="block group"
                      >
                        <motion.div
                          className="flex items-center p-3 rounded-lg transition hover:bg-gray-50"
                          whileHover={{
                            backgroundColor: "#f0f9f8",
                          }}
                        >
                          {/* Resource Type Icon */}
                          <div className="relative flex-shrink-0 rounded overflow-hidden">
                            <div className="flex items-center justify-center h-full w-full">
                              {related.type === "PDF Guide" && (
                                <FileText className="h-8 w-8 text-teal-400" />
                              )}
                              {related.type === "Interactive Guide" && (
                                <FileCheck2 className="h-8 w-8 text-purple-400" />
                              )}
                              {related.type === "Workbook" && (
                                <NotebookPen className="h-8 w-8 text-green-400" />
                              )}
                              {related.type === "eBook" && (
                                <BookText className="h-8 w-8 text-amber-400" />
                              )}
                              {related.type === "Video Guide" && (
                                <Video className="h-8 w-8 text-red-400" />
                              )}
                            </div>
                          </div>
                          <div className="ml-3">
                            <h4 className="font-medium text-teal-800 group-hover:text-teal-500 transition">
                              {related.title}
                            </h4>
                            <p className="text-sm text-gray-500 line-clamp-2">
                              {related.description}
                            </p>
                          </div>
                        </motion.div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No related resources found.</p>
              )}

              {/* Browse All Resources Link */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <motion.div
                  whileHover={{ x: -3 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Link
                    href="/resources"
                    className="text-teal-500 hover:text-teal-600 font-medium inline-flex items-center"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Browse All Resources
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

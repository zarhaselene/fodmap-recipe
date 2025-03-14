"use client";
import { useState, useEffect, use } from "react";
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
import WaveDivider from "@/app/components/shared/WaveDivider";

export default function ResourcePage({ params }) {
  const resourceId = use(params).id;
  const [resource, setResource] = useState(null);
  const [relatedResources, setRelatedResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResourceData = async () => {
      try {
        // Fetch resource data
        const response = await fetch("/resources.json");
        if (!response.ok) throw new Error("Failed to fetch resource data");
        const data = await response.json();

        // Find the current resource
        const currentResource = data.resources.find(
          (res) => res.id === parseInt(resourceId)
        );

        if (!currentResource) {
          throw new Error("Resource not found");
        }

        setResource(currentResource);

        // Fetch related resources
        if (currentResource.relatedResources?.length > 0) {
          const related = data.resources.filter((res) =>
            currentResource.relatedResources.includes(res.id)
          );
          setRelatedResources(related);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (resourceId) {
      fetchResourceData();
    }
  }, [resourceId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500">Error</h1>
          <p className="mt-2">{error}</p>
          <Link
            href="/resources"
            className="mt-4 inline-block text-teal-500 hover:underline"
          >
            <span className="flex items-center">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Return to Resources
            </span>
          </Link>
        </div>
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
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
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-300 ">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <Link
            href="/resources"
            className="inline-flex items-center text-white mb-6 hover:underline"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Resources
          </Link>
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <span className="inline-block bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
                {resource.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {resource.title}
              </h1>
              <div className="flex items-center text-white mb-4">
                <div className="flex items-center mr-4">
                  <Star className="h-5 w-5 text-yellow-300 fill-current mr-1" />
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
            </div>
            <div className="md:w-1/2 md:pl-8">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {resource.image && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={resource.image}
                      alt={resource.title}
                      width={400}
                      height={200}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                <div className="p-6">
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

                  {resource.downloadable && (
                    <button className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center">
                      <Download className="h-5 w-5 mr-2" />
                      Download Resource
                      {resource.fileSize && (
                        <span className="ml-2 text-sm text-white/80">
                          ({resource.fileSize})
                        </span>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <WaveDivider inverted={false} />
      </div>

      {/* Main Content */}
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Resource Details */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold text-teal-800 mb-4">
                About This Resource
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {resource.longDescription}
              </p>

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
            </div>

            {/* Tags Section */}
            {resource.tags && resource.tags.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h3 className="text-lg font-bold text-teal-800 mb-4">
                  Topics Covered
                </h3>
                <div className="flex flex-wrap gap-2">
                  {resource.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-teal-800 px-3 py-1 rounded-full text-sm inline-flex items-center"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Related Resources */}
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h3 className="text-lg font-bold text-teal-800 mb-4">
                Related Resources
              </h3>

              {relatedResources.length > 0 ? (
                <div className="space-y-4">
                  {relatedResources.map((related) => (
                    <Link
                      href={`/resources/${related.id}`}
                      key={related.id}
                      className="block group"
                    >
                      <div className="flex items-center p-3 rounded-lg transition hover:bg-gray-50">
                        <div className="relative  flex-shrink-0 rounded overflow-hidden">
                          <div className="flex items-center justify-center h-full w-full">
                            {resource.type === "PDF Guide" && (
                              <FileText className="h-8 w-8 text-teal-400" />
                            )}
                            {resource.type === "Interactive Guide" && (
                              <FileCheck2 className="h-8 w-8 text-purple-400" />
                            )}
                            {resource.type === "Workbook" && (
                              <NotebookPen className="h-8 w-8 text-green-400" />
                            )}
                            {resource.type === "eBook" && (
                              <BookText className="h-8 w-8 text-amber-400" />
                            )}
                            {resource.type === "Video Guide" && (
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
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No related resources found.</p>
              )}

              <div className="mt-6 pt-6 border-t border-gray-100">
                <Link
                  href="/resources"
                  className="text-teal-500 hover:text-teal-600 font-medium inline-flex items-center"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Browse All Resources
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

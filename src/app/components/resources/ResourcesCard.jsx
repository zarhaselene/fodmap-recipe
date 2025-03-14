"use client";
import Link from "next/link";
import {
  Download,
  Star,
  ArrowRight,
  Video,
  BookText,
  FileText,
  NotebookPen,
  FileCheck2,
} from "lucide-react";

const categoryStyles = {
  "FODMAP Guide": "bg-teal-100 text-teal-800",
  "Elimination Phase": "bg-purple-100 text-purple-800",
  Reintroduction: "bg-green-100 text-green-800",
  "Meal Planning": "bg-amber-100 text-amber-800",
  Printables: "bg-red-100 text-red-800",
};

const ResourceCard = ({ resource }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
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
              categoryStyles[resource.category] || "bg-gray-100 text-gray-800"
            }`}
          >
            {resource.category}
          </span>
          {resource.downloadable && (
            <Download className="h-4 w-4 text-gray-400" />
          )}
        </div>
        <Link href={`/resources/${resource.id}`}>
          <h3 className="text-xl font-bold text-teal-800 mb-2">
            {resource.title}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
        <div className="flex items-center mb-3">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="h-4 w-4"
                fill={i < Math.floor(resource.rating) ? "currentColor" : "none"}
              />
            ))}
          </div>
          <span className="text-gray-600 text-xs ml-2">
            {resource.rating} ({resource.reviews} reviews)
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">{resource.fileSize}</span>
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
  );
};

export default ResourceCard;

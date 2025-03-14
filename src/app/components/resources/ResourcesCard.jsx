"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Download,
  Star,
  ChevronRight,
  Video,
  BookText,
  FileText,
  NotebookPen,
  FileCheck2,
} from "lucide-react";

const categoryStyles = {
  "FODMAP Guides": "bg-teal-100 text-teal-800",
  "Elimination Phase": "bg-purple-100 text-purple-800",
  Reintroduction: "bg-green-100 text-green-800",
  "Meal Planning": "bg-amber-100 text-amber-800",
  Printables: "bg-red-100 text-red-800",
};

const ResourceCard = ({ resource }) => {
  return (
    <motion.div
      className="bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="h-48 bg-gray-200 relative">
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-teal-50 to-indigo-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
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
        <motion.div
          className="absolute top-2 right-2 bg-teal-500 shadow-sm text-white text-xs font-medium px-2 py-1 rounded"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {resource.type}
        </motion.div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <motion.span
            className={`inline-block text-xs font-medium px-2.5 py-0.5 rounded ${
              categoryStyles[resource.category] || "bg-gray-100 text-gray-800"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {resource.category}
          </motion.span>
          {resource.downloadable && (
            <motion.div whileHover={{ scale: 1.08 }}>
              <Download className="h-4 w-4 text-gray-400" />
            </motion.div>
          )}
        </div>
        <Link href={`/resources/${resource.id}`}>
          <motion.h3
            className="text-xl font-bold text-teal-800 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {resource.title}
          </motion.h3>
        </Link>
        <motion.p
          className="text-gray-600 text-sm mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {resource.description}
        </motion.p>
        <motion.div
          className="flex items-center mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7 + i * 0.1 }}
              >
                <Star
                  className="h-4 w-4"
                  fill={
                    i < Math.floor(resource.rating) ? "currentColor" : "none"
                  }
                />
              </motion.div>
            ))}
          </div>
          <span className="text-gray-600 text-xs ml-2">
            {resource.rating} ({resource.reviews} reviews)
          </span>
        </motion.div>
        <div className="flex justify-between items-center">
          <motion.span
            className="text-xs text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {resource.fileSize}
          </motion.span>
          <Link href={`/resources/${resource.id}`}>
            <motion.div
              className="text-teal-600 hover:text-teal-800 font-medium text-sm inline-flex items-center"
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Read more
              <ChevronRight className="ml-1 h-3 w-3" />
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ResourceCard;

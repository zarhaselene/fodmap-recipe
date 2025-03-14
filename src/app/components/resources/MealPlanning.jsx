import React from "react";
import {
  Star,
  Download,
  Calendar,
  ShoppingBag,
  Clock,
  ArrowRight,
  FileText,
  FileSpreadsheet,
} from "lucide-react";
const features = [
  {
    text: "Weekly meal plans for all diet phases",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    text: "FODMAP-friendly shopping lists",
    icon: <ShoppingBag className="h-4 w-4" />,
  },
  {
    text: "Time-saving meal prep guides",
    icon: <Clock className="h-4 w-4" />,
  },
];

const MealPlanning = ({ setActiveCategory }) => {
  return (
    <div className="md:flex md:items-center md:justify-between">
      <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
        <h2 className="text-2xl md:text-3xl font-bold text-teal-700 mb-4">
          Simplify Your FODMAP Journey with Meal Planning
        </h2>
        <p className="text-gray-600 mb-6">
          One of the biggest challenges of the FODMAP diet is figuring out what
          to eat. Our meal planning resources take the guesswork out with:
        </p>
        <ul className="space-y-3">
          {features.map((item, index) => (
            <li key={index} className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mr-3 mt-0.5">
                {item.icon}
              </div>
              <p className="ml-3 text-gray-700">{item.text}</p>
            </li>
          ))}
        </ul>
        <button
          className="mt-8 bg-teal-500 hover:bg-teal-600 text-white font-medium py-2.5 px-5 rounded-md transition-colors duration-300 flex items-center"
          onClick={() => setActiveCategory("Meal Planning")}
        >
          Browse Meal Planning Resources <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>

      <div className="md:w-1/2">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <div className="aspect-w-16 aspect-h-9 rounded-md bg-gray-200 mb-4">
            {/* Placeholder for meal plan image */}
            <div className="flex items-center justify-center h-48 rounded-md bg-gradient-to-r from-teal-50 to-indigo-50">
              <FileSpreadsheet className="h-16 w-16 text-pink-400" />
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2">
            4-Week FODMAP Meal Plan
          </h3>
          <div className="flex items-center mb-3">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4"
                  fill={i < 4.6 ? "currentColor" : "none"}
                />
              ))}
            </div>
            <span className="text-gray-600 text-sm ml-2">
              4.6 (112 reviews)
            </span>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Complete meal plans with shopping lists and prep instructions.
          </p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 flex items-center">
              <FileText className="h-4 w-4 mr-1" /> PDF + Spreadsheet
            </span>
            <button className="cursor-pointer text-teal-500 hover:text-teal-600 font-medium flex items-center">
              Download <Download className="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealPlanning;

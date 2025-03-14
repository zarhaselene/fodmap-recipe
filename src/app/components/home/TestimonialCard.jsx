"use client";

import React from "react";
import { Star, Quote } from "lucide-react";

const TestimonialCard = ({
  name,
  memberSince,
  review,
  rating,
  bgColor,
  avatar,
}) => {
  const getColorClasses = (bgColorName) => {
    const colorMap = {
      teal: "bg-teal-200 text-teal-600",
      amber: "bg-amber-200 text-amber-600",
      purple: "bg-purple-200 text-purple-600",
    };

    return colorMap[bgColorName] || "bg-blue-200 text-blue-600";
  };

  const colorClasses = getColorClasses(bgColor);
  const [bgClass, textClass] = colorClasses.split(" ");

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className="h-5 w-5 text-amber-400"
              fill={index < rating ? "currentColor" : "none"}
            />
          ))}
        </div>
        <div
          className={`h-8 w-8 rounded-full ${bgClass} ${textClass} flex items-center justify-center`}
        >
          <Quote className="h-4 w-4" />
        </div>
      </div>

      <p className="text-gray-600 mb-6 text-sm">"{review}"</p>

      <div className="flex items-center pt-4 border-t border-gray-100">
        <div
          className={`w-10 h-10 rounded-full overflow-hidden flex items-center justify-center ${bgClass}`}
        >
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className={`text-lg font-medium ${textClass}`}>
              {name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <div className="ml-3">
          <h4 className="font-medium text-gray-800">{name}</h4>
          <p className="text-xs text-gray-500">Member since {memberSince}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;

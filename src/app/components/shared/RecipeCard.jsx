import React from "react";
import { Star, Clock, Tag } from "lucide-react";

const RecipeCard = ({
  level,
  image,
  title,
  rating,
  reviews,
  totalTime,
  category,
  dietaryNeeds,
}) => {
  const filledStars = Math.floor(rating);
  const emptyStars = 5 - filledStars;

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="h-48 bg-gray-200 relative">
        <div
          className={`absolute top-2 right-2 bg-teal-500 text-white text-xs font-medium px-2 py-1 rounded shadow-sm`}
        >
          {category}
        </div>
        <img src={image} alt={title} className="object-cover w-full h-full" />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <div className="flex items-center mb-3">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="h-4 w-4"
                fill={i < filledStars ? "currentColor" : "none"}
              />
            ))}
          </div>
          <span className="text-gray-600 text-xs ml-2">
            {rating} ({reviews} reviews)
          </span>
        </div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-gray-600 flex items-center">
            <Clock className="h-4 w-4 mr-1 text-gray-400" />
            {totalTime} min
          </span>
        </div>

        {dietaryNeeds && dietaryNeeds.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {dietaryNeeds.map((need, index) => (
              <span
                key={index}
                className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full"
              >
                {need}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;

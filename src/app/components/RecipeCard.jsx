import React from "react";
import { Star } from "lucide-react";

const RecipeCard = ({ tag, image, title, rating, reviews, time, category }) => {
  const filledStars = Math.floor(rating);
  const emptyStars = 5 - filledStars;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <div className="h-48 bg-gray-200 relative">
        <div className="absolute top-2 left-2 bg-green-500 shadow-lg text-white text-xs font-bold px-2 py-1 rounded">
          {tag}
        </div>
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full rounded-lg"
        />
      </div>
      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-800 mb-2">{title}</h3>
        <div className="flex items-center mb-3">
          <div className="flex">
            {/* Render filled stars */}
            {Array(filledStars)
              .fill()
              .map((_, i) => (
                <Star
                  key={`filled-${i}`}
                  className="h-4 w-4 text-yellow-400"
                  fill="#F4D35E"
                />
              ))}

            {/* Render empty stars */}
            {Array(emptyStars)
              .fill()
              .map((_, i) => (
                <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
              ))}
          </div>
          <span className="text-xs text-gray-500 ml-2">{reviews}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">{time}</span>
          <span className="text-sm bg-teal-100 text-teal-800 px-2 py-1 rounded">
            {category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;

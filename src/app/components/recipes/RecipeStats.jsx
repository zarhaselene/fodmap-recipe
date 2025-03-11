import { useState } from "react";
import { Clock, Users } from "lucide-react";

export default function RecipeStats({ recipe, servings, setServings }) {
  return (
    <>
      {[
        { label: "Prep Time", value: `${recipe.prepTime} min` },
        { label: "Cook Time", value: `${recipe.cookTime} min` },
        { label: "Total Time", value: `${recipe.totalTime} min` },
      ].map((item, index) => (
        <div key={index} className="bg-gray-50 p-4 rounded-lg text-center">
          <Clock size={20} className="mx-auto mb-1 text-teal-500" />
          <div className="text-sm text-gray-500">{item.label}</div>
          <div className="font-medium">{item.value}</div>
        </div>
      ))}
      <div className="bg-gray-50 p-4 rounded-lg text-center">
        <Users size={20} className="mx-auto mb-1 text-teal-500" />
        <div className="text-sm text-gray-500">Servings</div>
        <div className="flex items-center justify-center">
          <button
            className="text-teal-500 px-1"
            onClick={() => setServings(Math.max(1, servings - 1))}
          >
            -
          </button>
          <span className="font-medium mx-1">{servings}</span>
          <button
            className="text-teal-500 px-1"
            onClick={() => setServings(servings + 1)}
          >
            +
          </button>
        </div>
      </div>
    </>
  );
}

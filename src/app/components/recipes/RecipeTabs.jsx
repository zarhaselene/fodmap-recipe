import { useState } from "react";
import { Globe } from "lucide-react";

export default function RecipeTabs({
  recipe,
  servings,
  updateIngredientAmount,
  useUSMeasurements,
  toggleMeasurementSystem,
}) {
  const [activeTab, setActiveTab] = useState("ingredients");

  return (
    <div>
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex space-x-8">
          {[
            { label: "Ingredients", value: "ingredients" },
            { label: "Instructions", value: "instructions" },
          ].map((tab) => (
            <button
              key={tab.value}
              className={`pb-4 ${
                activeTab === tab.value
                  ? "border-b-2 border-teal-500 text-teal-600 font-medium"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Measurement toggle */}
      {activeTab === "ingredients" && (
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleMeasurementSystem}
            className="flex items-center text-sm bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md transition"
          >
            <Globe size={16} className="mr-2 text-teal-600" />
            <span>
              {useUSMeasurements
                ? "Switch to EU (Metric)"
                : "Switch to US (Imperial)"}
            </span>
          </button>
        </div>
      )}

      {/* Tab content */}
      {activeTab === "ingredients" && (
        <div>
          <h2 className="text-xl font-bold mb-4">
            Ingredients{" "}
            <span className="text-sm font-normal text-gray-500">
              ({useUSMeasurements ? "US" : "EU"} Measurements)
            </span>
          </h2>
          <ul className="space-y-3">
            {Array.isArray(recipe.ingredients) &&
              recipe.ingredients.map((ingredient, index) => (
                <li key={index}>
                  <input
                    type="checkbox"
                    id={`ingredient-${index}`}
                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded mr-3"
                  />
                  <label
                    htmlFor={`ingredient-${index}`}
                    className="text-gray-700"
                  >
                    {updateIngredientAmount(
                      ingredient,
                      servings,
                      recipe.servings
                    )}
                  </label>
                </li>
              ))}
          </ul>
        </div>
      )}

      {activeTab === "instructions" && (
        <div>
          <h2 className="text-xl font-bold mb-4">Instructions</h2>
          <ol className="space-y-6">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="flex items-center">
                <div className="flex-shrink-0 h-8 w-8 bg-teal-500 text-white rounded-full flex items-center justify-center mr-4 font-medium mt-1">
                  {index + 1}
                </div>
                <div className="text-gray-700">{instruction}</div>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Tags */}
      <div className="mt-12 mb-8">
        <h3 className="text-gray-500 text-sm mb-2">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {recipe.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      {/* Related recipes */}
    </div>
  );
}

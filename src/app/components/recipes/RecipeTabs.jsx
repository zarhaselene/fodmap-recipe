import { useState } from "react";
import { Globe, Check } from "lucide-react";

export default function RecipeTabs({
  recipe,
  servings,
  updateIngredientAmount,
  useUSMeasurements,
  toggleMeasurementSystem,
}) {
  const [activeTab, setActiveTab] = useState("ingredients");
  const [completedInstructions, setCompletedInstructions] = useState([]);
  const [completedIngredients, setCompletedIngredients] = useState([]);

  const handleInstructionClick = (index) => {
    setCompletedInstructions((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleIngredientCheck = (index) => {
    setCompletedIngredients((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const progressPercentage =
    recipe.instructions.length > 0
      ? Math.round(
          (completedInstructions.length / recipe.instructions.length) * 100
        )
      : 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      {/* Progress bar */}
      {activeTab === "instructions" && (
        <div className="px-4 pt-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium">Progress</span>
            <span className="text-gray-500">
              {progressPercentage}% complete
            </span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
            <div
              className="bg-teal-500 h-2 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200 px-4">
        <div className="flex space-x-8">
          {[
            { label: "Ingredients", value: "ingredients" },
            { label: "Instructions", value: "instructions" },
          ].map((tab) => (
            <button
              key={tab.value}
              className={`py-4 relative focus:outline-none focus:ring-2 focus:ring-teal-500 rounded ${
                activeTab === tab.value
                  ? "text-teal-600 font-medium"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab(tab.value)}
              aria-selected={activeTab === tab.value}
              role="tab"
            >
              {tab.label}
              {activeTab === tab.value && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-500 rounded-t"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content container with consistent padding */}
      <div className="p-4">
        {/* Measurement toggle */}
        {activeTab === "ingredients" && (
          <div className="flex justify-end mb-4">
            <button
              onClick={toggleMeasurementSystem}
              className="flex items-center text-sm bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors duration-200 border border-gray-100 hover:cursor-pointer"
              aria-label={`Switch to ${
                useUSMeasurements ? "metric" : "imperial"
              } measurements`}
            >
              <Globe size={16} className="mr-2 text-teal-600" />
              <span>
                {useUSMeasurements ? "Switch to Metric" : "Switch to Imperial"}
              </span>
            </button>
          </div>
        )}

        {/* Ingredients tab content */}
        {activeTab === "ingredients" && (
          <div>
            <h2 className="text-xl font-bold mb-4">
              Ingredients{" "}
              <span className="text-sm font-normal text-gray-500">
                ({useUSMeasurements ? "Imperial" : "Metric"})
              </span>
            </h2>
            <ul className="space-y-3">
              {Array.isArray(recipe.ingredients) &&
                recipe.ingredients.map((ingredient, index) => (
                  <li
                    key={index}
                    className="flex items-start p-2 rounded-lg transition-colors duration-200 hover:bg-gray-50"
                  >
                    <div className="flex items-center h-6 mt-0.5">
                      <input
                        type="checkbox"
                        id={`ingredient-${index}`}
                        checked={completedIngredients.includes(index)}
                        onChange={() => handleIngredientCheck(index)}
                        className="h-5 w-5 text-teal-600 focus:ring-teal-500 border-gray-300 rounded cursor-pointer"
                      />
                    </div>
                    <label
                      htmlFor={`ingredient-${index}`}
                      className={`ml-3 cursor-pointer transition-colors duration-200 ${
                        completedIngredients.includes(index)
                          ? "line-through text-gray-400"
                          : "text-gray-700"
                      }`}
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

        {/* Instructions tab content */}
        {activeTab === "instructions" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Instructions</h2>
            <ol className="space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <li
                  key={index}
                  className="flex items-start p-3 rounded-lg transition-all duration-200 hover:bg-gray-50 hover:cursor-pointer group"
                  onClick={() => handleInstructionClick(index)}
                >
                  <div
                    className={`flex-shrink-0 h-8 w-8 transition-all duration-200 ${
                      completedInstructions.includes(index)
                        ? "bg-teal-600 ring-2 ring-teal-100"
                        : "bg-teal-500 group-hover:bg-teal-600 group-hover:shadow-md"
                    } text-white rounded-full flex items-center justify-center mr-4 font-medium`}
                  >
                    {completedInstructions.includes(index) ? (
                      <Check size={16} />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  <div
                    className={`transition-all duration-200 ${
                      completedInstructions.includes(index)
                        ? "line-through text-gray-400"
                        : "text-gray-700 group-hover:text-gray-900"
                    }`}
                  >
                    {instruction}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Tags */}
        <div className="mt-8 mb-2">
          <h3 className="text-gray-500 text-sm mb-2 font-medium">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {recipe.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-50 text-gray-700 border border-gray-200 px-3 py-1 rounded text-sm hover:bg-gray-100 transition-colors duration-200 cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

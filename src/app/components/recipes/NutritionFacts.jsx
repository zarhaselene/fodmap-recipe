const NutritionFacts = ({ recipe }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Nutrition Facts</h2>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
        {[
          { label: "Calories", value: recipe.nutritionFacts.calories },
          { label: "Protein", value: `${recipe.nutritionFacts.protein}g` },
          { label: "Fat", value: `${recipe.nutritionFacts.fat}g` },
          { label: "Carbs", value: `${recipe.nutritionFacts.carbs}g` },
          { label: "Fiber", value: `${recipe.nutritionFacts.fiber}g` },
          { label: "Sodium", value: `${recipe.nutritionFacts.sodium}mg` },
        ].map((item, index) => (
          <div key={index} className="bg-gray-50 p-3 rounded-lg text-center">
            <div className="text-sm text-gray-500">{item.label}</div>
            <div className="font-medium">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NutritionFacts;

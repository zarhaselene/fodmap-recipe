import React from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const SubstitutionItem = ({ emoji, title, alternatives }) => {
  return (
    <div className="border border-gray-200 rounded-md p-4 mb-2">
      <div className="flex items-center">
        <div className="flex-shrink-0 h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
          <span className="text-lg">{emoji}</span>
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600">{alternatives}</p>
        </div>
      </div>
    </div>
  );
};

const SubstitutionGuide = ({ substitutions = [] }) => {
  // Default substitutions if none are provided
  const defaultSubstitutions = [
    {
      emoji: "🧅",
      title: "Instead of Onion",
      alternatives:
        "Use green parts of spring onions, chives, or asafoetida powder",
    },
    {
      emoji: "🧄",
      title: "Instead of Garlic",
      alternatives: "Use garlic-infused oil, chives, or garlic chives",
    },
    {
      emoji: "🥛",
      title: "Instead of Regular Milk",
      alternatives: "Use lactose-free milk, almond milk, or rice milk",
    },
    {
      emoji: "🍎",
      title: "Instead of Apples",
      alternatives: "Use oranges, kiwi, or strawberries",
    },
  ];

  const itemsToShow =
    substitutions.length > 0 ? substitutions : defaultSubstitutions;

  return (
    <div className="mt-8">
      {itemsToShow.map((item, index) => (
        <SubstitutionItem
          key={index}
          emoji={item.emoji}
          title={item.title}
          alternatives={item.alternatives}
        />
      ))}
      <div className="mt-4">
        <Link
          href="/substitution-guide"
          className="text-teal-600 hover:text-teal-700 text-sm font-medium flex items-center"
        >
          View full substitution guide
          <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default SubstitutionGuide;

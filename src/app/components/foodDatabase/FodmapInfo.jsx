import React from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const FodmapTypeCard = ({ title, description }) => {
  return (
    <div className="rounded-md bg-teal-50 p-4">
      <h3 className="text-sm font-medium text-teal-800 mb-2">{title}</h3>
      <p className="text-sm text-teal-700">{description}</p>
    </div>
  );
};

const FodmapInfo = () => {
  const fodmapTypes = [
    {
      title: "Oligosaccharides (O)",
      description:
        "Found in wheat, rye, legumes, and some vegetables like onions and garlic.",
    },
    {
      title: "Disaccharides (D)",
      description:
        "Primarily lactose, found in dairy products like milk, soft cheeses, and yogurt.",
    },
    {
      title: "Monosaccharides (M)",
      description:
        "Mainly fructose, found in honey, apples, mangoes, and high-fructose corn syrup.",
    },
    {
      title: "Polyols (P)",
      description:
        "Sugar alcohols like sorbitol and mannitol, found in some fruits and vegetables and used as sweeteners.",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-8">
      <h2 className="text-lg font-medium text-gray-900 mb-4">
        What are FODMAPs?
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        FODMAP stands for Fermentable Oligosaccharides, Disaccharides,
        Monosaccharides, and Polyols. These are types of carbohydrates that can
        be poorly absorbed in the small intestine and may trigger digestive
        symptoms in people with irritable bowel syndrome (IBS) and other
        functional gut disorders.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {fodmapTypes.map((type, index) => (
          <FodmapTypeCard
            key={index}
            title={type.title}
            description={type.description}
          />
        ))}
      </div>

      <div className="mt-6">
        <Link
          href="/learn-more-fodmaps"
          className="text-teal-600 hover:text-teal-700 text-sm font-medium flex items-center"
        >
          Learn more about FODMAPs
          <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default FodmapInfo;

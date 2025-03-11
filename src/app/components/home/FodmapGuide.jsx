import Link from "next/link";
import { BookOpen } from "lucide-react";
import FodmapCard from "./FodmapCard";

const FodmapGuide = () => {
  const lowFodmapItems = [
    "Carrots",
    "Rice",
    "Strawberries",
    "Cucumber",
    "Kiwi",
  ];
  const moderateFodmapItems = [
    "Avocado (max - 30g)",
    "Sweet potato (max - 75g)",
    "Broccoli (max - 45g)",
    "Almonds (max - 15g)",
    "Oats (max - 20g)",
  ];
  const highFodmapItems = [
    "Garlic",
    "Onions",
    "Apples",
    "Wheat bread",
    "Honey",
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl md:text-3xl font-bold text-teal-700 mb-12">
          Quick FODMAP Guide
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FodmapCard
            title="Low FODMAP"
            color="green"
            icon="M5 13l4 4L19 7"
            foodItems={lowFodmapItems}
          />
          <FodmapCard
            title="Moderate FODMAP"
            color="yellow"
            icon="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            foodItems={moderateFodmapItems}
          />
          <FodmapCard
            title="High FODMAP"
            color="red"
            icon="M6 18L18 6M6 6l12 12"
            foodItems={highFodmapItems}
          />
        </div>

        <div className="text-center mt-10">
          <Link
            href="#"
            className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium"
          >
            <BookOpen className="h-5 w-5 mr-2" />
            Learn more about FODMAP
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FodmapGuide;

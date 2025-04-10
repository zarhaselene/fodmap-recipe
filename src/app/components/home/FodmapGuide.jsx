"use client";
import Link from "next/link";
import { ChevronRight, Check, X, TriangleAlert } from "lucide-react";
import FodmapCard from "./FodmapCard";
import { motion } from "framer-motion";

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col md:flex-row items-start justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-teal-700">
            Quick FODMAP Guide
          </h2>
          <motion.div
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Link
              href="/resources/guides/fodmap"
              className="text-teal-700 hover:text-teal-900 flex items-center font-medium"
            >
              Learn more <ChevronRight className="h-5 w-5 ml-1" />
            </Link>
          </motion.div>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={itemVariants}>
            <FodmapCard
              title="Low FODMAP"
              color="green"
              icon={<Check className="text-white h-[22px]" />}
              foodItems={lowFodmapItems}
              animationProps={{
                whileHover: { scale: 1.03, y: -5 },
                transition: { type: "spring", stiffness: 300, damping: 10 },
              }}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <FodmapCard
              title="Moderate FODMAP"
              color="yellow"
              icon={<TriangleAlert className="text-white h-[22px]" />}
              foodItems={moderateFodmapItems}
              animationProps={{
                whileHover: { scale: 1.03, y: -5 },
                transition: { type: "spring", stiffness: 300, damping: 10 },
              }}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <FodmapCard
              title="High FODMAP"
              color="red"
              icon={<X className="text-white h-[22px]" />}
              foodItems={highFodmapItems}
              animationProps={{
                whileHover: { scale: 1.03, y: -5 },
                transition: { type: "spring", stiffness: 300, damping: 10 },
              }}
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="text-center md:text-left mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        ></motion.div>
      </div>
    </section>
  );
};

export default FodmapGuide;

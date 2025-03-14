"use client";
import { motion } from "framer-motion";
import TestimonialCard from "./TestimonialCard";

const testimonials = [
  {
    name: "Sarah T.",
    memberSince: "2023",
    review:
      "This website has been a lifesaver for me. After being diagnosed with IBS, I was lost until I found this resource. The recipes are delicious and the food database is so comprehensive!",
    rating: 5,
    bgColor: "teal",
  },
  {
    name: "Michael K.",
    memberSince: "2022",
    review:
      "The AI recipe generator is amazing! It creates delicious meals based on what I have in my fridge, and I know they're safe for my digestion. I use this site every week for meal planning.",
    rating: 5,
    bgColor: "purple",
  },
  {
    name: "Jamie L.",
    memberSince: "2024",
    review:
      "The educational resources helped me understand my condition better. I successfully completed the elimination phase and now I know exactly which foods trigger my symptoms.",
    rating: 4,
    bgColor: "amber",
  },
];

const Testimonials = () => {
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
        <motion.h2
          className="text-left text-2xl md:text-3xl font-bold text-teal-700 mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          What Our Users Say
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={itemVariants}>
              <TestimonialCard {...testimonial} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;

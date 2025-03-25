import {
  Star,
  Download,
  Calendar,
  ShoppingBag,
  Clock,
  ChevronRight,
  FileText,
  FileSpreadsheet,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    text: "Weekly meal plans for all diet phases",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    text: "FODMAP-friendly shopping lists",
    icon: <ShoppingBag className="h-4 w-4" />,
  },
  {
    text: "Time-saving meal prep guides",
    icon: <Clock className="h-4 w-4" />,
  },
];

const MealPlanning = ({ setActiveCategory }) => {
  return (
    <div className="md:flex md:items-center md:justify-between">
      <motion.div
        className="md:w-1/2 mb-8 md:mb-0 md:pr-12"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-teal-700 mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Simplify Your FODMAP Journey with Meal Planning
        </motion.h2>
        <motion.p
          className="text-gray-600 mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          One of the biggest challenges of the FODMAP diet is figuring out what
          to eat. Our meal planning resources take the guesswork out with:
        </motion.p>
        <motion.ul
          className="space-y-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.4,
              },
            },
          }}
        >
          {features.map((item, index) => (
            <motion.li
              key={index}
              className="flex items-start"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.3 },
                },
              }}
            >
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mr-3 mt-0.5">
                {item.icon}
              </div>
              <p className="ml-3 text-gray-700">{item.text}</p>
            </motion.li>
          ))}
        </motion.ul>
        <motion.button
          className="mt-8 bg-teal-500 hover:bg-teal-600 text-white font-medium py-2.5 px-5 rounded-md transition-colors duration-300 flex items-center"
          onClick={() => setActiveCategory("Meal Planning")}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ x: 3 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          Browse Meal Planning Resources
          <ChevronRight className="ml-2 h-4 w-4" />
        </motion.button>
      </motion.div>

      <motion.div
        className="md:w-1/2"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <div className="aspect-w-16 aspect-h-9 rounded-md bg-gray-200 mb-4">
            <div className="flex items-center justify-center h-48 rounded-md bg-gradient-to-r from-teal-50 to-indigo-50">
              <FileSpreadsheet className="h-16 w-16 text-pink-400" />
            </div>
          </div>
          <motion.h3
            className="text-xl font-semibold mb-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            4-Week FODMAP Meal Plan
          </motion.h3>
          <motion.div
            className="flex items-center mb-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.7 + i * 0.1,
                    type: "spring",
                    stiffness: 400,
                  }}
                >
                  <Star
                    className="h-4 w-4"
                    fill={i < 4.6 ? "currentColor" : "none"}
                  />
                </motion.div>
              ))}
            </div>
            <span className="text-gray-600 text-sm ml-2">
              4.6 (112 reviews)
            </span>
          </motion.div>
          <motion.p
            className="text-gray-600 text-sm mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.7 }}
          >
            Complete meal plans with shopping lists and prep instructions.
          </motion.p>
          <motion.div
            className="flex justify-between items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.8 }}
          >
            <span className="text-sm text-gray-500 flex items-center">
              <FileText className="h-4 w-4 mr-1" /> PDF + Spreadsheet
            </span>
            <motion.button
              className="cursor-pointer text-teal-500 hover:text-teal-600 font-medium flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              Download
              <Download className="ml-1 h-4 w-4" />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default MealPlanning;

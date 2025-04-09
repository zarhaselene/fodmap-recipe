"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FAQItem = ({ faq, expandedFaq, setExpandedFaq }) => {
  const isOpen = expandedFaq === faq.id;

  return (
    <div className="mb-4">
      <button
        className="w-full bg-white p-4 rounded-lg shadow-sm flex justify-between items-center text-left hover:bg-gray-50 focus:outline-none cursor-pointer"
        onClick={() => setExpandedFaq(isOpen ? null : faq.id)}
      >
        <h3 className="font-semibold text-lg text-gray-800">{faq.question}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-5 w-5 text-gray-500" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="bg-white p-4 rounded-b-lg shadow-sm -mt-1 border-t border-gray-100">
              <motion.p
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                className="text-gray-600"
              >
                {faq.answer}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQSection = ({ faqs }) => {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const leftColumnFaqs = faqs.slice(0, Math.ceil(faqs.length / 2));
  const rightColumnFaqs = faqs.slice(Math.ceil(faqs.length / 2));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1"
    >
      <div className="text-center md:text-left mb-12">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl md:text-3xl font-bold text-gray-800 mb-4"
        >
          Frequently Asked Questions
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-gray-600 max-w-2xl"
        >
          Find answers to common questions about the low FODMAP diet and our
          resources
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        {/* Left Column */}
        <div>
          {leftColumnFaqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <FAQItem
                faq={faq}
                expandedFaq={expandedFaq}
                setExpandedFaq={setExpandedFaq}
              />
            </motion.div>
          ))}
        </div>

        {/* Right Column */}
        <div>
          {rightColumnFaqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: (index + leftColumnFaqs.length) * 0.1,
              }}
            >
              <FAQItem
                faq={faq}
                expandedFaq={expandedFaq}
                setExpandedFaq={setExpandedFaq}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default FAQSection;

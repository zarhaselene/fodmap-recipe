"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQItem = ({ faq, expandedFaq, setExpandedFaq }) => {
  return (
    <div className="mb-4">
      <button
        className="w-full bg-white p-4 rounded-lg shadow-sm flex justify-between items-center text-left hover:bg-gray-50 focus:outline-none"
        onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
      >
        <h3 className="font-semibold text-lg text-gray-800">{faq.question}</h3>
        <ChevronDown
          className={`h-5 w-5 text-gray-500 transform transition-transform ${
            expandedFaq === faq.id ? "rotate-180" : ""
          }`}
        />
      </button>
      {expandedFaq === faq.id && (
        <div className="bg-white p-4 rounded-b-lg shadow-sm -mt-1 border-t border-gray-100">
          <p className="text-gray-600">{faq.answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQSection = ({ faqs }) => {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const leftColumnFaqs = faqs.slice(0, Math.ceil(faqs.length / 2));
  const rightColumnFaqs = faqs.slice(Math.ceil(faqs.length / 2));

  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1">
      <div className="text-center md:text-left mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 max-w-2xl">
          Find answers to common questions about the low FODMAP diet and our
          resources
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        {/* Left Column */}
        <div>
          {leftColumnFaqs.map((faq) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              expandedFaq={expandedFaq}
              setExpandedFaq={setExpandedFaq}
            />
          ))}
        </div>

        {/* Right Column */}
        <div>
          {rightColumnFaqs.map((faq) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              expandedFaq={expandedFaq}
              setExpandedFaq={setExpandedFaq}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;

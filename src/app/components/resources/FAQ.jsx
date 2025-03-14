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

  return (
    <>
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Find answers to common questions about the low FODMAP diet and our
          resources
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        {faqs.map((faq) => (
          <FAQItem
            key={faq.id}
            faq={faq}
            expandedFaq={expandedFaq}
            setExpandedFaq={setExpandedFaq}
          />
        ))}
      </div>
    </>
  );
};

export default FAQSection;

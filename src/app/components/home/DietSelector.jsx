"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle, RefreshCw } from "lucide-react";

export default function DietSelector() {
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState({});
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      id: "symptoms",
      question: "What digestive symptoms do you experience most?",
      options: [
        "Bloating",
        "Stomach Pain",
        "Gas",
        "Diarrhea",
        "Multiple Symptoms",
        "No Symptoms",
      ],
    },
    {
      id: "frequency",
      question: "How often do these symptoms occur?",
      options: ["Rarely", "Sometimes", "Frequently", "Almost Always"],
    },
    {
      id: "diagnosis",
      question: "Have you been diagnosed with a digestive condition?",
      options: ["IBS", "Celiac Disease", "Crohn's", "No Diagnosis"],
    },
  ];

  const handleResponse = (answer) => {
    const currentQuestion = questions[step];

    setResponses((prev) => ({
      ...prev,
      [currentQuestion.id]: answer,
    }));

    if (step < questions.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const getRecommendation = () => {
    const { symptoms, frequency, diagnosis } = responses;

    if (
      (symptoms === "Multiple Symptoms" && frequency === "Frequently") ||
      diagnosis === "IBS"
    ) {
      return {
        title: "Comprehensive FODMAP Management Plan",
        description:
          "Your symptoms indicate a high likelihood of FODMAP sensitivity requiring a structured dietary approach.",
        dietRecommendation: "Strict Low FODMAP Elimination Diet",
        actionItems: [
          "Complete 2-6 week elimination phase",
          "Work with registered dietitian",
          "Keep detailed food and symptom diary",
          "Gradually reintroduce FODMAP groups",
        ],
      };
    }

    if (frequency === "Sometimes" && symptoms !== "No Symptoms") {
      return {
        title: "Gentle Dietary Modification Strategy",
        description:
          "You may benefit from a modified approach to manage mild digestive sensitivity.",
        dietRecommendation: "Modified Low FODMAP Approach",
        actionItems: [
          "Identify potential trigger foods",
          "Practice mindful eating",
          "Consider food sensitivity testing",
          "Implement stress management techniques",
        ],
      };
    }

    return {
      title: "Preventative Gut Health Guidance",
      description:
        "While your symptoms are minimal, proactive nutrition can support overall digestive wellness.",
      dietRecommendation: "Balanced, Gut-Friendly Nutrition",
      actionItems: [
        "Maintain diverse, nutrient-rich diet",
        "Focus on whole foods",
        "Incorporate probiotic-rich foods",
        "Stay hydrated",
        "Regular health check-ups",
      ],
    };
  };

  const resetQuiz = () => {
    setStep(0);
    setResponses({});
    setShowResult(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <div className="bg-white px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="bg-teal-50 rounded-xl p-8 shadow-md"
        >
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-teal-700 mb-6">
                  Personalized FODMAP Diet Insights
                </h2>
                <h3 className="text-xl text-teal-600 mb-6">
                  {questions[step].question}
                </h3>
                <motion.div
                  variants={containerVariants}
                  className="grid md:grid-cols-3 gap-4"
                >
                  {questions[step].options.map((option) => (
                    <motion.button
                      key={option}
                      variants={itemVariants}
                      onClick={() => handleResponse(option)}
                      className="bg-white border-2 border-teal-500 text-teal-700 
                        hover:bg-teal-100 py-3 rounded-lg 
                        transition-colors duration-200 
                        flex items-center justify-between px-4 cursor-pointer"
                    >
                      <span>{option}</span>
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  ))}
                </motion.div>
                <div className="mt-4 text-sm text-teal-600">
                  Step {step + 1} of {questions.length}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-teal-700 mb-6">
                  {getRecommendation().title}
                </h2>
                <p className="text-teal-600 mb-6">
                  {getRecommendation().description}
                </p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-lg p-6 mb-6"
                >
                  <h3 className="text-xl font-semibold text-teal-800 mb-4">
                    Recommended Diet Approach
                  </h3>
                  <p className="text-teal-700 mb-4">
                    {getRecommendation().dietRecommendation}
                  </p>

                  <h3 className="text-xl font-semibold text-teal-800 mb-4">
                    Recommended Next Steps
                  </h3>
                  <ul className="space-y-2 text-teal-700">
                    {getRecommendation().actionItems.map((item, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-teal-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <div className="flex items-center space-x-4">
                  <button
                    onClick={resetQuiz}
                    className="bg-white border-2 border-teal-500 text-teal-700 px-6 py-3 rounded-lg hover:bg-teal-100 flex items-center space-x-2 cursor-pointer"
                  >
                    <RefreshCw className="w-5 h-5" />
                    <span>Retake Quiz</span>
                  </button>
                  <motion.div>
                    <Link href="/resources">
                      <button className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 cursor-pointer">
                        Explore Resources
                      </button>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

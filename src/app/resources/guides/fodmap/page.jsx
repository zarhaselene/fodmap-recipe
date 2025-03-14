"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Hero from "@/app/components/shared/Hero";
import ResourcesCard from "@/app/components/resources/ResourcesCard";
import FAQSection from "@/app/components/resources/FAQ";
import { useResources } from "@/app/context/ResourcesContext";
import { motion } from "framer-motion";

import {
  ChevronRight,
  HelpCircle,
  Minimize2,
  Droplets,
  Zap,
  AlertTriangle,
  CheckCircle,
  MinusCircle,
  Plus,
  Settings,
} from "lucide-react";

const FodmapCard = ({
  letter,
  title,
  description,
  bgColor,
  textColor,
  index,
}) => (
  <motion.div
    className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 md:block"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{
      scale: 1.03,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
    }}
  >
    <div
      className={`w-12 h-12 ${bgColor} rounded-full flex items-center justify-center mb-4`}
    >
      <span className={`${textColor} font-bold`}>{letter}</span>
    </div>
    <h3 className="text-xl font-bold text-teal-800 mb-2">{title}</h3>
    <p className="text-gray-600 ">{description}</p>
  </motion.div>
);

const fodmapCategories = [
  {
    letter: "O",
    title: "Oligosaccharides",
    description:
      "Includes fructans and GOS. Found in wheat, rye, onions, garlic, and legumes.",
    bgColor: "bg-teal-100",
    textColor: "text-teal-600",
  },
  {
    letter: "D",
    title: "Disaccharides",
    description:
      "Lactose is the main disaccharide of concern. Found in milk, soft cheeses, yogurt, and ice cream.",
    bgColor: "bg-green-100",
    textColor: "text-green-600",
  },
  {
    letter: "M",
    title: "Monosaccharides",
    description:
      "Fructose (when in excess of glucose) is the main concern. Found in honey, apples, mangoes, and high-fructose corn syrup.",
    bgColor: "bg-purple-100",
    textColor: "text-purple-600",
  },
  {
    letter: "P",
    title: "Polyols",
    description:
      "Sugar alcohols such as sorbitol and mannitol. Found in some fruits and vegetables, and used as artificial sweeteners.",
    bgColor: "bg-amber-100",
    textColor: "text-amber-600",
  },
];
const PhaseCard = ({
  phase,
  title,
  description,
  points,
  link,
  color,
  icon: Icon,
}) => {
  const borderColorClass =
    color === "teal"
      ? "border-l-teal-500"
      : color === "green"
      ? "border-l-green-500"
      : color === "purple"
      ? "border-l-purple-500"
      : "border-l-teal-500";

  return (
    <motion.div
      className={`bg-white p-6 rounded-lg shadow-lg border-l-4 ${borderColorClass} hover:shadow-xl transition-all duration-300`}
      initial={{
        opacity: 0,
        x: phase === "Phase 1" || phase === "Phase 3" ? -50 : 50,
      }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:items-center md:flex-row items-start mb-4">
        <div
          className={`w-12 h-12 rounded-full bg-${color}-100 hidden md:flex items-center justify-center mr-4`}
        >
          <Icon className={`h-6 w-6 text-${color}-600`} />
        </div>
        <div>
          <motion.span
            className={`inline-block px-3 py-1 bg-${color}-100 text-${color}-800 rounded-full text-sm font-medium`}
            whileHover={{ scale: 1.05 }}
          >
            {phase}
          </motion.span>
          <h3 className="text-2xl font-bold text-teal-800 mt-1">{title}</h3>
        </div>
      </div>

      <p className="text-gray-600 mb-5 md:pl-16">{description}</p>

      <div className="bg-gray-50 p-4 rounded-lg mb-5">
        <h4 className={`text-${color}-700 font-medium mb-3`}>Key Steps:</h4>
        <ul className="space-y-3">
          {points.map((point, index) => (
            <motion.li
              key={index}
              className="flex items-start"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <CheckCircle
                className={`h-5 w-5 text-${color}-500 mr-3 mt-0.5 flex-shrink-0`}
              />
              <span className="text-gray-700">{point}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="pl-16 text-right">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href={link}
            className={`bg-${color}-100 hover:bg-${color}-200 text-${color}-800 px-4 py-2 rounded-md font-medium inline-flex items-center transition-colors duration-200`}
          >
            {title} Resources <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Phase = ({ phaseNumber, children, reverse, icon }) => {
  return (
    <div className="mb-20 md:mb-28 relative">
      <div
        className={`flex flex-col ${
          reverse ? "md:flex-row-reverse" : "md:flex-row"
        } items-center`}
      >
        <div className="md:w-1/2 md:px-12 mb-6 md:mb-0">{children}</div>
        <div className="md:w-1/2 flex justify-center relative">
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-3/4 h-3/4 rounded-full bg-gray-50 opacity-20"></div>
          </motion.div>
          <motion.div
            className={`relative hidden md:flex items-center justify-center bg-${children.props.color}-100 rounded-full h-20 w-20 md:h-24 md:w-24 z-10 shadow-lg border-4 border-white`}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2,
            }}
            whileHover={{ scale: 1.1 }}
          >
            <span
              className={`text-3xl font-bold text-${children.props.color}-700`}
            >
              {phaseNumber}
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const FODMAPGuidePage = () => {
  const { loading, searchedResources } = useResources();
  const [featuredResources, setFeaturedResources] = useState([]);
  const [expandedFaq, setExpandedFaq] = useState(null);

  useEffect(() => {
    // Filter resources from context instead of fetching again
    if (searchedResources.length > 0) {
      const fodmapGuides = searchedResources.filter(
        (resource) => resource.category === "FODMAP Guide"
      );
      setFeaturedResources(fodmapGuides.slice(0, 3));
    }
  }, [searchedResources]);

  const faqs = [
    {
      id: 1,
      question: "How long should I stay on the low FODMAP diet?",
      answer:
        "The elimination phase of the low FODMAP diet should last 2-6 weeks. It's not meant to be followed long-term as it's very restrictive and could potentially impact gut microbiome diversity. Work with a dietitian to reintroduce foods as soon as symptoms improve.",
    },
    {
      id: 2,
      question: "Can I follow a low FODMAP diet if I'm vegetarian or vegan?",
      answer:
        "Yes, but it requires careful planning to ensure adequate nutrition, particularly protein. Many plant proteins (like beans and lentils) are high in FODMAPs. Working with a dietitian is especially important for vegetarians and vegans to maintain balanced nutrition while on a low FODMAP diet.",
    },
    {
      id: 3,
      question: "Will the FODMAP diet cure my IBS?",
      answer:
        "The low FODMAP diet doesn't cure IBS, but it can effectively manage symptoms for many people. Research shows that about 70% of people with IBS experience relief while following the diet. The goal is to identify your personal triggers and develop a personalized diet that allows the greatest variety while minimizing symptoms.",
    },
    {
      id: 4,
      question: "Can I drink alcohol on a low FODMAP diet?",
      answer:
        "Some alcoholic beverages are low in FODMAPs, including certain wines, spirits, and gluten-free beers. However, alcohol itself can trigger IBS symptoms in many people regardless of FODMAP content. It's best to approach alcohol with caution and observe your individual response.",
    },
  ];

  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen relative">
      {/* Hero Section */}
      <Hero
        title="Understanding the FODMAP Diet"
        description="Your complete guide to navigating FODMAPs, managing IBS symptoms, and finding food freedom."
        searchPlaceholder={"Search FODMAP resources..."}
      />

      {/* What are FODMAPs Section */}
      <section className="py-16">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-3xl mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-teal-800 mb-4">
              What are FODMAPs?
            </h2>
            <p className="text-lg text-gray-600">
              FODMAP stands for Fermentable Oligosaccharides, Disaccharides,
              Monosaccharides, and Polyols. These are short-chain carbohydrates
              that can be poorly absorbed in the small intestine.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {fodmapCategories.map((item, index) => (
              <FodmapCard key={index} {...item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Do FODMAPs Cause Problems Section */}
      <section className="bg-gradient-to-br from-teal-50 to-teal-100 py-16">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              className="md:w-2/3 md:pr-12"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold text-teal-800 mb-4 flex items-center">
                <HelpCircle className="w-6 h-6 mr-3 text-teal-600" />
                Why Do FODMAPs Cause Problems?
              </h3>
              <p className="text-gray-700 mb-6 text-lg">
                In individuals with IBS or sensitive digestive systems, FODMAPs
                can trigger various digestive issues through a chain reaction:
              </p>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                {[
                  {
                    title: "Poor Absorption",
                    description:
                      "These carbohydrates are poorly absorbed in the small intestine.",
                    icon: <Minimize2 className="w-8 h-8 text-teal-500 mb-2" />,
                  },
                  {
                    title: "Osmotic Effect",
                    description:
                      "They draw water into the intestine, which can cause diarrhea.",
                    icon: <Droplets className="w-8 h-8 text-teal-500 mb-2" />,
                  },
                  {
                    title: "Fermentation",
                    description:
                      "Gut bacteria ferment these carbohydrates, producing excess gas.",
                    icon: <Zap className="w-8 h-8 text-teal-500 mb-2" />,
                  },
                  {
                    title: "Symptoms",
                    description:
                      "The combination leads to bloating, pain, gas, constipation, or diarrhea.",
                    icon: (
                      <AlertTriangle className="w-8 h-8 text-teal-500 mb-2" />
                    ),
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-white p-5 rounded-lg shadow-sm border border-teal-100 hover:shadow-md transition-shadow"
                    variants={fadeInUp}
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    {item.icon}
                    <h4 className="font-semibold text-teal-700 text-lg">
                      {item.title}
                    </h4>
                    <p className="text-gray-600">{item.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              className="md:w-1/3 mt-8 md:mt-0"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div
                className="relative rounded-xl overflow-hidden shadow-lg border-2 border-teal-200"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Image
                  src="/images/digestive-system.jpg"
                  alt="Digestive System"
                  width={400}
                  height={400}
                  className="object-cover w-full h-full"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-teal-800 to-transparent p-4">
                  <p className="text-white text-sm font-medium">
                    How FODMAPs affect your digestive system
                  </p>
                </div>
              </motion.div>
              <motion.div
                className="mt-4 bg-teal-700 text-white p-4 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <p className="text-sm">
                  <span className="font-bold">Did you know?</span> Up to 75% of
                  IBS patients report significant symptom improvement on a
                  low-FODMAP diet.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FODMAP Diet Phases */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-20">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-teal-600 font-medium">
              Your FODMAP Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-teal-800 mt-2">
              The Three Phases of the FODMAP Diet
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl">
              Following these three phases will help you identify your food
              triggers and create a personalized diet plan that works for your
              body.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline connector */}
            <motion.div
              className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-teal-300 to-purple-300 hidden md:block"
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
            ></motion.div>

            {/* Phase dots/connectors */}
            <motion.div
              className="absolute left-1/2 transform -translate-x-1/2 top-0 h-4 w-4 rounded-full bg-teal-500 hidden md:block"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            ></motion.div>
            <motion.div
              className="absolute left-1/2 transform -translate-x-1/2 top-1/3 h-4 w-4 rounded-full bg-green-500 hidden md:block"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            ></motion.div>
            <motion.div
              className="absolute left-1/2 transform -translate-x-1/2 top-2/3 h-4 w-4 rounded-full bg-purple-500 hidden md:block"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1 }}
            ></motion.div>
            <motion.div
              className="absolute left-1/2 transform -translate-x-1/2 bottom-0 h-4 w-4 rounded-full bg-purple-500 hidden md:block"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.4 }}
            ></motion.div>

            <Phase phaseNumber={1}>
              <PhaseCard
                phase="Phase 1"
                title="Elimination"
                description="For 2-6 weeks, remove all high-FODMAP foods from your diet to allow your digestive system to reset."
                points={[
                  "Follow a strict low-FODMAP diet with guidance",
                  "Track your symptoms and food intake",
                  "Monitor symptom improvement",
                ]}
                link="/resources?category=Elimination%20Phase"
                color="teal"
                icon={MinusCircle}
              />
            </Phase>

            <Phase phaseNumber={2} reverse>
              <PhaseCard
                phase="Phase 2"
                title="Reintroduction"
                description="Systematically reintroduce FODMAP groups one at a time to identify which ones trigger your symptoms."
                points={[
                  "Test one FODMAP group at a time",
                  "Record symptoms and food intake",
                  "Identify trigger foods and tolerance levels",
                ]}
                link="/resources?category=Reintroduction"
                color="green"
                icon={Plus}
              />
            </Phase>

            <Phase phaseNumber={3}>
              <PhaseCard
                phase="Phase 3"
                title="Personalization"
                description="Create your personalized long-term FODMAP diet based on your tolerance levels identified during reintroduction."
                points={[
                  "Develop a diverse, balanced diet",
                  "Include as many foods as your body tolerates",
                  "Continue to maintain gut health",
                ]}
                link="/resources?category=Personalization%20Phase"
                color="purple"
                icon={Settings}
              />
            </Phase>
          </div>

          <motion.div
            className="mt-16 text-right"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/resources?category=FODMAP%20Guide"
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-medium inline-flex items-center shadow-md hover:shadow-lg transition-all duration-200"
            >
              Explore All FODMAP Resources
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="bg-gray-50 py-16">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-teal-800 mb-4">
              FODMAP Resources
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl">
              Download our free guides, tools, and checklists to help you
              navigate your FODMAP journey with confidence.
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-12">
              <motion.div
                className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              ></motion.div>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {featuredResources.map((resource, index) => (
                <motion.div
                  key={resource.id}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.03, y: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <ResourcesCard resource={resource} />
                </motion.div>
              ))}
            </motion.div>
          )}

          <motion.div
            className="mt-12 text-right"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href="/resources"
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded font-medium inline-flex items-center"
            >
              View All FODMAP Resources
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 to-white">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <FAQSection
            faqs={faqs.map((faq) => ({
              ...faq,
              motion: {
                initial: { opacity: 0, height: 0 },
                animate: { opacity: 1, height: "auto" },
                exit: { opacity: 0, height: 0 },
                transition: { duration: 0.3 },
              },
            }))}
            expandedFaq={expandedFaq}
            setExpandedFaq={setExpandedFaq}
          />
        </motion.div>
      </section>
    </div>
  );
};
export default FODMAPGuidePage;

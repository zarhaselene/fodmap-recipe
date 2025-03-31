"use client";

import { Suspense } from "react";
import Resources from "../components/resources/ResourcesPage";
import { motion } from "framer-motion";

const ResourcesPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          <motion.div
            className="border-t-4 border-teal-500 border-solid w-8 h-8 rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
      }
    >
      <Resources />
    </Suspense>
  );
};

export default ResourcesPage;

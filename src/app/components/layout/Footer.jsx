"use client";
import React, { useState } from "react";
import Link from "next/link";

const Footer = () => {
  // State to track which accordion sections are open on mobile
  const [openSections, setOpenSections] = useState({});

  // Toggle function for accordion sections
  const toggleSection = (title) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const footerSections = [
    {
      title: "About",
      links: ["Our Story", "Team", "Blog", "Careers"],
    },
    {
      title: "Resources",
      links: ["Food Database", "Recipes", "Meal Plans", "FODMAP Guide"],
    },
    {
      title: "Support",
      links: ["Help Center", "Contact Us", "FAQ", "Community"],
    },
    {
      title: "Legal",
      links: [
        "Privacy Policy",
        "Terms of Service",
        "Cookie Policy",
        "Disclaimer",
      ],
    },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z",
    },
    {
      name: "Instagram",
      icon: "M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z",
    },
    {
      name: "Github",
      icon: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z",
    },
  ];

  return (
    <footer className="bg-teal-800 text-white mt-8">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6">
        {/* Mobile layout */}
        <div className="md:hidden">
          {footerSections.map((section) => (
            <div key={section.title} className="border-b border-white/20">
              <button
                className="w-full py-4 flex justify-between items-center"
                onClick={() => toggleSection(section.title)}
                aria-expanded={openSections[section.title]}
              >
                <h3 className="text-sm font-semibold tracking-wider uppercase">
                  {section.title}
                </h3>
                <svg
                  className={`h-5 w-5 transition-transform ${
                    openSections[section.title] ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openSections[section.title] && (
                <ul className="mt-2 mb-4 space-y-3 pl-4">
                  {section.links.map((link, idx) => (
                    <li key={idx}>
                      <Link
                        href={`/${section.title.toLowerCase()}/${link
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        className="text-base text-white hover:text-teal-400"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Desktop grid layout */}
        <div className="hidden md:grid md:grid-cols-4 gap-8 text-left">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={`/${section.title.toLowerCase()}/${link
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="text-base text-white hover:text-teal-400"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Links & Newsletter */}
        <div className="mt-8  ">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Social icons */}
            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-sm font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-6">
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href="#"
                    className="text-white hover:text-teal-400 transition-colors"
                    aria-label={social.name}
                  >
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d={social.icon}
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="md:flex md:flex-col md:justify-start">
              <h4 className="text-center md:text-left text-sm font-semibold mb-3">
                Stay Updated with FODMAP News
              </h4>
              <form className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-grow">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-4 py-2 bg-teal-700 text-white placeholder-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 border border-teal-600"
                    required
                  />
                  <button
                    type="submit"
                    className="md:absolute md:right-1 md:top-1 md:bottom-1 bg-teal-500 hover:bg-teal-400 text-white font-medium px-4 py-2 md:py-1 rounded-md md:rounded transition-colors mt-2 md:mt-0 w-full md:w-auto"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
              <p className="text-xs text-gray-300 mt-2 text-center md:text-left">
                Get weekly recipes and FODMAP-friendly tips
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

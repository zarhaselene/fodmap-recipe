"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Facebook, Github, InstagramIcon } from "lucide-react";

const Footer = () => {
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
      links: [
        { name: "Our Story", path: "/about/our-story" },
        { name: "Team", path: "/about/team" },
        { name: "Blog", path: "/about/blog" },
        { name: "Careers", path: "/about/careers" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "FODMAP Guides", path: "/resources?category=FODMAP+Guides" },
        {
          name: "Elimination Phase",
          path: "/resources?category=Elimination+Phase",
        },
        { name: "Reintroduction", path: "/resources?category=Reintroduction" },
        { name: "Meal Plans", path: "/resources?category=Meal+Planning" },
        { name: "Printables", path: "/resources?category=Printables" },
      ],
    },
    {
      title: "Pages",
      links: [
        { name: "Food Database", path: "/food-database" },
        { name: "Recipes", path: "/recipes" },
        { name: "Resources", path: "/resources" },
        { name: "FODMAP Guide", path: "/resources/guides/fodmap" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", path: "/support/help-center" },
        { name: "Contact Us", path: "/support/contact-us" },
        { name: "FAQ", path: "/support/faq" },
        { name: "Community", path: "/support/community" },
      ],
    },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
    },
    {
      name: "Instagram",
      icon: InstagramIcon,
    },
    {
      name: "Github",
      icon: Github,
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
                className="w-full py-4 flex justify-between items-start"
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
                        href={link.path}
                        className="text-base text-white hover:text-teal-400"
                      >
                        {link.name}
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
                      href={link.path}
                      className="text-base text-white hover:text-teal-400"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Links & Newsletter */}
        <div className="mt-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Social icons */}
            <div className="flex flex-col items-start">
              <h4 className="text-sm font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-6">
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href="#"
                    className="text-white hover:text-teal-400 transition-colors"
                    aria-label={social.name}
                  >
                    <social.icon className="h-6 w-6" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="md:flex md:flex-col md:justify-start">
              <h4 className="text-left text-sm font-semibold mb-3">
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
              <p className="text-xs text-gray-300 mt-2 text-left">
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

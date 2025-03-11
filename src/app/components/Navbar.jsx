"use client";

import { useState } from "react";
import Link from "next/link";
import MenuIcon from "@/app/components/icons/MenuIcon";

const navLinkClasses =
  "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium";

const activeLinkClasses =
  "border-teal-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium";

const mobileNavLinkClasses =
  "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50 block pl-3 pr-4 py-2 border-l-4 text-base font-medium";

const mobileActiveLinkClasses =
  "border-teal-500 text-teal-700 bg-teal-50 block pl-3 pr-4 py-2 border-l-4 text-base font-medium";

const NavLink = ({ href, children, isActive, isMobile }) => {
  return (
    <Link
      href={href}
      className={
        isMobile
          ? isActive
            ? mobileActiveLinkClasses
            : mobileNavLinkClasses
          : isActive
          ? activeLinkClasses
          : navLinkClasses
      }
    >
      {children}
    </Link>
  );
};

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Logo */}
            <div className="text-2xl font-bold text-teal-700">FODMAP</div>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <NavLink href="/" isActive={true}>
                Home
              </NavLink>
              <NavLink href="/food-database">Food Database</NavLink>
              <NavLink href="/recipes">Recipes</NavLink>
              <NavLink href="/resources">Resources</NavLink>
            </div>
          </div>
          <div className="flex items-center">
            <button
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
              onClick={toggleMobileMenu}
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Open menu</span>
              <MenuIcon className="w-8 h-8 text-teal-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <NavLink href="/" isActive={true} isMobile={true}>
              Home
            </NavLink>
            <NavLink href="/food-database" isMobile={true}>
              Food Database
            </NavLink>
            <NavLink href="/recipes" isMobile={true}>
              Recipes
            </NavLink>
            <NavLink href="/resources" isMobile={true}>
              Resources
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";
import LoginBtn from "./LoginBtn"; // Ensure correct path

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Menu links stored in an array (No repetition!)
  const menuLinks = [
    { name: "Home", path: "/" },
    { name: "Expenses", path: "/expenses" },
    { name: "Income", path: "/income" },
    { name: "Categories", path: "/categories" },
  ];

  // Framer Motion animation variants (Slide from Right)
  const sidebarVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: "0%", opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false); // Close mobile menu if screen is resized to desktop
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="bg-gray-900 text-white">
      <div className="container mx-auto flex justify-between items-center p-4">

        {/* Logo */}
        <p className="text-2xl font-bold">
          BudgetApp
        </p>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <ul className="flex space-x-6">
            {menuLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.path} className="hover:text-gray-400">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Login Button */}
          <LoginBtn />
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? (
            <XMarkIcon className="w-8 h-8 text-white" />
          ) : (
            <Bars3Icon className="w-8 h-8 text-white" />
          )}
        </button>
      </div>

      {/* Mobile Menu - Sliding from Right */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={sidebarVariants}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 right-0 h-full w-64 bg-gray-800 shadow-lg p-6 flex flex-col z-10"
          >
            {/* Close Button */}
            <button onClick={() => setIsOpen(false)} className="self-end text-white">
              <XMarkIcon className="w-8 h-8" />
            </button>

            {/* Menu Items */}
            <ul className="flex flex-col space-y-4 text-lg mt-4">
              {menuLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.path} onClick={() => setIsOpen(false)}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Move Login Button Below Menu (No mt-auto) */}
            <div className="mt-6"> {/* Add margin for spacing */}
              <LoginBtn />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
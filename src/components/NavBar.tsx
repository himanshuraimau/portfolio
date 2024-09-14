"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: "/stuff", label: "/stuff" },
  { href: "/blog", label: "/blog" },
];

interface NavLinkProps {
  href: string;
  label: string;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ href, label, onClick }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`font-mono text-lg lg:text-xl transition-colors duration-300 ${
        isActive ? 'text-green-300' : 'text-gray-300 hover:text-green-400'
      }`}
      onClick={onClick}
    >
      {label}
    </Link>
  );
};

const NavBar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isDropdownOpen ? 'hidden' : 'visible';
    return () => { document.body.style.overflow = 'visible'; };
  }, [isDropdownOpen]);

  // Close the dropdown when the pathname changes
  useEffect(() => {
    setIsDropdownOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 bg-black text-gray-300 py-4 lg:py-6 shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="font-mono text-xl lg:text-2xl font-bold text-gray-300 hover:text-green-300  transition-colors duration-300">
          himanshu rai
        </Link>

        <nav className="hidden md:flex space-x-8 lg:space-x-12">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>

        <button
          className="md:hidden text-gray-300 focus:outline-none"
          onClick={toggleDropdown}
          aria-label={isDropdownOpen ? "Close menu" : "Open menu"}
        >
          {isDropdownOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-60"
          >
            <motion.div
              ref={dropdownRef}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 h-screen w-64 sm:w-80 bg-black text-gray-300 p-5 z-70"
            >
              <button
                className="absolute top-4 right-4 text-gray-300 focus:outline-none"
                onClick={toggleDropdown}
                aria-label="Close menu"
              >
                <X size={28} />
              </button>
              <nav className="flex flex-col space-y-6 mt-16">
                {navLinks.map((link) => (
                  <NavLink key={link.href} {...link} onClick={toggleDropdown} />
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default NavBar;
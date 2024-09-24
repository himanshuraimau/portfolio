"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';

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
        isActive ? 'text-accent-green' : 'text-text hover:text-accent-green'
      }`}
      onClick={onClick}
    >
      {label}
    </Link>
  );
};

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-full text-text hover:text-accent-green transition-colors duration-300 focus:outline-none"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
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

  useEffect(() => {
    setIsDropdownOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 bg-nav text-text py-4 lg:py-6 shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="font-mono text-xl lg:text-2xl font-bold text-text hover:text-accent-green transition-colors duration-300">
          Himanshu Rai
        </Link>

        <nav className="hidden md:flex items-center space-x-8 lg:space-x-12">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
          <ThemeToggle />
        </nav>

        <div className="md:hidden flex items-center space-x-4">
          <ThemeToggle />
          <button
            className="text-text focus:outline-none"
            onClick={toggleDropdown}
            aria-label={isDropdownOpen ? "Close menu" : "Open menu"}
          >
            {isDropdownOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-body bg-opacity-50 z-60"
          >
            <motion.div
              ref={dropdownRef}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 h-screen w-64 sm:w-80 bg-nav text-text p-5 z-70"
            >
              <button
                className="absolute top-4 right-4 text-text focus:outline-none"
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
"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isDropdownOpen ? 'hidden' : 'visible';
  }, [isDropdownOpen]);

  const navLinks = [
    { href: "/projects", label: "/stuff" },
    { href: "/me", label: "/me" },
    { href: "/blogs", label: "/blog" },
  ];

  return (
    <div className="sticky top-0 z-50">
      <nav className="bg-black text-gray-300 py-4 lg:py-6">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link
            href="/"
            className="font-mono text-xl lg:text-2xl font-bold text-center text-body-light transition-colors duration-300"
          >
            <span className="hover:text-blue-400">himanshu rai</span>
          </Link>

          <div className="hidden md:flex space-x-8 lg:space-x-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono text-lg lg:text-xl text-body-light hover:text-blue-400 transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            className="md:hidden text-body-light focus:outline-none"
            onClick={toggleDropdown}
            aria-label="Toggle menu"
          >
            {isDropdownOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isDropdownOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          ref={dropdownRef}
          className={`fixed right-0 top-0 h-screen w-64 sm:w-80 bg-black text-gray-300 p-5 transform transition-transform duration-300 ease-in-out ${
            isDropdownOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <button
            className="absolute top-4 right-4 text-body-light focus:outline-none"
            onClick={toggleDropdown}
            aria-label="Close menu"
          >
            <FiX size={28} />
          </button>
          <div className="flex flex-col space-y-6 mt-16">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono text-xl text-center text-body-light hover:text-blue-400 transition-colors duration-300"
                onClick={toggleDropdown}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
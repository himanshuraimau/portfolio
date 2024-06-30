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
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div>
      <nav className="bg-black text-gray-300 pt-8 pb-8 relative z-10">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="font-system text-xl font-bold text-center text-body-light"
            style={{
              lineHeight: '8px',
              letterSpacing: '1.8px',
              wordSpacing: '0px',
              textDecoration: 'none solid rgb(67, 133, 215)',
            }}
          >
            <span className="hover:text-blue-400">HIMANSHU RAI</span>
          </Link>

          <div className="hidden md:flex space-x-10">
            <Link
              href="#projects"
              className="font-sans text-[18px] text-body-light hover:text-blue-400"
              style={{
                lineHeight: '34px',
                letterSpacing: '0.9px',
                fontWeight: 400,
                textDecoration: 'none solid rgb(67, 133, 215)',
                textAlign: 'start',
              }}
            >
              Projects
            </Link>
            <Link
              href="#about"
              className="font-sans-serif text-[18px] hover:text-blue-400 text-body-light"
              style={{
                lineHeight: '34px',
                letterSpacing: '0.9px',
                fontWeight: 400,
                textDecoration: 'none solid rgb(67, 133, 215)',
                textAlign: 'start',
              }}
            >
              About
            </Link>
            <Link
              href="#blogs"
              className="font-sans-serif text-[18px] hover:text-blue-400 text-body-light"
              style={{
                lineHeight: '34px',
                letterSpacing: '0.9px',
                fontWeight: 400,
                textDecoration: 'none solid rgb(67, 133, 215)',
                textAlign: 'start',
              }}
            >
              Blogs
            </Link>
          </div>

          <button
            className="md:hidden text-body-light"
            onClick={toggleDropdown}
          >
            {isDropdownOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </nav>

      {isDropdownOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 flex items-center justify-center">
          <div ref={dropdownRef} className="bg-black h-screen w-screen text-gray-300 p-5">
            <button
              className="absolute top-5 right-5 text-body-light"
              onClick={toggleDropdown}
            >
              <FiX size={24} />
            </button>
            <Link
              href="#projects"
              className="block py-2 text-center text-[18px] text-body-light hover:text-blue-400"
              onClick={toggleDropdown}
            >
              Projects
            </Link>
            <Link
              href="#about"
              className="block py-2 text-center text-[18px] text-body-light hover:text-blue-400"
              onClick={toggleDropdown}
            >
              About
            </Link>
            <Link
              href="#blogs"
              className="block py-2 text-center text-[18px] text-body-light hover:text-blue-400"
              onClick={toggleDropdown}
            >
              Blogs
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;

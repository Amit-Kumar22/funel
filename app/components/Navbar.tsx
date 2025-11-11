'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToRegistration = () => {
    const element = document.getElementById('registration-steps');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Register', onClick: scrollToRegistration },
    { name: 'Login', href: '#login' },
    { name: 'Join Now', href: '#join', special: true },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-white text-2xl font-bold hover:scale-105 transition-transform duration-200">
              🎓 HiProTech
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item, index) => (
              item.onClick ? (
                <button
                  key={index}
                  onClick={item.onClick}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
                    item.special
                      ? 'bg-white text-gray-900 hover:bg-gray-100 hover:text-orange-600 shadow-md'
                      : 'text-white hover:bg-white hover:bg-opacity-20 hover:text-gray-900'
                  }`}
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  key={index}
                  href={item.href}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
                    item.special
                      ? 'bg-white text-gray-900 hover:bg-gray-100 hover:text-orange-600 shadow-md'
                      : 'text-white hover:bg-white hover:bg-opacity-20 hover:text-gray-900'
                  }`}
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-gray-200 focus:outline-none transition-transform duration-200 hover:scale-110"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white bg-opacity-10 backdrop-blur-sm">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item, index) => (
              item.onClick ? (
                <button
                  key={index}
                  onClick={item.onClick}
                  className={`block w-full text-left px-3 py-2 rounded-md font-medium transition-all duration-200 ${
                    item.special
                      ? 'bg-white text-gray-900 hover:bg-gray-100 hover:text-orange-600'
                      : 'text-white hover:bg-white hover:bg-opacity-20 hover:text-gray-900'
                  }`}
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  key={index}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md font-medium transition-all duration-200 ${
                    item.special
                      ? 'bg-white text-gray-900 hover:bg-gray-100 hover:text-orange-600'
                      : 'text-white hover:bg-white hover:bg-opacity-20 hover:text-gray-900'
                  }`}
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

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
    <nav className="sticky top-0 z-50 bg-white shadow-lg">
      <div className="w-full">
        <div className="flex justify-between items-center h-16 pr-4 sm:pr-6 lg:pr-8">
          {/* Logo */}
          <div className="flex-shrink-0 pl-2">
            <Link href="/" className="hover:scale-105 transition-transform duration-200">
              <img 
                src="/hipro.jpeg" 
                alt="HiProTech" 
                className="h-10 w-auto"
              />
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
                      ? 'bg-orange-600 text-white hover:bg-orange-700 shadow-md'
                      : 'text-gray-700 hover:bg-orange-100 hover:text-orange-600'
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
                      ? 'bg-orange-600 text-white hover:bg-orange-700 shadow-md'
                      : 'text-gray-700 hover:bg-orange-100 hover:text-orange-600'
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
              className="text-gray-700 hover:text-orange-600 focus:outline-none transition-transform duration-200 hover:scale-110"
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
        <div className="md:hidden bg-gray-50 border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item, index) => (
              item.onClick ? (
                <button
                  key={index}
                  onClick={item.onClick}
                  className={`block w-full text-left px-3 py-2 rounded-md font-medium transition-all duration-200 ${
                    item.special
                      ? 'bg-orange-600 text-white hover:bg-orange-700'
                      : 'text-gray-700 hover:bg-orange-100 hover:text-orange-600'
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
                      ? 'bg-orange-600 text-white hover:bg-orange-700'
                      : 'text-gray-700 hover:bg-orange-100 hover:text-orange-600'
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

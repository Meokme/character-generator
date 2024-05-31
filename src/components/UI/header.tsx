import React, { useState } from 'react';
import Link from 'next/link';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="border-b-2 border-primary bg-white p-4 text-black">
      <div className="container flex w-full items-center justify-between">
        <Link className="flex items-center" href="/public">
          <img className="mr-3 h-12 w-auto" src="/images/logo.png" alt="" />
          <h1 className="text-4xl font-bold">Character Generator</h1>
        </Link>
        <div className="hidden md:block">
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/public" className="hover:text-gray-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gray-300">
                  About
                </Link>
              </li>
              <li>
                <Link href="/characters" className="hover:text-gray-300">
                  Characters
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6 text-gray-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <nav className="md:hidden">
          <ul>
            <li>
              <Link href="/public">
                <span className="block px-4 py-2 hover:bg-blue-700">Home</span>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <span className="block px-4 py-2 hover:bg-blue-700">About</span>
              </Link>
            </li>
            <li>
              <Link href="/characters">
                <span className="block px-4 py-2 hover:bg-blue-700">
                  Characters
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

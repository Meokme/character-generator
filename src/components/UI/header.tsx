import React from 'react';
import Link from 'next/link';

export const Header: React.FC = () => {
  return (
    <header className="border-b-2 border-primary bg-white p-4 text-black">
      <div className="container flex w-full items-center justify-between">
        <Link className="flex items-center" href="/characters">
          <img className="mr-3 h-12 w-auto" src="/images/logo.png" alt="" />
          <h1 className="text-4xl font-bold">Character Generator</h1>
        </Link>
        <div className="hidden md:block">
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/" className="hover:text-gray-300">
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
      </div>
    </header>
  );
};

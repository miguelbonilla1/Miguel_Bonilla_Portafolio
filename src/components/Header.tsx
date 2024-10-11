'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Link as ScrollLink } from 'react-scroll'
import { FaFileAlt, FaBars, FaTimes } from 'react-icons/fa'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isMenuOpen])

  const menuItems = [
    { name: 'Home', to: 'HeroSection' },
    { name: 'Projects', to: 'projects' },
    { name: 'Skills', to: 'skills' },
    { name: 'Contact', to: 'contact' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-gray-900 text-white shadow-md bg-opacity-90 max-h-[13vh]">
      <nav className="container mx-auto p-3 flex justify-between items-center lg:pr-10">
        <ScrollLink to="HeroSection" smooth={true} duration={500} className="cursor-pointer">
          <Image
            src="/images/miguel_bonilla_1.png"
            alt="Miguel Bonilla Logo"
            width={250}
            height={250}
            className="transition-transform hover:scale-105 pt-2"
          />
        </ScrollLink>

        <div className="hidden md:flex items-center space-x-6 pr-5 text-lg py-1">
          {menuItems.map((item) => (
            <ScrollLink
              key={item.to}
              to={item.to}
              smooth={true}
              duration={500}
              className="cursor-pointer text-white transition-transform hover:scale-105 lg:pr-3"
            >
              {item.name}
            </ScrollLink>
          ))}
          <Link
           href="/ResumeMiguelBonilla.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center transition-transform hover:scale-105"
          >
            <span className="hidden md:inline lg:hidden">My Resume</span>
            <span className="hidden lg:inline">Download My Resume</span>
            <FaFileAlt className="ml-2" size={20} />
          </Link>
        </div>

        <button
          className="md:hidden text-white hover:text-gray-300 transition duration-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-gray-800 bg-opacity-95 shadow-md md:hidden">
            {menuItems.map((item) => (
              <ScrollLink
                key={item.to}
                to={item.to}
                smooth={true}
                duration={500}
                className="block px-4 py-2 text-gray-100 hover:bg-gray-700 transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </ScrollLink>
            ))}
            <Link
              href="/ResumeMiguelBonilla.pdf"
              
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700 transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Download My Resume
              <FaFileAlt className="ml-2" size={20} />
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}
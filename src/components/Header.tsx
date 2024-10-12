'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Link as ScrollLink } from 'react-scroll';
import { FaFileAlt } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const menuItems = [
    { name: 'Home', to: 'HeroSection' },
    { name: 'Projects', to: 'projects' },
    { name: 'Skills', to: 'skills' },
    { name: 'Contact', to: 'contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-gray-900 text-white shadow-md bg-opacity-90 max-h-[13vh]">
      <nav className="container mx-auto p-3 flex justify-between items-center md:pr-0 lg:pr-10">
        {/* Logo */}
        <ScrollLink to="HeroSection" smooth={true} duration={500}>
          <Image
            src="/images/miguel_bonilla_1.png" // Ruta directa a la imagen
            alt="Miguel Bonilla Logo"
            width={260} // Ajuste de tamaño del logo
            height={260}
            className="cursor-pointer  transition-transform transform hover:scale-105"
          />
        </ScrollLink>

        {/* Menú para resoluciones grandes */}
        <div className="hidden md:flex items-center space-x-6 pr-5 text-lg py-1">
          {menuItems.map((item) => (
            <ScrollLink
              key={item.to}
              to={item.to}
              smooth={true}
              duration={500}
              className="cursor-pointer text-white transition-transform transform hover:scale-105 lg:pr-3"
            >
              {item.name}
            </ScrollLink>
          ))}
          {/* Botón para descargar el CV */}
          <Link
            href="/ResumeMiguelBonilla.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center transition-transform transform hover:scale-105"
          >
            <span className="hidden md:inline lg:hidden">My Resume</span>
            <span className="hidden lg:inline">Download My Resume</span>
            <FaFileAlt className="ml-2" size={20} />
          </Link>
        </div>

        {/* Icono de menú hamburguesa para resoluciones pequeñas */}
        <button
          className="md:hidden text-white hover:text-gray-300 transition duration-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <FontAwesomeIcon icon={faTimes} size="lg" /> : <FontAwesomeIcon icon={faBars} size="lg" />}
        </button>

        {/* Menú desplegable para móviles */}
        <div
          className={`${
            isMenuOpen ? 'flex' : 'hidden'
          } absolute top-14 right-0 left-0 mx-3 md:hidden transition-transform duration-300 ease-in-out transform ${
            isMenuOpen ? 'scale-100' : 'scale-95'
          }`}
        >
          <div className="bg-gray-700 bg-opacity-95 shadow-md rounded-lg py-2 w-full">
            {/* Botón para cerrar el menú */}
            <button
              className="absolute top-2 right-2 text-gray-200"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Cerrar menú"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            {menuItems.map((item) => (
              <ScrollLink
                key={item.to}
                to={item.to}
                smooth={true}
                duration={500}
                className="block px-4 py-2 text-gray-100 border-b border-gray-500 hover:bg-gray-600 transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </ScrollLink>
            ))}
            <Link
              href="/ResumeMiguelBonilla.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-100 hover:bg-gray-600 transition duration-300 px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Download My Resume
              <FaFileAlt className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

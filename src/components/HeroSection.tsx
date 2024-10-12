'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa'
import AnimatedBackground from './AnimatedBackground'

export default function HeroSection() {
  return (
    <section id="HeroSection" className="relative w-full min-h-screen overflow-hidden bg-gradient-to-r from-gray-800 via-gray-900 to-black">
      <AnimatedBackground />
      <div className="relative z-20 flex flex-col-reverse lg:flex-row items-center justify-center min-h-screen px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-36 py-12">
        <div className="w-full lg:w-1/2 text-center lg:text-left lg:pr-4 xl:pr-8">
          <h1 className="text-tertiary text-5xl lg:text-6xl font-bold mt-4 md:mt-8 lg:mt-0">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-700 text-transparent bg-clip-text">Hey There! </span>
          </h1>
          <h2 className="text-tertiary text-5xl lg:text-6xl font-bold md:my-2" style={{ whiteSpace: 'nowrap' }}>
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-700 text-transparent bg-clip-text">I&apos;m Miguel Bonilla</span>
          </h2>
          <h2 className="text-tertiary text-5xl lg:text-6xl font-bold">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-purple-600 inline-block text-transparent bg-clip-text  whitespace-nowrap">Full Stack developer</span>
          </h2>
          <div className="flex justify-center lg:justify-start items-center mt-5 lg:ml-2 lg:mt-10">
            <Link href="https://www.linkedin.com/in/miguel-bonilla-4b7438285/" target="_blank" rel="noopener noreferrer" className="text-white transition-transform transform hover:scale-105 mr-6">
              <FaLinkedin size={60} />
            </Link>
            <Link href="https://github.com/miguelbonilla1" target="_blank" rel="noopener noreferrer" className="text-white transition-transform transform hover:scale-105 mr-6">
              <FaGithub size={60} />
            </Link>
            <Link href="#contact" className="cursor-pointer text-white transition-transform transform hover:scale-105">
              <FaEnvelope className="ml-2" size={60} />
            </Link>
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mb-8 lg:mb-0">
          <div className="relative w-[40vh] h-[40vh] sm:w-[40vh] sm:h-[40vh] md:w-[40vh] md:h-[40vh] lg:w-[45vh] lg:h-[45vh]">
            <Image
              src="/images/fotoPortafolio5.png"
              alt="Miguel Bonilla"
              layout="fill"
              quality={100}
              className="rounded-full border-4 border-orange-700 border-opacity-90 shadow-[0px_0px_20px_10px_rgba(234,88,12,0.6)]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
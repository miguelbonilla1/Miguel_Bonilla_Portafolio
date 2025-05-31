'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'


interface Project {
  name: string
  url: string
  imageUrl: string
  description: string
  gifUrl?: string
  inviteUrl?: string
}

export default function Projects() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedGif, setSelectedGif] = useState<string | null>(null)

  const openModal = (gifUrl: string) => {
    setSelectedGif(gifUrl)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedGif(null)
  }

  const projectList: Project[] = [
    {
      name: 'Dark Shape Studios',
      url: 'https://darkshape.onrender.com/',
      imageUrl: '/images/darkshape.png',
      description: 'Dark Shape Studios is a music production company. The website was developed using React, Tailwind CSS, and Vite.js.',
    },
    {
      name: 'Discord Bot',
      url: 'https://discord.gg/qThESjBT',
      imageUrl: '/images/dcapp.jpeg',
      description: 'The Discord Bot provides real-time cryptocurrency quotes, using Discord.js, Node.js, and the CoinMarketCap API.',
      gifUrl: '/images/bot-testing.gif',
    },
  ]

  return (
   <section id="projects" className=" z-20 pb-11 pt-5 h-full flex flex-col justify-center items-center bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white">

      <h1 className="text-5xl font-bold text-center py-3 mb-5">Projects</h1>
      
      <div className=" z-20 pt-5 w-full px-1 lg:max-w-5xl lg:mx-auto">
        {projectList.map((project, index) => (
          <div
            key={index}
            className=" z-20 w-full flex flex-col lg:flex-row lg:justify-start lg:items-start items-center mb-8 px-4 sm:px-6 md:px-8 lg:px-4 xl:px-0"
          >
            <Link href={project.url} target="_blank" rel="noopener noreferrer" className="z-20 block w-full lg:w-1/2 h-auto overflow-hidden rounded-lg hover:opacity-70 hover:scale-105 transition-transform duration-300 ease-in-out">
              <Image
                src={project.imageUrl}
                alt={project.name}
                width={500}
                height={288}
                className="w-full h-72 object-cover"
              />
            </Link>
            <div className="w-full lg:w-1/2 mt-4 lg:mt-0 lg:pl-10 text-center lg:text-left">
              <h3 className="font-bold text-xl cursor-pointer hover:opacity-90 hover:underline mb-2">{project.name}</h3>
              <p className="text-lg mb-2">{project.description}</p>
              <Link href={project.url} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:underline">
                {project.url}
              </Link>
              <br />
              {project.inviteUrl && (
                <Link href={project.inviteUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:underline">
                  Invite the bot to your server
                </Link>
              )}
              {project.gifUrl && (
                <div className="mt-4 flex justify-center lg:justify-start">
                  <Image
                    src={project.gifUrl}
                    alt={`${project.name} demo`}
                    width={288}
                    height={160}
                    className="w-72 h-40 rounded-lg shadow-lg cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 hover:opacity-80"
                    onClick={() => openModal(project.gifUrl!)}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedGif && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex justify-center items-center" onClick={closeModal}>
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button 
              className="absolute top-0 right-0 m-4 text-white text-2xl" 
              onClick={closeModal}
              aria-label="Close modal"
            >
              &times;
            </button>
            <Image src={selectedGif} alt="Enlarged GIF" width={800} height={600} className="max-w-full max-h-screen rounded-lg" />
          </div>
        </div>
      )}
    </section>
  )
}

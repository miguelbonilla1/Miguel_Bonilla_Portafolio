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
    description:
      'Dark Shape Studios is a music production company. The website was developed using React, Tailwind CSS, and Vite.js.',
  },
  {
    name: 'Discord Bot',
    url: 'https://discord.gg/qThESjBT',
    imageUrl: '/images/dcapp.jpeg',
    description:
      'The Discord Bot provides real-time cryptocurrency quotes, using Discord.js, Node.js, and the CoinMarketCap API.',
    gifUrl: '/images/bot-testing.gif',
  },
  {
    name: 'Crypto Tracker App',
    url: 'https://cryptotracker.com',
    imageUrl: '/images/cryptoapp.jpeg',
    description:
      'Crypto Tracker is a web app that allows users to track cryptocurrency prices in real-time. Built with Next.js, TypeScript, and Tailwind CSS.',
    gifUrl: '/images/crypto-demo.gif',
  },
  {
    name: 'TaskFlow Manager',
    url: 'https://taskflow.com',
    imageUrl: '/images/taskflow.jpeg',
    description:
      'TaskFlow is a productivity tool designed to help teams manage tasks and workflows efficiently. Built with React, Node.js, and MongoDB.',
  },
]

  return (
    <section
      id="projects"
      className="z-20 pb-14 pt-8 h-full flex flex-col justify-center items-center bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white"
    >
      <h1 className="text-5xl font-bold text-center mb-8">Projects</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full px-4 max-w-7xl">
        {projectList.map((project, index) => (
          <div
            key={index}
            className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <Link
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Image
                src={project.imageUrl}
                alt={project.name}
                width={500}
                height={300}
                className="w-full h-56 object-cover hover:opacity-80 transition-opacity duration-300"
              />
            </Link>

            <div className="p-5">
              <h3 className="text-2xl font-bold mb-2 hover:underline cursor-pointer">
                {project.name}
              </h3>
              <p className="text-base text-gray-300 mb-4">
                {project.description}
              </p>
              <Link
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-400 hover:underline"
              >
                {project.url}
              </Link>

              {project.inviteUrl && (
                <div className="mt-2">
                  <Link
                    href={project.inviteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-400 hover:underline"
                  >
                    Invite the bot to your server
                  </Link>
                </div>
              )}

              {project.gifUrl && (
                <div className="mt-4 flex justify-center">
                  <Image
                    src={project.gifUrl}
                    alt={`${project.name} demo`}
                    width={300}
                    height={170}
                    className="rounded-lg shadow-md cursor-pointer hover:scale-105 hover:opacity-80 transition-transform duration-300"
                    onClick={() => openModal(project.gifUrl!)}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedGif && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-80 flex justify-center items-center"
          onClick={closeModal}
        >
          <div
            className="relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-0 right-0 m-4 text-white text-3xl"
              onClick={closeModal}
              aria-label="Close modal"
            >
              &times;
            </button>
            <Image
              src={selectedGif}
              alt="Enlarged GIF"
              width={800}
              height={600}
              className="max-w-full max-h-screen rounded-lg"
            />
          </div>
        </div>
      )}
    </section>
  )
}

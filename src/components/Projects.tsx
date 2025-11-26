'use client'

import { useState } from 'react'
import Image from 'next/image'

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

  const openProject = (url: string) => {
    if (!url) return // ⬅️ evita abrir pestaña si no hay URL
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleCardKey = (e: React.KeyboardEvent, url: string) => {
    if (!url) return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      openProject(url)
    }
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
      name: 'Python Bot',
      url: '',
      imageUrl: '/images/cryptoapp.jpeg',
      description: 'Coming soon',
      gifUrl: '/images/crypto-demo.gif',
    },
    {
      name: 'Whatsapp assistant',
      url: '',
      imageUrl: '/images/taskflow.jpeg',
      description: 'Coming soon',
    }, {
      name: 'Ecommerce',
      url: '',
      imageUrl: '/images/taskflow.jpeg',
      description: 'Coming soon',
    },
  ]

  return (
    <section
      id="projects"
      className="z-20 pb-14 pt-8 h-full flex flex-col justify-center items-center bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white"
    >
      <h1 className="text-5xl font-bold text-center mb-8">Projects</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full px-4 max-w-7xl">
        {projectList.map((project) => {
          const hasUrl = Boolean(project.url)

          return (
            <article
              key={project.name}
              className={`relative bg-gray-900 border border-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ${
                hasUrl ? 'cursor-pointer' : 'cursor-default opacity-95'
              }`}
              role={hasUrl ? 'link' : undefined}
              aria-label={hasUrl ? `Open ${project.name}` : undefined}
              aria-disabled={!hasUrl}
              tabIndex={hasUrl ? 0 : -1}
              onClick={hasUrl ? () => openProject(project.url) : undefined}
              onKeyDown={hasUrl ? (e) => handleCardKey(e, project.url) : undefined}
            >
              <Image
                src={project.imageUrl}
                alt={project.name}
                width={500}
                height={300}
                className="w-full h-56 object-cover hover:opacity-80 transition-opacity duration-300"
              />

              <div className="p-5">
                <h3 className="text-2xl font-bold mb-2 underline-offset-4 hover:underline">
                  {project.name}
                </h3>

                {/* Coming soon animado */}
                <p className="text-base text-gray-300 mb-4">
                  {project.description === 'Coming soon' ? (
                    <span>
                      Coming soon<span className="coming-soon" />
                    </span>
                  ) : (
                    project.description
                  )}
                </p>

                {/* Mostrar link solo si hay URL */}
                {hasUrl && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-400 hover:underline"
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) => e.stopPropagation()}
                    style={{ cursor: 'pointer' }}
                  >
                    {project.url}
                  </a>
                )}

                {project.inviteUrl && (
                  <div className="mt-2">
                    <a
                      href={project.inviteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-400 hover:underline"
                      onClick={(e) => e.stopPropagation()}
                      onKeyDown={(e) => e.stopPropagation()}
                      style={{ cursor: 'pointer' }}
                    >
                      Invite the bot to your server
                    </a>
                  </div>
                )}

                {project.gifUrl && (
                  <div className="mt-4 flex justify-center">
                    <Image
                      src={project.gifUrl}
                      alt={`${project.name} demo`}
                      width={300}
                      height={170}
                      className="rounded-lg shadow-md hover:scale-105 hover:opacity-80 transition-transform duration-300"
                      onClick={(e) => {
                        e.stopPropagation()
                        openModal(project.gifUrl!)
                      }}
                      onKeyDown={(e) => e.stopPropagation()}
                      style={{ cursor: 'pointer' }}
                    />
                  </div>
                )}
              </div>
            </article>
          )
        })}
      </div>

      {/* Modal para ampliar GIF */}
      {isModalOpen && selectedGif && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-80 flex justify-center items-center"
          onClick={closeModal}
          style={{ cursor: 'zoom-out' }}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute top-0 right-0 m-4 text-white text-3xl"
              onClick={closeModal}
              aria-label="Close modal"
              style={{ cursor: 'pointer' }}
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

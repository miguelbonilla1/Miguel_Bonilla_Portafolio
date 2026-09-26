'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { useLanguage } from '@/lib/i18n';

const ProjectsSectionContainer = styled.section`
  max-width: 1400px;
  margin: 0 auto;
  padding: 5rem 2rem;
  overflow: hidden;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.75rem;
`;

const SectionTitle = styled(motion.h3)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 900;
  text-transform: uppercase;
  color: var(--foreground);
`;

const ProjectsSlider = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.div)`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden; /* Added to contain the image */
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  position: relative;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
    border-color: var(--primary);
  }
`;

const ProjectImageContainer = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  background: linear-gradient(135deg, #1e293b, #334155);
  position: relative;
  overflow: hidden;

  img {
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  ${ProjectCard}:hover & img {
    transform: scale(1.04);
  }
`;

const ProjectContent = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ProjectTitle = styled.h4`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--foreground);
  margin-bottom: 1rem;

  a {
    color: inherit;
    text-decoration: none;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      z-index: 1;
    }
  }
`;

const ProjectDescription = styled.p`
  color: #94a3b8;
  margin-bottom: 2rem;
  line-height: 1.6;
  font-size: 1rem;
  flex: 1;
`;

const TechList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const TechItem = styled.li`
  font-size: 0.8rem;
  color: #cbd5e1;
  background: rgba(255, 255, 255, 0.05);
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
  color: var(--primary);
  position: relative;
  z-index: 2;

  a {
    transition: color 0.2s;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  a:hover {
    color: var(--accent);
  }
`;

export default function ProjectsSliderSection() {
  const { t } = useLanguage();
  const projectDetails = [
    {
      image: '/projects/leadflow-ai.png',
      tech: ['Next.js', 'TypeScript', 'Supabase', 'n8n'],
      live: 'https://ai-automation-livid.vercel.app/',
    },
    {
      image: '/projects/crypto-pulse.png',
      tech: ['Node.js', 'Discord.js', 'Express', 'CoinMarketCap API'],
      github: 'https://github.com/miguelbonilla1/discord-bot',
    },
    {
      image: '/projects/dark-shape-studios.png',
      tech: ['React', 'Vite', 'Responsive UI'],
      live: 'https://darkshape.onrender.com',
      github: 'https://github.com/miguelbonilla1/darkShape',
    },
  ];
  const projects = t.projects.items.map((project, index) => ({
    ...project,
    ...projectDetails[index],
  }));

  return (
    <ProjectsSectionContainer id="projects">
      <SectionHeader>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t.projects.title}
        </SectionTitle>
      </SectionHeader>
      
        <ProjectsSlider>
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <ProjectImageContainer>
                <Image src={project.image} alt={`${project.title} project preview`} fill sizes="(max-width: 720px) 100vw, (max-width: 1024px) 50vw, 33vw" />
              </ProjectImageContainer>
              
              <ProjectContent>
                <ProjectTitle>
                  <a href={project.live || project.github} target="_blank" rel="noreferrer">
                    {project.title}
                  </a>
                </ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
                
                <TechList>
                  {project.tech.map((t, i) => (
                    <TechItem key={i}>{t}</TechItem>
                  ))}
                </TechList>

                <ProjectLinks>
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noreferrer" aria-label={`${t.projects.live}: ${project.title}`}>
                      <ExternalLink size={16} /> {t.projects.live}
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer" aria-label={`${t.projects.code}: ${project.title}`}>
                      <FaGithub size={16} /> {t.projects.code}
                    </a>
                  )}
                </ProjectLinks>
              </ProjectContent>
            </ProjectCard>
          ))}
        </ProjectsSlider>
    </ProjectsSectionContainer>
  );
}

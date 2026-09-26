'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs } from 'react-icons/fa';
import {
  SiDocker,
  SiGit,
  SiGithub,
  SiLinux,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiOpenapiinitiative,
  SiPhp,
  SiPostgresql,
  SiRedux,
  SiStyledcomponents,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';
import { Blocks, BrainCircuit, Network, SquareTerminal } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

const SkillsSection = styled.section`
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  text-align: center;
  color: var(--foreground);
  margin-bottom: 2.75rem;
`;

const SkillsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

const CategoryColumn = styled.div`
  padding: 1.5rem;
  border: 1px solid var(--border);
  border-radius: 22px;
  background: linear-gradient(145deg, rgba(30, 41, 59, 0.72), rgba(15, 23, 42, 0.76));
`;

const CategoryTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--foreground);
  margin-bottom: 1.25rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(104px, 1fr));
  gap: 0.75rem;
`;

const SkillCircle = styled(motion.div)`
  min-height: 88px;
  padding: 0.8rem 0.55rem;
  border-radius: 14px;
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    border-color: var(--primary);
    box-shadow: 0 10px 20px rgba(139, 92, 246, 0.1);
  }

  svg {
    width: 1.9rem;
    height: 1.9rem;
    flex-shrink: 0;
  }

  span {
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--foreground);
    text-align: center;
    line-height: 1.25;
  }
`;

type Skill = { name: string; icon: ReactNode };
type SkillCategory = { title: string; skills: Skill[] };

export default function SkillsGrid() {
  const { t } = useLanguage();
  const categories: SkillCategory[] = [
    {
      title: t.skills.frontend,
      skills: [
        { name: 'React', icon: <FaReact color="#61DAFB" /> },
        { name: 'Next.js', icon: <SiNextdotjs color="#FFFFFF" /> },
        { name: 'React Native', icon: <FaReact color="#61DAFB" /> },
        { name: 'Redux', icon: <SiRedux color="#764ABC" /> },
        { name: 'TypeScript', icon: <SiTypescript color="#3178C6" /> },
        { name: 'JavaScript', icon: <FaJsSquare color="#F7DF1E" /> },
        { name: 'Styled Components', icon: <SiStyledcomponents color="#DB7093" /> },
        { name: 'Tailwind CSS', icon: <SiTailwindcss color="#06B6D4" /> },
        { name: 'HTML', icon: <FaHtml5 color="#E34F26" /> },
        { name: 'CSS', icon: <FaCss3Alt color="#1572B6" /> },
      ],
    },
    {
      title: t.skills.backend,
      skills: [
        { name: 'Node.js', icon: <FaNodeJs color="#339933" /> },
        { name: 'NestJS', icon: <SiNestjs color="#E0234E" /> },
        { name: 'REST APIs', icon: <SiOpenapiinitiative color="#6BA539" /> },
        { name: 'PostgreSQL', icon: <SiPostgresql color="#4169E1" /> },
        { name: 'MySQL', icon: <SiMysql color="#4479A1" /> },
        { name: 'PHP', icon: <SiPhp color="#777BB4" /> },
        { name: 'Service Integration', icon: <Network color="#A78BFA" /> },
      ],
    },
    {
      title: t.skills.mobileAi,
      skills: [
        { name: 'AI Integration', icon: <BrainCircuit color="#F472B6" /> },
        { name: 'RAG', icon: <Network color="#22D3EE" /> },
        { name: 'MCP', icon: <Blocks color="#A78BFA" /> },
      ],
    },
    {
      title: t.skills.tools,
      skills: [
        { name: 'Docker', icon: <SiDocker color="#2496ED" /> },
        { name: 'Linux', icon: <SiLinux color="#FCC624" /> },
        { name: 'WSL / WSL2', icon: <SquareTerminal color="#60A5FA" /> },
        { name: 'Git', icon: <SiGit color="#F05032" /> },
        { name: 'GitHub', icon: <SiGithub color="#FFFFFF" /> },
      ],
    },
  ];

  return (
    <SkillsSection id="skills">
      <SectionTitle
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {t.skills.title}
      </SectionTitle>

      <SkillsContainer>
        {categories.map((category, categoryIndex) => (
          <CategoryColumn key={category.title}>
            <CategoryTitle>{category.title}</CategoryTitle>
            <Grid>
              {category.skills.map((skill, index) => (
                <SkillCircle
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: categoryIndex * 0.08 + index * 0.04, duration: 0.35 }}
                >
                  {skill.icon}
                  <span>{skill.name}</span>
                </SkillCircle>
              ))}
            </Grid>
          </CategoryColumn>
        ))}
      </SkillsContainer>
    </SkillsSection>
  );
}

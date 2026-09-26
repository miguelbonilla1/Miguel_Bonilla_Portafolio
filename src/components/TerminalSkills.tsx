'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const TerminalSection = styled.section`
  padding: 6rem 0;
  max-width: 800px; /* Made smaller */
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h3`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  color: var(--foreground);
`;

const TerminalWindow = styled(motion.div)`
  background: #111111; /* Softer black */
  border-radius: 16px; /* Softer rounded corners */
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1); /* Lighter shadow */
  font-family: 'Fira Code', monospace;
  border: 1px solid #222;
`;

const TerminalHeader = styled.div`
  background: #1a1a1a;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid #333;
`;

const Dot = styled.div<{ $color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.$color};
`;

const TerminalTitle = styled.div`
  flex: 1;
  text-align: center;
  color: #888;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
`;

const TerminalBody = styled.div`
  padding: 2rem;
  color: #10b981; /* Softer green */
  min-height: 250px;
  font-size: 1rem;
  line-height: 1.7;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 1.5rem;
  }
`;

const Line = styled(motion.div)`
  margin-bottom: 0.5rem;
  display: flex;
  gap: 1rem;
`;

const Prompt = styled.span`
  color: #3b82f6; /* Blue prompt */
  font-weight: bold;
  white-space: nowrap;
`;

const Output = styled.span`
  color: #e2e8f0;
`;

const Cursor = styled(motion.span)`
  display: inline-block;
  width: 10px;
  height: 1.2em;
  background-color: #22c55e;
  vertical-align: middle;
  margin-left: 5px;
`;

export default function TerminalSkills() {
  const [linesVisible, setLinesVisible] = useState(0);

  const script = [
    { type: 'cmd', text: 'whoami' },
    { type: 'out', text: 'miguel-bonilla' },
    { type: 'cmd', text: 'cat skills.json' },
    { type: 'out', text: '{' },
    { type: 'out', text: '  "frontend": ["React", "Next.js", "TypeScript", "Tailwind", "Styled Components"],' },
    { type: 'out', text: '  "backend": ["Node.js", "Express", "PostgreSQL", "MongoDB", "REST APIs"],' },
    { type: 'out', text: '  "tools": ["Git", "Figma", "Docker", "Vercel"]' },
    { type: 'out', text: '}' },
    { type: 'cmd', text: 'echo "Ready to build something awesome."' },
    { type: 'out', text: 'Ready to build something awesome.' },
  ];

  useEffect(() => {
    if (linesVisible < script.length) {
      const timer = setTimeout(() => {
        setLinesVisible(v => v + 1);
      }, script[linesVisible].type === 'cmd' ? 800 : 200); // Commands take longer to "type"
      return () => clearTimeout(timer);
    }
  }, [linesVisible, script]);

  return (
    <TerminalSection id="skills">
      <SectionHeader>
        <SectionTitle>Technical Arsenal</SectionTitle>
      </SectionHeader>

      <TerminalWindow
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <TerminalHeader>
          <Dot $color="#ef4444" /> {/* Red */}
          <Dot $color="#eab308" /> {/* Yellow */}
          <Dot $color="#22c55e" /> {/* Green */}
          <TerminalTitle>guest@miguel-macbook:~</TerminalTitle>
        </TerminalHeader>
        
        <TerminalBody>
          {script.slice(0, linesVisible).map((line, i) => (
            <Line
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1 }}
            >
              {line.type === 'cmd' && <Prompt>➜  ~</Prompt>}
              <Output style={{ color: line.type === 'cmd' ? '#f8fafc' : '#94a3b8' }}>
                {line.text}
              </Output>
            </Line>
          ))}
          {linesVisible < script.length && (
            <Line>
              <Prompt>➜  ~</Prompt>
              <Cursor
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
              />
            </Line>
          )}
        </TerminalBody>
      </TerminalWindow>
    </TerminalSection>
  );
}

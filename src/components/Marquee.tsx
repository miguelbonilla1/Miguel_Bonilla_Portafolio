'use client';

import styled, { keyframes } from 'styled-components';

const marqueeAnim = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const MarqueeContainer = styled.div`
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  overflow: hidden;
  background: var(--foreground);
  color: var(--background);
  padding: 1.5rem 0;
  display: flex;
  white-space: nowrap;
  transform: rotate(-2deg) scale(1.05); /* Slight tilt for that editorial/brutalist feel */
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  z-index: 5;
`;

const MarqueeContent = styled.div`
  display: flex;
  animation: ${marqueeAnim} 20s linear infinite;
  
  &:hover {
    animation-play-state: paused;
  }
`;

const MarqueeItem = styled.span`
  font-size: 2.5rem;
  font-weight: 900;
  text-transform: uppercase;
  padding: 0 2rem;
  font-family: var(--font-heading);
  letter-spacing: 2px;
  
  /* Outline text effect */
  &.outline {
    color: transparent;
    -webkit-text-stroke: 1px var(--background);
  }
`;

export default function Marquee() {
  const words = [
    { text: "CREATIVE CODER", outline: false },
    { text: "//", outline: true },
    { text: "FRONTEND NINJA", outline: true },
    { text: "//", outline: false },
    { text: "UI/UX DESIGN", outline: false },
    { text: "//", outline: true },
    { text: "BACKEND DEV", outline: true },
    { text: "//", outline: false },
  ];

  // Double the array to make the infinite scroll seamless
  const duplicatedWords = [...words, ...words, ...words, ...words];

  return (
    <MarqueeContainer>
      <MarqueeContent>
        {duplicatedWords.map((item, index) => (
          <MarqueeItem key={index} className={item.outline ? 'outline' : ''}>
            {item.text}
          </MarqueeItem>
        ))}
      </MarqueeContent>
    </MarqueeContainer>
  );
}

'use client';

import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --background: #0B1120; /* Deep navy/slate, very elegant */
    --foreground: #f8fafc; /* Slate 50 */
    --primary: #8b5cf6;    /* Vibrant Purple */
    --primary-hover: #7c3aed; 
    --accent: #ec4899;     /* Pink accent for gradients */
    --surface: #1e293b;    /* Slate 800 */
    --border: #334155;     /* Slate 700 */
    --font-heading: 'Inter', sans-serif;
  }
  
  body {
    background-color: var(--background);
    color: var(--foreground);
    background-image: radial-gradient(circle at 15% 50%, rgba(139, 92, 246, 0.05), transparent 25%),
                      radial-gradient(circle at 85% 30%, rgba(236, 72, 153, 0.05), transparent 25%);
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html,
  body {
    max-width: 100vw;
    overflow-x: clip;
    background-color: var(--background);
    color: var(--foreground);
    font-family: inherit;
    scroll-behavior: smooth;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    font-family: inherit;
  }

  /* Scrollbar estético */
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: var(--background);
  }
  ::-webkit-scrollbar-thumb {
    background: var(--surface);
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: var(--border);
  }
`;

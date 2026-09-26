'use client';

import styled from 'styled-components';
import { FileText } from 'lucide-react';
import { languageNames, useLanguage, type Language } from '@/lib/i18n';

const NavContainer = styled.nav`
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.15rem max(2rem, calc((100vw - 1400px) / 2));
  margin: 0 auto;
  width: 100%;
  background: rgba(11, 17, 32, 0.82);
  border-bottom: 1px solid rgba(148, 163, 184, 0.12);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);

  @media (max-width: 768px) {
    padding: 1rem 1.25rem;
  }
`;

const Logo = styled.div`
  font-weight: 300;
  font-size: 1.2rem;
  letter-spacing: 2px;
  color: var(--foreground);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;

  span {
    color: var(--primary);
    font-weight: 700;
  }

  @media (max-width: 520px) {
    font-size: 0.95rem;
    letter-spacing: 1px;
  }
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  a {
    font-weight: 400;
    font-size: 0.95rem;
    color: #cbd5e1;
    transition: color 0.2s;
    
    &:hover {
      color: var(--foreground);
    }
  }

  @media (max-width: 960px) {
    display: none;
  }
`;

const LanguageSwitcher = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  padding: 0.2rem;
  border: 1px solid var(--border);
  border-radius: 9px;
  background: rgba(30, 41, 59, 0.72);
`;

const LanguageButton = styled.button<{ $active: boolean }>`
  min-width: 34px;
  padding: 0.38rem 0.42rem;
  border-radius: 6px;
  color: ${({ $active }) => ($active ? '#ffffff' : '#94a3b8')};
  background: ${({ $active }) => ($active ? 'var(--primary)' : 'transparent')};
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  transition: color 0.2s ease, background 0.2s ease;

  &:hover { color: #ffffff; }
  &:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
`;

const ResumeButton = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  color: var(--foreground);
  font-weight: 600;
  font-size: 0.95rem;
  transition: color 0.2s;

  &:hover {
    color: var(--primary);
  }
`;

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const languages: Language[] = ['en', 'es', 'pt'];
  const resumes: Record<Language, string> = {
    en: '/resume-en.pdf',
    es: '/resume-es.pdf',
    pt: '/resume-pt.pdf',
  };

  return (
    <NavContainer>
      <Logo>
        <span>&lt;/&gt;</span> MIGUEL BONILLA
      </Logo>

      <NavRight>
        <NavLinks>
          <a href="#home">{t.nav.home}</a>
          <a href="#projects">{t.nav.projects}</a>
          <a href="#skills">{t.nav.skills}</a>
          <a href="#contact">{t.nav.contact}</a>
          <ResumeButton href={resumes[language]} download={`Miguel-Bonilla-Resume-${language.toUpperCase()}.pdf`}>
            {t.nav.resume} <FileText size={16} />
          </ResumeButton>
        </NavLinks>
        <LanguageSwitcher role="group" aria-label={t.nav.language}>
          {languages.map((item) => (
            <LanguageButton
              key={item}
              type="button"
              $active={language === item}
              aria-pressed={language === item}
              aria-label={languageNames[item]}
              title={languageNames[item]}
              onClick={() => setLanguage(item)}
            >
              {item.toUpperCase()}
            </LanguageButton>
          ))}
        </LanguageSwitcher>
      </NavRight>
    </NavContainer>
  );
}

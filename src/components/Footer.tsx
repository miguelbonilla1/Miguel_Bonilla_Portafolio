'use client';

import styled from 'styled-components';
import { useLanguage } from '@/lib/i18n';

const FooterContainer = styled.footer`
  text-align: center;
  padding: 4rem 2rem;
  color: #64748b;
  border-top: 1px solid var(--border);
  font-size: 1rem;
  margin-top: 2rem;

  p {
    margin-bottom: 0.5rem;
  }

  a {
    color: var(--foreground);
    font-weight: 600;
    text-decoration: underline;
    text-decoration-color: transparent;
    transition: text-decoration-color 0.2s;

    &:hover {
      text-decoration-color: var(--primary);
    }
  }
`;

export default function Footer() {
  const { t } = useLanguage();

  return (
    <FooterContainer>
      <p>{t.footer.designed} <strong>Miguel Bonilla</strong>.</p>
      <p>
        {t.footer.built} <a href="https://nextjs.org" target="_blank" rel="noreferrer">Next.js</a> {t.footer.and} <a href="https://styled-components.com/" target="_blank" rel="noreferrer">Styled Components</a>.
      </p>
    </FooterContainer>
  );
}

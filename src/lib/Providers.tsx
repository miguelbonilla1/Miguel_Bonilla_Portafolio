'use client';

import React from 'react';
import StyledComponentsRegistry from './registry';
import { LanguageProvider } from './i18n';
import { GlobalStyles } from '../styles/GlobalStyles';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StyledComponentsRegistry>
      <GlobalStyles />
      <LanguageProvider>{children}</LanguageProvider>
    </StyledComponentsRegistry>
  );
}

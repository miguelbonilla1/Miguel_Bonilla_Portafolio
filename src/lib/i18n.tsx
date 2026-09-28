'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Language = 'en' | 'es' | 'pt';

export const languageNames: Record<Language, string> = {
  en: 'English',
  es: 'Español',
  pt: 'Português',
};

export const translations = {
  en: {
    nav: { home: 'Home', projects: 'Projects', skills: 'Skills', contact: 'Contact', resume: 'Download my resume', language: 'Language' },
    hero: {
      greeting: 'Hey there!', intro: "I'm Miguel Bonilla", role: 'Full Stack Developer', drag: 'Drag to explore',
      cubeLabel: 'Interactive cube with professional specialties. Drag to rotate it or use the arrow keys.',
      faces: [
        { title: '', description: 'Digital products designed around real business goals.' },
        { title: 'Backend Solutions', description: 'Secure, scalable services that support growth and reliable operations.' },
        { title: 'User Experiences', description: 'Responsive, accessible interfaces that make complex workflows feel simple.' },
        { title: 'APIs & Integrations', description: 'RESTful APIs that connect platforms, payments, partners, and business data.' },
        { title: 'Process Automation', description: 'Less manual work through connected workflows, intelligent automation, and better data flow.' },
        { title: 'Product Evolution', description: 'Maintainable software built to adapt, improve, and grow with the business.' },
      ],
    },
    projects: {
      title: 'Selected Works', previous: 'Previous project', next: 'Next project', live: 'View project', code: 'Code',
      items: [
        { title: 'LeadFlow AI', description: 'An AI-assisted lead qualification workflow that captures requests, scores opportunities, stores results in Supabase, and orchestrates follow-up through n8n.' },
        { title: 'Crypto Pulse — Discord Bot', description: 'A Discord market assistant that delivers live cryptocurrency quotes and compares assets using CoinMarketCap data without leaving the conversation.' },
        { title: 'Dark Shape Studios', description: 'A conversion-focused website for a music production, mixing, and mastering studio, with responsive work showcases and direct contact flows.' },
      ],
    },
    skills: {
      title: 'Skills',
      frontend: 'Web & Mobile',
      backend: 'Backend & Data',
      mobileAi: 'Artificial Intelligence',
      tools: 'Tools & Infrastructure',
    },
    contact: { title: "Let's talk about your next project!", name: 'Name', namePlaceholder: 'Your name', email: 'Email', emailPlaceholder: 'Enter your email', message: 'Message', messagePlaceholder: 'Tell me about your project', messageHint: 'Minimum 10 characters.', send: 'Send', sending: 'Sending…', success: 'Your message was sent successfully.', error: 'The message could not be sent. Please try again.' },
    footer: { designed: 'Designed and built by', built: 'Built with', and: 'and' },
  },
  es: {
    nav: { home: 'Inicio', projects: 'Proyectos', skills: 'Habilidades', contact: 'Contacto', resume: 'Descargar mi CV', language: 'Idioma' },
    hero: {
      greeting: '¡Hola!', intro: 'Soy Miguel Bonilla', role: 'Desarrollador Full Stack', drag: 'Arrastra para explorar',
      cubeLabel: 'Cubo interactivo con especialidades profesionales. Arrastra para girarlo o usa las flechas del teclado.',
      faces: [
        { title: '', description: 'Productos digitales diseñados alrededor de objetivos reales del negocio.' },
        { title: 'Soluciones Backend', description: 'Servicios seguros y escalables que respaldan el crecimiento y las operaciones.' },
        { title: 'Experiencias de Usuario', description: 'Interfaces responsivas y accesibles que simplifican procesos complejos.' },
        { title: 'APIs e Integraciones', description: 'APIs RESTful que conectan plataformas, pagos, socios y datos del negocio.' },
        { title: 'Automatización', description: 'Menos trabajo manual mediante flujos conectados, automatización inteligente y mejores datos.' },
        { title: 'Evolución del Producto', description: 'Software mantenible que puede adaptarse, mejorar y crecer con el negocio.' },
      ],
    },
    projects: {
      title: 'Proyectos Destacados', previous: 'Proyecto anterior', next: 'Proyecto siguiente', live: 'Ver proyecto', code: 'Código',
      items: [
        { title: 'LeadFlow AI', description: 'Un flujo de calificación de leads asistido por IA que captura solicitudes, puntúa oportunidades, guarda resultados en Supabase y coordina el seguimiento con n8n.' },
        { title: 'Crypto Pulse — Bot de Discord', description: 'Un asistente de mercado para Discord que entrega cotizaciones de criptomonedas en vivo y compara activos con datos de CoinMarketCap.' },
        { title: 'Dark Shape Studios', description: 'Un sitio orientado a conversión para un estudio de producción, mezcla y mastering, con trabajos responsivos y contacto directo.' },
      ],
    },
    skills: {
      title: 'Habilidades',
      frontend: 'Web y Mobile',
      backend: 'Backend y Datos',
      mobileAi: 'Inteligencia Artificial',
      tools: 'Herramientas e Infraestructura',
    },
    contact: { title: '¡Hablemos de tu próximo proyecto!', name: 'Nombre', namePlaceholder: 'Tu nombre', email: 'Correo', emailPlaceholder: 'Ingresa tu correo', message: 'Mensaje', messagePlaceholder: 'Cuéntame sobre tu proyecto', messageHint: 'Mínimo 10 caracteres.', send: 'Enviar', sending: 'Enviando…', success: 'Tu mensaje fue enviado correctamente.', error: 'No se pudo enviar el mensaje. Inténtalo nuevamente.' },
    footer: { designed: 'Diseñado y desarrollado por', built: 'Construido con', and: 'y' },
  },
  pt: {
    nav: { home: 'Início', projects: 'Projetos', skills: 'Habilidades', contact: 'Contato', resume: 'Baixar meu currículo', language: 'Idioma' },
    hero: {
      greeting: 'Olá!', intro: 'Eu sou Miguel Bonilla', role: 'Desenvolvedor Full Stack', drag: 'Arraste para explorar',
      cubeLabel: 'Cubo interativo com especialidades profissionais. Arraste para girar ou use as setas do teclado.',
      faces: [
        { title: '', description: 'Produtos digitais criados em torno de objetivos reais do negócio.' },
        { title: 'Soluções Backend', description: 'Serviços seguros e escaláveis que sustentam o crescimento e as operações.' },
        { title: 'Experiências do Usuário', description: 'Interfaces responsivas e acessíveis que simplificam processos complexos.' },
        { title: 'APIs e Integrações', description: 'APIs RESTful que conectam plataformas, pagamentos, parceiros e dados do negócio.' },
        { title: 'Automação de Processos', description: 'Menos trabalho manual com fluxos conectados, automação inteligente e dados melhores.' },
        { title: 'Evolução do Produto', description: 'Software sustentável que se adapta, melhora e cresce junto com o negócio.' },
      ],
    },
    projects: {
      title: 'Projetos em Destaque', previous: 'Projeto anterior', next: 'Próximo projeto', live: 'Ver projeto', code: 'Código',
      items: [
        { title: 'LeadFlow AI', description: 'Um fluxo de qualificação de leads assistido por IA que captura solicitações, pontua oportunidades, salva resultados no Supabase e coordena o acompanhamento com n8n.' },
        { title: 'Crypto Pulse — Bot do Discord', description: 'Um assistente de mercado para Discord que entrega cotações de criptomoedas em tempo real e compara ativos com dados da CoinMarketCap.' },
        { title: 'Dark Shape Studios', description: 'Um site focado em conversão para um estúdio de produção, mixagem e masterização, com portfólio responsivo e contato direto.' },
      ],
    },
    skills: {
      title: 'Habilidades',
      frontend: 'Web e Mobile',
      backend: 'Backend e Dados',
      mobileAi: 'Inteligência Artificial',
      tools: 'Ferramentas e Infraestrutura',
    },
    contact: { title: 'Vamos conversar sobre seu próximo projeto!', name: 'Nome', namePlaceholder: 'Seu nome', email: 'E-mail', emailPlaceholder: 'Digite seu e-mail', message: 'Mensagem', messagePlaceholder: 'Conte-me sobre seu projeto', messageHint: 'Mínimo de 10 caracteres.', send: 'Enviar', sending: 'Enviando…', success: 'Sua mensagem foi enviada com sucesso.', error: 'Não foi possível enviar a mensagem. Tente novamente.' },
    footer: { designed: 'Projetado e desenvolvido por', built: 'Criado com', and: 'e' },
  },
} as const;

type I18nContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (typeof translations)[Language];
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const saved = window.localStorage.getItem('portfolio-language');
    if (saved !== 'en' && saved !== 'es' && saved !== 'pt') return;
    const frame = window.requestAnimationFrame(() => setLanguage(saved));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : language;
    window.localStorage.setItem('portfolio-language', language);
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage, t: translations[language] }), [language]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useLanguage() {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
  return context;
}

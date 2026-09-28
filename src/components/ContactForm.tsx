'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useState, type FormEvent } from 'react';
import { useLanguage } from '@/lib/i18n';

const ContactSection = styled.section`
  padding: 5rem 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  text-align: center;
  color: var(--foreground);
  margin-bottom: 2.5rem;
`;

const Form = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: var(--foreground);
  font-size: 1rem;
`;

const Input = styled.input`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 1rem;
  color: var(--foreground);
  font-family: inherit;
  font-size: 1rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2);
  }
`;

const TextArea = styled.textarea`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 1rem;
  color: var(--foreground);
  font-family: inherit;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2);
  }
`;

const FieldHint = styled.p`
  color: #94a3b8;
  font-size: 0.85rem;
  line-height: 1.4;
`;

const SubmitButton = styled.button`
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 1rem;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 1rem;

  &:hover {
    background: var(--primary-hover);
    transform: translateY(-2px);
  }

  &:disabled {
    cursor: wait;
    opacity: 0.7;
    transform: none;
  }
`;

const FormStatus = styled.p<{ $error: boolean }>`
  min-height: 1.5rem;
  color: ${({ $error }) => ($error ? '#fda4af' : '#86efac')};
  text-align: center;
  font-weight: 600;
`;

export default function ContactForm() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const sendEmail = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });

      if (!response.ok) throw new Error('Unable to send message');
      form.reset();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <ContactSection id="contact">
      <SectionTitle
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {t.contact.title}
      </SectionTitle>

      <Form
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        onSubmit={sendEmail}
      >
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: 'none' }} />
        <InputGroup>
          <Label htmlFor="name">{t.contact.name}</Label>
          <Input type="text" id="name" name="name" placeholder={t.contact.namePlaceholder} required />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="email">{t.contact.email}</Label>
          <Input type="email" id="email" name="email" placeholder={t.contact.emailPlaceholder} required />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="message">{t.contact.message}</Label>
          <TextArea
            id="message"
            name="message"
            placeholder={t.contact.messagePlaceholder}
            minLength={10}
            maxLength={5000}
            aria-describedby="message-hint"
            required
          />
          <FieldHint id="message-hint">{t.contact.messageHint}</FieldHint>
        </InputGroup>

        <SubmitButton type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? t.contact.sending : t.contact.send}
        </SubmitButton>
        <FormStatus $error={status === 'error'} role="status" aria-live="polite">
          {status === 'success' ? t.contact.success : status === 'error' ? t.contact.error : ''}
        </FormStatus>
      </Form>
    </ContactSection>
  );
}

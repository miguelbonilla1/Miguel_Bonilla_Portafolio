import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SkillsGrid from '@/components/SkillsGrid';
import ProjectsSliderSection from '@/components/ProjectsSlider';
import ContactForm from '@/components/ContactForm';

export default function Home() {
  return (
    <>
      <Navbar />
      <main style={{ overflowX: 'hidden' }}>
        <Hero />
        <ProjectsSliderSection />
        <SkillsGrid />
        <ContactForm />
      </main>
    </>
  );
}

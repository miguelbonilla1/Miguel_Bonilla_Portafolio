import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'
// import AnimatedBackground from '@/components/AnimatedBackground'

export default function Home() {
  return (
    <main>
     
      <Header />
      <HeroSection />
      <Projects />
      <Skills />
      <Contact />
    </main>
  )
}
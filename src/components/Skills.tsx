import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHtml5, faCss3Alt, faJsSquare, faReact, faBootstrap } from '@fortawesome/free-brands-svg-icons'
import { DiNodejs } from "react-icons/di"

import { BiLogoPostgresql, BiLogoTailwindCss } from "react-icons/bi"
import { GrMysql } from "react-icons/gr"


interface Skill {
  name: string
  icon: JSX.Element
  color: string
}

const frontendSkills: Skill[] = [
  { name: 'HTML', icon: <FontAwesomeIcon icon={faHtml5} size="3x" />, color: '#E34F26' },
  { name: 'CSS', icon: <FontAwesomeIcon icon={faCss3Alt} size="3x" />, color: '#1572B6' },
  { name: 'JavaScript', icon: <FontAwesomeIcon icon={faJsSquare} size="3x" />, color: '#F7DF1E' },
  { name: 'React', icon: <FontAwesomeIcon icon={faReact} size="4x" />, color: '#61DAFB' },
  { name: 'Bootstrap', icon: <FontAwesomeIcon icon={faBootstrap} size="3x" />, color: '#7952B3' },
  { name: 'Tailwind', icon: <BiLogoTailwindCss size={70} />, color: '#0EA5E9' },
  // { name: 'TypeScript', icon: <SiTypescript size={67} />, color: '#0EA5E9' },
]

const backendSkills: Skill[] = [
  { name: 'Node.js', icon: <DiNodejs size={80} />, color: '#68A063' },
  // { name: 'Nest.js', icon: <SiNestjs size={80} />, color: '#F0304D' },
  { name: 'Express', icon: <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>Ex</span>, color: '#FFFF' }, // Texto estilizado para Express
  { name: 'PostgreSQL', icon: <BiLogoPostgresql size={80} />, color: '#479BD8' },
  { name: 'MySQL', icon: <GrMysql size={78} />, color: '#2B5D80' },
 
]

const SkillItem = ({ skill }: { skill: Skill }) => (
  <li className="flex flex-col items-center justify-center border border-gray-300 rounded-full shadow-sm text-center transform transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-lg" style={{ width: '140px', height: '140px' }}>
    <div className="p-2" style={{ color: skill.color }}>{skill.icon}</div>
    <p className="mt-1 text-xs">{skill.name}</p>
  </li>
)

export default function Skills() {
  return (
    <section id="skills" className="w-full min-h-screen px-1 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white dark:text-gray-200 flex flex-col justify-center items-center overflow-hidden">
      <h1 className="text-5xl font-bold py-4 text-center mt-10">Skills</h1>
      <div className="w-full flex flex-col lg:flex-row py-2 items-start justify-center">
        <div className="pt-3 w-full lg:w-auto p-2 flex flex-col items-center lg:mr-8">
          <h2 className="text-2xl font-bold mb-3 pb-3 text-center">Front-end Skills</h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-6 justify-items-center max-w-full">
            {frontendSkills.map((skill) => (
              <SkillItem key={skill.name} skill={skill} />
            ))}
          </ul>
        </div>
        <div className="mt-6 md:mt-0 pt-3 w-full lg:w-auto p-2 flex flex-col items-center lg:ml-8">
          <h2 className="pb-3 text-2xl font-bold mb-3 text-center">Back-end Skills</h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-6 justify-items-center max-w-full">
            {backendSkills.map((skill) => (
              <SkillItem key={skill.name} skill={skill} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

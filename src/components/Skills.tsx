import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHtml5, faCss3Alt, faJsSquare, faReact, faBootstrap } from '@fortawesome/free-brands-svg-icons'
import { faDatabase } from '@fortawesome/free-solid-svg-icons'
import { DiNodejs } from "react-icons/di"
import { SiNestjs, SiTypescript } from "react-icons/si"
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
  { name: 'React', icon: <FontAwesomeIcon icon={faReact} size="3x" />, color: '#61DAFB' },
  { name: 'Bootstrap', icon: <FontAwesomeIcon icon={faBootstrap} size="3x" />, color: '#7952B3' },
  { name: 'Tailwind', icon: <BiLogoTailwindCss size={48} />, color: '#0EA5E9' },
  { name: 'TypeScript', icon: <SiTypescript size={48} />, color: '#3178C6' },
]

const backendSkills: Skill[] = [
  { name: 'Node.js', icon: <DiNodejs size={48} />, color: '#68A063' },
  { name: 'Nest.js', icon: <SiNestjs size={48} />, color: '#F0304D' },
  { name: 'Express', icon: <FontAwesomeIcon icon={faDatabase} size="3x" />, color: '#000000' },
  { name: 'PostgreSQL', icon: <BiLogoPostgresql size={48} />, color: '#479BD8' },
  { name: 'MySQL', icon: <GrMysql size={48} />, color: '#2B5D80' },
]

const SkillItem = ({ skill }: { skill: Skill }) => (
  <li className="flex flex-col items-center justify-center border border-gray-300 rounded-full shadow-sm text-center transform transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-lg w-32 h-32 p-4">
    <div style={{ color: skill.color }}>{skill.icon}</div>
    <p className="mt-2 text-xs">{skill.name}</p>
  </li>
)

export default function Skills() {
  return (
    <section id="skills" className=" z-10 w-full min-h-screen px-4 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white flex flex-col justify-center items-center overflow-hidden">

      <h2 className="text-3xl font-bold py-8 text-center">Skills</h2>
      <div className="  w-full max-w-6xl flex flex-col lg:flex-row justify-center items-start gap-12">
        <div className=" w-full lg:w-1/2">
          <h3 className="text-xl font-bold mb-6 text-center">Front-end Skills</h3>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-6 justify-items-center">
            {frontendSkills.map((skill) => (
              <SkillItem key={skill.name} skill={skill} />
            ))}
          </ul>
        </div>
        <div className="w-full lg:w-1/2">
          <h3 className="text-xl font-bold mb-6 text-center">Back-end Skills</h3>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-6 justify-items-center">
            {backendSkills.map((skill) => (
              <SkillItem key={skill.name} skill={skill} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
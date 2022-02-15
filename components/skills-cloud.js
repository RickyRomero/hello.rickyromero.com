import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const SkillsCloud = () => {
  const [activeSkillset, setActiveSkillset] = useState('design')
  const skills = {
    design: [
      '3D modeling',
      'Blender',
      'brainstorming',
      'color management',
      'design critique',
      'design systems',
      'Figma',
      'graphic design',
      'icon design',
      'Illustrator',
      'interaction design',
      'photography',
      'Photoshop',
      'prototyping',
      'responsive design',
      'Sketch',
      'UX design',
      'UI design',
      'user testing',
      'visual design',
      'wireframing'
    ],
    code: [
      'babel',
      'CSS',
      'code review',
      'docker-compose',
      'Docker',
      'eslint',
      'Express.js',
      'Framer Motion',
      'Git',
      'GitHub Actions',
      'GLSL',
      'HTML',
      'Next.js',
      'Node',
      'npm/yarn',
      'PostCSS',
      'Puppeteer',
      'react-three-fiber',
      'React',
      'Sass',
      'SQL',
      'stylelint',
      'Swift',
      'three.js',
      'Vanilla JavaScript',
      'WebGL',
      'Webpack'
    ]
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const skillsetNames = Object.keys(skills)
      const activeIndex = skillsetNames.indexOf(activeSkillset)
      const nextIndex = (activeIndex + 1) % skillsetNames.length

      setActiveSkillset(skillsetNames[nextIndex])
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.ul variants={container} initial="hidden" animate="show" exit="hidden">
      {skills[activeSkillset].map(skill => (
        <motion.li
          key={`${activeSkillset}-${skill}`}
          variants={item}
        >
          {skill}
        </motion.li>
      ))}
    </motion.ul>
  )
}

export default SkillsCloud

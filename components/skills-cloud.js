import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import skills from './skills-cloud.json'

const SkillsCloud = () => {
  const [activeSkillset, setActiveSkillset] = useState('design')

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
      {Object.keys(skills[activeSkillset]).map(skill => (
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

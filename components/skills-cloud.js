import { useState } from 'react'
import { motion } from 'framer-motion'
import { deviceType } from 'detect-it'

import { Heading, Passage } from 'components/typography'
import cl from 'utils/classlist'
import skills from './skills-cloud.json'
import styles from './skills-cloud.module.css'

const strengthMap = new Map()
strengthMap.set(1, 'Basic')
strengthMap.set(2, 'Advanced')
strengthMap.set(3, 'Fluent')

// Deterministically maps strings to styles
const styleHash = string => {
  const chars = [...string]
  const codes = chars.map(char => char.charCodeAt(0))
  const hashBase = codes.reduce((prev, curr) => (prev + curr) % codes[0], 0)
  return hashBase % 4
}

const skillVariants = [
  styles.skillVariant1,
  styles.skillVariant2,
  styles.skillVariant3,
  styles.skillVariant4
]

const Tooltip = ({ skill, level, details }) => {
  return (
    <div className={styles.tooltip}>
      <Heading as="h4">{skill}</Heading>
      <Passage as="p4">{strengthMap.get(level)}</Passage>
      <Passage as="p4">{details}</Passage>
    </div>
  )
}

const SkillsCloud = ({ className }) => {
  const [activeSkillInfo, setActiveSkillInfo] = useState([null, null])
  const [activeSet, activeSkill] = activeSkillInfo
  const { level, details } = activeSet ? skills[activeSet][activeSkill] : {}

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.0333
      }
    }
  }

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
  }

  const updateActiveSkillInfo = (set, skill) => {
    if (deviceType !== 'touchOnly') {
      setActiveSkillInfo([set, skill])
    }
  }

  return (
    <motion.ul className={cl(styles.skillCloud, className)} variants={container} initial="hidden" animate="show" exit="hidden">
      {Object.keys(skills).map(set => (
        Object.keys(skills[set]).map(skill => (
          <motion.li
            className={cl(styles.skill, skillVariants[styleHash(skill)])}
            onPointerOver={() => updateActiveSkillInfo(set, skill)}
            onPointerLeave={() => updateActiveSkillInfo(null, null)}
            key={`${set}-${skill}`}
            variants={item}
          >
            {skill === activeSkill && <Tooltip {...{ skill, level, details }} />}
            {skill}
          </motion.li>
        ))
      ))}
    </motion.ul>
  )
}

export default SkillsCloud

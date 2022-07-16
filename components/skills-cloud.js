import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  const [left, setLeft] = useState('50%')
  const [x, setX] = useState('-50%')
  const container = useRef(null)

  // Positions the tooltip so it won't run off the screen
  useEffect(() => {
    const tooltipWidth = Math.min(window.innerWidth * 0.9, 400)
    const parent = container.current?.parentNode

    if (parent) {
      const skill = parent.getBoundingClientRect()
      const leadingEdge = skill.x
      const trailingEdge = window.innerWidth - (skill.x + skill.width)
      const nearestEdge = Math.min(leadingEdge, trailingEdge)

      if (nearestEdge < 60) {
        setLeft(0)
        setX(leadingEdge === nearestEdge ? 0 : skill.width - tooltipWidth)
      }
    }
  }, [container])

  return (
    <motion.div
      ref={container}
      className={styles.tooltip}
      initial={{ opacity: 0, left, x, y: 20 }}
      animate={{ opacity: 1, left, x, y: 0, transition: { duration: 0.15 } }}
      exit={{ opacity: 0, left, x, y: 20, transition: { duration: 0.3 } }}
    >
      <Heading as="h4">{skill}</Heading>
      <Passage as="p4">{strengthMap.get(level)}</Passage>
      <Passage as="p4">{details}</Passage>
    </motion.div>
  )
}

const SkillsCloud = ({ className }) => {
  const [activeSkillInfo, setActiveSkillInfo] = useState([null, null])
  const [activeSet, activeSkill] = activeSkillInfo
  const { level, details } = activeSet ? skills[activeSet][activeSkill] : {}

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.05
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 150 },
    show: { transition: { duration: 1.5 }, opacity: 1, y: 0 }
  }

  const updateActiveSkillInfo = (set, skill) => {
    if (deviceType !== 'touchOnly') {
      setActiveSkillInfo([set, skill])
    }
  }

  return (
    <motion.ul
      className={cl(styles.skillCloud, className)}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '200px 0px' }}
    >
      {Object.keys(skills).map(set => (
        Object.keys(skills[set]).map(skill => {
          const isActiveSkill = skill === activeSkill
          const classSet = [
            styles.skill,
            skillVariants[styleHash(skill)],
            isActiveSkill ? styles.activeSkill : ''
          ]

          return (
            <motion.li
              className={cl(...classSet)}
              onPointerOver={() => updateActiveSkillInfo(set, skill)}
              onPointerLeave={() => updateActiveSkillInfo(null, null)}
              key={`${set}-${skill}`}
              variants={item}
            >
              {(
                <AnimatePresence>
                  { isActiveSkill && (
                    <Tooltip {...{ skill, level, details }} />
                  )}
                </AnimatePresence>
              )}
              {skill}
            </motion.li>
          )
        })
      ))}
    </motion.ul>
  )
}

export default SkillsCloud

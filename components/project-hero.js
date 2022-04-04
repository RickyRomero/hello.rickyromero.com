import Image from 'next/image'
import { motion } from 'framer-motion'

import { Heading } from 'components/typography'
import cl from 'utils/classlist'

import styles from './project-hero.module.css'

const MotionHeading = motion(Heading)

const ProjectHero = props => {
  const { expanded, project, spring } = props
  const { metadata, slug } = project
  const { title, baseColor } = metadata

  const className = cl(styles.hero, expanded ? styles.expanded : '')

  return (
    <motion.figure
      layout
      transition={spring}
      style={{ backgroundColor: baseColor, originX: 0, originY: 0 }}
      className={className}
    >
      <motion.div
        className={styles.bgContainer}
        transition={spring}
        animate={{ opacity: expanded ? 1.0 : 0.5 }}
      >
        <Image
          priority={expanded}
          src={require(`projects/${slug}/background.jpg`)}
          layout="fill"
          objectFit="cover"
          sizes="1360px"
        />
      </motion.div>
      <Image
        priority={expanded}
        src={require(`projects/${slug}/foreground.png`)}
        layout="fill"
        objectFit="contain"
        sizes="600px"
      />
      <MotionHeading
        className={styles.title}
        transition={spring}
        animate={{
          opacity: Number(expanded),
          y: expanded ? 0 : 80
        }}
      >
        {title}
      </MotionHeading>
    </motion.figure>
  )
}

export default ProjectHero

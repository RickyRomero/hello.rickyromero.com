import { motion } from 'framer-motion'

import LensImage from 'components/lens-image'
import { Heading } from 'components/typography'
import cl from 'utils/classlist'

import styles from './project-hero.module.css'

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
        <LensImage
          alt=""
          priority={expanded}
          src={`projects/${slug}/background.jpg`}
          sizes="1360px"
          style={{ objectFit: 'cover' }}
          fill
        />
      </motion.div>
      <LensImage
        alt={title}
        priority={expanded}
        src={`projects/${slug}/foreground.png`}
        sizes="600px"
        style={{ objectFit: 'contain' }}
        fill
      />
      <motion.div
        transition={spring}
        animate={{
          opacity: Number(expanded),
          y: expanded ? 0 : 80
        }}
      >
        <Heading className={styles.title}>{title}</Heading>
      </motion.div>
    </motion.figure>
  )
}

export default ProjectHero

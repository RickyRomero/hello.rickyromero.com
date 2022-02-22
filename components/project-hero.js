import Image from 'next/image'
import { motion } from 'framer-motion'

import { Heading } from 'components/typography'
import cl from 'utils/classlist'

import styles from './project-hero.module.css'

const ProjectHero = props => {
  const { expanded, project, spring } = props
  const { metadata, slug } = project
  const { title } = metadata

  const className = cl(styles.hero, expanded ? styles.expanded : '')

  return (
    <motion.figure
      layout
      transition={spring}
      style={{ originX: 0, originY: 0 }}
      className={className}
    >
      <Image
        priority={expanded}
        className={styles.keyArtBg}
        src={require(`projects/${slug}/background.jpg`)}
        layout="fill"
        objectFit="cover"
        sizes="1360px"
      />
      {slug === 'openemu' && (
        <Image
          priority={expanded}
          src={require('projects/openemu/foreground.png')}
          layout="fill"
          objectFit="contain"
          sizes="600px"
        />
      )}
      <Heading>{title}</Heading>
    </motion.figure>
  )
}

export default ProjectHero

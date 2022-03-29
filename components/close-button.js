import Link from 'next/link'
import { motion } from 'framer-motion'

import useProjectMvTransform from 'hooks/use-project-motion-value-transform'

import styles from './close-button.module.css'

const dynamicOverlayProps = {
  enabled: {},
  disabled: {
    tabIndex: -1,
    'aria-disabled': true
  }
}

const CloseButton = ({ expanded, spring }) => {
  const [transformed, setProjectMotionValue] = useProjectMvTransform(expanded, {
    display: v => v ? 'block' : 'none',
    opacity: v => v
  })
  const addlOverlayProps = dynamicOverlayProps[expanded ? 'enabled' : 'disabled']

  return (
    <motion.div
      initial={false}
      animate={{ progress: expanded ? 1 : 0 }}
      transition={spring}
      className={styles.closeButton}
      onUpdate={setProjectMotionValue}
      style={{
        ...transformed,
        pointerEvents: expanded ? 'auto' : 'none'
      }
    }>
      <Link href="/" scroll={false}>
        <a
          draggable="false"
          className={styles.closeButtonLink}
          {...addlOverlayProps}
        >
          Go back home
        </a>
      </Link>
    </motion.div>
  )
}

export default CloseButton

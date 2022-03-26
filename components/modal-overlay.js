import { Suspense, lazy } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

import useProjectMvTransform from 'hooks/use-project-motion-value-transform'

import styles from './modal-overlay.module.css'

const Escape = lazy(() => import('components/escape'))

const dynamicOverlayProps = {
  enabled: {},
  disabled: {
    tabIndex: -1,
    'aria-disabled': true
  }
}

const ModalOverlay = ({ expanded, spring }) => {
  const [transformed, setProjectMotionValue] = useProjectMvTransform(expanded, {
    position: v => v ? 'fixed' : 'absolute',
    opacity: v => v
  })
  const addlOverlayProps = dynamicOverlayProps[expanded ? 'enabled' : 'disabled']

  return (
    <motion.div
      initial={false}
      animate={{ progress: expanded ? 1 : 0 }}
      transition={spring}
      className={styles.overlay}
      onUpdate={setProjectMotionValue}
      style={{
        ...transformed,
        pointerEvents: expanded ? 'auto' : 'none'
      }
    }>
      <Link href="/" scroll={false}>
        <a className={styles.overlayLink} {...addlOverlayProps}>Go back home</a>
      </Link>
      { expanded && <Suspense fallback={null}><Escape to="/" /></Suspense> }
    </motion.div>
  )
}

export default ModalOverlay

import { Suspense, lazy, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

import useProjectMvTransform from 'hooks/use-project-motion-value-transform'

import styles from './modal-overlay.module.css'

const Escape = lazy(() => import('components/escape'))

const offset = target => {
  if (target) {
    return `translate3d(0px, ${target.scrollTop}px, 0px)`
  }
}

const ModalOverlay = ({ expanded, spring, getScrollable }) => {
  const overlay = useRef()
  const passive = true
  const [transformed, setProjectMotionValue] = useProjectMvTransform(expanded, {
    opacity: v => v,
    position: v => v > 0 && v < 1 ? 'fixed' : 'absolute',
    inset: v => v < 1 ? 0 : null,
    transform: v => v < 1 ? '' : offset(getScrollable().current),
    width: v => v === 1 ? '100vw' : null,
    height: v => v === 1 ? '110vh' : null
  })

  const updateOverlayPos = event => {
    let target
    if (event) {
      target = event.target
    } else {
      target = getScrollable().current
    }

    if (target) {
      // Avoids re-rendering
      overlay.current.style.transform = offset(target)
    }
  }

  useEffect(() => {
    const scrollable = getScrollable().current
    if (scrollable) {
      updateOverlayPos()
      scrollable.addEventListener('scroll', updateOverlayPos, { passive })
      window.addEventListener('resize', updateOverlayPos)

      return () => {
        updateOverlayPos()
        scrollable.removeEventListener('scroll', updateOverlayPos, { passive })
        window.removeEventListener('resize', updateOverlayPos)
      }
    }
  }, [getScrollable])

  updateOverlayPos()

  return (
    <motion.div
      ref={overlay}
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
        <a
          draggable="false"
          className={styles.overlayLink}
          tabIndex={-1}
          aria-disabled={true}
        >
          Go back home
        </a>
      </Link>
      { expanded && <Suspense fallback={null}><Escape to="/" /></Suspense> }
    </motion.div>
  )
}

export default ModalOverlay

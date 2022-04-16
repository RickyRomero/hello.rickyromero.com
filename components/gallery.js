import { useEffect, useState } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { supportsTouchEvents } from 'detect-it'

import LensImage from 'components/lens-image'
import cl from 'utils/classlist'

import styles from './gallery.module.css'

const wrap = (min, max, v) => {
  const rangeSize = max - min
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min
}

const swipeConfidenceThreshold = 10000
const swipePower = (offset, velocity) => Math.abs(offset) * velocity

const Gallery = ({ children }) => {
  const motionRate = Number(!useReducedMotion())
  const [cursorNeeded, setCursorNeeded] = useState(false)
  const [[page, direction], setPage] = useState([0, 0])
  const imageIndex = wrap(0, children.length, page)

  const { alt = '', src, width, height } = children[imageIndex].props
  const variants = {
    enter: direction => ({
      x: (direction > 0 ? 1000 : -1000) * motionRate,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: direction => ({
      zIndex: 0,
      x: (direction < 0 ? 1000 : -1000) * motionRate,
      opacity: 0
    })
  }

  const paginate = newDirection => {
    setPage([page + newDirection, newDirection])
  }

  useEffect(() => {
    setCursorNeeded(!supportsTouchEvents)
  }, [])

  return (
    <div className={styles.gallery}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.figure
          key={page}
          className={styles.slide}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x)

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1)
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1)
            }
          }}
        >
          <div
            className={styles.ratioFitter}
            style={{ aspectRatio: width / height }}
          >
            <LensImage
              alt={alt} src={src} width={width} height={height}
              draggable="false"
            />
          </div>
        </motion.figure>
      </AnimatePresence>
      {cursorNeeded && (
        <>
          <button className={styles.next} onClick={() => paginate(1)}>
            ‣
          </button>
          <button className={styles.prev} onClick={() => paginate(-1)}>
            ‣
          </button>
        </>
      )}
      <div className={styles.pages}>
        {children.map((_, idx) => (
          <button
            key={idx}
            className={cl(
              styles.page, idx === imageIndex ? styles.activePage : ''
            )}
            onClick={() => paginate(idx - imageIndex)}
          >
            Page {idx}
          </button>
        ))}
      </div>
    </div>
  )
}

const Slide = ({ alt, src, width, height }) => null

export { Gallery, Slide }

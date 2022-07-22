import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { motion, useTransform } from 'framer-motion'
import Link from 'next/link'

import LensImage from 'components/lens-image'
import Player from 'components/player'
import Insignia from 'components/insignia'
import { Grid, Row } from 'components/grid'
import { Heading, Passage } from 'components/typography'
import MarkdownRenderer from 'components/markdown-renderer'
import Button from 'components/button'
import SkillsCloud from 'components/skills-cloud'

import useContactInfo from 'hooks/use-contact-info'
import { useDarkMode, useReducedMotion } from 'hooks/use-media-query'
import useLogs from 'hooks/use-logs'
import useMotionRate from 'hooks/use-motion-rate'
import useDreamscapeOpacity from 'hooks/use-dreamscape-opacity'
import cl from 'utils/classlist'

import Project from './projects/[slug].js'
import { getProjectsMeta } from 'generators/projects'

import aboutBlurb from 'blurbs/about.md'

import styles from 'styles/home.module.css'

const ThreeWrapper = lazy(() => import('components/three-wrapper'))
const Dreamscape = lazy(() => import('scenes/dreamscape'))

const MotionHeading = motion(Heading)
const MotionPassage = motion(Passage)
const MotionButton = motion(Button)

const transition = { type: 'spring', damping: 40 }
const heroBase = { show: { transition: { staggerChildren: 0.2 } } }
const heroItem = {
  hidden: { y: 100, opacity: 0, transition },
  show: { y: 0, opacity: 1, transition }
}

const Home = ({ projectMetadata, activeProject }) => {
  const logEntry = useLogs(state => state.logEntry)
  const contact = useContactInfo()
  const [isClient, setIsClient] = useState(false)
  const [glState, setGlState] = useState('unknown')
  const [scrollOpacity, initialFade] = useDreamscapeOpacity()
  const darkMode = useDarkMode()
  const motionRate = useMotionRate()
  const reduceMotion = useReducedMotion()
  const scheme = darkMode ? 'dark' : 'light'

  motionRate.set(Number(!activeProject))

  const scrollLogThreshold = 500 // px
  const lastScrollPos = useRef(0)
  const cumulativeScroll = useRef(0)

  const contactHref = `mailto:${contact}?subject=${encodeURIComponent('Hello!')}`
  const placeholderStyle = {
    display: useTransform(initialFade, v => v < 1 ? 'block' : 'none')
  }

  const handleEmailCta = () => logEntry({ target: '#email' })
  const handleResumeCta = event => {
    event.preventDefault()
    logEntry({ target: '#resume' })
    window.open(event.target.parentNode.href, '_blank')
  }

  const checkCumulativeScroll = () => {
    if (cumulativeScroll.current > scrollLogThreshold) {
      return
    }

    const currentScrollPos = window.scrollY // Really only interested in the main page
    const scrollDelta = Math.abs(currentScrollPos - lastScrollPos.current)
    cumulativeScroll.current += scrollDelta

    if (cumulativeScroll.current > scrollLogThreshold) {
      logEntry({ target: '#user-scrolled' })
    }
  }

  // Only render Three.js on the client
  useEffect(() => {
    setIsClient(true)
    // and only when WebGL is available
    // (Apple's Lockdown Mode [2022] prevents WebGL from working)
    const testCanvas = document.createElement('canvas')
    const glPresent = testCanvas.getContext('webgl')
    setGlState(glPresent ? 'available' : 'unavailable')

    if (!glPresent) {
      logEntry({ target: '#no-gl' })
    }
  }, [])

  if (typeof window !== 'undefined') {
    useEffect(() => {
      const ref = document.referrer
      const logData = { target: window.location.pathname }

      if (ref.length > 0 && ref.indexOf(window.location.hostname) === -1) {
        logData.referrer = ref
      }

      logEntry(logData)
    }, [window.location.pathname])

    // Special case for when the visitor leaves the page
    useEffect(() => {
      const logEgress = () => {
        const data = { client: {}, entry: {} }
        if (document.visibilityState === 'visible') {
          data.entry.target = '#return'
        } else if (document.visibilityState === 'hidden') {
          data.entry.target = '#leave'
        }

        const blob = new Blob([JSON.stringify(data)], { type: 'application/json' })
        navigator.sendBeacon('/api/log', blob)
      }

      document.addEventListener('visibilitychange', logEgress)
      return () => document.removeEventListener('visibilitychange', logEgress)
    }, [])

    // Set up scroll events to log if the user scrolls the page
    useEffect(() => {
      const options = { passive: true }
      lastScrollPos.current = window.scrollY
      window.addEventListener('scroll', checkCumulativeScroll, options)
      return () => window.removeEventListener('scroll', checkCumulativeScroll, options)
    }, [])
  }

  return (
    <>
      <figure className={styles.dreamscape}>
        <motion.div className={styles.dreamscapeFader} style={{ opacity: scrollOpacity }}>
          <motion.div className={styles.placeholder} style={placeholderStyle}>
            <LensImage
              alt=""
              src={`home/loading-${scheme}.jpg`}
              layout="fill"
              objectFit="cover"
              sizes="50vw"
            />
          </motion.div>
          <motion.div className={styles.rendererContainer} style={{ opacity: initialFade }}>
            {isClient && (
              (() => {
                if (glState === 'available') {
                  // Everything nominal
                  return (
                    <Suspense fallback={null}>
                      <ThreeWrapper>
                        <Suspense fallback={null}>
                          <Dreamscape onFirstFrame={() => initialFade.set(1)} />
                        </Suspense>
                      </ThreeWrapper>
                    </Suspense>
                  )
                } else if (glState === 'unavailable') {
                  initialFade.set(1)
                  if (!reduceMotion) {
                    // GL won't initialize; use fallback video if reduced motion not desired
                    return (
                      <Player className={styles.fallback} uses={`home/fallback-${scheme}`} width="2520" height="1080" />
                    )
                  } else {
                    // GL unavailable and reduced motion is desired
                    return (
                      <LensImage
                        alt=""
                        src={`home/static-${scheme}.jpg`}
                        layout="fill"
                        objectFit="cover"
                        sizes="150vw"
                      />
                    )
                  }
                }
              })()
            )}
          </motion.div>
        </motion.div>
      </figure>

      <div className={styles.page}>
        <div className={styles.content}>
          <header className={styles.header}></header>
          <main className={styles.main}>
            <section className={cl(styles.section, styles.hello)}>
              <div className={cl(styles.insignia, styles.top)}>
                <div className={styles.insigniaClip} />
              </div>
              <motion.div
                className={styles.introWrapper}
                variants={heroBase}
                initial="hidden"
                animate="show"
              >
                <Grid className={styles.heroGrid}>
                  <MotionHeading variants={heroItem}>hi there.</MotionHeading>
                  <div className={styles.intro}>
                    <MotionPassage as="p1" variants={heroItem}>My name's Ricky.</MotionPassage>
                    <MotionPassage as="p1" variants={heroItem}>I design and code.</MotionPassage>
                    <MotionPassage as="p1" variants={heroItem}>Let's <em>build something incredible.</em></MotionPassage>
                  </div>
                  <Row openEnded>
                    <MotionButton spans={[4]} variants={heroItem} href={contactHref} onClick={handleEmailCta}>Say Hi</MotionButton>
                    <MotionButton spans={[4]} variants={heroItem} href="/ricky-romero-resume.pdf" onClick={handleResumeCta}>See Résumé</MotionButton>
                  </Row>
                  <motion.div variants={heroItem}>
                    <Passage as="p3" className={styles.otherLinks}>
                      <span><Link href="https://github.com/RickyRomero/hello.rickyromero.com">View Source</Link> on GitHub</span>
                      <span><Link href="https://www.linkedin.com/in/RickyRomero/">Connect</Link> on LinkedIn</span>
                    </Passage>
                  </motion.div>
                </Grid>
              </motion.div>
            </section>

            <Grid className={cl(styles.section, styles.projects)}>
              <Heading as="h2">things i've done.</Heading>
              <Row>
                {projectMetadata.filter(summary => {
                  return !summary.metadata.hidden
                }).map(summary => {
                  const { slug } = summary
                  const isExpanded = activeProject?.slug === slug
                  const passedDetails = isExpanded ? activeProject : summary
                  return (
                    <Project
                      key={passedDetails.slug}
                      spans={[passedDetails.metadata.grid || 4]}
                      data={passedDetails}
                      expanded={isExpanded}
                    />
                  )
                })}
              </Row>
            </Grid>

            <section className={cl(styles.section, styles.skills)}>
              <Grid>
                <Heading as="h2">what i can do.</Heading>
                <SkillsCloud />
              </Grid>
            </section>

            <section className={cl(styles.section, styles.about)}>
              <Grid>
                <Heading as="h2">more about me.</Heading>
                <Row>
                  <figure className={styles.portrait} spans={[4]}>
                    <LensImage
                      layout="fill"
                      objectFit="cover"
                      sizes="(max-width: 1000px) 94vw, 30vw"
                      src="home/me.jpg"
                      alt="Portrait photo of Ricky Romero"
                    />
                  </figure>
                  <div spans={[8]}>
                    <MarkdownRenderer
                      className={styles.aboutContent}
                      options={{ wrapper: Grid }}
                    >
                      {aboutBlurb}
                    </MarkdownRenderer>
                  </div>
                </Row>
              </Grid>
            </section>

            <section className={cl(styles.section, styles.letsDoThis)}>
              <Grid className={styles.letsDoThisGrid}>
                <Heading>only 1 left in stock.</Heading>
                <Passage as="p1"><em>I'm looking for work,</em> but won't be for much longer.</Passage>
                <Passage as="p1">What do you want to build together?</Passage>
                <Row openEnded>
                  <Button spans={[4]} href={contactHref} onClick={handleEmailCta}>Say Hi</Button>
                  <Button spans={[4]} href="/ricky-romero-resume.pdf" onClick={handleResumeCta}>See Résumé</Button>
                </Row>
              </Grid>
            </section>
          </main>
          <footer className={styles.footer}></footer>
        </div>
      </div>

      <Insignia />
    </>
  )
}

const getStaticProps = async ({ params }) => {
  return {
    props: {
      projectMetadata: await getProjectsMeta()
    }
  }
}

export default Home
export { getStaticProps }

import { Suspense, lazy, useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, useTransform } from 'framer-motion'

import Metadata from 'components/metadata'
import Insignia from 'components/insignia'
import { Grid, Row } from 'components/grid'
import { Heading, Passage } from 'components/typography'
import MarkdownRenderer from 'components/markdown-renderer'
import Button from 'components/button'
import SkillsCloud from 'components/skills-cloud'

import { useDarkMode } from 'hooks/use-media-query'
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
  const [startCanvas, setStartCanvas] = useState(false)
  const [contact, setContact] = useState(null)
  const [scrollOpacity, initialFade] = useDreamscapeOpacity()
  const darkMode = useDarkMode()
  const motionRate = useMotionRate()
  const scheme = darkMode ? 'dark' : 'light'

  motionRate.set(Number(!activeProject))

  const placeholderStyle = {
    display: useTransform(initialFade, v => v < 1 ? 'block' : 'none')
  }

  const handleEmailCta = () => logEntry({ target: '#email' })

  // Hide contact info from scrapers
  useEffect(() => {
    const contactInfo = require('contact.json')
    setContact(`mailto:${contactInfo.main}`)
  }, [])

  // Only render Three.js on the client
  useEffect(() => {
    setStartCanvas(true)
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
  }

  return (
    <>
      <Metadata>
        <title>Ricky Romero: Design + Code</title>
        <meta name="description" content="My name's Ricky. I design and code. Let's build something incredible." />
      </Metadata>

      <motion.figure className={styles.dreamscape} style={{ opacity: scrollOpacity }}>
        <motion.div className={styles.placeholder} style={placeholderStyle}>
          <Image
            alt=""
            src={require(`scenes/dreamscape/loading-${scheme}.jpg`)}
            layout="fill"
            objectFit="cover"
            sizes="50vw"
          />
        </motion.div>
        <motion.div className={styles.rendererContainer} style={{ opacity: initialFade }}>
          {startCanvas && (
            <Suspense fallback={null}>
              <ThreeWrapper>
                <Suspense fallback={null}>
                  <Dreamscape onFirstFrame={() => initialFade.set(1)} />
                </Suspense>
              </ThreeWrapper>
            </Suspense>
          )}
        </motion.div>
      </motion.figure>

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
                    <MotionPassage as="p4" variants={heroItem}>Available starting June 27.</MotionPassage>
                  </div>
                  <Row openEnded>
                    <MotionButton spans={[4]} variants={heroItem} href={contact} onClick={handleEmailCta}>Say Hi</MotionButton>
                    <MotionButton spans={[4]} variants={heroItem}>See Résumé</MotionButton>
                  </Row>
                  <motion.div className={styles.iMadeThis} variants={heroItem}>
                    <Button
                      className={styles.inlineButton}
                      href="https://github.com/RickyRomero/hello.rickyromero.com/"
                      small
                    >
                      View Source
                    </Button>
                    <Passage as="p4">(Yes, I made this!)</Passage>
                  </motion.div>
                </Grid>
              </motion.div>
            </section>

            <Grid className={cl(styles.section, styles.projects)}>
              <Heading as="h2">things i've done.</Heading>
              <Row>
                {projectMetadata.map(summary => {
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

            <Grid className={styles.section}>
              <Heading as="h2">what i can do.</Heading>
              <SkillsCloud />
            </Grid>

            <Grid className={cl(styles.section, styles.about)}>
              <Heading as="h2">more about me.</Heading>
              <Row>
                <figure className={styles.portrait} spans={[4]}>
                  <Image
                    layout="fill"
                    objectFit="cover"
                    sizes="(max-width: 640px) 94vw, 30vw"
                    src={require('public/images/me.png')}
                    alt="Portrait photo of Ricky Romero"
                  />
                </figure>
                <div spans={[8]}>
                  <MarkdownRenderer>{aboutBlurb}</MarkdownRenderer>
                </div>
              </Row>
            </Grid>

            <Grid className={cl(styles.section, styles.letsDoThis)}>
              <Heading>only 1 left in stock.</Heading>
              <Passage as="p1"><em>I'm looking for work,</em> but won't be for much longer.</Passage>
              <Passage as="p1">What do you want to build together?</Passage>
              <Passage as="p4">Available starting June 27.</Passage>
              <Row>
                <Button spans={[4]} href={contact} onClick={handleEmailCta}>Say Hi</Button>
                <Button spans={[4]}>See Résumé</Button>
              </Row>
            </Grid>
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

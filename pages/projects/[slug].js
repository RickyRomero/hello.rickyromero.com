// IMPORTANT NOTE
//
// This component, while it follows the routing pattern for static site generation,
// breaks convention because the app doesn't mount it directly. I only set the path up
// this way so I could use Next.js's built-in routing features and static generation.
//
// The Home component always mounts this one and gets its static props as well. When
// we get the `expanded` flag, we use that as a cue to animate open and display the
// full page contents.
//
// The reason for doing this is to allow for a seamless transition between the project
// open/closed states.

import { useEffect, useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import FocusTrap from 'focus-trap-react'

import useProjectMvTransform from 'hooks/use-project-motion-value-transform'
import ProjectHero from 'components/project-hero'
import MarkdownRenderer from 'components/markdown-renderer'
import PreventBodyScroll from 'components/prevent-body-scroll'
import ModalOverlay from 'components/modal-overlay'
import { getProjectSlugs, getProjectsMeta, getProject } from 'generators/projects'
import cl from 'utils/classlist'

import styles from 'styles/project.module.css'

const dynamicScrollerProps = {
  enabled: { tabIndex: 0 },
  disabled: {
    tabIndex: -1,
    'aria-disabled': true
  }
}

const Project = ({ data, expanded, className }) => {
  const scrollArea = useRef()
  const slowMo = true
  const lightboxLayer = typeof window !== 'undefined' ? Number(
    window
      .getComputedStyle(document.documentElement)
      .getPropertyValue('--lightbox-layer')
  ) : 0

  const { metadata, slug, contents } = data
  const { title } = metadata
  const [transformed, setProjectMotionValue] = useProjectMvTransform(expanded, {
    zIndex: v => v ? lightboxLayer : 0
  })
  const wrapperClass = cl(styles.projectSlot, expanded ? styles.projectOpen : '')

  const spring = { type: 'spring', stiffness: slowMo ? 50 : 200, damping: 30 }
  const origin = { originX: 0, originY: 0 }
  const radius = { borderRadius: 40 }

  const scrollProps = dynamicScrollerProps[expanded ? 'enabled' : 'disabled']

  useEffect(() => { expanded && scrollArea.current?.focus() }, [scrollArea, expanded])

  return (
    <>
      {
        expanded && (
          <Head>
            <title>{title}</title>
          </Head>
        )
      }

      <FocusTrap active={expanded}>
        <li className={cl(wrapperClass, className)}>
          { expanded && <PreventBodyScroll /> }
          <motion.div ref={scrollArea} className={styles.scrollable} {...scrollProps}>
            <ModalOverlay expanded={expanded} spring={spring} />
            <motion.article layout
              initial={radius}
              animate={{ progress: expanded ? 1 : 0 }}
              transition={spring}
              style={{ ...transformed }}
              onUpdate={setProjectMotionValue}
              className={styles.card}
            >
              <motion.div layout="position"
                transition={spring}
                style={origin}
                className={styles.cardContents}
              >
                <ProjectHero {...{ project: data, expanded, spring }} />
                <main>
                  {contents && (
                    <MarkdownRenderer>{contents}</MarkdownRenderer>
                  )}
                </main>
              </motion.div>
            </motion.article>
          </motion.div>
          {
            !expanded && (
              <div
                className={styles.expandLink}
                style={{ zIndex: expanded ? 3 : 0 }}
              >
                <Link href={`/projects/${slug}`} scroll={false}>
                  <a className={styles.expandLink}>{title}</a>
                </Link>
              </div>
            )
          }
        </li>
      </FocusTrap>
    </>
  )
}

const getStaticPaths = async () => {
  const paths = (await getProjectSlugs())
    .map(slug => ({ params: { slug } }))

  return {
    paths,
    fallback: false
  }
}

const getStaticProps = async ({ params }) => {
  return {
    props: {
      projectMetadata: await getProjectsMeta(),
      activeProject: await getProject(params.slug)
    }
  }
}

export default Project
export { getStaticPaths, getStaticProps }

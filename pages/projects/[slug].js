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

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useMotionValue } from 'framer-motion'
import FocusTrap from 'focus-trap-react'

import { Heading } from 'components/typography'
import MarkdownRenderer from 'components/markdown-renderer'
import PreventBodyScroll from 'components/prevent-body-scroll'
import ModalOverlay from 'components/modal-overlay'
import { getProjectSlugs, getProjectsMeta, getProject } from 'generators/projects'
import cl from 'utils/classlist'

import styles from 'styles/project.module.css'

const Project = ({ data, expanded, className }) => {
  const slowMo = false
  const { metadata, slug, contents } = data
  const { title } = metadata

  const wrapperClass = cl(styles.contentWrapper, expanded ? styles.wrapperOpen : '')

  const lightboxLayer = useMotionValue(expanded ? 'var(--lightbox-layer)' : 0)
  const setLightboxLayer = ({ progress }) => {
    lightboxLayer.set(progress > 0.001 ? 'var(--lightbox-layer)' : 0)
  }

  const spring = { type: 'spring', stiffness: slowMo ? 50 : 200, damping: 30 }
  const origin = { originX: 0, originY: 0 }
  const radius = { borderRadius: 40 }

  const imgSize = /* expanded ? '100vw' : */'1360px'

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
        <li className={cl(styles.project, className)}>
          { expanded && <PreventBodyScroll /> }
          <ModalOverlay expanded={expanded} spring={spring} />
          <motion.div
            transition={spring}
            animate={{ progress: expanded ? 1 : 0 }}
            style={{ zIndex: lightboxLayer }}
            onUpdate={setLightboxLayer}
            className={wrapperClass}
          >
            <motion.article
              layout
              initial={radius}
              transition={spring}
              style={origin}
              className={styles.content}
            >
              <motion.div
                layout="position"
                transition={spring}
                style={origin}
                className={styles.inverseTransform}
              >
                <motion.figure
                  layout
                  transition={spring}
                  style={origin}
                  className={styles.hero}
                >
                  <Image
                    priority={expanded}
                    src={require(`projects/${slug}/${slug}.jpg`)}
                    layout="fill"
                    objectFit="cover"
                    sizes={imgSize}
                  />
                  <Heading>{title}</Heading>
                </motion.figure>
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

// IMPORTANT NOTE
//
// This component, while it follows the routing pattern for static site generation,
// breaks convention because the app doesn't mount it directly. I only set the path up
// this way so I could use Next.js's built-in routing features and static generation.
//
// The Home component always mounts this one and gets its static props as well. When
// we get the `expanded` flag, we use that as a cue to animate open and display the
// full page contents.

import { Suspense, lazy } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useMotionValue } from 'framer-motion'
import FocusTrap from 'focus-trap-react'
import { getProjectSlugs, getProjectsMeta, getProject } from 'generators/projects'
import cl from 'utils/classlist'

import styles from 'styles/project.module.css'

const Escape = lazy(() => import('components/escape'))

const Project = ({ data, expanded, className }) => {
  const slowMo = true
  const { slug, title, contentHtml } = data

  const wrapperClassList = [styles.contentWrapper]
  if (expanded) { wrapperClassList.push(styles.wrapperOpen) }
  const wrapperClass = wrapperClassList.join(' ')

  const lightboxLayer = useMotionValue(expanded ? 'var(--lightbox-layer)' : 0)
  const setLightboxLayer = ({ progress }) => {
    lightboxLayer.set(progress > 0.001 ? 'var(--lightbox-layer)' : 0)
  }

  const spring = { type: 'spring', stiffness: slowMo ? 50 : 200, damping: 30 }
  const origin = { originX: 0, originY: 0 }
  const initial = { borderRadius: 40 }

  const imgSize = /* expanded ? '100vw' : */'25.894922425952vw'

  const dynamicOverlayProps = {
    enabled: {},
    disabled: {
      tabIndex: -1,
      'aria-disabled': true
    }
  }
  const addlOverlayProps = dynamicOverlayProps[expanded ? 'enabled' : 'disabled']

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
          <motion.div
            initial={false}
            animate={{ opacity: expanded ? 1 : 0 }}
            transition={spring}
            className={styles.overlay}
            style={{
              pointerEvents: expanded ? 'auto' : 'none'
            }
          }>
            <Link href="/" scroll={false}>
              <a className={styles.overlayLink} {...addlOverlayProps}>Go back home</a>
            </Link>
            { expanded && <Suspense fallback={null}><Escape /></Suspense> }
          </motion.div>
          <motion.div
            transition={spring}
            animate={{ progress: expanded ? 1 : 0 }}
            style={{ zIndex: lightboxLayer }}
            onUpdate={setLightboxLayer}
            className={wrapperClass}
          >
            <motion.article
              layout
              initial={initial}
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
                <figure className={styles.hero}>
                  <Image
                    src={require(`projects/${slug}/${slug}.jpg`)}
                    layout="fill"
                    objectFit="cover"
                    sizes={imgSize}
                  />
                  <h1>{title}</h1>
                  <h1>{title}</h1>
                </figure>
                <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
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
      activeProject: await getProject(params.slug)// await getPostData(params.slug)
    }
  }
}

export default Project
export { getStaticPaths, getStaticProps }

// IMPORTANT NOTE
//
// This component, while it follows the routing pattern for static site generation,
// breaks convention because the app doesn't mount it directly. I only set the path up
// this way so I could use Next.js's built-in routing features and static generation.
//
// The Home component always mounts this one and gets its static props as well. When
// we get the `expanded` flag, we use that as a cue to animate open and display the
// full page contents.

import { useRef } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import FocusTrap from 'focus-trap-react'
import { getProjectIds, getProjectsMeta } from 'generators/projects'

import styles from 'styles/project.module.css'

const Project = ({ postData, expanded }) => {
  const { id, title, contentHtml } = postData
  const primaryAnimated = useRef()

  const wrapperClassList = [styles.contentWrapper]
  if (expanded) { wrapperClassList.push(styles.wrapperOpen) }
  const wrapperClass = wrapperClassList.join(' ')

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
        <li className={styles.post}>
          <div className={styles.overlay} style={{
            pointerEvents: overlay.to(o => o > 0 && expanded ? 'auto' : 'none'),
            opacity: overlay.to(o => o / 1000)
          }}>
            <Link href="/" scroll={false}>
              <a className={styles.overlayLink} {...addlOverlayProps}>Go back home</a>
            </Link>
          </div>
          <div
            style={{ zIndex: overlay.to(o => o > 0 ? 2 : 0) }}
            className={wrapperClass}
          >
            <article
              className={styles.content}
              ref={primaryAnimated}
              style={{
                transform: xywh.to(makeTransform),
                borderRadius: xywh.to(makeBorderRadius)
              }}
            >
              <div
                className={styles.inverseTransform}
                style={{ transform: xywh.to(makeInverseTransform) }}
              >
                <figure className={styles.hero}>
                  <Image
                    src={require(`../../projects/${postData.id}/${postData.id}.jpg`)}
                    layout="fill"
                    objectFit="cover"
                    width={postData.imgSize[0]} height={postData.imgSize[1]}
                    sizes={imgSize}
                  />
                  <h1 className={utilStyles.headingXl}>{title}</h1>
                  <h1 className={utilStyles.headingl}>{title}</h1>
                </figure>
                <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
              </div>
            </article>
          </div>
          {
            !expanded && (
              <div
                className={styles.expandLink}
                style={{ zIndex: overlay.to(o => o > 0 ? 3 : 0) }}
              >
                <Link href={`/posts/${id}`} scroll={false}>
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
  const paths = (await getProjectIds())
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
      activeProject: params.slug// await getPostData(params.slug)
    }
  }
}

export default Project
export { getStaticPaths, getStaticProps }

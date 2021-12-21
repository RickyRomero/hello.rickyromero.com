import { Suspense, lazy, useEffect, useState } from 'react'
import Head from 'next/head'

import styles from 'styles/Home.module.css'

const Canvas = lazy(() => import('lazy/canvas'))
const Bokeh = lazy(() => import('scenes/bokeh'))

const Home = () => {
  const [bokehBg, setBokehBg] = useState()
  useEffect(() => {
    setBokehBg(
      window
        .getComputedStyle(document.documentElement)
        .getPropertyValue('--bokeh-bg')
        .trim()
    )
  }, [])

  const fallbackCanvas = <div className={styles.bokehPlaceholder} />

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Suspense fallback={fallbackCanvas}>
        <figure className={styles.bokehRendererContainer}>
          <Canvas dpr={[1, 10]} gl={{ alpha: false }} shadows camera={{ position: [0, -3.2, 40], fov: 12 }}>
            <color attach="background" args={[bokehBg]} />
            <Suspense fallback={null}>
              <Bokeh />
            </Suspense>
          </Canvas>
        </figure>
      </Suspense>

      <div className={styles.content}>
        <header className={styles.header}></header>
        <main className={styles.main}></main>
        <footer className={styles.footer}></footer>
      </div>
    </>
  )
}

export default Home

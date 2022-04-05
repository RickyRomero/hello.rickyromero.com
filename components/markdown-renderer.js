import { Fragment } from 'react'
import Markdown from 'markdown-to-jsx'
import Image from 'next/image'
import Link from 'next/link'

import { Heading, Passage } from 'components/typography'
import Player from 'components/player'
import cl from 'utils/classlist'

import styles from './markdown-renderer.module.css'

const WrappedLink = ({ href, title, children }) => {
  return (
    <Link href={href}>
      <a title={title}>{children}</a>
    </Link>
  )
}

const WrappedImage = ({ src, title = '', ...props }) => {
  let [width, height, ...options] = title.split('x')
  if (!width || !height) {
    width = props.width
    height = props.height
  }
  const noRounding = options.includes('no-rounding')

  const className = cl(
    styles.articleImage,
    noRounding ? styles.noRounding : ''
  )

  return (
    <Image
      {...props}
      className={className}
      width={width}
      height={height}
      src={`/project-media/${src}`}
      sizes="(max-width: 1455px) 88vw, 1280px"
    />
  )
}

const baseOptions = {
  wrapper: Fragment,
  overrides: {
    h1: { component: Heading, props: { as: 'h1' } },
    h2: { component: Heading, props: { as: 'h2' } },
    h3: { component: Heading, props: { as: 'h3' } },
    h4: { component: Heading, props: { as: 'h4' } },
    h5: { component: Heading, props: { as: 'h5' } },
    h6: { component: Heading, props: { as: 'h6' } },
    p: Passage,
    a: WrappedLink,
    img: WrappedImage,

    Player
  }
}

const MarkdownRenderer = ({ options = {}, children }) => {
  const consolidatedOptions = {
    ...baseOptions,
    ...options
  }

  return (
    <Markdown options={consolidatedOptions}>{children}</Markdown>
  )
}

export default MarkdownRenderer

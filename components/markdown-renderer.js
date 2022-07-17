import { Fragment } from 'react'
import Markdown from 'markdown-to-jsx'
import Link from 'next/link'

import useContactInfo from 'hooks/use-contact-info'
import useLogs from 'hooks/use-logs'
import LensImage from 'components/lens-image'
import { Heading, Passage, List } from 'components/typography'
import Player from 'components/player'
import cl from 'utils/classlist'

import styles from './markdown-renderer.module.css'

const WrappedLink = ({ href, title = '', children }) => {
  const contact = useContactInfo()
  const logEntry = useLogs(state => state.logEntry)
  let targetHref = href
  let targetTitle = title
  let onClick = () => {}

  if (href === 'mailto') {
    targetTitle = ''
    targetHref = `mailto:${contact}?subject=${encodeURIComponent(title)}`
    onClick = () => logEntry({ target: '#email' })
  }

  return (
    <Link href={targetHref}>
      <a title={targetTitle} onClick={onClick}>{children}</a>
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
    <LensImage
      {...props}
      className={className}
      width={width}
      height={height}
      src={src}
      sizes="(max-width: 1455px) 88vw, 1280px"
      linkToImage
    />
  )
}

const Smaller = ({ className, children }) => {
  return (
    <Passage as="p4" className={className}>{children}</Passage>
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
    ol: { component: List, props: { ordered: true } },
    ul: List,
    hr: { props: { className: styles.hRule } },

    Player,
    Smaller
  }
}

const MarkdownRenderer = ({ className, options = {}, children }) => {
  const consolidatedOptions = {
    ...baseOptions,
    ...options
  }

  return (
    <Markdown className={className} options={consolidatedOptions}>{children}</Markdown>
  )
}

export default MarkdownRenderer

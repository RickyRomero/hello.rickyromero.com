import { Fragment } from 'react'
import Markdown from 'markdown-to-jsx'
import Image from 'next/image'
import Link from 'next/link'
import Heading from 'components/heading'
import Passage from 'components/passage'

const WrappedLink = ({ href, title, children }) => {
  return (
    <Link href={href}>
      <a title={title}>{children}</a>
    </Link>
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
    img: Image
  }
}

const MarkdownRenderer = ({ options = {}, children }) => {
  const consolidatedOptions = {
    ...baseOptions,
    ...options
  }

  return <Markdown options={consolidatedOptions}>{children}</Markdown>
}

export default MarkdownRenderer

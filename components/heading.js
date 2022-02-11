import { createElement } from 'react'
import cl from 'utils/classlist'

import styles from './heading.module.css'

const Heading = props => {
  const { as = 'h1', className = '', children, ...rest } = props
  let content

  // markdown-to-jsx sends us single-entry String arrays for some reason.
  if (children.constructor === Array) {
    if (children.length > 1) { return }
    content = children[0]
  } else {
    content = children
  }

  if (content.constructor !== String) { return }

  const classList = cl(styles[as], className)
  const text = content
  const id = text
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, ' ')
    .trim()
    .substring(0, 64)
    .trim()
    .replace(/\s+/g, '-')

  return createElement(as, { id, className: classList, ...rest }, text)
}

export default Heading

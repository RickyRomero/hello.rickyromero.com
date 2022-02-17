import { createElement, forwardRef } from 'react'
import cl from 'utils/classlist'

import styles from './typography.module.css'

const Heading = forwardRef((props, ref) => {
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

  return createElement(as, { id, className: classList, ref, ...rest }, text)
})
Heading.displayName = 'Heading'

const Passage = forwardRef((props, ref) => {
  const { as = 'p3', className = '', children, ...rest } = props
  const classList = cl(styles[as], className)

  return <p ref={ref} className={classList} {...rest}>{children}</p>
})
Passage.displayName = 'Passage'

export { Heading, Passage }

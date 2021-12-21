import React from 'react'

import styles from './heading.module.css'

const Heading = props => {
  const { as = 'h1', className = '', children } = props
  if (children.constructor !== String) { return }

  const classList = [styles[as], ...className.trim().split(/\s+/)]
  const text = children
  const id = text
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, ' ')
    .trim()
    .substring(0, 64)
    .trim()
    .replace(/\s+/g, '-')

  return React.createElement(as, { id, className: classList.join(' ') }, text)
}

export default Heading

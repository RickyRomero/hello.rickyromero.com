import React from 'react'
import cl from 'utils/classlist'

import styles from './heading.module.css'

const Heading = props => {
  const { as = 'h1', className = '', children, ...rest } = props
  if (children.constructor !== String) { return }

  const classList = cl(styles[as], className)
  const text = children
  const id = text
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, ' ')
    .trim()
    .substring(0, 64)
    .trim()
    .replace(/\s+/g, '-')

  return React.createElement(as, { id, className: classList, ...rest }, text)
}

export default Heading

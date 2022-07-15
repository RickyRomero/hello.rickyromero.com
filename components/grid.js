import { Children, cloneElement, createElement, Fragment } from 'react'
import cl from 'utils/classlist'

import styles from './grid.module.css'

const Row = props => {
  const {
    as = Fragment,
    desktopColCount = 12,
    openEnded = false,
    children
  } = props
  let desktopSpanSum = 0
  const gridChildren = Children.map(children, (child, idx) => {
    if (child.constructor !== String) {
      const [desktop = desktopColCount/*, mobile */] = child.props.spans || []
      const className = cl(styles[`desktop-${desktop}`], child.props.className || '')
      desktopSpanSum += desktop

      return cloneElement(child, { className })
    }
    return child
  })
  const desktopColEmpty = desktopColCount - (desktopSpanSum % desktopColCount)

  const contents = []
  contents.push(gridChildren)
  contents.push(!openEnded && desktopColEmpty !== desktopColCount && (
    <span key="grid-end" className={styles[`desktop-${desktopColEmpty}`]} />
  ))
  return (
    createElement(as, {}, contents)
  )
}

const Grid = props => {
  const { className = '', children } = props

  const wrappedUp = Children.map(children, child => (
    child.type === Row ? child : <Row>{child}</Row>
  ))

  return (
    <section className={cl(styles.grid, className)}>
      {wrappedUp}
    </section>
  )
}

export { Grid, Row }

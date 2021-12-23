import { Children, cloneElement } from 'react'
import cl from 'utils/classlist'

import styles from './grid.module.css'

const Row = props => {
  const { desktopColCount = 12, children } = props
  let desktopSpanSum = 0
  const gridChildren = Children.map(children, (child, idx) => {
    const [desktop = desktopColCount/*, mobile */] = child.props.spans || []
    desktopSpanSum += desktop

    return cloneElement(child, { className: cl(styles[`desktop-${desktop}`]) })
  })
  const desktopColEmpty = desktopColCount - (desktopSpanSum % desktopColCount)

  return (
    <>
      {gridChildren}
      { desktopColEmpty !== desktopColCount ? (
        <span className={styles[`desktop-${desktopColEmpty}`]} />
      ) : null }
    </>
  )
}

const Grid = props => {
  const { className = '' } = props

  return (
    <section className={cl(styles.grid, className)}>
      {props.children}
    </section>
  )
}

export { Grid, Row }

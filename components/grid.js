import { Children, cloneElement } from 'react'

import styles from './grid.module.css'

const Row = props => {
  const { desktopColCount = 12, children } = props
  let desktopSpanSum = 0
  const gridChildren = Children.map(children, (child, idx) => {
    const [desktop = desktopColCount/*, mobile */] = child.props.spans || []
    const classList = [styles[`desktop-${desktop}`]]
    desktopSpanSum += desktop

    return cloneElement(child, { className: classList.join(' ') })
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
  return (
    <div className={styles.grid}>
      {props.children}
    </div>
  )
}

export { Grid, Row }

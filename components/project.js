import cl from 'utils/classlist'

import styles from './project.module.css'

const Project = props => {
  const { className, children } = props
  return (
    <article className={cl(styles.project, className)}>{children}</article>
  )
}

export default Project

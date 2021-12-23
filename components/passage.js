import cl from 'utils/classlist'

import styles from './passage.module.css'

const Passage = props => {
  const { as = 'p3', className = '', children, ...rest } = props
  const classList = cl(styles[as], className)

  return <p className={classList} {...rest}>{children}</p>
}

export default Passage

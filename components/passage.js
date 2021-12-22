import styles from './passage.module.css'

const Passage = props => {
  const { as = 'p3', className = '', children, ...rest } = props
  const classList = [styles[as], ...className.trim().split(/\s+/)]

  return <p className={classList.join(' ')} {...rest}>{children}</p>
}

export default Passage

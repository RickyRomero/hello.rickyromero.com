import Link from 'next/link'
import cl from 'utils/classlist'

import styles from './button.module.css'

const Button = props => {
  const { children, className = '' } = props
  const classList = cl(styles.button, className)

  return (
    <Link href="/">
      <a className={classList}>{children}</a>
    </Link>
  )
}

export default Button

import Link from 'next/link'

import styles from './button.module.css'

const Button = props => {
  const { children } = props
  return (
    <Link href="/">
      <a className={styles.button}>{children}</a>
    </Link>
  )
}

export default Button

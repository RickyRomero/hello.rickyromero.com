import Link from 'next/link'

import styles from './button.module.css'

const Button = props => {
  const { children, className = '' } = props
  const classList = [styles.button, ...className.trim().split(/\s+/)]

  return (
    <Link href="/">
      <a className={classList.join(' ')}>{children}</a>
    </Link>
  )
}

export default Button

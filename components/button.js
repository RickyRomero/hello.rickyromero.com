import { forwardRef } from 'react'
import Link from 'next/link'
import cl from 'utils/classlist'

import styles from './button.module.css'

const Button = forwardRef((props, ref) => {
  const { children, className = '', href, onClick, small = false } = props
  const classList = cl(
    styles.wrapper,
    small ? styles.small : '',
    className
  )

  // Wrapping in an outer div to allow CSS to animate separately
  return (
    <div ref={ref} className={classList}>
      <Link href={(href || '/')}>
        <a className={styles.button} onClick={onClick}>
          <span className={styles.alignment}>{children}</span>
        </a>
      </Link>
    </div>
  )
})
Button.displayName = 'Button'

export default Button

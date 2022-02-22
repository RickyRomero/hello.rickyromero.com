import { forwardRef } from 'react'
import Link from 'next/link'
import cl from 'utils/classlist'

import styles from './button.module.css'

const Button = forwardRef((props, ref) => {
  const { children, className = '', href } = props
  const classList = cl(styles.button, className)

  return (
    <Link href={(href || '/')}>
      <a ref={ref} className={classList}>{children}</a>
    </Link>
  )
})
Button.displayName = 'Button'

export default Button

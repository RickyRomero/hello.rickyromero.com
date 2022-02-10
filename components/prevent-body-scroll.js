// Next.js doesn't give us dynamic access to the document body, but we
// need access to prevent scrolling the document when the modal is open.

import { useEffect } from 'react'

import styles from './prevent-body-scroll.module.css'

const PreventBodyScroll = () => {
  useEffect(() => {
    document.body.classList.toggle(styles.preventScroll, true)

    return () => document.body.classList.toggle(styles.preventScroll, false)
  })

  return null
}

export default PreventBodyScroll

// This component loads lazily due to next/router being a
// rather heavy load for what it needs to accomplish.

import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Escape = ({ to }) => {
  const router = useRouter()
  useEffect(() => {
    const handleEsc = event => {
      if (event.key === 'Escape') {
        event.preventDefault()
        router.push(to, null, { scroll: false })
      }
    }

    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  return null
}

export default Escape

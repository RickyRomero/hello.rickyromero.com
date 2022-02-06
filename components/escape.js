import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Escape = () => {
  const router = useRouter()
  useEffect(() => {
    const handleEsc = event => {
      if (event.key === 'Escape') {
        event.preventDefault()
        router.push('/', null, { scroll: false })
      }
    }

    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  return null
}

export default Escape

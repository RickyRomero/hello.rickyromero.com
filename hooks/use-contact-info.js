import { useEffect, useState } from 'react'

const useContactInfo = () => {
  const [contact, setContact] = useState(null)

  // Hide contact info from scrapers
  useEffect(() => {
    const contactInfo = require('contact.json')
    setContact(contactInfo.main)
  }, [])

  return contact
}

export default useContactInfo

import lozad from 'lozad'
import { useEffect } from 'react'

const LazyLoading = () => {
  useEffect(() => {
    const observer = lozad('[data-lazy-loading]')
    observer.observe()
  }, [])

  return null
}

export default LazyLoading

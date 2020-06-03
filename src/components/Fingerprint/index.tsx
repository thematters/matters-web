import fingerprint from 'fingerprintjs2'
import { useEffect } from 'react'

import { AGENT_HASH_PREFIX, STORE_KEY_AGENT_HASH } from '~/common/enums'

const Fingerprint = () => {
  useEffect(() => {
    if (!process.browser || typeof window === 'undefined') {
      return
    }

    try {
      const stored = window.localStorage.getItem(STORE_KEY_AGENT_HASH)
      if (!stored || !stored.startsWith(AGENT_HASH_PREFIX)) {
        fingerprint.get((components) => {
          const values = components.map((component) => component.value)
          const hash =
            AGENT_HASH_PREFIX + fingerprint.x64hash128(values.join(''), 31)
          window.localStorage.setItem(STORE_KEY_AGENT_HASH, hash)
        })
      }
    } catch (error) {
      // catch silently
    }
  }, [])

  return null
}

export default Fingerprint

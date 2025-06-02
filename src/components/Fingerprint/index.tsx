import fingerprint from 'fingerprintjs2'
import { useEffect } from 'react'

import { AGENT_HASH_PREFIX, STORAGE_KEY_AGENT_HASH } from '~/common/enums'
import { storage } from '~/common/utils'

const Fingerprint = () => {
  useEffect(() => {
    try {
      const stored = storage.get<string>(STORAGE_KEY_AGENT_HASH)
      if (!stored || !stored.startsWith(AGENT_HASH_PREFIX)) {
        fingerprint.get((components) => {
          const values = components.map((component) => component.value)
          const hash =
            AGENT_HASH_PREFIX + fingerprint.x64hash128(values.join(''), 31)
          storage.set(STORAGE_KEY_AGENT_HASH, hash)
        })
      }
    } catch {
      // catch silently
    }
  }, [])

  return null
}

export default Fingerprint

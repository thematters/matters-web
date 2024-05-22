import { useEffect, useState } from 'react'

import { checkElementExistence, DEFAULT_SCRIPT_ID } from './utils'

export default function useObserveScript(scriptId = DEFAULT_SCRIPT_ID) {
  const [scriptLoaded, setScriptLoaded] = useState(false)

  useEffect(() => {
    const checkScriptExists = () => {
      if (checkElementExistence(scriptId)) {
        setScriptLoaded(true)
      }
    }

    const observer = new MutationObserver(checkScriptExists)
    observer.observe(document, { childList: true, subtree: true })

    checkScriptExists()

    return () => {
      observer.disconnect()
    }
  }, [scriptId])

  return scriptLoaded
}

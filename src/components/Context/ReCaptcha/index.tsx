import getConfig from 'next/config'
import { createContext, useEffect, useState } from 'react'

import { sleep } from '~/common/utils'

declare global {
  interface Window {
    grecaptcha: ReCaptchaV2.ReCaptcha
  }
}

// recaptcha related setup
const {
  publicRuntimeConfig: { RECAPTCHA_KEY },
} = getConfig()

const recaptchaScriptId = 'recaptcha-script'

export const ReCaptchaContext = createContext<{
  token: string
  refreshToken?: () => void
}>({
  token: '',
})

export const ReCaptchaConsumer = ReCaptchaContext.Consumer

export const ReCaptchaProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [token, setToken] = useState('')
  const [refreshToken, setRefreshToken] = useState<() => void>()

  // keep interval id for GC
  const [recaptchaInterval, setRecaptchaInterval] = useState(0)

  const handleRecaptcha = () => {
    window.grecaptcha.ready(async () => {
      // function to get and set token
      const getToken = async () => {
        if (window.grecaptcha && window.grecaptcha.execute) {
          window.grecaptcha
            .execute(RECAPTCHA_KEY, { action: 'homepage' })
            .then((newToken) => {
              setToken(newToken)
            })
        } else {
          // try again after 2 seconds if script is not injected
          await sleep(2000)
          getToken()
        }
      }

      // used by children
      setRefreshToken(getToken)

      // get and set token
      getToken()

      // token expires after 2 minutes
      const intervalId = window.setInterval(getToken, 59 * 2 * 1000)

      // record interval for clean up on unmount
      setRecaptchaInterval(intervalId)

      // clear up after max wait time of 20 minutes
      await sleep(60 * 20 * 1000)
      clearInterval(intervalId)
    })
  }

  // inject script
  useEffect(() => {
    if (!document.getElementById(recaptchaScriptId)) {
      const script = document.createElement('script')
      script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_KEY}`
      script.addEventListener('load', handleRecaptcha)
      script.id = recaptchaScriptId

      document.body.appendChild(script)
    }
  }, [])

  // cleanup timer and script
  useEffect(
    () => () => {
      clearInterval(recaptchaInterval)
      const recaptchaScript = document.getElementById(recaptchaScriptId)
      if (recaptchaScript) {
        recaptchaScript.remove()
      }
    },
    []
  )

  return (
    <ReCaptchaContext.Provider value={{ token, refreshToken }}>
      {children}
    </ReCaptchaContext.Provider>
  )
}

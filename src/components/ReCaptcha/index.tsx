import { useContext, useRef } from 'react'
import { FormattedMessage } from 'react-intl'

import { toast, ViewerContext } from '~/components'

import { Turnstile, TurnstileInstance } from './Turnstile'

export * from './Turnstile/types'

type ReCaptchaProps = {
  action: 'email_login' | 'register' | 'appreciate'
  setToken?: (token: string) => void
  silence?: boolean
}

const siteKey = process.env.NEXT_PUBLIC_CF_TURNSTILE_SITE_KEY as string

export const ReCaptcha: React.FC<ReCaptchaProps> = ({
  action,
  setToken,
  silence,
}) => {
  const viewer = useContext(ViewerContext)
  const turnstileRef = useRef<TurnstileInstance>(null)

  const onError = () => {
    if (silence) return

    toast.error({
      message: (
        <FormattedMessage
          defaultMessage="Problems logging in, please wait or close Ad Blocker and try again"
          id="qRYMPk"
        />
      ),
    })
  }

  return (
    <Turnstile
      ref={turnstileRef}
      siteKey={siteKey}
      options={{
        action,
        cData: `user-group-${viewer.info.group}`,
        size: 'invisible',
      }}
      scriptOptions={{
        compat: 'recaptcha',
        appendTo: 'body',
      }}
      onSuccess={(token) => {
        if (setToken) {
          setToken(token)
        }
      }}
      onError={onError}
      onUnsupported={onError}
      onExpire={() => turnstileRef.current?.reset()}
    />
  )
}

import classNames from 'classnames'
import { useContext, useRef, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { toast, ViewerContext } from '~/components'

import styles from './styles.module.css'
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
  const [interaction, setInteraction] = useState(false)

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

  const containerClasses = classNames({
    [styles.container]: true,
    [styles.interaction]: interaction,
  })

  return (
    <div className={containerClasses}>
      <Turnstile
        ref={turnstileRef}
        siteKey={siteKey}
        options={{
          action,
          cData: `user-group-${viewer.info.group}`,
          size: 'normal',
          theme: 'light',
          appearance: 'interaction-only',
        }}
        scriptOptions={{
          compat: 'recaptcha',
          appendTo: 'body',
        }}
        onBeforeInteractive={() => {
          setInteraction(true)
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
    </div>
  )
}

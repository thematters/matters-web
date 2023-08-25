import { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconIllustation } from '@/public/static/images/callback/Illustation.svg'
import { ReactComponent as IconLogo } from '@/public/static/images/callback/logo.svg'
import {
  COOKIE_LANGUAGE,
  COOKIE_TOKEN_NAME,
  COOKIE_USER_GROUP,
  OAUTH_STORAGE_NONCE,
  OAUTH_STORAGE_PATH,
  OAUTH_STORAGE_STATE,
  PATHS,
} from '~/common/enums'
import { analytics, setCookies, storage } from '~/common/utils'
import { useMutation, useRoute, withIcon } from '~/components'
import { SocialLoginMutation } from '~/gql/graphql'

import { SOCIAL_LOGIN } from './gql'
import styles from './styles.module.css'

const isProd = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'production'

const GoogleCallback = () => {
  const [login] = useMutation<SocialLoginMutation>(SOCIAL_LOGIN, undefined, {
    showToast: false,
  })
  const [hasError, setHasError] = useState(false)
  const { getQuery } = useRoute()
  const state = getQuery('state')
  const code = getQuery('code')
  useEffect(() => {
    const localState = storage.get(OAUTH_STORAGE_STATE)
    const localNonce = storage.get(OAUTH_STORAGE_NONCE)
    const localPath = storage.get(OAUTH_STORAGE_PATH)
    if (localState !== state) {
      setHasError(true)
    }

    ;(async () => {
      try {
        const { data: loginData } = await login({
          variables: {
            input: {
              type: 'Google',
              nonce: localNonce,
              authorizationCode: code,
            },
          },
        })

        const token = loginData?.socialLogin.token || ''
        const language = loginData?.socialLogin.user?.settings.language || ''
        const group = loginData?.socialLogin.user?.info.group || ''
        setCookies({
          [COOKIE_LANGUAGE]: language,
          [COOKIE_USER_GROUP]: group,
          ...(isProd ? {} : { [COOKIE_TOKEN_NAME]: token }),
        })

        analytics.identifyUser()

        window.location.href = localPath
      } catch (error) {
        setHasError(true)
      }
    })()
  }, [])

  return (
    <section className={styles.callback}>
      {hasError && (
        <section className={styles.error}>
          {withIcon(IconIllustation)({})}
          <section className={styles.hint}>
            <section className={styles.title}>
              <FormattedMessage
                defaultMessage="Oops！This link has expired"
                description="src/views/Callback/GoogleCallback.tsx"
              />
            </section>
            <section className={styles.content}>
              <FormattedMessage
                defaultMessage="Please go to the relevant page to resend the link. You can also "
                description="src/views/Callback/GoogleCallback.tsx"
              />
              <a className={styles.link} href={PATHS.HOME}>
                <FormattedMessage
                  defaultMessage="go to the homepage"
                  description="src/views/Callback/GoogleCallback.tsx"
                />
              </a>
            </section>
          </section>
        </section>
      )}
      {!hasError && (
        <section className={styles.logo}>{withIcon(IconLogo)({})}</section>
      )}
    </section>
  )
}

export default GoogleCallback

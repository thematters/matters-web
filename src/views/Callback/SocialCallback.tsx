import { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconIllustation } from '@/public/static/images/callback/Illustation.svg'
import { ReactComponent as IconLogo } from '@/public/static/images/callback/logo.svg'
import {
  COOKIE_LANGUAGE,
  COOKIE_TOKEN_NAME,
  COOKIE_USER_GROUP,
  OAUTH_STORAGE_BIND_STATE,
  OAUTH_STORAGE_BIND_STATE_FAILURE,
  OAUTH_STORAGE_BIND_STATE_SUCCESS,
  OAUTH_STORAGE_CODE_VERIFIER,
  OAUTH_STORAGE_NONCE,
  OAUTH_STORAGE_PATH,
  OAUTH_STORAGE_STATE,
  OAUTH_TYPE,
  PATHS,
} from '~/common/enums'
import { analytics, setCookies, storage } from '~/common/utils'
import { getErrorCodes, useMutation, useRoute, withIcon } from '~/components'
import {
  AddSocialLoginMutation,
  SocialAccountType,
  SocialLoginMutation,
} from '~/gql/graphql'

import { ADD_SOCIAL_LOGIN, SOCIAL_LOGIN } from './gql'
import styles from './styles.module.css'

const isProd = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'production'

interface Props {
  type: SocialAccountType
}

const SocialCallback = ({ type }: Props) => {
  const [login] = useMutation<SocialLoginMutation>(SOCIAL_LOGIN, undefined, {
    showToast: false,
  })
  const [addLogin] = useMutation<AddSocialLoginMutation>(
    ADD_SOCIAL_LOGIN,
    undefined,
    {
      showToast: false,
    }
  )
  const [hasError, setHasError] = useState(false)
  const { getQuery } = useRoute()
  const state = getQuery('state')
  const oauthType = state.slice(0, 2)
  const isLoginType = oauthType === OAUTH_TYPE.login
  const isBindType = oauthType === OAUTH_TYPE.bind
  const code = getQuery('code')
  useEffect(() => {
    const localState = storage.get(OAUTH_STORAGE_STATE)
    const localNonce = storage.get(OAUTH_STORAGE_NONCE)
    const localCodeVerifier = storage.get(OAUTH_STORAGE_CODE_VERIFIER)
    const localPath = storage.get(OAUTH_STORAGE_PATH)
    if (localState !== state) {
      setHasError(true)
    }

    if (isLoginType) {
      ;(async () => {
        try {
          const { data: loginData } = await login({
            variables: {
              input: {
                type,
                nonce: localNonce,
                codeVerifier: localCodeVerifier,
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
    }

    if (isBindType) {
      ;(async () => {
        try {
          await addLogin({
            variables: {
              input: {
                type,
                nonce: localNonce,
                codeVerifier: localCodeVerifier,
                authorizationCode: code,
              },
            },
          })
          storage.set(OAUTH_STORAGE_BIND_STATE, {
            type,
            state: OAUTH_STORAGE_BIND_STATE_SUCCESS,
          })
          window.location.href = localPath
        } catch (error) {
          const codes = getErrorCodes(error as any)
          let hasBindFailure = false
          codes.forEach((code) => {
            if (code.includes('ACTION_FAILED')) {
              storage.set(OAUTH_STORAGE_BIND_STATE, {
                type,
                state: OAUTH_STORAGE_BIND_STATE_FAILURE,
              })
              hasBindFailure = true
            }
          })
          if (hasBindFailure) {
            window.location.href = localPath
            return
          }
          setHasError(true)
        }
      })()
    }
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

export default SocialCallback

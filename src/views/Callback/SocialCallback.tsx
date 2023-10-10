import { useContext, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import {
  COOKIE_LANGUAGE,
  COOKIE_TOKEN_NAME,
  COOKIE_USER_GROUP,
  ERROR_CODES,
  OAUTH_STORAGE_BIND_STATE,
  OAUTH_STORAGE_BIND_STATE_FAILURE,
  OAUTH_STORAGE_BIND_STATE_SUCCESS,
  OAUTH_STORAGE_BIND_STATE_UNAVAILABLE,
  OAUTH_STORAGE_CODE_VERIFIER,
  OAUTH_STORAGE_NONCE,
  OAUTH_STORAGE_PATH,
  OAUTH_STORAGE_STATE,
  OAUTH_TYPE,
  PATHS,
} from '~/common/enums'
import { analytics, setCookies, storage } from '~/common/utils'
import {
  getErrorCodes,
  LanguageContext,
  toast,
  useMutation,
  useRoute,
} from '~/components'
import {
  AddSocialLoginMutation,
  SocialAccountType,
  SocialLoginMutation,
} from '~/gql/graphql'

import { ADD_SOCIAL_LOGIN, SOCIAL_LOGIN } from './gql'
import UI from './UI'

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
  const { lang } = useContext(LanguageContext)

  const [hasError, setHasError] = useState(false)
  const { getQuery, router } = useRoute()
  const state = getQuery('state')
  const oauthType = state.slice(0, 2)
  const isLoginType = oauthType === OAUTH_TYPE.login
  const isBindType = oauthType === OAUTH_TYPE.bind
  const code = getQuery('code')
  const error = getQuery('error')
  useEffect(() => {
    const localState = storage.get(OAUTH_STORAGE_STATE)
    const localNonce = storage.get(OAUTH_STORAGE_NONCE)
    const localCodeVerifier = storage.get(OAUTH_STORAGE_CODE_VERIFIER)
    const localPath = storage.get(OAUTH_STORAGE_PATH)
    if (!!error) {
      window.location.href = localPath
      return
    }

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
                language: lang,
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
          let hasFobiddenError = false
          const codes = getErrorCodes(error as any)
          codes.forEach((code) => {
            if (code.includes(ERROR_CODES.FORBIDDEN_BY_STATE)) {
              hasFobiddenError = true
              router.push(PATHS.HOME)
              toast.error({
                message: (
                  <FormattedMessage
                    defaultMessage="Unavailable"
                    description="FORBIDDEN_BY_STATE"
                  />
                ),
              })
              return
            }
          })
          if (hasFobiddenError) {
            return
          }
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
            if (code.includes(ERROR_CODES.ACTION_FAILED)) {
              storage.set(OAUTH_STORAGE_BIND_STATE, {
                type,
                state: OAUTH_STORAGE_BIND_STATE_FAILURE,
              })
              hasBindFailure = true
            } else if (code.includes(ERROR_CODES.FORBIDDEN_BY_STATE)) {
              storage.set(OAUTH_STORAGE_BIND_STATE, {
                type,
                state: OAUTH_STORAGE_BIND_STATE_UNAVAILABLE,
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

  return <UI hasError={hasError} />
}

export default SocialCallback

import { ApolloError } from '@apollo/client'
import { useContext, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import {
  ERROR_CODES,
  OAUTH_SESSSION_STORAGE_OAUTH_TOKEN,
  OAUTH_SESSSION_STORAGE_OAUTH_TYPE,
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
  REFERRAL_QUERY_REFERRAL_KEY,
  REFERRAL_STORAGE_REFERRAL_CODE,
} from '~/common/enums'
import { sessionStorage, setAuthCookies, storage } from '~/common/utils'
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
  const error = getQuery('error') || getQuery('denied')
  // Twitter
  const oauthToken = getQuery('oauth_token')
  const oauthVerifier = getQuery('oauth_verifier')

  useEffect(() => {
    const referralCode =
      getQuery(REFERRAL_QUERY_REFERRAL_KEY) ||
      storage.get<{ referralCode: string }>(REFERRAL_STORAGE_REFERRAL_CODE)
        ?.referralCode ||
      undefined
    const localState = storage.get<string>(OAUTH_STORAGE_STATE)
    const localNonce = storage.get<string>(OAUTH_STORAGE_NONCE)
    const localCodeVerifier = storage.get<string>(OAUTH_STORAGE_CODE_VERIFIER)
    const localPath = storage.get<string>(OAUTH_STORAGE_PATH)

    const localOauthToken = sessionStorage.get(
      OAUTH_SESSSION_STORAGE_OAUTH_TOKEN
    )
    const localOauthType = sessionStorage.remove(
      OAUTH_SESSSION_STORAGE_OAUTH_TYPE
    )

    if (!!error && localPath) {
      window.location.href = localPath
      return
    }

    if (type !== SocialAccountType.Twitter && localState !== state) {
      setHasError(true)
      return
    }

    if (type === SocialAccountType.Twitter && localOauthToken !== oauthToken) {
      setHasError(true)
      return
    }

    if (isLoginType || localOauthType === OAUTH_TYPE.login) {
      ;(async () => {
        try {
          let input: object = {
            nonce: localNonce,
            codeVerifier: localCodeVerifier,
            authorizationCode: code,
          }

          if (type === SocialAccountType.Twitter) {
            input = {
              oauth1Credential: {
                oauthToken,
                oauthVerifier,
              },
            }
          }
          const { data: loginData } = await login({
            variables: {
              input: {
                type,
                language: lang,
                ...input,
                // referralCode,
                ...(referralCode ? { referralCode } : null),
              },
            },
          })

          const accessToken = loginData?.socialLogin.accessToken || ''
          const refreshToken = loginData?.socialLogin.refreshToken || ''
          const language = loginData?.socialLogin.user?.settings.language || ''
          const group = loginData?.socialLogin.user?.info.group || ''

          setAuthCookies({ accessToken, refreshToken, language, group })

          if (localPath) {
            window.location.href = localPath
          }
        } catch (error) {
          let hasFobiddenError = false
          const codes = getErrorCodes(error as ApolloError)
          codes.forEach((code) => {
            if (code.includes(ERROR_CODES.FORBIDDEN_BY_STATE)) {
              hasFobiddenError = true
              router.push(PATHS.HOME)
              toast.error({
                message: (
                  <FormattedMessage
                    defaultMessage="Unavailable"
                    id="rADhX5"
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

    if (isBindType || localOauthType === OAUTH_TYPE.bind) {
      ;(async () => {
        try {
          let input: object = {
            nonce: localNonce,
            codeVerifier: localCodeVerifier,
            authorizationCode: code,
          }

          if (type === SocialAccountType.Twitter) {
            input = {
              oauth1Credential: {
                oauthToken,
                oauthVerifier,
              },
            }
          }
          await addLogin({
            variables: {
              input: {
                type,
                ...input,
              },
            },
          })
          storage.set(OAUTH_STORAGE_BIND_STATE, {
            type,
            state: OAUTH_STORAGE_BIND_STATE_SUCCESS,
          })

          if (localPath) {
            window.location.href = localPath
          }
        } catch (error) {
          const codes = getErrorCodes(error as ApolloError)
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
          if (hasBindFailure && localPath) {
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

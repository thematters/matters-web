import { useContext, useEffect, useState } from 'react'
import baseToast from 'react-hot-toast'

import {
  COOKIE_LANGUAGE,
  COOKIE_TOKEN_NAME,
  COOKIE_USER_GROUP,
  REFERRAL_QUERY_REFERRAL_KEY,
  REFERRAL_STORAGE_REFERRAL_CODE,
} from '~/common/enums'
import { redirectToTarget, setCookies, storage } from '~/common/utils'
import { LanguageContext, useMutation, useRoute } from '~/components'
import { EMAIL_LOGIN } from '~/components/GQL/mutations/emailLogin'
import { EmailLoginMutation } from '~/gql/graphql'

import UI from './UI'

const isProd = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'production'

const LoginCallback = () => {
  const [login, { client }] = useMutation<EmailLoginMutation>(
    EMAIL_LOGIN,
    {
      onCompleted: () => {
        client?.resetStore()
        baseToast.dismiss()
      },
    },
    {
      showToast: false,
    }
  )

  const { lang } = useContext(LanguageContext)
  const [hasError, setHasError] = useState(false)
  const { getQuery } = useRoute()
  const email = getQuery('email')
  const code = getQuery('code')

  useEffect(() => {
    ;(async () => {
      try {
        const referralCode =
          getQuery(REFERRAL_QUERY_REFERRAL_KEY) ||
          storage.get<{ referralCode: string }>(REFERRAL_STORAGE_REFERRAL_CODE)
            ?.referralCode ||
          undefined
        const { data } = await login({
          variables: {
            input: {
              email,
              passwordOrCode: code,
              language: lang,
              ...(referralCode ? { referralCode } : null),
            },
          },
        })

        const token = data?.emailLogin.token || ''
        const language = data?.emailLogin.user?.settings.language || ''
        const group = data?.emailLogin.user?.info.group || ''
        setCookies({
          [COOKIE_LANGUAGE]: language,
          [COOKIE_USER_GROUP]: group,
          ...(isProd ? {} : { [COOKIE_TOKEN_NAME]: token }),
        })

        redirectToTarget({ fallback: 'homepage' })
      } catch (error) {
        setHasError(true)
      }
    })()
  }, [])

  return <UI hasError={hasError} />
}

export default LoginCallback

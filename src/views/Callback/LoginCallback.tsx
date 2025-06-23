import { useContext, useEffect, useState } from 'react'
import baseToast from 'react-hot-toast'

import {
  REFERRAL_QUERY_REFERRAL_KEY,
  REFERRAL_STORAGE_REFERRAL_CODE,
} from '~/common/enums'
import { redirectToTarget, setAuthCookies, storage } from '~/common/utils'
import { LanguageContext, useMutation, useRoute } from '~/components'
import { EMAIL_LOGIN } from '~/components/GQL/mutations/emailLogin'
import { EmailLoginMutation } from '~/gql/graphql'

import UI from './UI'

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

        const accessToken = data?.emailLogin.accessToken || ''
        const refreshToken = data?.emailLogin.refreshToken || ''
        const language = data?.emailLogin.user?.settings.language || ''
        const group = data?.emailLogin.user?.info.group || ''

        setAuthCookies({
          accessToken,
          refreshToken,
          language,
          group,
        })

        redirectToTarget({ fallback: 'homepage' })
      } catch {
        setHasError(true)
      }
    })()
  }, [])

  return <UI hasError={hasError} />
}

export default LoginCallback

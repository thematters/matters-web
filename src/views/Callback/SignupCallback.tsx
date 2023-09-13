import { useEffect, useState } from 'react'

import {
  COOKIE_LANGUAGE,
  COOKIE_TOKEN_NAME,
  COOKIE_USER_GROUP,
} from '~/common/enums'
import { redirectToTarget, setCookies } from '~/common/utils'
import { useMutation, useRoute } from '~/components'
import { EMAIL_LOGIN } from '~/components/GQL/mutations/emailLogin'
import { EmailLoginMutation } from '~/gql/graphql'

import UI from './UI'

const isProd = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'production'

const SignupCallback = () => {
  const [login] = useMutation<EmailLoginMutation>(EMAIL_LOGIN, undefined, {
    showToast: false,
  })

  const [hasError, setHasError] = useState(false)
  const { getQuery } = useRoute()
  const email = getQuery('email')
  const code = getQuery('code')

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await login({
          variables: {
            input: {
              email,
              passwordOrCode: code,
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

export default SignupCallback

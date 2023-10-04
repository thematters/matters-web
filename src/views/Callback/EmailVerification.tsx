import { useEffect, useState } from 'react'

import {
  COOKIE_LANGUAGE,
  COOKIE_TOKEN_NAME,
  COOKIE_USER_GROUP,
  PATHS,
} from '~/common/enums'
import { redirectToTarget, setCookies } from '~/common/utils'
import { useMutation, useRoute } from '~/components'
import { updateRootUser } from '~/components/GQL'
import { VerifyEmailMutation } from '~/gql/graphql'

import { VERIFY_EMAIL } from './gql'
import UI from './UI'

const isProd = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'production'

const EmailVerification = () => {
  const [verify] = useMutation<VerifyEmailMutation>(VERIFY_EMAIL, undefined, {
    showToast: false,
    showLoginToast: false,
  })

  const [hasError, setHasError] = useState(false)
  const { getQuery, router } = useRoute()
  const email = getQuery('email')
  const code = getQuery('code')

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await verify({
          variables: {
            input: {
              code,
              email,
            },
          },
          update: (cache, mutationResult) => {
            // Instant Updates
            // If you use refetchQueries, due to network delays, toast(EmailVerificationToast) will be thrown before fetching the latest value.
            if (!mutationResult.data?.verifyEmail.auth) {
              updateRootUser({
                cache,
                emailVerified: true,
                hasEmailLoginPassword: false,
              })
            }
          },
        })

        if (data?.verifyEmail.auth) {
          const token = data?.verifyEmail.token || ''
          const language = data?.verifyEmail.user?.settings.language || ''
          const group = data?.verifyEmail.user?.info.group || ''
          setCookies({
            [COOKIE_LANGUAGE]: language,
            [COOKIE_USER_GROUP]: group,
            ...(isProd ? {} : { [COOKIE_TOKEN_NAME]: token }),
          })

          redirectToTarget({ fallback: 'homepage' })
          return
        }

        router.push(PATHS.ME_SETTINGS)
      } catch (error) {
        setHasError(true)
      }
    })()
  }, [])

  return <UI hasError={hasError} />
}

export default EmailVerification

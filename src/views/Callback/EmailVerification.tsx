import { useEffect, useState } from 'react'

import { PATHS } from '~/common/enums'
import { useMutation, useRoute } from '~/components'
import { updateUser } from '~/components/GQL'
import { VerifyEmailMutation } from '~/gql/graphql'

import { VERIFY_EMAIL } from './gql'
import UI from './UI'

const EmailVerification = () => {
  const [verify] = useMutation<VerifyEmailMutation>(VERIFY_EMAIL, undefined, {
    showToast: false,
  })

  const [hasError, setHasError] = useState(false)
  const { getQuery, router } = useRoute()
  const code = getQuery('code')

  useEffect(() => {
    ;(async () => {
      try {
        await verify({
          variables: {
            input: {
              code,
            },
          },
          update: (cache) => {
            // Instant Updates
            // If you use refetchQueries, due to network delays, toast(EmailVerificationToast) will be thrown before fetching the latest value.
            updateUser({
              cache,
              emailVerified: true,
              hasEmailLoginPassword: false,
            })
          },
        })

        router.push(PATHS.ME_SETTINGS)
      } catch (error) {
        setHasError(true)
      }
    })()
  }, [])

  return <UI hasError={hasError} />
}

export default EmailVerification

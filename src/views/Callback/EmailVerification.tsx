import { useContext, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import {
  CHANNEL_VERIFIED_EMAIL,
  COOKIE_LANGUAGE,
  COOKIE_TOKEN_NAME,
  COOKIE_USER_GROUP,
  PATHS,
} from '~/common/enums'
import { setCookies } from '~/common/utils'
import { toast, useMutation, useRoute, ViewerContext } from '~/components'
import { VerifyEmailMutation } from '~/gql/graphql'

import { VERIFY_EMAIL } from './gql'
import UI from './UI'

const isLocal = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'local'

const EmailVerification = () => {
  const viewer = useContext(ViewerContext)
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
          variables: { input: { code, email } },
        })

        // Send message to parent window
        new BroadcastChannel(CHANNEL_VERIFIED_EMAIL).postMessage({})

        // Set cookies and redirect
        if (data?.verifyEmail.auth) {
          if (isLocal || process.env.VERCEL) {
            const token = data?.verifyEmail.token || ''
            const language = data?.verifyEmail.user?.settings.language || ''
            const group = data?.verifyEmail.user?.info.group || ''
            setCookies({
              [COOKIE_LANGUAGE]: language,
              [COOKIE_USER_GROUP]: group,
              [COOKIE_TOKEN_NAME]: token,
            })
          }

          // refresh page if user is not authed
          if (!viewer.isAuthed) {
            window.location.href = '/'
          }
          return
        }

        router.push(PATHS.ME_SETTINGS)

        toast.success({
          message: (
            <FormattedMessage
              defaultMessage="Verification successful"
              id="Dom0EF"
              description="src/components/GlobalToast/index.tsx"
            />
          ),
          hasClose: false,
        })
      } catch (error) {
        setHasError(true)
      }
    })()
  }, [])

  return <UI hasError={hasError} />
}

export default EmailVerification

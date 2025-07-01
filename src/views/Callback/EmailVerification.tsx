import { useContext, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { CHANNEL_VERIFIED_EMAIL, PATHS } from '~/common/enums'
import { setAuthCookies } from '~/common/utils'
import { toast, useMutation, useRoute, ViewerContext } from '~/components'
import { VerifyEmailMutation } from '~/gql/graphql'

import { VERIFY_EMAIL } from './gql'
import UI from './UI'

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
          const accessToken = data?.verifyEmail.accessToken || ''
          const refreshToken = data?.verifyEmail.refreshToken || ''
          const language = data?.verifyEmail.user?.settings.language || ''
          const group = data?.verifyEmail.user?.info.group || ''

          setAuthCookies({ accessToken, refreshToken, language, group })

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
      } catch {
        setHasError(true)
      }
    })()
  }, [])

  return <UI hasError={hasError} />
}

export default EmailVerification

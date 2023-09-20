import { useContext, useEffect, useState } from 'react'
import baseToast from 'react-hot-toast'
import { FormattedMessage } from 'react-intl'

import {
  OAUTH_STORAGE_SEND_EMAIL_CODE_COUNTDOWN,
  SEND_CODE_COUNTDOWN,
  TOAST_SEND_EMAIL_VERIFICATION,
} from '~/common/enums'
import { storage } from '~/common/utils'
import { toast, useEventListener, useRoute, ViewerContext } from '~/components'

import ResendAction from './ResendAction'

const EmailVerificationToast = () => {
  const viewer = useContext(ViewerContext)
  const { router, isInPath } = useRoute()
  const [hasToasted, setHasToasted] = useState(false)

  const ignite = () => {
    baseToast.dismiss()
    toast.success({
      message: (
        <FormattedMessage
          defaultMessage="The verification link has been sent, please check your inbox"
          description="src/components/GlobalToast/index.tsx"
        />
      ),
      actions: [
        {
          content: <ResendAction />,
        },
      ],
      duration: Infinity,
      hasClose: false,
    })
    setHasToasted(true)
  }

  useEventListener(TOAST_SEND_EMAIL_VERIFICATION, () => {
    storage.set(OAUTH_STORAGE_SEND_EMAIL_CODE_COUNTDOWN, SEND_CODE_COUNTDOWN)
    ignite()
  })

  useEffect(() => {
    if (
      !hasToasted &&
      !isInPath('CALLBACK_PROVIDER') &&
      viewer.isAuthed &&
      viewer.info.email !== '' &&
      viewer.info.emailVerified === false
    ) {
      ignite()
    }
  }, [router.pathname])

  return <></>
}

export default EmailVerificationToast

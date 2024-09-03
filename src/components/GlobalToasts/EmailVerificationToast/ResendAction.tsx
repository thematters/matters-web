import { useLazyQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { useContext, useEffect } from 'react'
import baseToast from 'react-hot-toast'
import { FormattedMessage } from 'react-intl'

import {
  CHANNEL_VERIFIED_EMAIL,
  OAUTH_STORAGE_SEND_EMAIL_CODE_COUNTDOWN,
  SEND_CODE_COUNTDOWN,
} from '~/common/enums'
import { emailVerifyCallbackUrl, storage } from '~/common/utils'
import { toast, useCountdown, useMutation, ViewerContext } from '~/components'
import SEND_CODE from '~/components/GQL/mutations/sendCode'
import {
  SendVerificationCodeMutation,
  VerificationCodeType,
  ViewerEmailQuery,
} from '~/gql/graphql'

import styles from './styles.module.css'

const VIEWER_EMAIL = gql`
  query ViewerEmail {
    viewer {
      id
      info {
        email
        emailVerified
      }
    }
  }
`

const ResendAction = () => {
  const viewer = useContext(ViewerContext)
  const { countdown, setCountdown } = useCountdown(0)

  const [sendCode] = useMutation<SendVerificationCodeMutation>(
    SEND_CODE,
    undefined
  )
  const [refetchViewerEmail] = useLazyQuery<ViewerEmailQuery>(VIEWER_EMAIL, {
    fetchPolicy: 'network-only',
  })

  const email = viewer.info.email
  const emailVerified = viewer.info.emailVerified

  let firstRender = false

  useEffect(() => {
    const cd = storage.get<number>(OAUTH_STORAGE_SEND_EMAIL_CODE_COUNTDOWN)
    if (cd && cd > 0) {
      setCountdown(cd)
    }
    firstRender = true
  }, [])

  useEffect(() => {
    if (!firstRender) {
      storage.set(OAUTH_STORAGE_SEND_EMAIL_CODE_COUNTDOWN, countdown)
    }
  }, [countdown])

  useEffect(() => {
    if (!email || !emailVerified) {
      return
    }

    baseToast.dismiss()
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
  }, [email, emailVerified])

  useEffect(() => {
    const bc = new BroadcastChannel(CHANNEL_VERIFIED_EMAIL)
    bc.addEventListener('message', () => {
      refetchViewerEmail()
    })

    return () => {
      bc.close()
    }
  }, [])

  const resend = async () => {
    const redirectUrl = emailVerifyCallbackUrl(email)
    await sendCode({
      variables: {
        input: {
          email,
          type: VerificationCodeType.EmailVerify,
          redirectUrl,
        },
      },
    })
    setCountdown(SEND_CODE_COUNTDOWN)
  }

  if (countdown > 0) {
    return (
      <span className={styles.resendCountButton}>
        {countdown}&nbsp;
        <FormattedMessage
          defaultMessage="Resend"
          id="dzF4ci"
          description="src/components/Forms/EmailLoginForm/index.tsx"
        />
      </span>
    )
  }

  return (
    <span onClick={resend} className={styles.resendButton}>
      <FormattedMessage defaultMessage="Resend" id="IXycMo" />
    </span>
  )
}

export default ResendAction

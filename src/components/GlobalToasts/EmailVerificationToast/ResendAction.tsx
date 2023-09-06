import { useContext, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'

import {
  OAUTH_CALLBACK_PROVIDERS,
  OAUTH_STORAGE_SEND_EMAIL_CODE_COUNTDOWN,
  SEND_CODE_COUNTDOWN,
} from '~/common/enums'
import { storage } from '~/common/utils'
import { useCountdown, useMutation, ViewerContext } from '~/components'
import SEND_CODE from '~/components/GQL/mutations/sendCode'
import { ROOT_QUERY_PRIVATE } from '~/components/Root/gql'
import {
  SendVerificationCodeMutation,
  VerificationCodeType,
} from '~/gql/graphql'

import styles from './styles.module.css'

interface Props {
  initCountdown?: number
}

const ResendAction = ({ initCountdown }: Props) => {
  const viewer = useContext(ViewerContext)
  const { countdown, setCountdown } = useCountdown(0)
  let firstRender = false

  const [sendCode] = useMutation<SendVerificationCodeMutation>(
    SEND_CODE,
    undefined,
    {
      showToast: false,
    }
  )

  useEffect(() => {
    const cd = storage.get(OAUTH_STORAGE_SEND_EMAIL_CODE_COUNTDOWN)
    if (cd > 0) {
      setCountdown(cd)
    }
    firstRender = true
  }, [])

  useEffect(() => {
    if (!firstRender) {
      storage.set(OAUTH_STORAGE_SEND_EMAIL_CODE_COUNTDOWN, countdown)
    }
  }, [countdown])

  const resend = async () => {
    const email = viewer.info.email

    const redirectPath = `/callback/${OAUTH_CALLBACK_PROVIDERS.EmailVerification}`
    const redirectUrl = `${
      process.env.NEXT_PUBLIC_SITE_DOMAIN
    }${redirectPath}?email=${encodeURIComponent(email)}`

    await sendCode({
      variables: {
        input: {
          email,
          type: VerificationCodeType.EmailVerify,
          redirectUrl,
        },
      },
      refetchQueries: [
        {
          query: ROOT_QUERY_PRIVATE,
        },
      ],
    })

    setCountdown(SEND_CODE_COUNTDOWN)
  }

  if (countdown > 0) {
    return (
      <span className={styles.resendButton}>
        {countdown}&nbsp;
        <FormattedMessage
          defaultMessage="Resend"
          description="src/components/Forms/EmailLoginForm/index.tsx"
        />
      </span>
    )
  }

  return (
    <span onClick={resend}>
      <FormattedMessage defaultMessage="Resend" />
    </span>
  )
}

export default ResendAction

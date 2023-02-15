import { useContext, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { SEND_CODE_COUNTDOWN, VERIFICATION_CODE_TYPES } from '~/common/enums'
import {
  Button,
  ReCaptchaContext,
  TextIcon,
  Translate,
  useCountdown,
  useMutation,
} from '~/components'
import SEND_CODE from '~/components/GQL/mutations/sendCode'
import { SendVerificationCodeMutation } from '~/gql/graphql'

import styles from './styles.css'

/**
 * This component is for sending verification code to user with built-in mutation.
 *
 * Usage:
 *
 * ```jsx
 *   <VerificationSendCodeButton
 *     email={'user-email'}
 *     type={'verification-type'}
 *   />
 * ```
 */

interface VerificationSendCodeButtonProps {
  email: string
  type: keyof typeof VERIFICATION_CODE_TYPES
  disabled?: boolean
}

export const VerificationSendCodeButton: React.FC<
  VerificationSendCodeButtonProps
> = ({ email, type, disabled }) => {
  const { token, refreshToken } = useContext(ReCaptchaContext)

  const [send] = useMutation<SendVerificationCodeMutation>(SEND_CODE)
  const [sent, setSent] = useState(false)

  const { countdown, setCountdown, formattedTimeLeft } = useCountdown({
    timeLeft: 0,
  })

  const sendCode = async () => {
    await send({
      variables: { input: { email, type, token } },
    })

    setCountdown({ timeLeft: SEND_CODE_COUNTDOWN })
    setSent(true)

    if (refreshToken) {
      refreshToken()
    }
  }

  return (
    <Button
      spacing={['xxtight', 'xtight']}
      disabled={disabled || !send || !email || countdown.timeLeft !== 0}
      onClick={sendCode}
    >
      <TextIcon color="green" weight="md" size="sm">
        {sent ? (
          <FormattedMessage defaultMessage="Resend" description="Resend button"/>
        ) : (
          <Translate id="sendVerificationCode" />
        )}

        {sent && countdown.timeLeft !== 0 && (
          <span className="timer">
            {formattedTimeLeft.ss}

            <style jsx>{styles}</style>
          </span>
        )}
      </TextIcon>
    </Button>
  )
}

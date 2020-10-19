import { useContext, useState } from 'react'

import {
  Button,
  LanguageContext,
  ReCaptchaContext,
  TextIcon,
  Translate,
  useCountdown,
  useMutation,
} from '~/components'
import SEND_CODE from '~/components/GQL/mutations/sendCode'

import { ADD_TOAST, SEND_CODE_COUNTDOWN } from '~/common/enums'
import { parseFormSubmitErrors } from '~/common/utils'

import styles from './styles.css'

import { SendVerificationCode } from '~/components/GQL/mutations/__generated__/SendVerificationCode'

/**
 * This component is for sending verification code to user with built-in mutation.
 *
 * Usage:
 *
 * ```jsx
 *   <SendCodeButton
 *     email={'user-email'}
 *     type={'verification-type'}
 *   />
 * ```
 */

interface SendCodeButtonProps {
  email: string
  type:
    | 'register'
    | 'email_reset'
    | 'email_reset_confirm'
    | 'password_reset'
    | 'payment_password_reset'
    | 'email_verify'
  disabled?: boolean
}

export const SendCodeButton: React.FC<SendCodeButtonProps> = ({
  email,
  type,
  disabled,
}) => {
  const { lang } = useContext(LanguageContext)
  const { token, refreshToken } = useContext(ReCaptchaContext)

  const [send] = useMutation<SendVerificationCode>(SEND_CODE)
  const [sent, setSent] = useState(false)

  const { countdown, setCountdown, formattedTimeLeft } = useCountdown({
    timeLeft: 0,
  })

  const sendCode = async () => {
    try {
      await send({
        variables: { input: { email, type, token } },
      })

      setCountdown({ timeLeft: SEND_CODE_COUNTDOWN })
      setSent(true)

      if (refreshToken) {
        refreshToken()
      }
    } catch (error) {
      const [messages, codes] = parseFormSubmitErrors(error, lang)

      if (!messages[codes[0]]) {
        return
      }

      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'red',
            content: messages[codes[0]],
          },
        })
      )
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
          <Translate id="resend" />
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

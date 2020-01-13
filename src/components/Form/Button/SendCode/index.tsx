import gql from 'graphql-tag'
import { useState } from 'react'

import { Button } from '~/components/Button'
import { getErrorCodes, useMutation } from '~/components/GQL'
import { useCountdown } from '~/components/Hook'
import { Translate } from '~/components/Language'

import { ADD_TOAST, TEXT } from '~/common/enums'

import { SendVerificationCode } from './__generated__/SendVerificationCode'
import styles from './styles.css'

/**
 * This component is for sending verificatio code to user with builtin mutation.
 *
 * Usage:
 *
 * ```jsx
 *   <SendCodeButton
 *     email={'user-email'}
 *     lang={language}
 *     type={'verification-type'}
 *   />
 * ```
 */
interface Props {
  email: string
  lang: Language
  type:
    | 'register'
    | 'email_reset'
    | 'email_reset_confirm'
    | 'password_reset'
    | 'email_verify'
}

export const SEND_CODE = gql`
  mutation SendVerificationCode($input: SendVerificationCodeInput!) {
    sendVerificationCode(input: $input)
  }
`

const SendCodeButton: React.FC<Props> = ({ email, lang, type }) => {
  const [send] = useMutation<SendVerificationCode>(SEND_CODE)
  const [sent, setSent] = useState(false)
  const { countdown, setCountdown, formattedTimeLeft } = useCountdown({
    timeLeft: 0
  })
  const disabled = !send || !email || countdown.timeLeft !== 0

  const sendCode = async (event: any) => {
    event.stopPropagation()

    try {
      await send({
        variables: { input: { email, type } }
      })
      setCountdown({ timeLeft: 1000 * 60 })
      setSent(true)
    } catch (error) {
      const errorCode = getErrorCodes(error)[0]
      const errorMessage = (
        <Translate
          zh_hant={TEXT.zh_hant.error[errorCode] || errorCode}
          zh_hans={TEXT.zh_hans.error[errorCode] || errorCode}
        />
      )
      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'red',
            content: errorMessage
          }
        })
      )
    }
  }

  return (
    <Button
      is="button"
      bgColor="transparent"
      className="u-link-green"
      spacing="none"
      disabled={disabled}
      onClick={(event: any) => sendCode(event)}
    >
      {sent ? (
        <Translate
          zh_hant={TEXT.zh_hant.resend}
          zh_hans={TEXT.zh_hans.resend}
        />
      ) : (
        <Translate
          zh_hant={TEXT.zh_hant.sendVerificationCode}
          zh_hans={TEXT.zh_hans.sendVerificationCode}
        />
      )}

      {sent && countdown.timeLeft !== 0 && (
        <span className="timer">{formattedTimeLeft.ss}</span>
      )}

      <style jsx>{styles}</style>
    </Button>
  )
}

export default SendCodeButton

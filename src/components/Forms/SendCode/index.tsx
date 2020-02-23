import gql from 'graphql-tag'
import { useState } from 'react'

import { Button, TextIcon, Translate, useCountdown } from '~/components'
import { getErrorCodes, useMutation } from '~/components/GQL'

import { ADD_TOAST, TEXT } from '~/common/enums'

import styles from './styles.css'

import { SendVerificationCode } from './__generated__/SendVerificationCode'

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

export const SendCodeButton: React.FC<Props> = ({ email, lang, type }) => {
  const [send] = useMutation<SendVerificationCode>(SEND_CODE)
  const [sent, setSent] = useState(false)
  const { countdown, setCountdown, formattedTimeLeft } = useCountdown({
    timeLeft: 0
  })
  const disabled = !send || !email || countdown.timeLeft !== 0

  const sendCode = async () => {
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
          zh_hant={TEXT.zh_hant[errorCode] || errorCode}
          zh_hans={TEXT.zh_hans[errorCode] || errorCode}
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
      spacing={['xtight', 'xtight']}
      disabled={disabled}
      onClick={() => sendCode()}
    >
      <TextIcon color="green" weight="md">
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

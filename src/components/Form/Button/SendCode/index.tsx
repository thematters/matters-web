import gql from 'graphql-tag'
import { useState } from 'react'
import { useMutation } from 'react-apollo'

import { Button } from '~/components/Button'
import { getErrorCodes } from '~/components/GQL'
import { useCountdown } from '~/components/Hook'
import { Translate } from '~/components/Language'

import { ADD_TOAST, TEXT } from '~/common/enums'
import { translate } from '~/common/utils'

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

  const sendCode = (event: any) => {
    event.stopPropagation()

    if (!send || !email || countdown.timeLeft !== 0) {
      return
    }

    send({
      variables: { input: { email, type } }
    })
      .then(result => {
        setCountdown({ timeLeft: 1000 * 60 })
        setSent(true)
      })
      .catch(error => {
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
      })
  }

  return (
    <Button
      is="button"
      bgColor="transparent"
      className="u-link-green"
      spacing="none"
      disabled={countdown.timeLeft !== 0}
      onClick={(event: any) => sendCode({ event })}
    >
      {sent
        ? translate({
            zh_hant: TEXT.zh_hant.resend,
            zh_hans: TEXT.zh_hans.resend,
            lang
          })
        : translate({
            zh_hant: TEXT.zh_hant.sendVerificationCode,
            zh_hans: TEXT.zh_hans.sendVerificationCode,
            lang
          })}
      {sent && countdown.timeLeft !== 0 && (
        <span className="timer">{formattedTimeLeft.ss}</span>
      )}

      <style jsx>{styles}</style>
    </Button>
  )
}

export default SendCodeButton

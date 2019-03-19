import gql from 'graphql-tag'
import { FC, useState } from 'react'

import { Button } from '~/components/Button'
import { Mutation } from '~/components/GQL'
import { useCountdown } from '~/components/Hook'

import { translate } from '~/common/utils'

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
  type: 'register' | 'email_reset' | 'password_reset' | 'email_verify'
  onError?: (error: any) => any
}

export const MUTATION_SEND_CODE = gql`
  mutation SendVerificationCode($input: SendVerificationCodeInput!) {
    sendVerificationCode(input: $input)
  }
`

const SendCodeButton: FC<Props> = ({ email, lang, type, onError }) => {
  const [sent, setSent] = useState(false)
  const { countdown, setCountdown, formattedTimeLeft } = useCountdown({
    timeLeft: 0
  })

  const sendCode = (params: any) => {
    const { event, send } = params
    event.stopPropagation()

    if (!send || !params.email || countdown.timeLeft !== 0) {
      return undefined
    }

    send({
      variables: { input: { email: params.email, type } }
    })
      .then((result: any) => {
        setCountdown({ timeLeft: 1000 * 60 })
        setSent(true)
      })
      .catch((error: any) => {
        if (onError) {
          onError(error)
        }
      })
  }

  return (
    <>
      <Mutation mutation={MUTATION_SEND_CODE}>
        {send => (
          <Button
            is="button"
            bgColor="transparent"
            className="u-link-green"
            spacing="none"
            disabled={countdown.timeLeft !== 0}
            onClick={(event: any) => sendCode({ event, email, send })}
          >
            {sent
              ? translate({ zh_hant: '重新發送', zh_hans: '重新发送', lang })
              : translate({
                  zh_hant: '發送驗證碼',
                  zh_hans: '发送验证码',
                  lang
                })}
            {sent && countdown.timeLeft !== 0 && (
              <span className="timer">{formattedTimeLeft.ss}</span>
            )}
          </Button>
        )}
      </Mutation>
      <style jsx>{styles}</style>
    </>
  )
}

export default SendCodeButton

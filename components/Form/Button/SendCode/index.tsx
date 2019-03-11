import gql from 'graphql-tag'
import { FC, useState } from 'react'

import { Button } from '~/components/Button'
import { Mutation } from '~/components/GQL'
import { useInterval } from '~/components/Hook'

import { countDownToTime, leftPad, translate } from '~/common/utils'

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
}

export const MUTATION_SEND_CODE = gql`
  mutation SendVerificationCode($input: SendVerificationCodeInput!) {
    sendVerificationCode(input: $input)
  }
`
const second = 1000

const duration = 60 * second

const SendCodeButton: FC<Props> = ({ email, lang, type }) => {
  const [sent, setSent] = useState(false)

  const [timeLeft, setTimeLeft] = useState<number | null>(null)

  const timer: { [key: string]: any } = timeLeft
    ? countDownToTime(timeLeft)
    : {}

  const sendCode = (params: any) => {
    const { event, send } = params
    event.stopPropagation()

    if (!send || !params.email || timeLeft !== null) {
      return undefined
    }

    setTimeLeft(duration)
    send({
      variables: { input: { email: params.email, type } }
    })
      .then((result: any) => {
        if (sent === false) {
          setSent(true)
        }
      })
      .catch((result: any) => {
        // TODO: Handle error
      })
  }

  useInterval(() => {
    if (timeLeft !== null) {
      if (timeLeft >= 0) {
        setTimeLeft(timeLeft - second)
      } else {
        setTimeLeft(null)
      }
    }
  }, second)

  return (
    <>
      <Mutation mutation={MUTATION_SEND_CODE}>
        {send => (
          <Button
            is="button"
            bgColor="transparent"
            className="u-link-green"
            spacing="none"
            disabled={timeLeft !== null}
            onClick={(event: any) => sendCode({ event, email, send })}
          >
            {sent === false
              ? translate({
                  zh_hant: '發送驗證碼',
                  zh_hans: '发送验证码',
                  lang
                })
              : translate({ zh_hant: '重新發送', zh_hans: '重新发送', lang })}
            {timer && timer.secs > 0 && (
              <span className="timer">{`${leftPad(timer.secs, 2, 0)}s`}</span>
            )}
          </Button>
        )}
      </Mutation>
      <style jsx>{styles}</style>
    </>
  )
}

export default SendCodeButton

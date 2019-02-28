import classNames from 'classnames'
import { withFormik } from 'formik'
import gql from 'graphql-tag'
import { FC, useContext, useState } from 'react'
import { Mutation } from 'react-apollo'

import { Button } from '~/components/Button'
import { Form } from '~/components/Form'
import { useInterval } from '~/components/Hook'
import { LanguageContext } from '~/components/Language'
import { ModalSwitch } from '~/components/ModalManager'

import {
  countDownToTime,
  isValidEmail,
  leftPad,
  translate
} from '~/common/utils'

import styles from './styles.css'

interface Props {
  defaultEmail: string
  extraClass?: string[]
  purpose: 'modal' | 'page'
  submitCallback?: (params: any) => void
}

export const MUTATION_SEND_CODE = gql`
  mutation SendVerificationCode($input: SendVerificationCodeInput!) {
    sendVerificationCode(input: $input)
  }
`

export const MUTATION_CONFIRM_CODE = gql`
  mutation ConfirmVerificationCode($input: ConfirmVerificationCodeInput!) {
    confirmVerificationCode(input: $input)
  }
`

const second = 1000

const duration = 60 * second

const RequestCodeButton = ({ email, lang }: any) => {
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
      variables: { input: { email: params.email, type: 'password_reset' } }
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
              <span className="timer">({`${leftPad(timer.secs, 2, 0)}`})</span>
            )}
          </Button>
        )}
      </Mutation>
      <style jsx>{styles}</style>
    </>
  )
}

const ResetCodeForm: FC<Props> = ({
  defaultEmail = '',
  extraClass = [],
  purpose,
  submitCallback
}) => {
  const { lang } = useContext(LanguageContext)

  const validateEmail = (value: string, language: string) => {
    let result: any
    if (!value) {
      result = { zh_hant: '必填欄位', zh_hans: '必填栏位' }
    } else if (!isValidEmail(value)) {
      result = { zh_hant: '電子信箱格式有誤', zh_hans: '邮箱格式有误' }
    }
    if (result) {
      return translate({ ...result, lang: language })
    }
  }

  const validateCode = (value: string, language: string) => {
    let result: any
    if (!value) {
      result = { zh_hant: '必填欄位', zh_hans: '必填栏位' }
    }
    if (result) {
      return translate({ ...result, lang: language })
    }
  }

  const LoginModalSwitch = () => (
    <ModalSwitch modalId="loginModal">
      {(open: any) => (
        <Button
          type="button"
          bgColor="transparent"
          className="u-link-green"
          spacing="none"
          onClick={open}
        >
          {translate({ zh_hant: '上一步', zh_hans: '上一步', lang })}
        </Button>
      )}
    </ModalSwitch>
  )

  const BaseForm = ({
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit
  }: {
    [key: string]: any
  }) => {
    const formClass = classNames('form', ...extraClass)

    const emailPlaceholder = translate({
      zh_hant: '請輸入你的註冊電子信箱',
      zh_hans: '请输入你的注册邮箱',
      lang
    })

    const codePlaceholder = translate({
      zh_hant: '驗證碼',
      zh_hans: '验证码',
      lang
    })

    return (
      <>
        <form className={formClass} onSubmit={handleSubmit}>
          <Form.Input
            type="text"
            field="email"
            placeholder={emailPlaceholder}
            values={values}
            errors={errors}
            touched={touched}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />
          <Form.Input
            type="text"
            field="code"
            placeholder={codePlaceholder}
            style={{ marginTop: '0.5rem', paddingRight: '6rem' }}
            floatElement={
              <RequestCodeButton email={values.email} lang={lang} />
            }
            values={values}
            errors={errors}
            touched={touched}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />
          <div className="buttons">
            <Button
              type="submit"
              bgColor="green"
              style={{ width: 80 }}
              disabled={isSubmitting}
            >
              {translate({ zh_hant: '下一步', zh_hans: '下一步', lang })}
            </Button>
            {purpose === 'modal' && <LoginModalSwitch />}
          </div>
        </form>
        <style jsx>{styles}</style>
      </>
    )
  }

  const MainForm: any = withFormik({
    mapPropsToValues: () => ({
      email: defaultEmail,
      code: ''
    }),

    validate: ({ email, code }) => {
      const isInvalidEmail = validateEmail(email, lang)
      const isInvalidCode = validateCode(code, lang)
      const errors = {
        ...(isInvalidEmail ? { email: isInvalidEmail } : {}),
        ...(isInvalidCode ? { code: isInvalidCode } : {})
      }
      return errors
    },

    handleSubmit: (values, { props, setSubmitting }: any) => {
      const { email, code } = values
      const { submitAction } = props
      if (!submitAction) {
        return undefined
      }

      submitAction({
        variables: { input: { email, type: 'password_reset', code } }
      })
        .then(({ data }: any) => {
          const { confirmVerificationCode } = data
          if (submitCallback && confirmVerificationCode) {
            submitCallback({ email, codeId: confirmVerificationCode })
          }
        })
        .catch((result: any) => {
          // TODO: Handle error
        })
        .finally(() => {
          setSubmitting(false)
        })
    }
  })(BaseForm)

  return (
    <>
      <Mutation mutation={MUTATION_CONFIRM_CODE}>
        {confirmCode => <MainForm submitAction={confirmCode} />}
      </Mutation>
      <style jsx>{styles}</style>
    </>
  )
}

export default ResetCodeForm

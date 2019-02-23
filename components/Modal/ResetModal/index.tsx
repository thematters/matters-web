// External modules
import classNames from 'classnames'
import { withFormik } from 'formik'
import { FC, useContext, useEffect, useState } from 'react'

// Internal modules
import { TEXT } from '~/common/enums'
import { isValidEmail, isValidPassword, translate } from '~/common/utils'
import { Button, Form, Icon, LanguageContext, Modal, Title } from '~/components'
import ICON_CLOSE from '~/static/icons/close.svg?sprite'
import styles from './styles.css'

interface Props {
  close: any
}

const ResetModal: FC<Props> = ({ close }) => {
  const { lang } = useContext(LanguageContext)

  const [step, setStep] = useState('request')

  const contentClass = classNames(
    'l-col-4',
    'l-col-sm-6',
    'l-col-md-6',
    'l-col-lg-8',
    'content'
  )

  const interpret = (text: string, language: string) =>
    translate(
      {
        zh_hant: TEXT.zh_hant[text],
        zh_hans: TEXT.zh_hans[text]
      },
      language
    )

  const goPreviousStep = () => {
    switch (step) {
      case 'reqeust': {
        break
      }
      case 'reset': {
        setStep('request')
        break
      }
    }
  }

  const [data, setData] = useState({
    request: {
      title: interpret('forgetPassword', lang)
    },
    reset: {
      title: interpret('resetPassword', lang)
    },
    complete: {
      title: interpret('resetPassword', lang)
    }
  })

  const Header = ({ title }) => (
    <>
      <div className="header">
        <Title type="modal">{title}</Title>
        <button onClick={close}>
          <Icon id={ICON_CLOSE.id} viewBox={ICON_CLOSE.viewBox} />
        </button>
      </div>
      <style jsx>{styles}</style>
    </>
  )

  const SendVerificationCodeButton = ({ onClick }) => (
    <>
      <Button
        is="button"
        bgColor="transparent"
        className="u-link-green"
        style={{ paddingRight: '0' }}
        onClick={onClick}
      >
        {interpret('sendVerificationCode', lang)}
      </Button>
      <style jsx>{styles}</style>
    </>
  )

  const BaseRequestForm = props => (
    <>
      <form className="form" onSubmit={props.handleSubmit}>
        <Form.Input
          type="text"
          field="email"
          placeholder={interpret('enterRegisteredEmail', lang)}
          {...props}
        />
        <Form.Input
          type="text"
          field="code"
          placeholder={interpret('verificationCode', lang)}
          style={{ marginTop: '0.5rem', paddingRight: '6rem' }}
          floatElement={<SendVerificationCodeButton />}
          {...props}
        />
        <div className="buttons">
          <span className="previous">{interpret('previousStep', lang)}</span>
          <Button type="submit" bgColor="green" style={{ width: 80 }}>
            {interpret('nextStep', lang)}
          </Button>
        </div>
      </form>
      <style jsx>{styles}</style>
    </>
  )

  const BaseResetForm = props => (
    <>
      <form className="form" onSubmit={props.handleSubmit}>
        <Form.Input
          type="password"
          field="password"
          placeholder={interpret('enterPassword', lang)}
          {...props}
        />
        <Form.Input
          type="password"
          field="confirmedPassword"
          placeholder={interpret('enterPasswordAgain', lang)}
          style={{ marginTop: '0.5rem', paddingRight: '6rem' }}
          {...props}
        />
        <div className="buttons">
          <span className="previous" onClick={goPreviousStep}>
            {interpret('previousStep', lang)}
          </span>
          <Button type="submit" bgColor="green" style={{ width: 80 }}>
            {interpret('confirm', lang)}
          </Button>
        </div>
      </form>
      <style jsx>{styles}</style>
    </>
  )

  const validateEmail = (value: string) => {
    if (!value) {
      return interpret('required', lang)
    }
    if (!isValidEmail(value)) {
      return interpret('invalidEmail', lang)
    }
    return undefined
  }

  const validateCode = (value: string) => {
    if (!value) {
      return interpret('required', lang)
    }
    return undefined
  }

  const validatePassword = (value: string) => {
    if (!value) {
      return interpret('required', lang)
    }
    if (!isValidPassword(value)) {
      return interpret('passwordHint', lang)
    }
    return undefined
  }

  const validateConfirmedPassword = (compareValue: string, value: string) => {
    if (!value) {
      return interpret('required', lang)
    }
    if (compareValue !== value) {
      return interpret('passwordNotMatch', lang)
    }
    return undefined
  }

  const RequestForm = withFormik({
    mapPropsToValues: () => ({
      email: data.request.email || '',
      code: data.request.code || ''
    }),

    validate: ({ email, code }) => {
      const isInvalidEmail = validateEmail(email)
      const isInvalidCode = validateCode(code)
      const errors = {
        ...(isInvalidEmail ? { email: isInvalidEmail } : {}),
        ...(isInvalidCode ? { code: isInvalidCode } : {})
      }
      return errors
    },

    handleSubmit: (values, { setSubmitting }) => {
      // TODO: Add mutation
      setData(prev => {
        prev.request.email = values.email
        prev.request.code = values.code
        return prev
      })
      setStep('reset')
    }
  })(BaseRequestForm)

  const ResetForm = withFormik({
    mapPropsToValues: () => ({
      password: '',
      confirmedPassword: ''
    }),

    validate: ({ password, confirmedPassword }) => {
      const isInvalidPassword = validatePassword(password)
      const isInvalidConfirmedPassword = validateConfirmedPassword(
        password,
        confirmedPassword
      )
      const errors = {
        ...(isInvalidPassword ? { password: isInvalidPassword } : {}),
        ...(isInvalidConfirmedPassword
          ? { confirmedPassword: isInvalidConfirmedPassword }
          : {})
      }
      return errors
    },

    handleSubmit: async (values, { setSubmitting }) => {
      // TODO: Add mutation
      steStep('complete')
    }
  })(BaseResetForm)

  const Complete = () => (
    <>
      <div className="complete">
        <div className="message">
          {interpret('resetPasswordSuccessful', lang)}
        </div>
        <div className="hint">{interpret('useNewPassword', lang)}。</div>
      </div>
      <style jsx>{styles}</style>
    </>
  )

  return (
    <>
      <div className="container">
        <Header title={data[step].title} />
        <div className="content-wrapper">
          <div className={contentClass}>
            {step === 'request' && <RequestForm />}
            {step === 'reset' && <ResetForm />}
            {step === 'complete' && <Complete />}
          </div>
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  )
}

export default ResetModal

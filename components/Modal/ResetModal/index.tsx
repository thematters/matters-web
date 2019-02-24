// External modules
import classNames from 'classnames'
import { withFormik } from 'formik'
import { FC, useState } from 'react'

import { Button, Form, Icon, ModalSwitch, Title } from '~/components'

import { isValidEmail, isValidPassword } from '~/common/utils'
import ICON_CLOSE from '~/static/icons/close.svg?sprite'

import styles from './styles.css'

/**
 * This component is for password reset modal.
 *
 * Usage:
 *
 * ```jsx
 *   <Modal.ResetModal close={close} interpret={interpret} />
 * ```
 *
 */

interface Props {
  close: () => {}
  interpret: () => {}
}

const ResetModal: FC<Props> = ({ close, interpret }) => {
  const [step, setStep] = useState('request')

  const [data, setData] = useState({
    request: {
      title: interpret('forgetPassword')
    },
    reset: {
      title: interpret('resetPassword')
    },
    complete: {
      title: interpret('resetPassword')
    }
  })

  const contentClass = classNames(
    'l-col-4',
    'l-col-sm-6',
    'l-col-md-6',
    'l-col-lg-8',
    'content'
  )

  const goPreviousStep = (event: any) => {
    event.stopPropagation()
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

  const SendVerificationCodeButton = () => (
    <>
      <Button
        is="button"
        bgColor="transparent"
        className="u-link-green"
        style={{ paddingRight: '0' }}
      >
        {interpret('sendVerificationCode')}
      </Button>
      <style jsx>{styles}</style>
    </>
  )

  const ModalLoginSwitch = () => (
    <ModalSwitch modalId="loginModal">
      {open => (
        <Button
          type="button"
          bgColor="transparent"
          className="u-link-green"
          style={{ paddingLeft: '0rem' }}
          onClick={open}
        >
          {interpret('previousStep')}
        </Button>
      )}
    </ModalSwitch>
  )

  const BaseRequestForm = props => (
    <>
      <form className="form" onSubmit={props.handleSubmit}>
        <Form.Input
          type="text"
          field="email"
          placeholder={interpret('enterRegisteredEmail')}
          {...props}
        />
        <Form.Input
          type="text"
          field="code"
          placeholder={interpret('verificationCode')}
          style={{ marginTop: '0.5rem', paddingRight: '6rem' }}
          floatElement={<SendVerificationCodeButton />}
          {...props}
        />
        <div className="buttons">
          <ModalLoginSwitch />
          <Button type="submit" bgColor="green" style={{ width: 80 }}>
            {interpret('nextStep')}
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
          placeholder={interpret('enterPassword')}
          {...props}
        />
        <Form.Input
          type="password"
          field="confirmedPassword"
          placeholder={interpret('enterPasswordAgain')}
          style={{ marginTop: '0.5rem', paddingRight: '6rem' }}
          {...props}
        />
        <div className="buttons">
          <Button
            type="button"
            bgColor="transparent"
            className="u-link-green"
            onClick={goPreviousStep}
            style={{ paddingLeft: '0rem' }}
          >
            {interpret('previousStep')}
          </Button>
          <Button type="submit" bgColor="green" style={{ width: 80 }}>
            {interpret('confirm')}
          </Button>
        </div>
      </form>
      <style jsx>{styles}</style>
    </>
  )

  const validateEmail = (value: string) => {
    if (!value) {
      return interpret('required')
    }
    if (!isValidEmail(value)) {
      return interpret('invalidEmail')
    }
    return undefined
  }

  const validateCode = (value: string) => {
    if (!value) {
      return interpret('required')
    }
    return undefined
  }

  const validatePassword = (value: string) => {
    if (!value) {
      return interpret('required')
    }
    if (!isValidPassword(value)) {
      return interpret('passwordHint')
    }
    return undefined
  }

  const validateConfirmedPassword = (compareValue: string, value: string) => {
    if (!value) {
      return interpret('required')
    }
    if (compareValue !== value) {
      return interpret('passwordNotMatch')
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
      setStep('complete')
    }
  })(BaseResetForm)

  const Complete = () => (
    <>
      <div className="complete">
        <div className="message">{interpret('resetPasswordSuccess')}</div>
        <div className="hint">{interpret('useNewPassword')}。</div>
      </div>
      <style jsx>{styles}</style>
    </>
  )

  return (
    <>
      <Header title={data[step].title} />
      <div className="content-wrapper">
        <div className={contentClass}>
          {step === 'request' && <RequestForm />}
          {step === 'reset' && <ResetForm />}
          {step === 'complete' && <Complete />}
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  )
}

export default ResetModal

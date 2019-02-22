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

  const [stage, setStage] = useState('reset')

  const [data, setData] = useState({
    request: {
      title: translate(
        {
          zh_hant: TEXT.zh_hant.forgetPassword,
          zh_hans: TEXT.zh_hans.forgetPassword
        },
        lang
      )
    },
    reset: {
      title: translate(
        {
          zh_hant: TEXT.zh_hant.resetPassword,
          zh_hans: TEXT.zh_hans.resetPassword
        },
        lang
      )
    }
  })

  const contentClass = classNames(
    'l-col-4',
    'l-col-sm-6',
    'l-col-md-6',
    'l-col-lg-8',
    'content'
  )

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

  const SendVerificationCodeButton = props => (
    <>
      <Button
        is="button"
        bgColor="transparent"
        className="u-link-green"
        style={{ paddingRight: '0' }}
        {...props}
      >
        {translate(
          {
            zh_hant: TEXT.zh_hant.sendVerificationCode,
            zh_hans: TEXT.zh_hans.sendVerificationCode
          },
          lang
        )}
      </Button>
      <style jsx>{styles}</style>
    </>
  )

  const BaseRequestForm = ({
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit
  }) => (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <Form.Input
          type="text"
          name="email"
          placeholder={translate(
            {
              zh_hant: TEXT.zh_hant.enterRegisteredEmail,
              zh_hans: TEXT.zh_hans.enterRegisteredEmail
            },
            lang
          )}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          error={errors.email}
          touched={touched.email}
        />
        <Form.Input
          type="text"
          name="code"
          placeholder={translate(
            {
              zh_hant: TEXT.zh_hant.verificationCode,
              zh_hans: TEXT.zh_hans.verificationCode
            },
            lang
          )}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.code}
          error={errors.code}
          touched={touched.code}
          style={{ marginTop: '0.5rem', paddingRight: '6rem' }}
          floatItem={<SendVerificationCodeButton />}
        />
        <div className="buttons">
          <span className="previous">
            {translate(
              {
                zh_hant: TEXT.zh_hant.previousStep,
                zh_hans: TEXT.zh_hans.previousStep
              },
              lang
            )}
          </span>
          <Button type="submit" bgColor="green" style={{ width: 80 }}>
            {translate(
              {
                zh_hant: TEXT.zh_hant.nextStep,
                zh_hans: TEXT.zh_hans.nextStep
              },
              lang
            )}
          </Button>
        </div>
      </form>
      <style jsx>{styles}</style>
    </>
  )

  const BaseResetForm = ({
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit
  }) => (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <Form.Input
          type="password"
          name="password"
          placeholder={translate(
            {
              zh_hant: TEXT.zh_hant.enterPassword,
              zh_hans: TEXT.zh_hans.enterPassword
            },
            lang
          )}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          error={errors.password}
          touched={touched.password}
        />
        <Form.Input
          type="password"
          name="confirmedPassword"
          placeholder={translate(
            {
              zh_hant: TEXT.zh_hant.enterPasswordAgain,
              zh_hans: TEXT.zh_hans.enterPasswordAgain
            },
            lang
          )}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.confirmedPassword}
          error={errors.confirmedPassword}
          touched={touched.confirmedPassword}
          style={{ marginTop: '0.5rem', paddingRight: '6rem' }}
        />
        <div className="buttons">
          <span className="previous">
            {translate(
              {
                zh_hant: TEXT.zh_hant.previousStep,
                zh_hans: TEXT.zh_hans.previousStep
              },
              lang
            )}
          </span>
          <Button type="submit" bgColor="green" style={{ width: 80 }}>
            {translate(
              { zh_hant: TEXT.zh_hant.confirm, zh_hans: TEXT.zh_hans.confirm },
              lang
            )}
          </Button>
        </div>
      </form>
      <style jsx>{styles}</style>
    </>
  )

  const validateEmail = (value: string) => {
    if (!value) {
      return translate(
        { zh_hant: TEXT.zh_hant.required, zh_hans: TEXT.zh_hans.required },
        lang
      )
    }
    if (!isValidEmail(value)) {
      return translate(
        {
          zh_hant: TEXT.zh_hant.invalidEmail,
          zh_hans: TEXT.zh_hans.invalidEmail
        },
        lang
      )
    }
    return undefined
  }

  const validateCode = (value: string) => {
    if (!value) {
      return translate(
        { zh_hant: TEXT.zh_hant.required, zh_hans: TEXT.zh_hans.required },
        lang
      )
    }
    return undefined
  }

  const validatePassword = (value: string) => {
    if (!value) {
      return translate(
        { zh_hant: TEXT.zh_hant.required, zh_hans: TEXT.zh_hans.required },
        lang
      )
    }
    if (!isValidPassword(value)) {
      return translate(
        {
          zh_hant: TEXT.zh_hant.passwordHint,
          zh_hans: TEXT.zh_hans.passwordHint
        },
        lang
      )
    }
    return undefined
  }

  const validateConfirmedPassword = (compareValue: string, value: string) => {
    if (!value) {
      return translate(
        { zh_hant: TEXT.zh_hant.required, zh_hans: TEXT.zh_hans.required },
        lang
      )
    }
    if (compareValue !== value) {
      return translate(
        {
          zh_hant: TEXT.zh_hant.passwordNotMatch,
          zh_hans: TEXT.zh_hans.passwordNotMatch
        },
        lang
      )
    }
    return undefined
  }

  const RequestForm = withFormik({
    mapPropsToValues: () => ({
      email: '',
      code: ''
    }),

    validate: ({ email, code }) => {
      const errors = {
        email: validateEmail(email),
        code: validateCode(code)
      }
      return errors
    },

    handleSubmit: async (values, { setSubmitting }) => {
      // TODO: Add mutation
    }
  })(BaseRequestForm)

  const ResetForm = withFormik({
    mapPropsToValues: () => ({
      password: '',
      confirmedPassword: ''
    }),

    validate: ({ password, confirmedPassword }) => {
      const errors = {
        password: validatePassword(password),
        confirmedPassword: validateConfirmedPassword(
          password,
          confirmedPassword
        )
      }
      return errors
    },

    handleSubmit: async (values, { setSubmitting }) => {
      // TODO: Add mutation
    }
  })(BaseResetForm)

  return (
    <>
      <div className="container">
        <Header title={data[stage].title} />
        <div className="content-wrapper">
          <div className={contentClass}>
            {stage === 'request' && <RequestForm />}
            {stage === 'reset' && <ResetForm />}
          </div>
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  )
}

export default ResetModal

// External modules
import classNames from 'classnames'
import { withFormik } from 'formik'
import { FC, useContext, useEffect, useState } from 'react'

// Internal modules
import { TEXT } from '~/common/enums'
import { isValidEmail, translate } from '~/common/utils'
import { Button, Form, Icon, LanguageContext, Modal, Title } from '~/components'
import ICON_ARROW from '~/static/icons/arrow-right-green.svg?sprite'
import ICON_CLOSE from '~/static/icons/close.svg?sprite'
import styles from './styles.css'

interface Props {
  close: any
}

const LoginModal: FC<Props> = ({ close }) => {
  const { lang } = useContext(LanguageContext)

  const contentClass = classNames(
    'l-col-4',
    'l-col-sm-6',
    'l-col-md-6',
    'l-col-lg-8',
    'content'
  )

  const interpret = (text: string, language: string) => {
    return translate(
      {
        zh_hant: TEXT.zh_hant[text],
        zh_hans: TEXT.zh_hans[text]
      },
      language
    )
  }

  const Header = () => (
    <>
      <div className="header">
        <Title type="modal">{interpret('login', lang)}</Title>
        <button onClick={close}>
          <Icon id={ICON_CLOSE.id} viewBox={ICON_CLOSE.viewBox} />
        </button>
      </div>
      <style jsx>{styles}</style>
    </>
  )

  const BaseForm = props => (
    <>
      <form className="form" onSubmit={props.handleSubmit}>
        <Form.Input
          type="text"
          field="email"
          placeholder={interpret('enterEmail', lang)}
          {...props}
        />
        <Form.Input
          type="password"
          field="password"
          placeholder={interpret('enterPassword', lang)}
          style={{ marginTop: '0.5rem' }}
          {...props}
        />
        <div className="buttons">
          <span className="forget">{interpret('forgetPassword', lang)}？</span>
          <Button type="submit" bgColor="green" style={{ width: 80 }}>
            {interpret('login', lang)}
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

  const validatePassword = (value: string) => {
    if (!value) {
      return interpret('required', lang)
    }
    return undefined
  }

  const LoginForm = withFormik({
    mapPropsToValues: () => ({
      email: '',
      password: ''
    }),

    validate: ({ email, password }) => {
      const isInvalidEmail = validateEmail(email)
      const isInvalidPassword = validatePassword(password)
      const errors = {
        ...(isInvalidEmail ? { email: isInvalidEmail } : {}),
        ...(isInvalidPassword ? { password: isInvalidPassword } : {})
      }
      return errors
    },

    handleSubmit: async (values, { setSubmitting }) => {
      // TODO: Add mutation
    }
  })(BaseForm)

  const RegisterBlock = () => (
    <>
      <div className="register">
        {interpret('hasNoAccount', lang)}？
        <span className="link">
          {interpret('register', lang)}
          <Icon
            style={{ width: 16, hieght: 10, marginLeft: '0.25rem' }}
            id={ICON_ARROW.id}
            viewBox={ICON_ARROW.viewBox}
          />
        </span>
      </div>
      <style jsx>{styles}</style>
    </>
  )

  return (
    <>
      <div className="container">
        <Header />
        <div className="content-wrapper">
          <div className={contentClass}>
            <LoginForm />
            <hr className="divider" />
            <RegisterBlock />
          </div>
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  )
}

export default LoginModal

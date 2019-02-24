import classNames from 'classnames'
import { withFormik } from 'formik'
import { FC, useContext, useEffect, useState } from 'react'

import { Button, Form, Icon, LanguageContext, Modal, Title } from '~/components'

import { TEXT } from '~/common/enums'
import { isValidEmail, translate } from '~/common/utils'
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

  const Header = () => (
    <>
      <div className="header">
        <Title type="modal">
          {translate(
            { zh_hant: TEXT.zh_hant.login, zh_hans: TEXT.zh_hans.login },
            lang
          )}
        </Title>
        <button onClick={close}>
          <Icon id={ICON_CLOSE.id} viewBox={ICON_CLOSE.viewBox} />
        </button>
      </div>
      <style jsx>{styles}</style>
    </>
  )

  const BaseForm = ({
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
              zh_hant: TEXT.zh_hant.enterEmail,
              zh_hans: TEXT.zh_hans.enterEmail
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
          style={{ marginTop: '0.5rem' }}
        />
        <div className="buttons">
          <span className="forget">
            {translate(
              {
                zh_hant: TEXT.zh_hant.forgetPassword,
                zh_hans: TEXT.zh_hans.forgetPassword
              },
              lang
            )}
            ？
          </span>
          <Button type="submit" bgColor="green" style={{ width: 80 }}>
            {translate(
              { zh_hant: TEXT.zh_hant.login, zh_hans: TEXT.zh_hans.login },
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

  const validatePassword = (value: string) => {
    if (!value) {
      return translate(
        { zh_hant: TEXT.zh_hant.required, zh_hans: TEXT.zh_hans.required },
        lang
      )
    }
    return undefined
  }

  const LoginForm = withFormik({
    mapPropsToValues: () => ({
      email: '',
      password: ''
    }),

    validate: ({ email, password }) => {
      const errors = {
        email: validateEmail(email),
        password: validatePassword(password)
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
        {translate(
          {
            zh_hant: TEXT.zh_hant.hasNoAccount,
            zh_hans: TEXT.zh_hans.hasNoAccount
          },
          lang
        )}
        ？
        <span className="link">
          {translate(
            { zh_hant: TEXT.zh_hant.register, zh_hans: TEXT.zh_hans.register },
            lang
          )}
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

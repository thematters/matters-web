import classNames from 'classnames'
import { withFormik } from 'formik'
import { FC } from 'react'

import { Button, Form, Icon, ModalSwitch } from '~/components'

import { isValidEmail } from '~/common/utils'
import ICON_ARROW from '~/static/icons/arrow-right-green.svg?sprite'

import styles from './styles.css'

/**
 * This component is for login modal.
 *
 * Usage:
 *
 * ```jsx
 *   <Modal.LoginModal close={close} interpret={interpret} />
 * ```
 *
 */

interface Props {
  close: () => {}
  interpret: (text: string) => string
}

const LoginModal: FC<Props> = ({ close, interpret }) => {
  const contentClass = classNames(
    'l-col-4',
    'l-col-sm-6',
    'l-col-md-6',
    'l-col-lg-8',
    'content'
  )

  const ModalResetSwitch = () => (
    <ModalSwitch modalId="resetModal">
      {(open: any) => (
        <Button
          type="button"
          bgColor="transparent"
          className="u-link-green"
          style={{ paddingLeft: '0rem' }}
          onClick={open}
        >
          {interpret('forgetPassword')}？
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
  }) => (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <Form.Input
          type="text"
          field="email"
          placeholder={interpret('enterEmail')}
          values={values}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />
        <Form.Input
          type="password"
          field="password"
          placeholder={interpret('enterPassword')}
          style={{ marginTop: '0.5rem' }}
          values={values}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />
        <div className="buttons">
          <ModalResetSwitch />
          <Button
            type="submit"
            bgColor="green"
            style={{ width: 80 }}
            disabled={isSubmitting}
          >
            {interpret('login')}
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
  }

  const validatePassword = (value: string) => {
    if (!value) {
      return interpret('required')
    }
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
      console.log(values) // For passing linting
      setSubmitting(false)
      close()
    }
  })(BaseForm)

  const Footer = () => (
    <>
      <div className="footer">
        {interpret('hasNoAccount')}？
        <span className="link">
          {interpret('register')}
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
      <div className="content-wrapper">
        <div className={contentClass}>
          <LoginForm />
          <hr className="divider" />
          <Footer />
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  )
}

export default LoginModal

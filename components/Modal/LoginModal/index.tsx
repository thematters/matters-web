import classNames from 'classnames'
import { withFormik } from 'formik'
import { FC } from 'react'

import { Button, Form, Icon, Title } from '~/components'

import { TEXT } from '~/common/enums'
import { isValidEmail, translate } from '~/common/utils'
import ICON_ARROW from '~/static/icons/arrow-right-green.svg?sprite'
import ICON_CLOSE from '~/static/icons/close.svg?sprite'

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
  interpret: () => {}
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
      {open => (
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

  const BaseForm = props => (
    <>
      <form className="form" onSubmit={props.handleSubmit}>
        <Form.Input
          type="text"
          field="email"
          placeholder={interpret('enterEmail')}
          {...props}
        />
        <Form.Input
          type="password"
          field="password"
          placeholder={interpret('enterPassword')}
          style={{ marginTop: '0.5rem' }}
          {...props}
        />
        <div className="buttons">
          <ModalResetSwitch />
          <Button
            type="submit"
            bgColor="green"
            style={{ width: 80 }}
            disabled={props.isSubmitting}
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
      setSubmitting(false)
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

import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _pickBy from 'lodash/pickBy'
import React, { useContext, useEffect } from 'react'

import {
  Dialog,
  Form,
  LanguageContext,
  Spinner,
  Translate,
  useMutation,
  useStep,
} from '~/components'

import {
  parseFormSubmitErrors,
  validateComparedPassword,
  validatePaymentPassword,
} from '~/common/utils'

import styles from './styles.css'

import { SetPaymentPassword } from './__generated__/SetPaymentPassword'

interface FormProps {
  submitCallback: () => void
}

interface FormValues {
  password: string
  comparedPassword: string
}

const SET_PAYMENT_PASSWORD = gql`
  mutation SetPaymentPassword($password: String) {
    updateUserInfo(input: { paymentPassword: $password }) {
      id
      status {
        hasPaymentPassword
      }
    }
  }
`

const PaymentSetPasswordForm: React.FC<FormProps> = ({ submitCallback }) => {
  const [setPassword] = useMutation<SetPaymentPassword>(
    SET_PAYMENT_PASSWORD,
    undefined,
    { showToast: false }
  )
  const { lang } = useContext(LanguageContext)
  const { currStep, forward } = useStep<'password' | 'comparedPassword'>(
    'password'
  )
  const isInPassword = currStep === 'password'
  const isInComparedPassword = currStep === 'comparedPassword'

  const {
    values,
    errors,
    isSubmitting,
    handleSubmit,
    setFieldValue,
    isValid,
    touched,
    setTouched,
  } = useFormik<FormValues>({
    initialValues: {
      password: '',
      comparedPassword: '',
    },
    validate: ({ password, comparedPassword }) => {
      const passwordError = validatePaymentPassword(password, lang)
      const comparedPasswordError = validateComparedPassword(
        password,
        comparedPassword,
        lang
      )

      // jump to next step
      if (!passwordError && isInPassword) {
        forward('comparedPassword')
      }

      if (comparedPasswordError) {
        setFieldValue('comparedPassword', '', false)
      }

      return _pickBy({
        password: isInPassword && passwordError,
        comparedPassword: isInComparedPassword && comparedPasswordError,
      })
    },
    onSubmit: async ({ password }, { setFieldError, setSubmitting }) => {
      try {
        await setPassword({ variables: { password } })

        setSubmitting(false)
        submitCallback()
      } catch (error) {
        setSubmitting(false)

        const [messages, codes] = parseFormSubmitErrors(error, lang)
        setFieldError('password', messages[codes[0]])
        setFieldValue('comparedPassword', '', false)
      }
    },
  })

  const InnerForm = (
    <Form onSubmit={handleSubmit} noBackground>
      {isInPassword && (
        <Form.PinInput
          length={6}
          name="password"
          value={values.password}
          error={touched.password && errors.password}
          hint={<Translate id="hintPaymentPassword" />}
          onChange={(value) => {
            const shouldValidate = value.length === 6
            setTouched({ password: true }, shouldValidate)
            setFieldValue('password', value, shouldValidate)
          }}
        />
      )}
      {isInComparedPassword && (
        <Form.PinInput
          length={6}
          name="compared-password"
          value={values.comparedPassword}
          error={touched.comparedPassword && errors.comparedPassword}
          hint={<Translate id="hintPaymentPassword" />}
          onChange={(value) => {
            const shouldValidate = value.length === 6
            setTouched({ comparedPassword: true }, shouldValidate)
            setFieldValue('comparedPassword', value, shouldValidate)
          }}
        />
      )}
    </Form>
  )

  useEffect(() => {
    // submit on validate
    if (isValid && values.password && values.comparedPassword) {
      handleSubmit()
    }
  }, [isValid])

  if (isSubmitting) {
    return (
      <Dialog.Content hasGrow>
        <Spinner />
      </Dialog.Content>
    )
  }

  return (
    <Dialog.Content hasGrow>
      <section className="reason">
        {isInPassword && (
          <p>
            <Translate
              zh_hant="爲了保護你的資產安全"
              zh_hans="为了保护你的资产安全"
              en="To protect your assets,"
            />
            <br />
            <Translate
              zh_hant="在储值前請先設置交易密碼"
              zh_hans="在储值前请先设置交易密码"
              en="please set transaction password before top-up"
            />
          </p>
        )}

        {isInComparedPassword && (
          <p>
            <Translate id="enterPaymentPasswordAgain" />
          </p>
        )}

        <p className="hint">
          <Translate id="hintPaymentPassword" />
        </p>

        <style jsx>{styles}</style>
      </section>

      {InnerForm}
    </Dialog.Content>
  )
}

export default PaymentSetPasswordForm

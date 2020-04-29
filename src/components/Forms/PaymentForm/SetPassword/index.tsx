import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _pickBy from 'lodash/pickBy'
import React, { useContext, useEffect } from 'react'

import { Dialog, Form, LanguageContext, Translate } from '~/components'
import { useMutation } from '~/components/GQL'

import { parseFormSubmitErrors, validatePaymentPassword } from '~/common/utils'

import styles from './styles.css'

import { SetPaymentPassword } from './__generated__/SetPaymentPassword'

interface FormProps {
  submitCallback: () => void
}

interface FormValues {
  password: string
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

const SetPassword: React.FC<FormProps> = ({ submitCallback }) => {
  const [setPassword] = useMutation<SetPaymentPassword>(SET_PAYMENT_PASSWORD)
  const { lang } = useContext(LanguageContext)
  const formId = 'set-password-form'

  const {
    values,
    errors,
    handleSubmit,
    setFieldValue,
    isValid,
    touched,
    setTouched,
  } = useFormik<FormValues>({
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    initialValues: {
      password: '',
    },
    validate: ({ password }) =>
      _pickBy({
        password: validatePaymentPassword(password, lang),
      }),
    onSubmit: async ({ password }, { setFieldError, setSubmitting }) => {
      try {
        await setPassword({ variables: { password } })

        submitCallback()
      } catch (error) {
        const [messages, codes] = parseFormSubmitErrors(error, lang)
        setFieldError('password', messages[codes[0]])
      }

      setSubmitting(false)
    },
  })

  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit}>
      <Form.PinInput
        length={6}
        name="set-password"
        error={touched.password && errors.password}
        onChange={(value) => {
          const shouldValidate = value.length === 6
          setTouched({ password: true }, shouldValidate)
          setFieldValue('password', value, shouldValidate)
        }}
      />
    </Form>
  )

  // submit on validate
  useEffect(() => {
    if (isValid && values.password) {
      handleSubmit()
    }
  }, [isValid])

  return (
    <Dialog.Content hasGrow>
      <section className="reason">
        <p>
          <Translate
            zh_hant="爲了保護你的資產安全"
            zh_hans="为了保护你的资产安全"
          />
          <br />
          <Translate
            zh_hant="在充值前請先設置支付密碼"
            zh_hans="在充值前请先设置支付密码"
          />
        </p>

        <p className="hint">
          <Translate id="hintPaymentPassword" />
        </p>

        <style jsx>{styles}</style>
      </section>

      {InnerForm}
    </Dialog.Content>
  )
}

export default SetPassword

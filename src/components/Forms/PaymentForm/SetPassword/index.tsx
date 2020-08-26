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
  useStep,
} from '~/components'
import { useMutation } from '~/components/GQL'

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

const SetPassword: React.FC<FormProps> = ({ submitCallback }) => {
  const [setPassword] = useMutation<SetPaymentPassword>(SET_PAYMENT_PASSWORD)
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

      return _pickBy({
        password: isInPassword && passwordError,
        comparedPassword: isInComparedPassword && comparedPasswordError,
      })
    },
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
    <Form onSubmit={handleSubmit} noBackground>
      {isInPassword && (
        <Form.PinInput
          length={6}
          name="password"
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
            />
            <br />
            <Translate
              zh_hant="在储值前請先設置交易密碼"
              zh_hans="在储值前请先设置交易密码"
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

export default SetPassword

import { ApolloError } from '@apollo/client'
import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _pickBy from 'lodash/pickBy'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'

import { PAYMENT_PASSSWORD_LENGTH } from '~/common/enums'
import {
  parseFormSubmitErrors,
  validateComparedPassword,
  validatePaymentPassword,
} from '~/common/utils'
import { Form, useMutation } from '~/components'
import { SetPaymentPasswordMutation } from '~/gql/graphql'

interface FormProps {
  submitCallback?: () => void
  step: 'password' | 'comparedPassword'
  forward: (step: 'password' | 'comparedPassword') => void
  header?: React.ReactNode
  loading?: React.ReactNode
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

export const SetPaymentPasswordForm: React.FC<FormProps> = ({
  submitCallback,
  loading,
  step,
  forward,
  header,
}) => {
  const intl = useIntl()

  const [setPassword] = useMutation<SetPaymentPasswordMutation>(
    SET_PAYMENT_PASSWORD,
    undefined,
    { showToast: false }
  )

  const isInPassword = step === 'password'
  const isInComparedPassword = step === 'comparedPassword'

  const {
    values,
    errors,
    isSubmitting,
    handleSubmit,
    setFieldValue,
    touched,
    setTouched,
  } = useFormik<FormValues>({
    initialValues: {
      password: '',
      comparedPassword: '',
    },
    validateOnBlur: false,
    validateOnChange: true,
    validate: ({ password, comparedPassword }) => {
      const passwordError = validatePaymentPassword(password, intl)
      const comparedPasswordError = validateComparedPassword(
        password,
        comparedPassword,
        intl
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
        if (submitCallback) {
          submitCallback()
        }
      } catch (error) {
        setSubmitting(false)

        const [messages, codes] = parseFormSubmitErrors(error as ApolloError)
        setFieldError('password', intl.formatMessage(messages[codes[0]]))
        setFieldValue('comparedPassword', '', false)
      }
    },
  })

  useEffect(() => {
    // submit on validate
    if (
      values.password.length === PAYMENT_PASSSWORD_LENGTH &&
      values.comparedPassword.length === PAYMENT_PASSSWORD_LENGTH
    ) {
      handleSubmit()
    }
  }, [values.password, values.comparedPassword])

  if (isSubmitting && !!loading) {
    return <>{loading}</>
  }

  return (
    <>
      {header}
      <Form onSubmit={handleSubmit}>
        {isInPassword && (
          <Form.PinInput
            length={PAYMENT_PASSSWORD_LENGTH}
            name="password"
            value={values.password}
            error={touched.password && errors.password}
            hintAlign="center"
            onChange={(value) => {
              const shouldValidate = value.length === PAYMENT_PASSSWORD_LENGTH
              setTouched({ password: true }, shouldValidate)
              setFieldValue('password', value, shouldValidate)
            }}
          />
        )}
        {isInComparedPassword && (
          <Form.PinInput
            length={PAYMENT_PASSSWORD_LENGTH}
            name="compared-password"
            value={values.comparedPassword}
            error={touched.comparedPassword && errors.comparedPassword}
            onChange={(value) => {
              const shouldValidate = value.length === PAYMENT_PASSSWORD_LENGTH
              setTouched({ comparedPassword: true }, shouldValidate)
              setFieldValue('comparedPassword', value, shouldValidate)
            }}
            hintAlign="center"
          />
        )}
      </Form>
    </>
  )
}

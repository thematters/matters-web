import { ApolloError } from '@apollo/client'
import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _pickBy from 'lodash/pickBy'
import { useEffect } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { PAYMENT_PASSSWORD_LENGTH } from '~/common/enums'
import {
  parseFormSubmitErrors,
  validateComparedPassword,
  validatePaymentPassword,
} from '~/common/utils'
import { Dialog, Form, SpinnerBlock, useMutation, useStep } from '~/components'
import { ResetPaymentPasswordMutation } from '~/gql/graphql'

interface FormProps {
  codeId: string
  submitCallback: () => void
  closeDialog?: () => void
  back?: () => void
}

interface FormValues {
  password: string
  comparedPassword: string
}

export const RESET_PAYMENT_PASSWORD = gql`
  mutation ResetPaymentPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input)
  }
`

const Confirm: React.FC<FormProps> = ({
  codeId,
  submitCallback,
  closeDialog,
  back,
}) => {
  const intl = useIntl()
  const [reset] = useMutation<ResetPaymentPasswordMutation>(
    RESET_PAYMENT_PASSWORD,
    undefined,
    { showToast: false }
  )
  const { currStep, forward } = useStep<'password' | 'comparedPassword'>(
    'password'
  )
  const isInPassword = currStep === 'password'
  const isInComparedPassword = currStep === 'comparedPassword'

  const {
    values,
    errors,
    touched,
    setFieldValue,
    setTouched,
    handleSubmit,
    isSubmitting,
  } = useFormik<FormValues>({
    initialValues: {
      password: '',
      comparedPassword: '',
    },
    validateOnBlur: false,
    validateOnChange: false,
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
        await reset({
          variables: { input: { password, codeId, type: 'payment' } },
        })

        setSubmitting(false)
        submitCallback()
      } catch (error) {
        setSubmitting(false)

        const [messages, codes] = parseFormSubmitErrors(error as ApolloError)
        setFieldError('password', intl.formatMessage(messages[codes[0]]))
        setFieldValue('comparedPassword', '', false)
      }
    },
  })

  const InnerForm = (
    <Form onSubmit={handleSubmit}>
      {isInPassword && (
        <Form.PinInput
          label={
            <FormattedMessage
              defaultMessage="Please enter new transaction password"
              description="src/components/Forms/PaymentForm/ResetPassword/Confirm.tsx"
              id="kvUs/6"
            />
          }
          hasLabel
          name="password"
          value={values.password}
          error={touched.password && errors.password}
          length={PAYMENT_PASSSWORD_LENGTH}
          onChange={(value) => {
            const shouldValidate = value.length === PAYMENT_PASSSWORD_LENGTH
            setTouched({ password: true }, shouldValidate)
            setFieldValue('password', value, shouldValidate)
          }}
        />
      )}
      {isInComparedPassword && (
        <Form.PinInput
          label={
            <FormattedMessage
              defaultMessage="Please enter new transaction password again"
              description="src/components/Forms/PaymentForm/ResetPassword/Confirm.tsx"
              id="6KmKvZ"
            />
          }
          hasLabel
          name="compared-password"
          hintAlign="center"
          value={values.comparedPassword}
          error={touched.comparedPassword && errors.comparedPassword}
          length={PAYMENT_PASSSWORD_LENGTH}
          onChange={(value) => {
            const shouldValidate = value.length === PAYMENT_PASSSWORD_LENGTH
            setTouched({ comparedPassword: true }, shouldValidate)
            setFieldValue('comparedPassword', value, shouldValidate)
          }}
        />
      )}
    </Form>
  )

  useEffect(() => {
    // submit on validate
    if (
      values.password.length === PAYMENT_PASSSWORD_LENGTH &&
      values.comparedPassword.length === PAYMENT_PASSSWORD_LENGTH
    ) {
      handleSubmit()
    }
  }, [values.password, values.comparedPassword])

  if (isSubmitting) {
    return (
      <Dialog.Content>
        <SpinnerBlock />
      </Dialog.Content>
    )
  }

  return (
    <>
      <Dialog.Header
        title={
          <FormattedMessage
            defaultMessage="Reset Payment Password"
            id="+OStJM"
          />
        }
        closeDialog={closeDialog}
        leftBtn={
          back ? (
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Back" id="cyR7Kh" />}
              onClick={back}
            />
          ) : undefined
        }
      />

      <Dialog.Content>{InnerForm}</Dialog.Content>

      <Dialog.Footer
        smUpBtns={
          <Dialog.TextButton
            text={<FormattedMessage defaultMessage="Cancel" id="47FYwb" />}
            color="greyDarker"
            onClick={closeDialog}
          />
        }
      />
    </>
  )
}

export default Confirm

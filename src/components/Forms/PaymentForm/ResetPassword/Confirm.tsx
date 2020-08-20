import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _pickBy from 'lodash/pickBy'
import { useContext, useEffect } from 'react'

import { Dialog, Form, LanguageContext, Spinner, Translate } from '~/components'
import { useMutation } from '~/components/GQL'

import {
  parseFormSubmitErrors,
  validateComparedPassword,
  validatePaymentPassword,
} from '~/common/utils'

import { ResetPaymentPassword } from './__generated__/ResetPaymentPassword'

interface FormProps {
  codeId: string
  submitCallback: () => void
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

const Confirm: React.FC<FormProps> = ({ codeId, submitCallback }) => {
  const [reset] = useMutation<ResetPaymentPassword>(RESET_PAYMENT_PASSWORD)
  const { lang } = useContext(LanguageContext)

  const {
    values,
    errors,
    touched,
    setFieldValue,
    setTouched,
    handleSubmit,
    isSubmitting,
    isValid,
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

      return _pickBy({
        password: passwordError,
        comparedPassword: comparedPasswordError,
      })
    },
    onSubmit: async ({ password }, { setFieldError, setSubmitting }) => {
      try {
        await reset({
          variables: { input: { password, codeId, type: 'payment' } },
        })

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
      <Form.PinInput
        length={6}
        label={<Translate id="hintPaymentPassword" />}
        name="password"
        error={touched.password && errors.password}
        onChange={(value) => {
          const shouldValidate = value.length === 6
          setTouched({ password: true }, shouldValidate)
          setFieldValue('password', value, shouldValidate)
        }}
      />

      <Form.PinInput
        length={6}
        label={<Translate id="enterPaymentPasswordAgain" />}
        name="compared-password"
        error={touched.comparedPassword && errors.comparedPassword}
        onChange={(value) => {
          const shouldValidate = value.length === 6
          setTouched({ comparedPassword: true }, shouldValidate)
          setFieldValue('comparedPassword', value, shouldValidate)
        }}
        autoFocus={false}
      />
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

  return <Dialog.Content hasGrow>{InnerForm}</Dialog.Content>
}

export default Confirm

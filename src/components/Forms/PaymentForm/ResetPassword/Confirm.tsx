import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _pickBy from 'lodash/pickBy'
import { useContext } from 'react'

import { Dialog, Form, LanguageContext, Translate } from '~/components'
import { useMutation } from '~/components/GQL'

import {
  parseFormSubmitErrors,
  translate,
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
  const formId = 'payment-password-change-confirm-form'

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    isValid,
  } = useFormik<FormValues>({
    initialValues: {
      password: '',
      comparedPassword: '',
    },
    validate: ({ password, comparedPassword }) =>
      _pickBy({
        password: validatePaymentPassword(password, lang),
        comparedPassword: validateComparedPassword(
          password,
          comparedPassword,
          lang
        ),
      }),
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
    <Form id={formId} onSubmit={handleSubmit}>
      <Form.PinInput
        label={<Translate id="newPassword" />}
        type="password"
        name="password"
        required
        placeholder={translate({ id: 'enterNewPassword', lang })}
        value={values.password}
        error={touched.password && errors.password}
        onBlur={handleBlur}
        onChange={handleChange}
        autoFocus
      />

      <Form.PinInput
        label={<Translate id="newPassword" />}
        type="password"
        name="comparedPassword"
        required
        placeholder={translate({ id: 'enterNewPasswordAgain', lang })}
        value={values.comparedPassword}
        error={touched.comparedPassword && errors.comparedPassword}
        hint={<Translate id="hintPaymentPassword" />}
        onBlur={handleBlur}
        onChange={handleChange}
      />
    </Form>
  )

  return (
    <>
      <Dialog.Content hasGrow>{InnerForm}</Dialog.Content>

      <Dialog.Footer>
        <Dialog.Footer.Button
          type="submit"
          form={formId}
          disabled={!isValid || isSubmitting}
          bgColor="green"
          textColor="white"
          loading={isSubmitting}
        >
          <Translate id="confirm" />
        </Dialog.Footer.Button>
      </Dialog.Footer>
    </>
  )
}

export default Confirm

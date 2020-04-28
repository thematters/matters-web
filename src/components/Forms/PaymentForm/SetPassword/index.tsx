import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _pickBy from 'lodash/pickBy'
import React, { useContext } from 'react'

import { Dialog, Form, LanguageContext, Translate } from '~/components'
import { useMutation } from '~/components/GQL'

import {
  parseFormSubmitErrors,
  translate,
  validatePaymentPassword,
} from '~/common/utils'

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
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    isValid,
  } = useFormik<FormValues>({
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
        label={<Translate id="paymentPassword" />}
        type="text"
        name="password"
        required
        placeholder={translate({
          id: 'enterPassword',
          lang,
        })}
        hint={<Translate id="hintPaymentPassword" />}
        value={values.password}
        error={touched.password && errors.password}
        onBlur={handleBlur}
        onChange={handleChange}
        autoFocus
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

export default SetPassword

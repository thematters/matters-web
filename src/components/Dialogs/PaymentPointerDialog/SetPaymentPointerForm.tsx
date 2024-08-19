import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _pickBy from 'lodash/pickBy'
import { useContext, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { parseFormSubmitErrors, validatePaymentPointer } from '~/common/utils'
import { Dialog, Form, toast, ViewerContext } from '~/components'
import { useMutation } from '~/components/GQL'
import { UpdatePaymentPointerMutation } from '~/gql/graphql'

import Explainer from './Explainer'

interface FormProps {
  setIsSubmitting: (submitting: boolean) => void
  setIsValid: (valid: boolean) => void
  closeDialog: () => void
  formId?: string
}

interface FormValues {
  paymentPointer: string
}

const UPDATE_PAYMENT_POINTER = gql`
  mutation UpdatePaymentPointer($input: UpdateUserInfoInput!) {
    updateUserInfo(input: $input) {
      paymentPointer
    }
  }
`

const SetPaymentPointerForm: React.FC<FormProps> = ({
  setIsValid,
  setIsSubmitting,
  closeDialog,
  formId = `set-payment-pointer-form`,
}) => {
  const intl = useIntl()
  const [submitPaymentPointer] = useMutation<UpdatePaymentPointerMutation>(
    UPDATE_PAYMENT_POINTER
  )
  const viewer = useContext(ViewerContext)

  const [defaultPaymentPointer, setDefaultPaymentPointer] = useState(
    viewer.paymentPointer || ''
  )

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isValid,
  } = useFormik<FormValues>({
    initialValues: {
      paymentPointer: defaultPaymentPointer,
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: ({ paymentPointer }) =>
      _pickBy({
        paymentPointer: validatePaymentPointer(paymentPointer, intl),
      }),
    onSubmit: async ({ paymentPointer }, { setFieldError }) => {
      try {
        setIsSubmitting(true)
        await submitPaymentPointer({
          variables: { input: { paymentPointer } },
        })

        toast.success({
          message: (
            <FormattedMessage
              defaultMessage="Payment pointer updated"
              id="WrQjnc"
            />
          ),
        })

        setDefaultPaymentPointer(paymentPointer)
        setIsSubmitting(false)
        closeDialog()
      } catch (error) {
        setIsSubmitting(false)

        const [messages, codes] = parseFormSubmitErrors(error as any)
        codes.forEach((code) => {
          setFieldError('paymentPointer', intl.formatMessage(messages[code]))
        })
      }
    },
  })

  const updateValidity = () =>
    setIsValid(isValid && values.paymentPointer !== defaultPaymentPointer)

  return (
    <Dialog.Content>
      <Dialog.Content.Message align="left" smUpAlign="left">
        <Explainer />

        <Form id={formId} onSubmit={handleSubmit}>
          <Form.Input
            type="text"
            name="paymentPointer"
            required
            placeholder={intl.formatMessage({
              defaultMessage: 'Enter Payment Pointer',
              id: 'p6D+Uc',
            })}
            value={values.paymentPointer}
            error={touched.paymentPointer && errors.paymentPointer}
            onBlur={handleBlur}
            onChange={(e) => {
              handleChange(e)
              updateValidity()
            }}
            spacingTop="base"
          />
        </Form>
      </Dialog.Content.Message>
    </Dialog.Content>
  )
}

export default SetPaymentPointerForm

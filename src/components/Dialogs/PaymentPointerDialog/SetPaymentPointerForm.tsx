import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _pickBy from 'lodash/pickBy'
import { useContext, useState } from 'react'

import {
  Dialog,
  Form,
  LanguageContext,
  Translate,
  ViewerContext,
} from '~/components'
import { useMutation } from '~/components/GQL'

import {
  parseFormSubmitErrors,
  translate,
  validatePaymentPointer,
} from '~/common/utils'

import { ADD_TOAST } from '@/src/common/enums'

import Explainer from './Explainer'

import { UpdatePaymentPointer } from './__generated__/UpdatePaymentPointer'

interface FormProps {
  setIsSubmitting: (submitting: boolean) => void
  setIsValid: (valid: boolean) => void
  close: () => void
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
  close,
  formId = `set-payment-pointer-form`,
}) => {
  const [submitPaymentPointer] = useMutation<UpdatePaymentPointer>(
    UPDATE_PAYMENT_POINTER
  )
  const { lang } = useContext(LanguageContext)
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
    validate: ({ paymentPointer }) =>
      _pickBy({
        paymentPointer: validatePaymentPointer(paymentPointer, lang),
      }),
    onSubmit: async ({ paymentPointer }, { setFieldError }) => {
      try {
        setIsSubmitting(true)
        await submitPaymentPointer({
          variables: { input: { paymentPointer } },
        })

        window.dispatchEvent(
          new CustomEvent(ADD_TOAST, {
            detail: {
              color: 'green',
              content: (
                <Translate zh_hant="收款地址已更新" zh_hans="收款地址已更新" />
              ),
            },
          })
        )

        setDefaultPaymentPointer(paymentPointer)
        setIsSubmitting(false)
        close()
      } catch (error) {
        setIsSubmitting(false)

        const [messages, codes] = parseFormSubmitErrors(error, lang)
        codes.forEach((c) => {
          setFieldError('paymentPointer', messages[c])
        })
      }
    },
  })

  const updateValidity = () =>
    setIsValid(isValid && values.paymentPointer !== defaultPaymentPointer)

  return (
    <Dialog.Content hasGrow>
      <Form id={formId} onSubmit={handleSubmit}>
        <Form.Input
          label={<Explainer />}
          type="text"
          name="paymentPointer"
          required
          placeholder={translate({
            id: 'enterPaymentPointer',
            lang,
          })}
          value={values.paymentPointer}
          error={touched.paymentPointer && errors.paymentPointer}
          onBlur={handleBlur}
          onChange={(e) => {
            handleChange(e)
            updateValidity()
          }}
          autoFocus
        />
      </Form>
    </Dialog.Content>
  )
}

export default SetPaymentPointerForm

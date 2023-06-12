import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _pickBy from 'lodash/pickBy'
import { useContext, useState } from 'react'

import { ADD_TOAST } from '~/common/enums'
import {
  parseFormSubmitErrors,
  translate,
  validatePaymentPointer,
} from '~/common/utils'
import {
  Dialog,
  Form,
  LanguageContext,
  Translate,
  ViewerContext,
} from '~/components'
import { useMutation } from '~/components/GQL'
import { UpdatePaymentPointerMutation } from '~/gql/graphql'

import Explainer from './Explainer'
import styles from './styles.module.css'

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
  const [submitPaymentPointer] = useMutation<UpdatePaymentPointerMutation>(
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
    validateOnBlur: false,
    validateOnChange: false,
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
        closeDialog()
      } catch (error) {
        setIsSubmitting(false)

        const [messages, codes] = parseFormSubmitErrors(error as any, lang)
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
      <section className={styles.container}>
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
          />
        </Form>
      </section>
    </Dialog.Content>
  )
}

export default SetPaymentPointerForm

import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _pickBy from 'lodash/pickBy'
import { useContext } from 'react'

import { Dialog, Form, LanguageContext, Translate } from '~/components'
import { useMutation } from '~/components/GQL'

import {
  analytics,
  calcStripeFee,
  parseFormSubmitErrors,
  validateAmount,
} from '~/common/utils'

import { AddCredit } from './__generated__/AddCredit'

interface FormProps {
  submitCallback: () => void
  closeDialog: () => void
  defaultAmount?: number
}

interface FormValues {
  amount: number
}

export const ADD_CREDIT = gql`
  mutation AddCredit($input: AddCreditInput!) {
    addCredit(input: $input) {
      transaction {

      }
client_secret
    }
  }
`

const Confirm: React.FC<FormProps> = ({
  submitCallback,
  closeDialog,
  defaultAmount,
}) => {
  const [addCredit] = useMutation<AddCredit>(ADD_CREDIT)
  const { lang } = useContext(LanguageContext)

  const formId = 'add-credit-form'

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isValid,
    isSubmitting,
  } = useFormik<FormValues>({
    initialValues: {
      amount: defaultAmount || 0,
    },
    validate: ({ amount }) =>
      _pickBy({
        amount: validateAmount(amount, lang),
      }),
    onSubmit: async ({ amount }, { setFieldError, setSubmitting }) => {
      try {
        await addCredit({ variables: { input: { amount } } })

        if (submitCallback) {
          submitCallback()
        }
      } catch (error) {
        const [messages, codes] = parseFormSubmitErrors(error, lang)
        codes.forEach((code) => {
          setFieldError('amount', messages[code])
        })
      }

      setSubmitting(false)
    },
  })

  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit}>
      <Form.Input
        label={<Translate id="paymentAmount" />}
        type="number"
        name="amount"
        required
        value={values.amount}
        error={touched.amount && errors.amount}
        onBlur={handleBlur}
        onChange={handleChange}
        autoFocus
      />
    </Form>
  )

  const SubmitButton = (
    <Dialog.Header.RightButton
      type="submit"
      form={formId}
      disabled={!isValid || isSubmitting}
      text={<Translate id="nextStep" />}
      loading={isSubmitting}
    />
  )

  return (
    <>
      {closeDialog && (
        <Dialog.Header
          title="topUp"
          close={closeDialog}
          rightButton={SubmitButton}
        />
      )}

      <Dialog.Content spacing={[0, 0]} hasGrow>
        {InnerForm}
      </Dialog.Content>
    </>
  )
}

export default Confirm

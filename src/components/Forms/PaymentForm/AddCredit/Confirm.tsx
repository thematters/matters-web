import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _pickBy from 'lodash/pickBy'
import { useContext, useRef } from 'react'

import { Dialog, Form, LanguageContext, Translate } from '~/components'
import { useMutation } from '~/components/GQL'

import {
  PAYMENT_MAXIMUM_CHARGE_AMOUNT,
  PAYMENT_MINIMAL_CHARGE_AMOUNT,
  PAYMENT_CURRENCY,
  PLATFORM_FEE,
} from '~/common/enums'
import {
  calcStripeFee,
  numRound,
  parseFormSubmitErrors,
  toAmountString,
  validateAmount,
} from '~/common/utils'

import ConfirmTable from '../ConfirmTable'

import {
  AddCredit,
  AddCredit_addCredit_transaction,
} from './__generated__/AddCredit'

interface FormProps {
  submitCallback: ({
    transaction,
    client_secret,
  }: {
    transaction: AddCredit_addCredit_transaction
    client_secret: string
  }) => void
  defaultAmount?: number
}

interface FormValues {
  amount: number
}

export const ADD_CREDIT = gql`
  mutation AddCredit($input: AddCreditInput!) {
    addCredit(input: $input) {
      transaction {
        id
        amount
        fee
        currency
      }
      client_secret
    }
  }
`

const Confirm: React.FC<FormProps> = ({ submitCallback, defaultAmount }) => {
  const inputRef: React.RefObject<any> | null = useRef(null)
  const [addCredit] = useMutation<AddCredit>(ADD_CREDIT)
  const { lang } = useContext(LanguageContext)
  const formId = 'add-credit-confirm-form'
  const currency = PAYMENT_CURRENCY.HKD

  const {
    values,
    errors,
    touched,
    handleBlur,
    setFieldValue,
    handleSubmit,
    isValid,
    isSubmitting,
  } = useFormik<FormValues>({
    initialValues: {
      amount: defaultAmount || PAYMENT_MINIMAL_CHARGE_AMOUNT[currency],
    },
    validate: ({ amount }) =>
      _pickBy({
        amount: validateAmount(amount, lang),
      }),
    onSubmit: async ({ amount }, { setFieldError, setSubmitting }) => {
      try {
        const { data } = await addCredit({ variables: { input: { amount } } })

        if (!data?.addCredit) {
          throw new Error()
        }

        submitCallback({
          transaction: data?.addCredit.transaction,
          client_secret: data?.addCredit.client_secret,
        })
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
    <Form id={formId} onSubmit={handleSubmit} noBackground>
      <Form.AmountInput
        fixedPlaceholder={currency}
        label={<Translate zh_hant="輸入金額" zh_hans="输入金额" />}
        name="amount"
        min={0}
        max={PAYMENT_MAXIMUM_CHARGE_AMOUNT[currency]}
        step="1"
        ref={inputRef}
        required
        value={values.amount}
        error={touched.amount && errors.amount}
        onBlur={handleBlur}
        onChange={(e) => {
          const amount = e.target.valueAsNumber || 0
          const sanitizedAmount = Math.min(
            Math.floor(amount),
            PAYMENT_MAXIMUM_CHARGE_AMOUNT[currency]
          )

          /// remove extra left pad 0
          if (inputRef.current) {
            inputRef.current.value = sanitizedAmount
          }

          setFieldValue('amount', sanitizedAmount)
        }}
        autoFocus
      />
    </Form>
  )

  const fee = calcStripeFee(values.amount)
  const total = numRound(fee + values.amount)

  return (
    <>
      <Dialog.Content hasGrow>
        <section>
          {InnerForm}

          <ConfirmTable>
            <ConfirmTable.Row>
              <ConfirmTable.Col>
                <Translate zh_hant="進帳金額" zh_hans="进帐金额" />
              </ConfirmTable.Col>

              <ConfirmTable.Col>
                {currency} {toAmountString(values.amount)}
              </ConfirmTable.Col>
            </ConfirmTable.Row>

            <ConfirmTable.Row>
              <ConfirmTable.Col>
                <Translate zh_hant="Stripe 手續費" zh_hans="Stripe 手续费" />（
                {PLATFORM_FEE[currency]}）
              </ConfirmTable.Col>

              <ConfirmTable.Col>
                + {currency} {toAmountString(fee)}
              </ConfirmTable.Col>
            </ConfirmTable.Row>

            <ConfirmTable.Row total>
              <ConfirmTable.Col>
                <Translate zh_hant="充值確認" zh_hans="充值确认" />
              </ConfirmTable.Col>

              <ConfirmTable.Col>
                {currency} {toAmountString(total)}
              </ConfirmTable.Col>
            </ConfirmTable.Row>
          </ConfirmTable>
        </section>
      </Dialog.Content>

      <Dialog.Footer>
        <Dialog.Footer.Button
          type="submit"
          form={formId}
          disabled={!isValid || isSubmitting}
          bgColor="green"
          textColor="white"
          loading={isSubmitting}
        >
          <Translate id="nextStep" />
        </Dialog.Footer.Button>
      </Dialog.Footer>
    </>
  )
}

export default Confirm

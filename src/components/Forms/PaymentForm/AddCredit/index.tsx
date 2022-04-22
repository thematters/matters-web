import { useQuery } from '@apollo/react-hooks'
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'
import { loadStripe, StripeCardElementChangeEvent } from '@stripe/stripe-js'
import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _get from 'lodash/get'
import _pickBy from 'lodash/pickBy'
import { useContext, useRef, useState } from 'react'

import {
  CurrencyAmount,
  Dialog,
  Form,
  LanguageContext,
  Translate,
  useMutation,
} from '~/components'
import WALLET_BALANCE from '~/components/GQL/queries/walletBalance'

import {
  PAYMENT_CURRENCY,
  PAYMENT_DEFAULT_ADD_CREDIT_AMOUNT,
  PAYMENT_MAXIMUM_ADD_CREDIT_AMOUNT,
  STRIPE_ERROR_MESSAGES,
} from '~/common/enums'
import {
  analytics,
  formatAmount,
  parseFormSubmitErrors,
  translate,
  validateAmount,
} from '~/common/utils'

import ConfirmTable from '../ConfirmTable'
import StripeCheckout from '../StripeCheckout'

import { WalletBalance } from '~/components/GQL/queries/__generated__/WalletBalance'
import { AddCredit as AddCreditType } from './__generated__/AddCredit'

interface FormProps {
  defaultAmount?: number
  callbackButtons?: React.ReactNode
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

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || ''
)

const BaseAddCredit: React.FC<FormProps> = ({
  defaultAmount,
  callbackButtons,
}) => {
  const stripe = useStripe()
  const elements = useElements()
  const { lang } = useContext(LanguageContext)
  const [addCredit] = useMutation<AddCreditType>(ADD_CREDIT, undefined, {
    showToast: false,
  })

  const { data: balanceData } = useQuery<WalletBalance>(WALLET_BALANCE, {
    fetchPolicy: 'network-only',
  })
  const balance = balanceData?.viewer?.wallet.balance.HKD || 0

  const [disabled, setDisabled] = useState(true)
  const [completed, setCompleted] = useState(false)
  const [checkoutError, setCheckoutError] = useState('')
  const onCheckoutChange = (event: StripeCardElementChangeEvent) => {
    setDisabled(!event.complete)

    if (event.error) {
      const msg =
        lang === 'en'
          ? undefined
          : _get(STRIPE_ERROR_MESSAGES[lang], event.error.code)

      setCheckoutError(msg || event.error.message)
    } else if (event.empty) {
      setCheckoutError(translate({ lang, id: 'required' }))
    } else {
      setCheckoutError('')
    }
  }

  const formId = 'add-credit-form'
  const currency = PAYMENT_CURRENCY.HKD
  const inputRef: React.RefObject<any> | null = useRef(null)

  const {
    values,
    errors,
    touched,
    handleBlur,
    setFieldValue,
    setFieldError,
    handleSubmit,
    isValid,
    isSubmitting,
  } = useFormik<FormValues>({
    initialValues: {
      amount: defaultAmount || PAYMENT_DEFAULT_ADD_CREDIT_AMOUNT[currency],
    },
    validate: ({ amount }) =>
      _pickBy({
        amount: validateAmount(amount, lang),
      }),
    onSubmit: async ({ amount }, { setSubmitting }) => {
      /**
       * Create Transaction
       */
      let data: AddCreditType | undefined

      try {
        const txResult = await addCredit({ variables: { input: { amount } } })
        data = txResult.data
      } catch (error) {
        const [messages, codes] = parseFormSubmitErrors(error, lang)
        codes.forEach((code) => {
          setFieldError('amount', messages[code])
        })
      }

      /**
       * Checkout
       */
      const client_secret = data?.addCredit.client_secret

      if (!stripe || !elements || !client_secret) {
        setSubmitting(false)
        return
      }

      const cardElement = elements.getElement(CardElement)

      if (!cardElement) {
        setSubmitting(false)
        return
      }

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: { card: cardElement },
      })

      if (result.error) {
        const msg =
          lang === 'en'
            ? undefined
            : _get(STRIPE_ERROR_MESSAGES[lang], result.error.code || '')

        setCheckoutError(msg || result.error.message)

        analytics.trackEvent('purchase', {
          amount,
          success: false,
          message: JSON.stringify(result.error),
        })

        import('@sentry/browser').then((Sentry) => {
          Sentry.captureException(result.error)
        })
      } else {
        if (result.paymentIntent?.status === 'succeeded') {
          analytics.trackEvent('purchase', { amount, success: true })
        }
        setCompleted(true)
      }

      setSubmitting(false)
    },
  })

  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit} noBackground>
      <Form.AmountInput
        currency={currency}
        label={
          <Translate zh_hant="輸入金額" zh_hans="输入金额" en="Enter amount" />
        }
        name="amount"
        min={0}
        max={PAYMENT_MAXIMUM_ADD_CREDIT_AMOUNT[currency]}
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
            PAYMENT_MAXIMUM_ADD_CREDIT_AMOUNT[currency]
          )

          // remove extra left pad 0
          if (inputRef.current) {
            inputRef.current.value = sanitizedAmount
          }
          setFieldValue('amount', sanitizedAmount)
        }}
        autoFocus
      />
    </Form>
  )

  // const fee = calcStripeFee(values.amount)
  // const total = numRound(fee + values.amount)
  // const total = numRound(values.amount)

  if (completed) {
    return (
      <>
        <Dialog.Message spacing="xxl">
          <h3>
            <Translate id="successTopUp" />
          </h3>
          <p>
            <Translate
              zh_hant="創作者們望眼欲穿，快去送上支持吧"
              zh_hans="创作者们望眼欲穿，快去送上支持吧"
              en="Creators need your support! Go support creators you like"
            />
          </p>
          <br />
          <CurrencyAmount amount={values.amount} currency={currency} />
        </Dialog.Message>

        {callbackButtons && <Dialog.Footer>{callbackButtons}</Dialog.Footer>}
      </>
    )
  }

  return (
    <>
      <Dialog.Content hasGrow>
        <section>
          <ConfirmTable>
            <ConfirmTable.Row type="balance">
              <ConfirmTable.Col>
                <Translate id="walletBalance" />
              </ConfirmTable.Col>

              <ConfirmTable.Col>
                {currency} {formatAmount(balance)}
              </ConfirmTable.Col>
            </ConfirmTable.Row>
          </ConfirmTable>

          {InnerForm}

          <StripeCheckout error={checkoutError} onChange={onCheckoutChange} />
        </section>
      </Dialog.Content>

      <Dialog.Footer>
        <Dialog.Footer.Button
          type="submit"
          form={formId}
          disabled={disabled || !isValid || isSubmitting || !!checkoutError}
          loading={isSubmitting}
        >
          <Translate zh_hant="確認儲值" zh_hans="确认储值" en="Confirm" />
        </Dialog.Footer.Button>
      </Dialog.Footer>
    </>
  )
}

const AddCreditForm: React.FC<FormProps> = (props) => {
  const { lang } = useContext(LanguageContext)

  return (
    <Elements
      stripe={stripePromise}
      options={{ locale: lang === 'zh_hans' ? 'zh' : 'en' }}
    >
      <BaseAddCredit {...props} />
    </Elements>
  )
}

export default AddCreditForm

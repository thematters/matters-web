import { ApolloError, useQuery } from '@apollo/client'
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'
import type { StripeCardElementChangeEvent } from '@stripe/stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _get from 'lodash/get'
import _pickBy from 'lodash/pickBy'
import { useContext, useId, useRef, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import {
  PAYMENT_CURRENCY,
  PAYMENT_DEFAULT_ADD_CREDIT_AMOUNT,
  PAYMENT_MAXIMUM_ADD_CREDIT_AMOUNT,
  STRIPE_ERROR_MESSAGES,
} from '~/common/enums'
import {
  analytics,
  parseFormSubmitErrors,
  validateAmount,
} from '~/common/utils'
import {
  Balance,
  Dialog,
  Form,
  LanguageContext,
  Spacer,
  toast,
  Translate,
  useMutation,
} from '~/components'
import WALLET_BALANCE from '~/components/GQL/queries/walletBalance'
import {
  AddCreditMutation,
  UserLanguage,
  WalletBalanceQuery,
} from '~/gql/graphql'

import ConfirmTable from '../ConfirmTable'
import { CurrencyAmount } from '../CurrencyAmount'
import StripeCheckout from '../StripeCheckout'
import styles from './styles.module.css'

interface FormProps {
  defaultAmount?: number
  callback?: () => void
  callbackText?: React.ReactNode
  closeDialog?: () => void
  isInDialog?: boolean
  switchToSetAmount?: () => void
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
  callback,
  callbackText,
  closeDialog,
  isInDialog,
  switchToSetAmount,
}) => {
  const intl = useIntl()
  const stripe = useStripe()
  const elements = useElements()
  const { lang } = useContext(LanguageContext)
  const [addCredit] = useMutation<AddCreditMutation>(ADD_CREDIT, undefined, {
    showToast: false,
  })

  const { data: balanceData } = useQuery<WalletBalanceQuery>(WALLET_BALANCE, {
    fetchPolicy: 'network-only',
  })
  const balance = balanceData?.viewer?.wallet.balance.HKD || 0

  const [disabled, setDisabled] = useState(true)
  const [waiting, setWaiting] = useState(false)
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
      setCheckoutError(
        intl.formatMessage({ defaultMessage: 'Required', id: 'Seanpx' })
      )
    } else {
      setCheckoutError('')
    }
  }

  const formId = useId()
  const currency = PAYMENT_CURRENCY.HKD
  const inputRef: React.RefObject<HTMLInputElement> | null = useRef(null)

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
    validateOnBlur: false,
    validateOnChange: true,
    validate: ({ amount }) =>
      _pickBy({
        amount: validateAmount(amount, intl),
      }),
    onSubmit: async ({ amount }, { setSubmitting }) => {
      /**
       * Create Transaction
       */
      let data: AddCreditMutation | null | undefined

      try {
        const txResult = await addCredit({ variables: { input: { amount } } })
        data = txResult.data
      } catch (error) {
        const [messages, codes] = parseFormSubmitErrors(error as ApolloError)
        codes.forEach((code) => {
          setFieldError('amount', intl.formatMessage(messages[code]))
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
      } else {
        if (result.paymentIntent?.status === 'succeeded') {
          analytics.trackEvent('purchase', { amount, success: true })
        }
        setCompleted(true)
        if (!isInDialog && switchToSetAmount) {
          setWaiting(true)
          // FIXME:  wait for 3 seconds to server to update the balance
          setTimeout(() => {
            toast.info({
              message: (
                <FormattedMessage
                  defaultMessage="Top-up successful"
                  id="RMV4wt"
                  description="src/components/Forms/PaymentForm/AddCredit/index.tsx"
                />
              ),
            })
            setWaiting(false)
            switchToSetAmount()
          }, 3 * 1000)
          return
        }
      }

      setSubmitting(false)
    },
  })

  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit}>
      <Form.AmountInput
        currency={currency}
        label={
          <Translate zh_hant="輸入金額" zh_hans="输入金额" en="Enter amount" />
        }
        hasLabel
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
            inputRef.current.value = sanitizedAmount.toString()
          }
          setFieldValue('amount', sanitizedAmount)
        }}
        autoFocus
        spacingBottom="loose"
      />
    </Form>
  )

  const Content = (
    <>
      <ConfirmTable>
        <ConfirmTable.Row type="balance">
          <Balance currency={currency} amount={balance} showTopUp={false} />
        </ConfirmTable.Row>
        <Spacer size="sp8" />
      </ConfirmTable>
      {InnerForm}
      <StripeCheckout error={checkoutError} onChange={onCheckoutChange} />
    </>
  )

  if (!isInDialog) {
    return (
      <section className={styles.container}>
        {Content}
        <Spacer size="sp24" />
        <Dialog.RoundedButton
          text={
            <FormattedMessage
              defaultMessage="Confirm"
              id="SYfw+k"
              description="src/components/Forms/PaymentForm/AddCredit/index.tsx"
            />
          }
          type="submit"
          color="white"
          bgColor="green"
          textWeight="normal"
          form={formId}
          disabled={
            disabled || !isValid || isSubmitting || !!checkoutError || waiting
          }
          loading={isSubmitting || waiting}
        />
        <Spacer size="sp16" />
        <Dialog.RoundedButton
          color="black"
          onClick={switchToSetAmount}
          borderColor="greyLight"
          borderWidth="sm"
          textWeight="normal"
          borderActiveColor="grey"
          text={
            <FormattedMessage
              defaultMessage="Back"
              id="QfrKA6"
              description="src/components/Forms/PaymentForm"
            />
          }
        />
      </section>
    )
  }

  if (completed) {
    return (
      <>
        <Dialog.Header
          title={
            <FormattedMessage
              defaultMessage="Topped up successfully"
              id="Eb1U+/"
            />
          }
        />

        <Dialog.Content>
          <Dialog.Content.Message align="center" smUpAlign="center">
            <p>
              <Translate
                zh_hant="創作者們望眼欲穿，快去送上支持吧"
                zh_hans="创作者们望眼欲穿，快去送上支持吧"
                en="Creators need your support! Go support creators you like"
              />
            </p>
            <br />
            <CurrencyAmount amount={values.amount} currency={currency} />
          </Dialog.Content.Message>
        </Dialog.Content>

        <Dialog.Footer
          btns={
            <Dialog.RoundedButton
              text={
                callbackText || (
                  <FormattedMessage defaultMessage="Done" id="JXdbo8" />
                )
              }
              onClick={callback || closeDialog}
            />
          }
          smUpBtns={
            callback ? (
              <Dialog.TextButton text={callbackText} onClick={callback} />
            ) : (
              <Dialog.TextButton
                text={<FormattedMessage defaultMessage="Done" id="JXdbo8" />}
                color="greyDarker"
                onClick={closeDialog}
              />
            )
          }
        />
      </>
    )
  }

  const SubmitButton = (
    <Dialog.TextButton
      text={
        <FormattedMessage
          defaultMessage="Confirm"
          id="SYfw+k"
          description="src/components/Forms/PaymentForm/AddCredit/index.tsx"
        />
      }
      type="submit"
      form={formId}
      disabled={disabled || !isValid || isSubmitting || !!checkoutError}
      loading={isSubmitting}
    />
  )

  return (
    <>
      <Dialog.Header
        title={<FormattedMessage defaultMessage="Top Up" id="dTOtPO" />}
        closeDialog={closeDialog}
        rightBtn={SubmitButton}
      />

      <Dialog.Content>{Content}</Dialog.Content>

      <Dialog.Footer
        smUpBtns={
          <>
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Cancel" id="47FYwb" />}
              color="greyDarker"
              onClick={closeDialog}
            />
            {SubmitButton}
          </>
        }
      />
    </>
  )
}

const AddCreditForm: React.FC<FormProps> = (props) => {
  const { lang } = useContext(LanguageContext)

  return (
    <Elements
      stripe={stripePromise}
      options={{ locale: lang === UserLanguage.ZhHans ? 'zh' : 'en' }}
    >
      <BaseAddCredit {...props} />
    </Elements>
  )
}

export default AddCreditForm

import { useFormik } from 'formik'
import _pickBy from 'lodash/pickBy'
import { useContext, useRef, useState } from 'react'

import {
  Dialog,
  Form,
  LanguageContext,
  Translate,
  ViewerContext,
} from '~/components'
import { useMutation } from '~/components/GQL'
import PAY_TO from '~/components/GQL/mutations/payTo'

import {
  PAYMENT_CURRENCY as CURRENCY,
  PAYMENT_MAXIMUM_PAYTO_AMOUNT,
} from '~/common/enums'
import { validateCurrency, validateDonationAmount } from '~/common/utils'

import { CustomAmount } from './CustomAmount'
import { NoLikerIdButton, NoLikerIdMessage } from './NoLiker'
import styles from './styles.css'

import { UserDonationRecipient } from '~/components/Dialogs/DonationDialog/__generated__/UserDonationRecipient'
import {
  PayTo as PayToMutate,
  PayTo_payTo_transaction as PayToTx,
} from '~/components/GQL/mutations/__generated__/PayTo'

interface SetAmountCallbackValues {
  amount: number
  currency: CURRENCY
}

interface SetAmountOpenTabCallbackValues {
  window: Window
  transaction: PayToTx
}

interface FormProps {
  close: () => void
  defaultCurrency?: CURRENCY
  openTabCallback: (values: SetAmountOpenTabCallbackValues) => void
  recipient: UserDonationRecipient
  submitCallback: (values: SetAmountCallbackValues) => void
  switchToAddCredit: () => void
  targetId: string
}

interface FormValues {
  amount: number
  currency: CURRENCY
}

const SetAmount: React.FC<FormProps> = ({
  close,
  defaultCurrency,
  openTabCallback,
  recipient,
  submitCallback,
  switchToAddCredit,
  targetId,
}) => {
  const defaultHKDAmount = 10
  const defaultLikeAmount = 166
  const formId = 'pay-to-set-amount-form'

  const viewer = useContext(ViewerContext)
  const { lang } = useContext(LanguageContext)

  const [fixed, setFixed] = useState<boolean>(true)
  const [locked, setLocked] = useState<boolean>(false)
  const [tabUrl, setTabUrl] = useState('')
  const [tx, setTx] = useState<PayToTx>()

  const [payTo] = useMutation<PayToMutate>(PAY_TO)
  const inputRef: React.RefObject<any> | null = useRef(null)

  const {
    errors,
    handleBlur,
    handleSubmit,
    isValid,
    isSubmitting,
    setFieldValue,
    touched,
    values,
  } = useFormik<FormValues>({
    initialValues: {
      amount: defaultHKDAmount,
      currency: defaultCurrency || CURRENCY.HKD,
    },
    validate: ({ amount, currency }) =>
      _pickBy({
        amount: validateDonationAmount(amount, lang),
        currency: validateCurrency(currency, lang),
      }),
    onSubmit: async ({ amount, currency }, { setSubmitting }) => {
      try {
        if (currency === CURRENCY.LIKE) {
          const result = await payTo({
            variables: {
              amount,
              currency,
              purpose: 'donation',
              recipientId: recipient.id,
              targetId,
            },
          })
          const redirectUrl = result?.data?.payTo.redirectUrl
          const transaction = result?.data?.payTo.transaction
          if (!redirectUrl || !transaction) {
            throw new Error()
          }
          setLocked(true)
          setTabUrl(redirectUrl)
          setTx(transaction)
        }
        setSubmitting(false)
        submitCallback({ amount, currency })
      } catch (error) {
        setSubmitting(false)
      }
    },
  })

  const isHKD = values.currency === CURRENCY.HKD
  const isLike = values.currency === CURRENCY.LIKE
  const canPayLike = isLike && !!viewer.liker.likerId
  const canReceiveLike = isLike && !!recipient.liker.likerId
  const canProcess = isHKD || (canPayLike && canReceiveLike)
  const color = isLike ? 'green' : 'red'
  const maxAmount = isLike ? Infinity : PAYMENT_MAXIMUM_PAYTO_AMOUNT.HKD

  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit} noBackground>
      <Form.CurrencyRadioInput
        isLike={isLike}
        name="currency"
        disabled={locked}
        value={values.currency}
        error={touched.currency && errors.currency}
        onBlur={handleBlur}
        onChange={(e) => {
          const raw = (e.target.value || '') as keyof typeof CURRENCY
          const value = CURRENCY[raw]
          const defaultAmount = fixed
            ? value === CURRENCY.LIKE
              ? defaultLikeAmount
              : defaultHKDAmount
            : 0
          if (value) {
            setFieldValue('currency', value)
            setFieldValue('amount', defaultAmount)
          }
        }}
      />

      {fixed && canProcess && (
        <Form.AmountRadioInput
          currency={values.currency}
          name="amount"
          disabled={locked}
          value={values.amount}
          error={touched.amount && errors.amount}
          onBlur={handleBlur}
          onChange={(e) => {
            const value = parseInt(e.target.value, 10) || 0
            setFieldValue('amount', value)
          }}
        />
      )}

      {!fixed && canProcess && (
        <Form.AmountInput
          autoFocus
          required
          className={isHKD ? 'red-style' : undefined}
          disabled={locked}
          fixedPlaceholder={values.currency}
          name="amount"
          min={0}
          max={maxAmount}
          value={values.amount}
          error={touched.amount && errors.amount}
          onBlur={handleBlur}
          onChange={(e) => {
            const value = e.target.valueAsNumber || 0
            const sanitizedAmount = Math.abs(
              Math.min(isHKD ? Math.floor(value) : value, maxAmount)
            )

            // remove extra left pad 0
            if (inputRef.current) {
              inputRef.current.value = sanitizedAmount
            }
            setFieldValue('amount', sanitizedAmount)
          }}
          ref={inputRef}
        />
      )}

      {canProcess && (
        <CustomAmount
          fixed={fixed}
          disabled={locked}
          textColor={color}
          onClick={() => {
            // reset default fixed amount
            if (fixed === false) {
              setFieldValue(
                'amount',
                isLike ? defaultLikeAmount : defaultHKDAmount
              )
            } else {
              setFieldValue('amount', 0)
            }
            setFixed(!fixed)
          }}
        />
      )}

      {!canProcess && (
        <section className="set-amount-no-liker-id">
          <NoLikerIdMessage
            canPayLike={canPayLike}
            canReceiveLike={canReceiveLike}
          />
        </section>
      )}
      <style jsx>{styles}</style>
    </Form>
  )

  return (
    <>
      <Dialog.Content hasGrow>
        <section>
          {InnerForm}

          <style jsx>{styles}</style>
        </section>
      </Dialog.Content>

      <Dialog.Footer>
        {canProcess && !locked && (
          <Dialog.Footer.Button
            type="submit"
            form={formId}
            disabled={!isValid || isSubmitting}
            bgColor={color}
            textColor="white"
            loading={isSubmitting}
          >
            <Translate id="nextStep" />
          </Dialog.Footer.Button>
        )}

        {canProcess && !locked && (
          <Dialog.Footer.Button
            bgColor="grey-lighter"
            textColor="black"
            onClick={switchToAddCredit}
          >
            <Translate zh_hant="先去儲值" zh_hans="先去储值" />
          </Dialog.Footer.Button>
        )}

        {!canProcess && (
          <NoLikerIdButton
            canPayLike={canPayLike}
            canReceiveLike={canReceiveLike}
            close={close}
            setFieldValue={setFieldValue}
          />
        )}

        {locked && (
          <Dialog.Footer.Button
            type="button"
            onClick={() => {
              const payWindow = window.open(tabUrl, '_blank')
              if (payWindow && tx) {
                openTabCallback({ window: payWindow, transaction: tx })
              }
            }}
          >
            <Translate
              zh_hant="前往 Liker Land 支付"
              zh_hans="前往 Liker Land 支付"
            />
          </Dialog.Footer.Button>
        )}
      </Dialog.Footer>
    </>
  )
}

export default SetAmount

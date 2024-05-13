import { useQuery } from '@apollo/react-hooks'
import { useFormik } from 'formik'
import _get from 'lodash/get'
import _pickBy from 'lodash/pickBy'
import { useContext, useEffect, useRef, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { parseUnits } from 'viem'
import { useAccount } from 'wagmi'
import { waitForTransaction } from 'wagmi/actions'

import {
  contract,
  PAYMENT_CURRENCY as CURRENCY,
  PAYMENT_MAXIMUM_PAYTO_AMOUNT,
  WALLET_ERROR_MESSAGES,
} from '~/common/enums'
import {
  formatAmount,
  numRound,
  truncate,
  validateCurrency,
  validateDonationAmount,
} from '~/common/utils'
import {
  Button,
  CopyToClipboard,
  Form,
  LanguageContext,
  Spacer,
  SpinnerBlock,
  useAllowanceUSDT,
  useApproveUSDT,
  useBalanceUSDT,
  useMutation,
  ViewerContext,
} from '~/components'
import { updateDonation } from '~/components/GQL'
import PAY_TO from '~/components/GQL/mutations/payTo'
import EXCHANGE_RATES from '~/components/GQL/queries/exchangeRates'
import WALLET_BALANCE from '~/components/GQL/queries/walletBalance'
import {
  ArticleDetailPublicQuery,
  ExchangeRatesQuery,
  PayToMutation,
  UserDonationRecipientFragment,
  WalletBalanceQuery,
} from '~/gql/graphql'

// import CivicLikerButton from '../CivicLikerButton'
import SetAmountBalance from './SetAmountBalance'
import styles from './styles.module.css'
import SubmitButton from './SubmitButton'

interface SetAmountCallbackValues {
  amount: number
  currency: CURRENCY
}

interface FormProps {
  currency: CURRENCY
  recipient: UserDonationRecipientFragment
  article: NonNullable<ArticleDetailPublicQuery['article']>
  submitCallback: (values: SetAmountCallbackValues) => void
  switchToAddCredit: () => void
  setTabUrl: (url: string) => void
  setTx: (tx: PayToMutation['payTo']['transaction']) => void
  targetId: string
}

interface FormValues {
  amount: number
  customAmount: number
}

const AMOUNT_DEFAULT = {
  [CURRENCY.USDT]: 0,
  [CURRENCY.HKD]: 0,
  [CURRENCY.LIKE]: 0,
}

const AMOUNT_OPTIONS = {
  [CURRENCY.USDT]: [1, 2, 5, 10, 20, 40],
  [CURRENCY.HKD]: [5, 10, 25, 50, 100, 200],
  [CURRENCY.LIKE]: [50, 100, 150, 500, 1000, 1500],
}

const SetAmount: React.FC<FormProps> = ({
  currency,
  recipient,
  article,
  submitCallback,
  switchToAddCredit,
  setTabUrl,
  setTx,
  targetId,
}) => {
  const formId = 'pay-to-set-amount-form'
  const customInputRef: React.RefObject<any> | null = useRef(null)
  const isUSDT = currency === CURRENCY.USDT
  const isHKD = currency === CURRENCY.HKD
  // const isLike = currency === CURRENCY.LIKE

  // contexts
  const intl = useIntl()
  const viewer = useContext(ViewerContext)
  const quoteCurrency = viewer.settings.currency
  const { lang } = useContext(LanguageContext)

  const { address } = useAccount()
  const ethAddress = viewer.info.ethAddress
  const hasEthAddress = !!ethAddress
  const isConnectedAddress =
    ethAddress?.toLowerCase() === address?.toLowerCase()

  // states
  const [payTo] = useMutation<PayToMutation>(PAY_TO)

  const { data: exchangeRateDate, loading: exchangeRateLoading } =
    useQuery<ExchangeRatesQuery>(EXCHANGE_RATES, {
      variables: { from: currency, to: quoteCurrency },
    })

  // HKD balance
  const { data, loading, error } = useQuery<WalletBalanceQuery>(
    WALLET_BALANCE,
    { fetchPolicy: 'network-only' }
  )

  // USDT balance & allowance
  const [approveConfirming, setApproveConfirming] = useState(false)
  const {
    data: allowanceData,
    refetch: refetchAllowanceData,
    isLoading: allowanceLoading,
    error: allowanceError,
  } = useAllowanceUSDT()
  const {
    data: approveData,
    isLoading: approving,
    write: approveWrite,
    error: approveError,
  } = useApproveUSDT()
  const { data: balanceUSDTData, error: balanceUSDTError } = useBalanceUSDT({
    address,
  })

  const allowanceUSDT = allowanceData || 0n
  const balanceUSDT = parseFloat(balanceUSDTData?.formatted || '0')
  const balanceHKD = data?.viewer?.wallet.balance.HKD || 0
  const balanceLike = data?.viewer?.liker.total || 0
  const balance = isUSDT ? balanceUSDT : isHKD ? balanceHKD : balanceLike
  const maxAmount = isHKD ? PAYMENT_MAXIMUM_PAYTO_AMOUNT.HKD : Infinity

  // forms
  const {
    errors,
    handleBlur,
    handleSubmit,
    isValid,
    isSubmitting,
    setFieldValue,
    values,
  } = useFormik<FormValues>({
    initialValues: {
      amount: AMOUNT_DEFAULT[currency],
      customAmount: 0,
    },
    validateOnBlur: false,
    validateOnChange: true,
    validate: ({ amount, customAmount }) =>
      _pickBy({
        amount: validateDonationAmount(customAmount || amount, balance, intl),
        currency: validateCurrency(currency, intl),
      }),
    onSubmit: async ({ amount, customAmount }, { setSubmitting }) => {
      const submitAmount = customAmount || amount
      try {
        if (currency === CURRENCY.LIKE) {
          const result = await payTo({
            variables: {
              amount: submitAmount,
              currency,
              purpose: 'donation',
              recipientId: recipient.id,
              targetId,
            },
            update: (cache) => {
              updateDonation({
                cache,
                shortHash: article.shortHash,
                viewer,
              })
            },
          })
          const redirectUrl = result?.data?.payTo.redirectUrl
          const transaction = result?.data?.payTo.transaction
          if (!redirectUrl || !transaction) {
            throw new Error()
          }
          setTabUrl(redirectUrl)
          setTx(transaction)
        }
        setSubmitting(false)
        submitCallback({ amount: submitAmount, currency })
      } catch (error) {
        setSubmitting(false)
      }
    },
  })

  const value = values.customAmount || values.amount
  const isBalanceInsufficient = balance < value
  const isExceededAllowance =
    isUSDT &&
    allowanceUSDT > 0n &&
    parseUnits(value + '', contract.Optimism.tokenDecimals) > allowanceUSDT
  const hasUSDTNetworkError =
    isUSDT && (allowanceError || balanceUSDTError || approveError) // TODO: better error handling
  const networkError =
    error || hasUSDTNetworkError ? (
      WALLET_ERROR_MESSAGES[lang].unknown
    ) : isExceededAllowance && isUSDT ? (
      <FormattedMessage
        defaultMessage="Transfer amount exceeds allowance"
        id="Tgd5id"
      />
    ) : (
      ''
    )

  const ComposedAmountInputHint = () => {
    const hkdHint = isHKD ? (
      <section>
        <Spacer size="xxtight" />
        <FormattedMessage
          defaultMessage="Payment will be processed by Stripe, allowing your support to be unrestricted by region."
          id="TX5UzL"
          description="src/components/Forms/PaymentForm/PayTo/SetAmount/index.tsx"
        />
      </section>
    ) : null

    const rate = _get(exchangeRateDate, 'exchangeRates.0.rate', 0)
    const convertedTotal = formatAmount(value * rate, 2)

    return (
      <section>
        <p>
          ≈&nbsp;{quoteCurrency}&nbsp;{convertedTotal}
        </p>
        {hkdHint}
      </section>
    )
  }

  // USDT approval
  useEffect(() => {
    ;(async () => {
      if (approveData) {
        setApproveConfirming(true)
        await waitForTransaction({ hash: approveData.hash })
        refetchAllowanceData()
        setApproveConfirming(false)
      }
    })()
  }, [approveData])

  /**
   * Rendering
   */
  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit}>
      <SetAmountBalance
        currency={currency}
        balanceUSDT={balanceUSDT}
        balanceHKD={balanceHKD}
        balanceLike={balanceLike}
        isBalanceInsufficient={isBalanceInsufficient}
        switchToAddCredit={switchToAddCredit}
      />

      <Form.ComposedAmountInput
        // radio inputs
        currency={currency}
        balance={balance}
        amounts={AMOUNT_OPTIONS}
        defaultAmount={AMOUNT_DEFAULT[currency]}
        currentAmount={values.amount}
        name="amount"
        error={errors.amount || networkError}
        onBlur={handleBlur}
        onChange={async (e) => {
          const value = parseInt(e.target.value, 10) || 0
          await setFieldValue('amount', value, false)
          await setFieldValue('customAmount', 0, true)
          e.target.blur()

          if (customInputRef.current) {
            customInputRef.current.value = ''
          }
        }}
        // custom input
        customAmount={{
          min: 0,
          max: maxAmount,
          step: isUSDT ? '0.01' : undefined,
          onBlur: handleBlur,
          onChange: async (e) => {
            let value = e.target.valueAsNumber || 0
            if (isHKD) {
              value = Math.floor(value)
            }
            if (isUSDT) {
              value = numRound(value, 2)
            }
            value = Math.abs(Math.min(value, maxAmount))

            await setFieldValue('customAmount', value, false)
            await setFieldValue('amount', 0, true)

            // correct the input value if not equal
            const $el = customInputRef.current
            const rawValue = parseFloat(e.target.value)
            if ($el && rawValue !== value) {
              $el.value = value <= 0 ? '' : value
              $el.type = 'text'
              $el.setSelectionRange($el.value.length, $el.value.length)
              $el.type = 'number'
            }
          },
          error: errors.amount,
          hint: <ComposedAmountInputHint />,
          ref: customInputRef,
        }}
        spacingTop="base"
      />
    </Form>
  )

  if (exchangeRateLoading || loading) {
    return <SpinnerBlock />
  }

  const submitButtonProps = {
    currency,
    formId,
    recipient,
    isValid,
    isSubmitting,
    isExceededAllowance,
    isBalanceInsufficient,
    switchToAddCredit,
    approving,
    approveConfirming,
    allowanceLoading,
    approveWrite,
  }

  return (
    <section className={styles.container}>
      {InnerForm}

      <Spacer size="loose" />
      <SubmitButton mode="rounded" {...submitButtonProps} />

      {isUSDT && hasEthAddress && !isConnectedAddress && (
        <>
          <p className={styles.reconnectHint}>
            <FormattedMessage
              defaultMessage="Kind reminder: This wallet address is different from the wallet address you use to log in to Matters"
              id="ksIL/T"
            />
            <br />
            <CopyToClipboard
              text={viewer.info.ethAddress || ''}
              successMessage={
                <FormattedMessage defaultMessage="Address copied" id="+aMAeT" />
              }
            >
              {({ copyToClipboard }) => (
                <Button
                  spacing={[8, 8]}
                  aria-label={intl.formatMessage({
                    defaultMessage: 'Copy',
                    id: '4l6vz1',
                  })}
                  onClick={copyToClipboard}
                  textColor="green"
                  textActiveColor="greenDark"
                >
                  {truncate(viewer.info.ethAddress || '')}
                </Button>
              )}
            </CopyToClipboard>
          </p>
        </>
      )}
    </section>
  )
}

export default SetAmount

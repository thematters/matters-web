import { useQuery } from '@apollo/client'
import { waitForTransactionReceipt } from '@wagmi/core'
import { useFormik } from 'formik'
import _get from 'lodash/get'
import _pickBy from 'lodash/pickBy'
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { parseUnits } from 'viem'
import { useAccount } from 'wagmi'

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
  wagmiConfig,
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
  useRoute,
  ViewerContext,
} from '~/components'
import { updateArticlePublic } from '~/components/GQL'
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
  amount: number
  setAmount: Dispatch<SetStateAction<number>>
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
  amount: _amount,
  setAmount,
  currency,
  recipient,
  article,
  submitCallback,
  switchToAddCredit,
  setTabUrl,
  setTx,
  targetId,
}) => {
  const formId = useId()
  const customInputRef: React.RefObject<HTMLInputElement> | null = useRef(null)
  const isUSDT = currency === CURRENCY.USDT
  const isHKD = currency === CURRENCY.HKD
  // const isLike = currency === CURRENCY.LIKE

  // contexts
  const intl = useIntl()
  const viewer = useContext(ViewerContext)
  const quoteCurrency = viewer.settings.currency
  const { lang } = useContext(LanguageContext)
  const { routerLang } = useRoute()

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
  const {
    data,
    refetch: refetchWalletBalance,
    loading: walletBalanceLoading,
    error: walletBalanceError,
  } = useQuery<WalletBalanceQuery>(WALLET_BALANCE, {
    fetchPolicy: 'network-only',
  })

  // USDT balance & allowance
  const [approveConfirming, setApproveConfirming] = useState(false)
  const {
    data: allowanceData,
    refetch: refetchAllowanceData,
    isLoading: allowanceLoading,
    error: allowanceError,
  } = useAllowanceUSDT(!recipient.info.ethAddress)
  const {
    data: approveHash,
    isPending: approving,
    write: approveWrite,
    error: approveError,
  } = useApproveUSDT(!recipient.info.ethAddress)
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
      amount: _amount,
    },
    validateOnBlur: false,
    validateOnChange: true,
    validate: ({ amount }) =>
      _pickBy({
        amount: validateDonationAmount(amount, balance, intl),
        currency: validateCurrency(currency, intl),
      }),
    onSubmit: async ({ amount }, { setSubmitting }) => {
      const submitAmount = amount
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
            update: (cache, result) => {
              updateArticlePublic({
                cache,
                shortHash: article.shortHash,
                viewer,
                routerLang,
                txId: result.data?.payTo.transaction.id,
                type: 'updateDonation',
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
      } catch {
        setSubmitting(false)
      }
    },
  })

  const value = values.amount
  const isBalanceInsufficient = balance < value || (isHKD && balance === 0)
  const isExceededAllowance =
    isUSDT &&
    allowanceUSDT >= 0n &&
    parseUnits(value + '', contract.Optimism.tokenDecimals) > allowanceUSDT
  const hasUSDTNetworkError =
    isUSDT && (allowanceError || balanceUSDTError || approveError)
  const isUserRejectedError =
    hasUSDTNetworkError &&
    hasUSDTNetworkError?.name === 'UserRejectedRequestError'
  const hasWalletBalanceError = walletBalanceError && !isUSDT
  const networkError = hasWalletBalanceError
    ? intl.formatMessage({
        defaultMessage:
          'Connection abnormality, please make sure the connection is stable and retry',
        id: 'XMpFQE',
      })
    : hasUSDTNetworkError && !isUserRejectedError
      ? WALLET_ERROR_MESSAGES[lang].unknown
      : ''

  const ComposedAmountInputHint = () => {
    const hkdHint = isHKD ? (
      <section>
        <Spacer size="sp4" />
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
        {value > 0 && (
          <p>
            ≈&nbsp;{quoteCurrency}&nbsp;{convertedTotal}
          </p>
        )}
        {hkdHint}
      </section>
    )
  }

  // USDT approval
  useEffect(() => {
    ;(async () => {
      if (approveHash) {
        setApproveConfirming(true)
        await waitForTransactionReceipt(wagmiConfig, { hash: approveHash })
        refetchAllowanceData()
        setApproveConfirming(false)
      }
    })()
  }, [approveHash])

  useEffect(() => {
    setFieldValue('amount', _amount, false)
    if (customInputRef.current) {
      customInputRef.current.value = _amount <= 0 ? '' : _amount.toString()
    }
  }, [currency])

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
        loading={!!walletBalanceError || walletBalanceLoading}
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
          await setFieldValue('amount', value, true)
          setAmount(value)
          e.target.blur()

          if (customInputRef.current) {
            customInputRef.current.value = value.toString()
          }
        }}
        // custom input
        customAmount={{
          min: 0,
          max: maxAmount,
          defaultValue: _amount <= 0 ? '' : _amount,
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

            await setFieldValue('amount', value, true)
            setAmount(value)

            // correct the input value if not equal
            const $el = customInputRef.current
            const rawValue = parseFloat(e.target.value)
            if ($el && rawValue !== value) {
              $el.value = value <= 0 ? '' : value.toString()
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

  if (exchangeRateLoading || walletBalanceLoading) {
    return <SpinnerBlock />
  }

  const submitButtonProps = {
    value: values.amount,
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
    walletBalanceError,
    walletBalanceLoading,
    refetchWalletBalance: () => refetchWalletBalance(),
  }

  return (
    <section className={styles.container}>
      {InnerForm}

      <Spacer size="sp24" />
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

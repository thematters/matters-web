import { useQuery } from '@apollo/react-hooks'
import { useFormik } from 'formik'
import _get from 'lodash/get'
import _pickBy from 'lodash/pickBy'
import { useContext, useEffect, useRef, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useAccount } from 'wagmi'
import { waitForTransaction } from 'wagmi/actions'

import {
  PAYMENT_CURRENCY as CURRENCY,
  PAYMENT_MAXIMUM_PAYTO_AMOUNT,
  WALLET_ERROR_MESSAGES,
} from '~/common/enums'
import {
  featureSupportedChains,
  formatAmount,
  maskAddress,
  numRound,
  validateCurrency,
  validateDonationAmount,
} from '~/common/utils'
import {
  Button,
  CopyToClipboard,
  Dialog,
  Form,
  IconCopy16,
  LanguageContext,
  Spacer,
  Spinner,
  TextIcon,
  Translate,
  useAllowanceUSDT,
  useApproveUSDT,
  useBalanceUSDT,
  useMutation,
  useTargetNetwork,
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
import SetAmountHeader from './SetAmountHeader'
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
  switchToCurrencyChoice: () => void
  switchToAddCredit: () => void
  back: () => void
  setTabUrl: (url: string) => void
  setTx: (tx: PayToMutation['payTo']['transaction']) => void
  targetId: string
}

interface FormValues {
  amount: number
  customAmount: number
}

const AMOUNT_DEFAULT = {
  [CURRENCY.USDT]: 3.0,
  [CURRENCY.HKD]: 10,
  [CURRENCY.LIKE]: 100,
}

const AMOUNT_OPTIONS = {
  [CURRENCY.USDT]: [1.0, 3.0, 5.0, 10.0, 20.0, 35.0],
  [CURRENCY.HKD]: [5, 10, 30, 50, 100, 300],
  [CURRENCY.LIKE]: [50, 100, 150, 500, 1000, 1500],
}

const SetAmount: React.FC<FormProps> = ({
  currency,
  recipient,
  article,
  submitCallback,
  switchToCurrencyChoice,
  switchToAddCredit,
  back,
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
  const isConnectedAddress =
    viewer.info.ethAddress?.toLowerCase() === address?.toLowerCase()

  // TODO: support multiple networks
  const targetNetork = featureSupportedChains.curation[0]
  const { isUnsupportedNetwork, switchToTargetNetwork, isSwitchingNetwork } =
    useTargetNetwork(targetNetork)

  // states
  const [payTo] = useMutation<PayToMutation>(PAY_TO)

  const { data: exchangeRateDate, loading: exchangeRateLoading } =
    useQuery<ExchangeRatesQuery>(EXCHANGE_RATES, {
      variables: {
        from: currency,
        to: quoteCurrency,
      },
    })

  // HKD balance
  const { data, loading, error } = useQuery<WalletBalanceQuery>(
    WALLET_BALANCE,
    {
      fetchPolicy: 'network-only',
    }
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
  const { data: balanceUSDTData, error: balanceUSDTError } = useBalanceUSDT({})

  const allowanceUSDT = allowanceData || 0n
  const balanceUSDT = parseFloat(balanceUSDTData?.formatted || '0')
  const balanceHKD = data?.viewer?.wallet.balance.HKD || 0
  const balanceLike = data?.viewer?.liker.total || 0
  const balance = isUSDT ? balanceUSDT : isHKD ? balanceHKD : balanceLike
  const maxAmount = isHKD ? PAYMENT_MAXIMUM_PAYTO_AMOUNT.HKD : Infinity
  const networkError =
    error ||
    (isUSDT && !isUnsupportedNetwork
      ? allowanceError || balanceUSDTError || approveError
      : undefined)
      ? WALLET_ERROR_MESSAGES[lang].unknown
      : ''

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
        amount: validateDonationAmount(customAmount || amount, balance, lang),
        currency: validateCurrency(currency, lang),
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
                id: article.id,
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

  const isBalanceInsufficient = balance < (values.customAmount || values.amount)

  const ComposedAmountInputHint = () => {
    const hkdHint = isHKD ? (
      <section>
        <Spacer size="base" />
        <Translate
          zh_hant="付款將由 Stripe 處理，讓你的支持不受地域限制"
          zh_hans="付款将由 Stripe 处理，让你的支持不受地域限制"
          en="Stripe will process your payment, so you can support the author wherever you are."
        />
      </section>
    ) : null

    const value = values.customAmount || values.amount

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

  /**
   * useEffect Hooks
   */
  // go back to previous step if wallet is locked
  useEffect(() => {
    if (currency === CURRENCY.USDT && !address) {
      switchToCurrencyChoice()
    }
  }, [address])

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
      <SetAmountHeader
        currency={currency}
        isConnectedAddress={isConnectedAddress}
        isUnsupportedNetwork={isUnsupportedNetwork}
        targetChainName={targetNetork.name}
        switchToCurrencyChoice={switchToCurrencyChoice}
        switchToTargetNetwork={switchToTargetNetwork}
      />

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
        disabled={isUSDT && !isConnectedAddress}
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
          disabled: isUSDT && !isConnectedAddress,
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
    return <Spinner />
  }

  const submitButtonProps = {
    currency,
    formId,
    recipient,
    isValid,
    isSubmitting,
    isBalanceInsufficient,
    isConnectedAddress,
    isUnsupportedNetwork,
    isSwitchingNetwork,
    targetChainName: targetNetork.name,
    allowanceUSDT,
    approving,
    approveConfirming,
    allowanceLoading,
    approveWrite,
    switchToTargetNetwork,
    switchToCurrencyChoice,
    switchToAddCredit,
    back,
  }

  return (
    <>
      <Dialog.Header title="donation" />

      <Dialog.Content>
        {InnerForm}

        {isUSDT && !isConnectedAddress && (
          <>
            <p className={styles.reconnectHint}>
              <Translate id="reconnectHint" />
              <CopyToClipboard
                text={viewer.info.ethAddress || ''}
                successMessage={
                  <FormattedMessage
                    defaultMessage="Address copied"
                    id="+aMAeT"
                  />
                }
              >
                <Button
                  spacing={['xtight', 'xtight']}
                  aria-label={intl.formatMessage({
                    defaultMessage: 'Copy',
                    id: '4l6vz1',
                  })}
                >
                  <TextIcon
                    icon={<IconCopy16 color="black" size="xs" />}
                    color="black"
                    textPlacement="left"
                  >
                    {maskAddress(viewer.info.ethAddress || '')}
                  </TextIcon>
                </Button>
              </CopyToClipboard>
            </p>
          </>
        )}
      </Dialog.Content>

      <Dialog.Footer
        btns={
          <>
            <SubmitButton mode="rounded" {...submitButtonProps} />
            <Dialog.RoundedButton
              text={<FormattedMessage defaultMessage="Back" id="cyR7Kh" />}
              color="greyDarker"
              onClick={back}
            />
          </>
        }
        smUpBtns={
          <>
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Back" id="cyR7Kh" />}
              color="greyDarker"
              onClick={back}
            />
            <SubmitButton mode="text" {...submitButtonProps} />
          </>
        }
      />
    </>
  )
}

export default SetAmount

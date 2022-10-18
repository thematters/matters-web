import { useQuery } from '@apollo/react-hooks'
import { BigNumber } from 'ethers/lib/ethers'
import { formatUnits } from 'ethers/lib/utils'
import { useFormik } from 'formik'
import _pickBy from 'lodash/pickBy'
import { useContext, useRef, useState } from 'react'

import {
  Button,
  Dialog,
  Form,
  IconExternalLink16,
  IconFiatCurrency40,
  IconInfo24,
  IconLikeCoin40,
  IconUSDTActive40,
  LanguageContext,
  Spinner,
  TextIcon,
  Translate,
  useBalanceOf,
  useMutation,
  ViewerContext,
} from '~/components'
import PAY_TO from '~/components/GQL/mutations/payTo'
import WALLET_BALANCE from '~/components/GQL/queries/walletBalance'

import {
  GUIDE_LINKS,
  PAYMENT_CURRENCY as CURRENCY,
  PAYMENT_MAXIMUM_PAYTO_AMOUNT,
} from '~/common/enums'
import {
  formatAmount,
  translate,
  validateCurrency,
  validateDonationAmount,
} from '~/common/utils'

import CivicLikerButton from './CivicLikerButton'
import { NoLikerIdButton, NoLikerIdMessage } from './NoLiker'
import styles from './styles.css'
import WhyPolygonDialog from './WhyPolygonDialog'

import { UserDonationRecipient } from '~/components/Dialogs/DonationDialog/__generated__/UserDonationRecipient'
import {
  PayTo as PayToMutate,
  PayTo_payTo_transaction as PayToTx,
} from '~/components/GQL/mutations/__generated__/PayTo'
import { WalletBalance } from '~/components/GQL/queries/__generated__/WalletBalance'

interface SetAmountCallbackValues {
  amount: number
  currency: CURRENCY
}

interface SetAmountOpenTabCallbackValues {
  window: Window
  transaction: PayToTx
}

interface FormProps {
  closeDialog: () => void
  defaultCurrency?: CURRENCY
  openTabCallback: (values: SetAmountOpenTabCallbackValues) => void
  recipient: UserDonationRecipient
  submitCallback: (values: SetAmountCallbackValues) => void
  switchToCurrencyChoice: () => void
  switchToAddCredit: () => void
  targetId: string
}

interface FormValues {
  amount: number
  customAmount: number
  currency: CURRENCY
}

const AMOUNT_DEFAULT = {
  [CURRENCY.USDT]: 5.0,
  [CURRENCY.HKD]: 10,
  [CURRENCY.LIKE]: 166,
}

const AMOUNT_OPTIONS = {
  [CURRENCY.USDT]: [1.0, 3.0, 5.0, 10.0, 20.0, 35.0],
  [CURRENCY.HKD]: [5, 10, 30, 50, 100, 300],
  [CURRENCY.LIKE]: [50, 100, 150, 500, 1000, 1500],
}

const SetAmount: React.FC<FormProps> = ({
  closeDialog,
  defaultCurrency,
  openTabCallback,
  recipient,
  submitCallback,
  switchToCurrencyChoice,
  switchToAddCredit,
  targetId,
}) => {
  const formId = 'pay-to-set-amount-form'

  const viewer = useContext(ViewerContext)
  const { lang } = useContext(LanguageContext)

  const [fixed] = useState<boolean>(true)
  const [locked, setLocked] = useState<boolean>(false)
  const [tabUrl, setTabUrl] = useState('')
  const [tx, setTx] = useState<PayToTx>()

  const [payTo] = useMutation<PayToMutate>(PAY_TO)
  const inputRef: React.RefObject<any> | null = useRef(null)

  // HKD balance
  const { data, loading } = useQuery<WalletBalance>(WALLET_BALANCE, {
    fetchPolicy: 'network-only',
  })

  const { data: balanceOfData } = useBalanceOf()

  const balanceUSDT = (balanceOfData && formatUnits(balanceOfData)) || 0
  const balanceHKD = data?.viewer?.wallet.balance.HKD || 0
  const balanceLike = data?.viewer?.liker.total || 0

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
      amount: AMOUNT_DEFAULT[defaultCurrency || CURRENCY.HKD],
      customAmount: 0,
      currency: defaultCurrency || CURRENCY.HKD,
    },
    validate: ({ amount, customAmount, currency }) =>
      _pickBy({
        amount: validateDonationAmount(customAmount || amount, lang),
        currency: validateCurrency(currency, lang),
      }),
    onSubmit: async ({ amount, customAmount, currency }, { setSubmitting }) => {
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
        submitCallback({ amount: submitAmount, currency })
      } catch (error) {
        setSubmitting(false)
      }
    },
  })

  const isUSDT = values.currency === CURRENCY.USDT
  const isHKD = values.currency === CURRENCY.HKD
  const isLike = values.currency === CURRENCY.LIKE
  const canPayLike = isLike && !!viewer.liker.likerId
  const canReceiveLike = isLike && !!recipient.liker.likerId
  const canProcess = isUSDT || isHKD || (canPayLike && canReceiveLike)
  const maxAmount = isLike ? Infinity : PAYMENT_MAXIMUM_PAYTO_AMOUNT.HKD
  const isBalanceInsufficient =
    (isUSDT ? balanceUSDT : isHKD ? balanceHKD : balanceLike) <
    (values.customAmount || values.amount)

  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit} noBackground>
      <section className="set-amount-change-support-way">
        {isUSDT && (
          <TextIcon
            icon={<IconUSDTActive40 size="md" />}
            size="md"
            spacing="xtight"
            weight="md"
          >
            <Translate zh_hant="USDT" zh_hans="USDT" en="USDT" />
          </TextIcon>
        )}
        {isHKD && (
          <TextIcon
            icon={<IconFiatCurrency40 size="md" />}
            size="md"
            spacing="xtight"
            weight="md"
          >
            <Translate zh_hant="法幣 HKD" zh_hans="法币 HKD" en="HKD" />
          </TextIcon>
        )}
        {isLike && (
          <TextIcon
            icon={<IconLikeCoin40 size="md" />}
            size="md"
            spacing="xtight"
            weight="md"
          >
            LikeCoin
          </TextIcon>
        )}
        <span className="button">
          <Button onClick={switchToCurrencyChoice}>
            <TextIcon size="xs" textDecoration="underline" color="grey-dark">
              <Translate
                zh_hant="更改支持方式"
                zh_hans="更改支持方式"
                en="Change"
              />
            </TextIcon>
          </Button>

          {/* TODO: move to network component */}
          <WhyPolygonDialog>
            {({ openDialog }) => (
              <button type="button" onClick={openDialog}>
                <TextIcon icon={<IconInfo24 size="md" color="grey" />} />
              </button>
            )}
          </WhyPolygonDialog>
        </span>
      </section>

      <section className="set-amount-balance">
        <span className="left">
          <Translate zh_hant="餘額" zh_hans="余额" en="Balance" />
          &nbsp;{isUSDT && <span>{balanceUSDT} USDT</span>}
          {isHKD && formatAmount(balanceHKD)}
          {isLike && formatAmount(balanceLike, 0)}
        </span>
        {isHKD && (
          <Button onClick={switchToAddCredit}>
            <TextIcon
              size="xs"
              textDecoration="underline"
              color="green"
              weight="md"
            >
              {isBalanceInsufficient ? (
                <Translate
                  zh_hant="餘額不足，請儲值"
                  zh_hans="余额不足，请储值"
                  en="Insufficient balance, please top up"
                />
              ) : (
                <Translate zh_hant="儲值" zh_hans="储值" en="Top Up" />
              )}
            </TextIcon>
          </Button>
        )}
        {isUSDT && BigNumber.from(balanceUSDT).gte(0) && (
          <a href={GUIDE_LINKS.payment} target="_blank">
            <TextIcon size="xs" textDecoration="underline" color="grey-dark">
              <Translate
                zh_hant="如何移轉資金到 Polygon？"
                zh_hans="如何移转资金到 Polygon？"
                en="How to transfer USDT to Polygon?"
              />
            </TextIcon>
          </a>
        )}
      </section>

      {fixed && canProcess && (
        <Form.AmountRadioInput
          currency={values.currency}
          balance={isUSDT ? balanceUSDT : isHKD ? balanceHKD : balanceLike}
          amounts={AMOUNT_OPTIONS}
          name="amount"
          disabled={locked}
          value={values.amount}
          error={touched.amount && errors.amount}
          onBlur={handleBlur}
          onChange={(e) => {
            const value = parseInt(e.target.value, 10) || 0
            setFieldValue('amount', value)
            setFieldValue('customAmount', 0)
            e.target.blur()
          }}
        />
      )}

      {canProcess && (
        <section className="set-amount-custom-amount-input">
          <input
            disabled={locked}
            type="number"
            name="customAmount"
            min={0}
            max={maxAmount}
            placeholder={translate({
              zh_hant: '輸入自訂金額',
              zh_hans: '输入自订金额',
              en: 'Enter a custom amount',
              lang,
            })}
            value={
              !touched.customAmount && values.customAmount <= 0
                ? undefined
                : values.customAmount
            }
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
              setFieldValue('customAmount', sanitizedAmount)
              setFieldValue('amount', 0)
            }}
            ref={inputRef}
            autoComplete="nope"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
          {isHKD && (
            <section className="footer">
              <TextIcon size="xs" color="grey-dark">
                <Translate
                  zh_hant="付款將由 Stripe 處理，讓你的支持不受地域限制"
                  zh_hans="付款将由 Stripe 处理，让你的支持不受地域限制"
                  en="Payments will be processed by Stripe, so your support is not geo-restricted"
                />
              </TextIcon>
            </section>
          )}
        </section>
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

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <Dialog.Content hasGrow>{InnerForm}</Dialog.Content>

      <Dialog.Footer>
        {canProcess && !locked && (
          <>
            {isLike && recipient.liker.likerId && (
              <CivicLikerButton likerId={recipient.liker.likerId} />
            )}

            {isBalanceInsufficient && isHKD ? (
              <Dialog.Footer.Button
                type="button"
                onClick={switchToAddCredit}
                form={formId}
                bgColor="green"
                textColor="white"
              >
                <Translate id="topUp" />
              </Dialog.Footer.Button>
            ) : (
              <Dialog.Footer.Button
                type="submit"
                form={formId}
                disabled={!isValid || isSubmitting || isBalanceInsufficient}
                bgColor="green"
                textColor="white"
                loading={isSubmitting}
              >
                <Translate id="nextStep" />
              </Dialog.Footer.Button>
            )}
          </>
        )}

        {!canProcess && (
          <NoLikerIdButton
            canPayLike={canPayLike}
            canReceiveLike={canReceiveLike}
            closeDialog={closeDialog}
            setFieldValue={setFieldValue}
          />
        )}

        {locked && (
          <Dialog.Footer.Button
            onClick={() => {
              const payWindow = window.open(tabUrl, '_blank')
              if (payWindow && tx) {
                openTabCallback({ window: payWindow, transaction: tx })
              }
            }}
            icon={<IconExternalLink16 size="xs" />}
          >
            <Translate
              zh_hant="前往 Liker Land 支付"
              zh_hans="前往 Liker Land 支付"
              en="Go to Liker Land for payment"
            />
          </Dialog.Footer.Button>
        )}
      </Dialog.Footer>
    </>
  )
}

export default SetAmount

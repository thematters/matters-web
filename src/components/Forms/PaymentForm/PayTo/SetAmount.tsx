import { useQuery } from '@apollo/react-hooks'
import { BigNumber } from 'ethers'
import { useFormik } from 'formik'
import _pickBy from 'lodash/pickBy'
import { useContext, useEffect, useRef, useState } from 'react'
import { useAccount, useDisconnect, useNetwork, useSwitchNetwork } from 'wagmi'

import {
  Button,
  CopyToClipboard,
  Dialog,
  Form,
  IconCopy16,
  IconExternalLink16,
  IconFiatCurrency40,
  IconInfo24,
  IconLikeCoin40,
  IconUSDTActive40,
  LanguageContext,
  Spinner,
  TextIcon,
  Translate,
  useAllowanceUSDT,
  useApproveUSDT,
  useBalanceUSDT,
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
  maskAddress,
  numRound,
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
  closeDialog,
  defaultCurrency,
  openTabCallback,
  recipient,
  submitCallback,
  switchToCurrencyChoice,
  switchToAddCredit,
  targetId,
}) => {
  // contexts
  const viewer = useContext(ViewerContext)
  const { lang } = useContext(LanguageContext)
  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  const { chain } = useNetwork()
  const { chains, switchNetwork } = useSwitchNetwork()

  const isConnectedAddress =
    viewer.info.ethAddress?.toLowerCase() === address?.toLowerCase()
  const isUnsupportedNetwork = !!chain?.unsupported
  const targetChainName = chains[0]?.name
  const targetChainId = chains[0]?.id
  const switchToTargetNetwork = async () => {
    if (!switchNetwork) return

    switchNetwork(targetChainId)
  }

  // states
  const [locked, setLocked] = useState<boolean>(false)
  const [tabUrl, setTabUrl] = useState('')
  const [tx, setTx] = useState<PayToTx>()

  const [payTo] = useMutation<PayToMutate>(PAY_TO)

  // HKD balance
  const { data, loading } = useQuery<WalletBalance>(WALLET_BALANCE, {
    fetchPolicy: 'network-only',
  })

  // USDT balance & allowance
  const [approveConfirming, setApproveConfirming] = useState(false)
  const {
    data: allowanceData,
    refetch: refetchAllowanceData,
    isLoading: allowanceLoading,
  } = useAllowanceUSDT()
  const {
    data: approveData,
    isLoading: approving,
    write: approveWrite,
  } = useApproveUSDT()
  const { data: balanceUSDTData } = useBalanceUSDT({})

  const allowanceUSDT = allowanceData || BigNumber.from('0')
  const balanceUSDT = parseFloat(balanceUSDTData?.formatted || '0')
  const balanceHKD = data?.viewer?.wallet.balance.HKD || 0
  const balanceLike = data?.viewer?.liker.total || 0

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

  const formId = 'pay-to-set-amount-form'
  const customInputRef: React.RefObject<any> | null = useRef(null)

  const isUSDT = values.currency === CURRENCY.USDT
  const isHKD = values.currency === CURRENCY.HKD
  const isLike = values.currency === CURRENCY.LIKE
  const canPayLike = isLike && !!viewer.liker.likerId
  const canReceiveLike = isLike && !!recipient.liker.likerId
  const canProcess = isUSDT || isHKD || (canPayLike && canReceiveLike)
  const maxAmount = isHKD ? PAYMENT_MAXIMUM_PAYTO_AMOUNT.HKD : Infinity
  const isBalanceInsufficient =
    (isUSDT ? balanceUSDT : isHKD ? balanceHKD : balanceLike) <
    (values.customAmount || values.amount)

  /**
   * useEffect Hooks
   */
  // go back to previous step if wallet is locked
  useEffect(() => {
    if (!address && defaultCurrency === CURRENCY.USDT) {
      switchToCurrencyChoice()
    }
  }, [address])

  // USDT approval
  useEffect(() => {
    ;(async () => {
      if (approveData) {
        setApproveConfirming(true)
        await approveData.wait()
        refetchAllowanceData()
        setApproveConfirming(false)
      }
    })()
  }, [approveData])

  /**
   * Rendering
   */
  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit} noBackground>
      <section className="set-amount-change-support-way">
        <section className="left">
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
          </span>
        </section>
        <section className="right">
          {isUSDT && !isConnectedAddress && (
            <Button onClick={() => disconnect()}>
              <TextIcon size="xs" textDecoration="underline" color="grey-dark">
                <Translate
                  zh_hant="切換錢包地址"
                  zh_hans="切换钱包地址"
                  en="Change Address"
                />
              </TextIcon>
            </Button>
          )}
          {isUSDT && isConnectedAddress && (
            <>
              <>
                {isUnsupportedNetwork ? (
                  <Button onClick={switchToTargetNetwork}>
                    <TextIcon
                      size="xs"
                      textDecoration="underline"
                      color="grey-dark"
                    >
                      <Translate
                        zh_hant="切換到 "
                        zh_hans="切换到 "
                        en="Switch to "
                      />
                      {targetChainName}
                    </TextIcon>
                  </Button>
                ) : (
                  <TextIcon size="xs" color="black">
                    {targetChainName}
                  </TextIcon>
                )}
              </>

              <WhyPolygonDialog>
                {({ openDialog }) => (
                  <Button onClick={openDialog}>
                    <TextIcon icon={<IconInfo24 size="md" color="grey" />} />
                  </Button>
                )}
              </WhyPolygonDialog>
            </>
          )}
        </section>
      </section>

      <section className="set-amount-balance">
        <span className="left">
          <Translate zh_hant="餘額 " zh_hans="余额 " en="Balance " />
          {isUSDT && <span>{formatAmount(balanceUSDT)} USDT</span>}
          {isHKD && <span>{formatAmount(balanceHKD)} HKD</span>}
          {isLike && <span>{formatAmount(balanceLike, 0)} LikeCoin</span>}
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
        {isUSDT && balanceUSDT <= 0 && (
          <a href={GUIDE_LINKS.payment} target="_blank">
            <TextIcon size="xs" textDecoration="underline" color="grey-dark">
              <Translate
                zh_hant="如何移轉資金到 Polygon？"
                zh_hans="如何移转资金到 Polygon？"
                en="How to send tokens to Polygon?"
              />
            </TextIcon>
          </a>
        )}
      </section>

      {canProcess && (
        <Form.AmountRadioInput
          currency={values.currency}
          balance={isUSDT ? balanceUSDT : isHKD ? balanceHKD : balanceLike}
          amounts={AMOUNT_OPTIONS}
          name="amount"
          disabled={locked || !isConnectedAddress}
          value={values.amount}
          error={errors.amount}
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
        />
      )}

      {canProcess && (
        <section className="set-amount-custom-amount-input">
          <input
            disabled={locked || !isConnectedAddress}
            type="number"
            name="customAmount"
            min={0}
            max={maxAmount}
            step={isUSDT ? '0.01' : undefined}
            placeholder={translate({
              zh_hant: '輸入自訂金額',
              zh_hans: '输入自订金额',
              en: 'Enter a custom amount',
              lang,
            })}
            value={undefined}
            onBlur={handleBlur}
            onChange={async (e) => {
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

              const $el = customInputRef.current
              if ($el) {
                $el.value = value <= 0 ? '' : value
                $el.type = 'text'
                $el.setSelectionRange($el.value.length, $el.value.length)
                $el.type = 'number'
              }
            }}
            ref={customInputRef}
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
        {canProcess && !isUSDT && !locked && (
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

        {isUSDT && (
          <>
            {!isConnectedAddress && (
              <>
                <p className="set-amount-reconnect-footer">
                  <Translate
                    zh_hant="當前錢包地址與帳戶綁定不同，若要變更請直接操作錢包或重新連接為："
                    zh_hans="当前钱包地址与帐户绑定不同，若要变更请直接操作钱包或重新连接为："
                    en="The wallet address is not the one you bound to account. Please switch it in the wallet or reconnect as: "
                  />
                  <CopyToClipboard text={viewer.info.ethAddress || ''}>
                    <Button
                      spacing={['xtight', 'xtight']}
                      aria-label={translate({ id: 'copy', lang })}
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

                <Dialog.Footer.Button
                  bgColor="green"
                  textColor="white"
                  onClick={() => {
                    disconnect()
                  }}
                >
                  <Translate
                    zh_hant="重新連接錢包"
                    zh_hans="重新连接钱包"
                    en="Reconnect Wallet"
                  />
                </Dialog.Footer.Button>

                <style jsx>{styles}</style>
              </>
            )}

            {isConnectedAddress && isUnsupportedNetwork && (
              <Dialog.Footer.Button
                bgColor="green"
                textColor="white"
                onClick={() => {
                  switchToTargetNetwork()
                }}
              >
                <Translate
                  zh_hant="切換到 "
                  zh_hans="切换到 "
                  en="Switch to "
                />
                {targetChainName}
              </Dialog.Footer.Button>
            )}

            {isConnectedAddress &&
              !isUnsupportedNetwork &&
              allowanceUSDT.lte(0) && (
                <>
                  <Dialog.Footer.Button
                    bgColor="green"
                    textColor="white"
                    loading={approving || approveConfirming || allowanceLoading}
                    onClick={() => {
                      if (approveWrite) {
                        approveWrite()
                      }
                    }}
                  >
                    <Translate
                      zh_hant="授權 USDT 支付"
                      zh_hans="授权 USDT 支付"
                      en="Approve USDT"
                    />
                  </Dialog.Footer.Button>
                </>
              )}

            {isConnectedAddress &&
              !isUnsupportedNetwork &&
              allowanceUSDT.gt(0) && (
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

import { useQuery } from '@apollo/react-hooks'
import { useFormik } from 'formik'
import _pickBy from 'lodash/pickBy'
import { useContext, useEffect } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useAccount, useNetwork } from 'wagmi'

import {
  PAYMENT_CURRENCY as CURRENCY,
  PAYMENT_PASSSWORD_LENGTH,
} from '~/common/enums'
import { parseFormSubmitErrors, validatePaymentPassword } from '~/common/utils'
import {
  Button,
  Dialog,
  Form,
  // IconExternalLink16,
  LanguageContext,
  Spinner,
  TextIcon,
  Translate,
  useMutation,
  ViewerContext,
} from '~/components'
import { updateDonation } from '~/components/GQL'
import PAY_TO from '~/components/GQL/mutations/payTo'
import WALLET_BALANCE from '~/components/GQL/queries/walletBalance'
import {
  ArticleDetailPublicQuery,
  PayToMutation,
  UserDonationRecipientFragment,
  WalletBalanceQuery,
} from '~/gql/graphql'

import PaymentInfo from '../../PaymentInfo'
import styles from './styles.module.css'

interface SetAmountOpenTabCallbackValues {
  window: Window
  transaction: PayToMutation['payTo']['transaction']
}

interface FormProps {
  amount: number
  article: NonNullable<ArticleDetailPublicQuery['article']>
  currency: CURRENCY
  recipient: UserDonationRecipientFragment
  targetId: string
  submitCallback: () => void
  switchToSetAmount: () => void
  switchToResetPassword: () => void
  switchToCurrencyChoice: () => void
  openTabCallback: (values: SetAmountOpenTabCallbackValues) => void
  tabUrl?: string
  tx?: PayToMutation['payTo']['transaction']
}

interface FormValues {
  password: string
}

const Confirm: React.FC<FormProps> = ({
  amount,
  article,
  currency,
  recipient,
  targetId,
  submitCallback,
  switchToSetAmount,
  switchToResetPassword,
  switchToCurrencyChoice,
  openTabCallback,
  tabUrl,
  tx,
}) => {
  const intl = useIntl()
  const { lang } = useContext(LanguageContext)
  const viewer = useContext(ViewerContext)

  const formId = 'pay-to-confirm-form'

  const [payTo] = useMutation<PayToMutation>(PAY_TO, undefined, {
    showToast: false,
  })

  const { data, loading } = useQuery<WalletBalanceQuery>(WALLET_BALANCE, {
    fetchPolicy: 'network-only',
  })

  const { address } = useAccount()
  const { chain } = useNetwork()
  const isUnsupportedNetwork = !!chain?.unsupported
  const isConnectedAddress =
    viewer.info.ethAddress?.toLowerCase() === address?.toLowerCase()

  const isHKD = currency === CURRENCY.HKD
  const isUSDT = currency === CURRENCY.USDT
  // const isLIKE = currency === CURRENCY.LIKE

  useEffect(() => {
    if (isUSDT && (!address || isUnsupportedNetwork || !isConnectedAddress)) {
      switchToCurrencyChoice()
    }
  }, [address, chain])

  const {
    errors,
    handleSubmit,
    isSubmitting,
    setFieldValue,
    setTouched,
    touched,
    values,
  } = useFormik<FormValues>({
    initialValues: {
      password: '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: ({ password }) =>
      _pickBy({
        password: validatePaymentPassword(password, lang),
      }),
    onSubmit: async ({ password }, { setFieldError, setSubmitting }) => {
      try {
        const result = await payTo({
          variables: {
            amount,
            currency,
            password,
            purpose: 'donation',
            recipientId: recipient.id,
            targetId,
          },
          update: (cache, result) => {
            updateDonation({
              cache,
              id: article.id,
              viewer,
              txId: result.data?.payTo.transaction.id,
            })
          },
        })

        const transaction = result?.data?.payTo.transaction

        if (!transaction) {
          throw new Error()
        }

        setSubmitting(false)
        submitCallback()
      } catch (error) {
        setSubmitting(false)
        const [messages, codes] = parseFormSubmitErrors(error as any)
        setFieldError('password', intl.formatMessage(messages[codes[0]]))
        setFieldValue('password', '', false)
      }
    },
  })

  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit}>
      <Form.PinInput
        length={PAYMENT_PASSSWORD_LENGTH}
        name="password"
        value={values.password}
        error={touched.password && errors.password}
        onChange={(value) => {
          const shouldValidate = value.length === PAYMENT_PASSSWORD_LENGTH
          setTouched({ password: true }, shouldValidate)
          setFieldValue('password', value, shouldValidate)
        }}
      />
    </Form>
  )

  useEffect(() => {
    if (values.password.length === PAYMENT_PASSSWORD_LENGTH) {
      handleSubmit()
    }
  }, [values.password])

  const balance = data?.viewer?.wallet.balance.HKD || 0
  const isWalletInsufficient = balance < amount

  if (isSubmitting || loading) {
    return (
      <Dialog.Content>
        <Spinner />
      </Dialog.Content>
    )
  }

  const submitText = isHKD ? (
    <>
      <FormattedMessage defaultMessage="Forget Payment Password" id="6yZXYK" />
    </>
  ) : isUSDT ? (
    <Translate zh_hant="確認送出" zh_hans="确认送出" en="Confirm" />
  ) : (
    <Translate
      zh_hant="前往 Liker Land 支付"
      zh_hans="前往 Liker Land 支付"
      en="Go to Liker Land for payment"
    />
  )
  const onSubmitLikeCoin = () => {
    const payWindow = window.open(tabUrl, '_blank')
    if (payWindow && tx) {
      openTabCallback({ window: payWindow, transaction: tx })
    }
  }

  return (
    <>
      <Dialog.Header
        title={<FormattedMessage defaultMessage="Support Author" id="ezYuE2" />}
      />

      <Dialog.Content>
        <PaymentInfo
          amount={amount}
          currency={currency}
          recipient={recipient}
          showLikerID={currency === CURRENCY.LIKE}
          showEthAddress={currency === CURRENCY.USDT}
        >
          <p>
            <Button onClick={switchToSetAmount}>
              <TextIcon size="xs" textDecoration="underline" color="greyDark">
                <Translate
                  zh_hant="修改金額"
                  zh_hans="修改金额"
                  en="Amend amount"
                />
              </TextIcon>
            </Button>
          </p>
        </PaymentInfo>

        {currency === CURRENCY.HKD && !isWalletInsufficient && (
          <>
            <p className={styles.hint}>
              <Translate
                zh_hant="輸入六位數字交易密碼即可完成："
                zh_hans="输入六位数字交易密码即可完成："
                en="Please Enter a 6-digit payment password"
              />
            </p>
            {InnerForm}
          </>
        )}
      </Dialog.Content>

      <Dialog.Footer
        btns={
          <Dialog.RoundedButton
            text={submitText}
            color={isHKD ? 'greyDarker' : 'green'}
            onClick={
              isHKD
                ? switchToResetPassword
                : isUSDT
                ? submitCallback
                : onSubmitLikeCoin
            }
          />
        }
        smUpBtns={
          <Dialog.TextButton
            text={submitText}
            color={isHKD ? 'greyDarker' : 'green'}
            onClick={
              isHKD
                ? switchToResetPassword
                : isUSDT
                ? submitCallback
                : onSubmitLikeCoin
            }
          />
        }
      />
    </>
  )
}

export default Confirm

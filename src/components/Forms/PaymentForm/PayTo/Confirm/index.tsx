import { useQuery } from '@apollo/react-hooks'
import { useFormik } from 'formik'
import _pickBy from 'lodash/pickBy'
import { useContext, useEffect } from 'react'
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
  IconExternalLink16,
  LanguageContext,
  Spinner,
  TextIcon,
  Translate,
  useMutation,
  ViewerContext,
} from '~/components'
import PAY_TO from '~/components/GQL/mutations/payTo'
import WALLET_BALANCE from '~/components/GQL/queries/walletBalance'
import updateDonation from '~/components/GQL/updates/donation'
import {
  ArticleDetailPublicQuery,
  PayToMutation,
  UserDonationRecipientFragment,
  WalletBalanceQuery,
} from '~/gql/graphql'

import PaymentInfo from '../../PaymentInfo'
import styles from './styles.css'

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
  const formId = 'pay-to-confirm-form'

  const viewer = useContext(ViewerContext)
  const { lang } = useContext(LanguageContext)
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

  const isUSDT = currency === CURRENCY.USDT

  useEffect(() => {
    if (isUSDT && (!address || isUnsupportedNetwork || !isConnectedAddress)) {
      switchToCurrencyChoice()
    }
  }, [address, chain])

  const {
    errors,
    handleSubmit,
    isValid,
    isSubmitting,
    setFieldValue,
    setTouched,
    touched,
    values,
  } = useFormik<FormValues>({
    initialValues: {
      password: '',
    },
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
          update: (cache) => {
            updateDonation({
              cache,
              id: article.id,
              viewer,
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
        const [messages, codes] = parseFormSubmitErrors(error as any, lang)
        setFieldError('password', messages[codes[0]])
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
    if (isValid && values.password.length === PAYMENT_PASSSWORD_LENGTH) {
      handleSubmit()
    }
  }, [values.password])

  const balance = data?.viewer?.wallet.balance.HKD || 0
  const isWalletInsufficient = balance < amount

  if (isSubmitting || loading) {
    return (
      <Dialog.Content hasGrow>
        <Spinner />
      </Dialog.Content>
    )
  }

  return (
    <>
      <Dialog.Content hasGrow>
        <section>
          <PaymentInfo
            amount={amount}
            currency={currency}
            recipient={recipient}
            showLikerID={currency === CURRENCY.LIKE}
            showEthAddress={currency === CURRENCY.USDT}
          >
            <p>
              <Button onClick={switchToSetAmount}>
                <TextIcon
                  size="xs"
                  textDecoration="underline"
                  color="grey-dark"
                >
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
              <p className="hint">
                <Translate
                  zh_hant="數入六位數字交易密碼即可完成："
                  zh_hans="数入六位数字交易密码即可完成："
                  en="Please Enter a 6-digit payment password"
                />
              </p>
              {InnerForm}
            </>
          )}

          <style jsx>{styles}</style>
        </section>
      </Dialog.Content>

      <Dialog.Footer>
        {currency === CURRENCY.HKD && (
          <Dialog.Footer.Button
            bgColor="white"
            textColor="grey"
            onClick={switchToResetPassword}
          >
            <Translate id="forgetPaymentPassword" />？
          </Dialog.Footer.Button>
        )}
        {currency === CURRENCY.USDT && (
          <Dialog.Footer.Button
            bgColor="green"
            textColor="white"
            onClick={submitCallback}
          >
            <Translate zh_hant="確認送出" zh_hans="确认送出" en="Confirm" />
          </Dialog.Footer.Button>
        )}
        {currency === CURRENCY.LIKE && (
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

export default Confirm

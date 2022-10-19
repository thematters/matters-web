import { useQuery } from '@apollo/react-hooks'
import { useFormik } from 'formik'
import _pickBy from 'lodash/pickBy'
import { useContext, useEffect } from 'react'
import { useAccount, useNetwork } from 'wagmi'

import {
  Button,
  Dialog,
  Form,
  LanguageContext,
  Spinner,
  TextIcon,
  Translate,
  useMutation,
  ViewerContext,
} from '~/components'
import PAY_TO from '~/components/GQL/mutations/payTo'
import WALLET_BALANCE from '~/components/GQL/queries/walletBalance'

import { PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'
import { parseFormSubmitErrors, validatePaymentPassword } from '~/common/utils'

import PaymentInfo from '../../PaymentInfo'
import styles from './styles.css'

import { UserDonationRecipient } from '~/components/Dialogs/DonationDialog/__generated__/UserDonationRecipient'
import { PayTo as PayToMutate } from '~/components/GQL/mutations/__generated__/PayTo'
import { WalletBalance } from '~/components/GQL/queries/__generated__/WalletBalance'

interface FormProps {
  amount: number
  currency: CURRENCY
  recipient: UserDonationRecipient
  targetId: string
  submitCallback: () => void
  switchToSetAmount: () => void
  switchToResetPassword: () => void
  switchToCurrencyChoice: () => void
}

interface FormValues {
  password: string
}

const Confirm: React.FC<FormProps> = ({
  amount,
  currency,
  recipient,
  targetId,
  submitCallback,
  switchToSetAmount,
  switchToResetPassword,
  switchToCurrencyChoice,
}) => {
  const formId = 'pay-to-confirm-form'

  const viewer = useContext(ViewerContext)
  const { lang } = useContext(LanguageContext)
  const [payTo] = useMutation<PayToMutate>(PAY_TO, undefined, {
    showToast: false,
  })

  const { data, loading } = useQuery<WalletBalance>(WALLET_BALANCE, {
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
    <Form id={formId} onSubmit={handleSubmit} noBackground>
      <Form.PinInput
        length={6}
        name="password"
        value={values.password}
        error={touched.password && errors.password}
        onChange={(value) => {
          const shouldValidate = value.length === 6
          setTouched({ password: true }, shouldValidate)
          setFieldValue('password', value, shouldValidate)
        }}
      />
    </Form>
  )

  useEffect(() => {
    if (isValid && values.password) {
      handleSubmit()
    }
  }, [isValid])

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
                <Translate id="hintPaymentPassword" />
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
            <Translate id="forgetPassword" />？
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
      </Dialog.Footer>
    </>
  )
}

export default Confirm

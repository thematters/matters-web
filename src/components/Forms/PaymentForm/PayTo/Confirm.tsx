import { useQuery } from '@apollo/react-hooks'
import classNames from 'classnames'
import { useFormik } from 'formik'
import _pickBy from 'lodash/pickBy'
import { useContext, useEffect } from 'react'

import { Dialog, Form, LanguageContext, Spinner, Translate } from '~/components'
import { useMutation } from '~/components/GQL'
import PAY_TO from '~/components/GQL/mutations/payTo'
import WALLET_BALANCE from '~/components/GQL/queries/walletBalance'

import { PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'
import {
  parseFormSubmitErrors,
  toAmountString,
  validatePaymentPassword,
} from '~/common/utils'

import styles from './styles.css'

import { UserDonationRecipient } from '~/components/Dialogs/DonationDialog/__generated__/UserDonationRecipient'
import {
  PayTo as PayToMutate,
  PayTo_payTo as PayToResult,
} from '~/components/GQL/mutations/__generated__/PayTo'
import { WalletBalance } from '~/components/GQL/queries/__generated__/WalletBalance'

interface FormProps {
  amount: number
  currency: CURRENCY
  recipient: UserDonationRecipient
  submitCallback: (
    values: Omit<PayToResult, '__typename' | 'redirectUrl'>
  ) => void
  switchToAddCredit: () => void
  switchToLike: () => void
  switchToPasswordInvalid: () => void
  targetId: string
}

interface FormValues {
  password: string
}

const Confirm: React.FC<FormProps> = ({
  amount,
  currency,
  recipient,
  submitCallback,
  switchToAddCredit,
  switchToLike,
  switchToPasswordInvalid,
  targetId,
}) => {
  const formId = 'pay-to-confirm-form'

  const { lang } = useContext(LanguageContext)
  const [payTo] = useMutation<PayToMutate>(PAY_TO)

  const { data, loading } = useQuery<WalletBalance>(WALLET_BALANCE)

  const {
    errors,
    handleSubmit,
    isValid,
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
        submitCallback({ transaction })
      } catch (error) {
        setSubmitting(false)
        const [messages, codes] = parseFormSubmitErrors(error, lang)
        setFieldError('password', messages[codes[0]])

        if (codes[0] === 'USER_PASSWORD_INVALID') {
          switchToPasswordInvalid()
        }
      }
    },
  })

  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit} noBackground>
      <Form.PinInput
        length={6}
        name="password"
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

  if (loading) {
    return <Spinner />
  }

  const balance = data?.viewer?.wallet.balance.HKD || 0
  const isWalletInsufficient = balance < amount
  const walletClasses = classNames({
    row: true,
    wallet: true,
    insufficient: isWalletInsufficient,
  })

  return (
    <>
      <Dialog.Content hasGrow>
        <section>
          <section className="confirm-info">
            <section className="row total">
              <div className="col">
                <Translate zh_hant="實際支付" zh_hans="实际支付" />
              </div>
              <div className="col">
                {currency} {toAmountString(amount)}
              </div>
            </section>

            <section className="row">
              <div className="col">
                <Translate zh_hant="作者實收" zh_hans="作者实收" />
              </div>
              <div className="col">
                {currency} {toAmountString(amount)}
              </div>
            </section>

            <section className="breaker" />

            <section className={walletClasses}>
              <div className="col">
                <Translate zh_hant="錢包餘額" zh_hans="钱包余额" />
              </div>
              <div className="col">
                {currency} {toAmountString(balance)}
              </div>
            </section>
          </section>

          {!isWalletInsufficient && InnerForm}
        </section>
      </Dialog.Content>

      {isWalletInsufficient && (
        <section className="confirm-footer">
          <Dialog.Footer>
            <Dialog.Footer.Button
              type="button"
              bgColor="green"
              onClick={switchToAddCredit}
            >
              <Translate id="topUp" />
            </Dialog.Footer.Button>

            <Dialog.Footer.Button
              type="button"
              bgColor="grey-lighter"
              textColor="black"
              onClick={switchToLike}
            >
              <Translate
                zh_hant="使用 LikeCoin 支持"
                zh_hans="使用 LikeCoin 支持"
              />
            </Dialog.Footer.Button>
          </Dialog.Footer>
        </section>
      )}
      <style jsx>{styles}</style>
    </>
  )
}

export default Confirm

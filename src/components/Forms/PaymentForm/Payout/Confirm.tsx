import { useQuery } from '@apollo/react-hooks'
import { useFormik } from 'formik'
import _pickBy from 'lodash/pickBy'
import { useContext, useRef } from 'react'

import { Dialog, Form, LanguageContext, Spinner, Tooltip, Translate } from '~/components'
import { useMutation } from '~/components/GQL'
import PAYOUT from '~/components/GQL/mutations/payout'
import WALLET_BALANCE from '~/components/GQL/queries/walletBalance'

import {
  PAYMENT_CURRENCY as CURRENCY,
  PAYMENT_MINIMAL_PAYOUT_AMOUNT,
  Z_INDEX,
} from '~/common/enums'
import {
  calcMattersFee,
  numRound,
  parseFormSubmitErrors,
  toAmountString,
  validatePaymentPassword,
  validatePayoutAmount,
} from '~/common/utils'

import ConfirmTable from '../ConfirmTable'
import styles from './styles.css'

import {
  Payout as PayoutMutate,
  Payout_payout as PayoutResult,
} from '~/components/GQL/mutations/__generated__/Payout'
import { WalletBalance } from '~/components/GQL/queries/__generated__/WalletBalance'

interface FormProps {
  balance: number
  currency: CURRENCY
  submitCallback: (tx: PayoutResult) => void
  switchToPasswordInvalid: () => void
}

interface FormValues {
  amount: number
  password: string
}

const BaseConfirm: React.FC<FormProps> = ({
  balance,
  currency,
  submitCallback,
  switchToPasswordInvalid,
}: FormProps) => {
  const formId = 'payout-confirm-form'

  const { lang } = useContext(LanguageContext)
  const inputRef: React.RefObject<any> | null = useRef(null)
  const [payout] = useMutation<PayoutMutate>(PAYOUT)

  const {
    errors,
    handleBlur,
    handleSubmit,
    isValid,
    isSubmitting,
    setFieldError,
    setFieldValue,
    setTouched,
    touched,
    values,
  } = useFormik<FormValues>({
    initialValues: {
      amount: PAYMENT_MINIMAL_PAYOUT_AMOUNT.HKD,
      password: '',
    },
    validate: ({ amount, password }) =>
      _pickBy({
        amount: validatePayoutAmount({
          min: PAYMENT_MINIMAL_PAYOUT_AMOUNT.HKD,
          max: balance,
          value: amount,
          lang,
        }),
        password: validatePaymentPassword(password, lang),
      }),
    onSubmit: async ({ amount, password }, { setSubmitting }) => {
      try {
        const result = await payout({
          variables: { amount, password },
        })
        const tx = result?.data?.payout
        if (!tx) {
          throw new Error()
        }
        setSubmitting(false)
        submitCallback(tx)
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

  const fee = calcMattersFee(values.amount)
  const total = Math.max(numRound(values.amount - fee), 0)

  return (
    <>
      <Dialog.Content hasGrow>
        <section>
          <Form id={formId} onSubmit={handleSubmit} noBackground>
            <ConfirmTable>
              <ConfirmTable.Row insufficient={false}>
                <ConfirmTable.Col>
                  <b>
                    <Translate zh_hant="錢包餘額" zh_hans="钱包余额" />
                  </b>
                </ConfirmTable.Col>

                <ConfirmTable.Col>
                  <b>
                    {currency} {toAmountString(balance)}
                  </b>
                </ConfirmTable.Col>
              </ConfirmTable.Row>
            </ConfirmTable>

            <Form.AmountInput
              autoFocus
              required
              min={PAYMENT_MINIMAL_PAYOUT_AMOUNT.HKD}
              max={balance}
              fixedPlaceholder={currency}
              label={<Translate zh_hant="提現金額" zh_hans="提现金额" />}
              name="amount"
              value={values.amount}
              error={touched.amount && errors.amount}
              onBlur={handleBlur}
              onChange={(e) => {
                const value = e.target.valueAsNumber || 0
                const sanitizedAmount = Math.abs(Math.max(Math.floor(value), 0))
                if (inputRef.current) {
                  inputRef.current.value = sanitizedAmount
                }
                setFieldValue('amount', sanitizedAmount)
              }}
              ref={inputRef}
            />

            <ConfirmTable>
              <ConfirmTable.Row>
                <ConfirmTable.Col>
                  <Translate zh_hant="提現金額" zh_hans="提现金额" />
                </ConfirmTable.Col>

                <ConfirmTable.Col>
                  {currency} {toAmountString(values.amount)}
                </ConfirmTable.Col>
              </ConfirmTable.Row>

              <Tooltip
                content={
                  <Translate
                    zh_hant="用於支付 Stripe 手續費，並支持 Matters 運營"
                    zh_hans="用于支付 Stripe 手续费，并支持 Matters 运营"
                  />
                }
                placement="top"
                zIndex={Z_INDEX.OVER_DIALOG}
              >
                <section>
                  <ConfirmTable.Row>
                    <ConfirmTable.Col>
                          <Translate zh_hant="服務費 (20%)" zh_hans="服务费 (20%)" />
                    </ConfirmTable.Col>

                    <ConfirmTable.Col>
                      - {currency} {toAmountString(fee)}
                    </ConfirmTable.Col>
                  </ConfirmTable.Row>
                </section>
              </Tooltip>

              <ConfirmTable.Row total>
                <ConfirmTable.Col>
                  <Translate zh_hant="實際提現" zh_hans="实际提现" />
                </ConfirmTable.Col>

                <ConfirmTable.Col>
                  {currency} {toAmountString(total)}
                </ConfirmTable.Col>
              </ConfirmTable.Row>
            </ConfirmTable>

            <Form.PinInput
              length={6}
              name="password"
              error={touched.password && errors.password}
              onChange={(value) => {
                const shouldValidate = value.length === 6
                setTouched({ amount: true, password: true }, shouldValidate)
                setFieldValue('password', value, shouldValidate)
              }}
            />
          </Form>
        </section>
      </Dialog.Content>

      <Dialog.Footer>
        <Dialog.Footer.Button
          type="submit"
          form={formId}
          disabled={!isValid || isSubmitting}
          bgColor="green"
          textColor="white"
          loading={isSubmitting}
        >
          <Translate id="confirm" />
        </Dialog.Footer.Button>
      </Dialog.Footer>
      <style jsx>{styles}</style>
    </>
  )
}

const Confirm = (props: Omit<FormProps, 'balance'>) => {
  const { data, loading } = useQuery<WalletBalance>(WALLET_BALANCE)

  if (loading) {
    return <Spinner />
  }

  const balance = data?.viewer?.wallet.balance.HKD || 0
  return <BaseConfirm {...props} balance={balance} />
}

export default Confirm

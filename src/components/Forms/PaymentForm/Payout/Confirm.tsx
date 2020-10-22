import { useQuery } from '@apollo/react-hooks'
import { useFormik } from 'formik'
import _pickBy from 'lodash/pickBy'
import { useContext, useRef } from 'react'

import {
  Dialog,
  Form,
  IconHelpMedium,
  LanguageContext,
  Spinner,
  TextIcon,
  Tooltip,
  Translate,
} from '~/components'
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

import { Payout as PayoutMutate } from '~/components/GQL/mutations/__generated__/Payout'
import { WalletBalance } from '~/components/GQL/queries/__generated__/WalletBalance'

interface FormProps {
  balance: number
  currency: CURRENCY
  submitCallback: () => void
  switchToResetPassword: () => void
}

interface FormValues {
  amount: number
  password: string
}

const BaseConfirm: React.FC<FormProps> = ({
  balance,
  currency,
  submitCallback,
  switchToResetPassword,
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
        submitCallback()
      } catch (error) {
        setSubmitting(false)

        const [messages, codes] = parseFormSubmitErrors(error, lang)
        setFieldError('password', messages[codes[0]])
        setFieldValue('password', '', false)
      }
    },
  })

  const fee = calcMattersFee(values.amount)
  const total = Math.max(numRound(values.amount - fee), 0)

  return (
    <>
      <Dialog.Content hasGrow>
        <Form id={formId} onSubmit={handleSubmit} noBackground>
          <ConfirmTable>
            <ConfirmTable.Row type="balance">
              <ConfirmTable.Col>
                <Translate id="walletBalance" />
              </ConfirmTable.Col>

              <ConfirmTable.Col>
                {currency} {toAmountString(balance)}
              </ConfirmTable.Col>
            </ConfirmTable.Row>
          </ConfirmTable>

          <Form.AmountInput
            autoFocus
            required
            min={PAYMENT_MINIMAL_PAYOUT_AMOUNT.HKD}
            max={balance}
            currency={currency}
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

            <ConfirmTable.Row>
              <ConfirmTable.Col>
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
                  <span>
                    <TextIcon
                      icon={<IconHelpMedium />}
                      spacing="xxtight"
                      textPlacement="left"
                    >
                      <Translate
                        zh_hant="服務費 (20%)"
                        zh_hans="服务费 (20%)"
                      />
                    </TextIcon>
                  </span>
                </Tooltip>
              </ConfirmTable.Col>

              <ConfirmTable.Col>
                - {currency} {toAmountString(fee)}
              </ConfirmTable.Col>
            </ConfirmTable.Row>

            <ConfirmTable.Row type="total">
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
            value={values.password}
            error={touched.password && errors.password}
            hint={<Translate id="hintPaymentPassword" />}
            onChange={(value) => {
              const shouldValidate = value.length === 6
              setTouched({ amount: true, password: true }, shouldValidate)
              setFieldValue('password', value, shouldValidate)
            }}
          />
        </Form>
      </Dialog.Content>

      <Dialog.Footer>
        <Dialog.Footer.Button
          type="submit"
          form={formId}
          disabled={!isValid || isSubmitting}
          loading={isSubmitting}
        >
          <Translate id="confirm" />
        </Dialog.Footer.Button>

        <Dialog.Footer.Button
          bgColor="white"
          textColor="grey"
          onClick={switchToResetPassword}
        >
          <Translate id="forgetPassword" />？
        </Dialog.Footer.Button>
      </Dialog.Footer>
    </>
  )
}

const Confirm = (props: Omit<FormProps, 'balance'>) => {
  const { data, loading } = useQuery<WalletBalance>(WALLET_BALANCE, {
    fetchPolicy: 'network-only',
  })
  const balance = data?.viewer?.wallet.balance.HKD || 0

  if (loading) {
    return <Spinner />
  }

  return <BaseConfirm {...props} balance={balance} />
}

export default Confirm

import { useQuery } from '@apollo/client'
import { useFormik } from 'formik'
import _pickBy from 'lodash/pickBy'
import { useRef } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { ReactComponent as IconHelp } from '@/public/static/icons/24px/help.svg'
import {
  PAYMENT_CURRENCY as CURRENCY,
  PAYMENT_MINIMAL_PAYOUT_AMOUNT,
  PAYMENT_PASSSWORD_LENGTH,
  Z_INDEX,
} from '~/common/enums'
import {
  calcMattersFee,
  formatAmount,
  numRound,
  parseFormSubmitErrors,
  validatePaymentPassword,
  validatePayoutAmount,
} from '~/common/utils'
import {
  Dialog,
  Form,
  Icon,
  SpinnerBlock,
  TextIcon,
  Tooltip,
  Translate,
  useMutation,
} from '~/components'
import PAYOUT from '~/components/GQL/mutations/payout'
import WALLET_BALANCE from '~/components/GQL/queries/walletBalance'
import { PayoutMutation, WalletBalanceQuery } from '~/gql/graphql'

import ConfirmTable from '../ConfirmTable'

interface FormProps {
  balance: number
  currency: CURRENCY
  submitCallback: () => void
  switchToResetPassword: () => void
  closeDialog: () => void
  back?: () => void
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
  closeDialog,
  back,
}: FormProps) => {
  const intl = useIntl()
  const formId = 'payout-confirm-form'

  const inputRef: React.RefObject<any> | null = useRef(null)
  const [payout] = useMutation<PayoutMutation>(PAYOUT, undefined, {
    showToast: false,
  })

  const {
    errors,
    handleBlur,
    handleSubmit,
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
    validateOnBlur: false,
    validateOnChange: false,
    validate: ({ amount, password }) =>
      _pickBy({
        amount: validatePayoutAmount({
          min: PAYMENT_MINIMAL_PAYOUT_AMOUNT.HKD,
          max: balance,
          value: amount,
          intl,
        }),
        password: validatePaymentPassword(password, intl),
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

        const [messages, codes] = parseFormSubmitErrors(error as any)
        setFieldError('password', intl.formatMessage(messages[codes[0]]))
        setFieldValue('password', '', false)
      }
    },
  })

  const fee = calcMattersFee(values.amount)
  const total = Math.max(numRound(values.amount - fee), 0)

  const SubmitButton = (
    <Dialog.TextButton
      text={<FormattedMessage defaultMessage="Confirm" id="N2IrpM" />}
      type="submit"
      form={formId}
      disabled={isSubmitting}
      loading={isSubmitting}
    />
  )

  return (
    <>
      <Dialog.Header
        title={<FormattedMessage defaultMessage="Withdraw" id="PXAur5" />}
        closeDialog={closeDialog}
        leftBtn={
          back ? (
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Back" id="cyR7Kh" />}
              onClick={back}
            />
          ) : undefined
        }
        rightBtn={SubmitButton}
      />

      <Dialog.Content>
        <Form id={formId} onSubmit={handleSubmit}>
          <ConfirmTable>
            <ConfirmTable.Row type="balance">
              <ConfirmTable.Col>
                <FormattedMessage defaultMessage="Balance" id="H5+NAX" />
              </ConfirmTable.Col>

              <ConfirmTable.Col>
                {currency} {formatAmount(balance)}
              </ConfirmTable.Col>
            </ConfirmTable.Row>
          </ConfirmTable>

          <Form.AmountInput
            label={
              <Translate
                zh_hant="提現金額"
                zh_hans="提现金额"
                en="Withdraw amoumt"
              />
            }
            hasLabel
            name="amount"
            value={values.amount}
            error={touched.amount && errors.amount}
            required
            min={PAYMENT_MINIMAL_PAYOUT_AMOUNT.HKD}
            max={balance}
            currency={currency}
            onBlur={handleBlur}
            onChange={(e) => {
              const amount = e.target.valueAsNumber || 0

              // remove extra left pad 0
              if (inputRef.current) {
                inputRef.current.value = amount
              }
              setFieldValue('amount', amount)
            }}
            ref={inputRef}
            spacingBottom="base"
          />

          <ConfirmTable>
            <ConfirmTable.Row>
              <ConfirmTable.Col>
                <Translate
                  zh_hant="提現金額"
                  zh_hans="提现金额"
                  en="Withdraw amount"
                />
              </ConfirmTable.Col>

              <ConfirmTable.Col>
                {currency} {formatAmount(values.amount)}
              </ConfirmTable.Col>
            </ConfirmTable.Row>

            <ConfirmTable.Row>
              <ConfirmTable.Col>
                <Tooltip
                  content={
                    <Translate
                      zh_hant="用於支付 Stripe 手續費，並支持 Matters 運營"
                      zh_hans="用于支付 Stripe 手续费，并支持 Matters 运营"
                      en="used for Stripe transcation fee and Matters operation"
                    />
                  }
                  placement="top"
                  zIndex={Z_INDEX.OVER_DIALOG}
                >
                  <span>
                    <TextIcon
                      icon={<Icon icon={IconHelp} />}
                      spacing={4}
                      placement="left"
                    >
                      <Translate
                        zh_hant="服務費 (20%)"
                        zh_hans="服务费 (20%)"
                        en="Service fee (20%)"
                      />
                    </TextIcon>
                  </span>
                </Tooltip>
              </ConfirmTable.Col>

              <ConfirmTable.Col>
                - {currency} {formatAmount(fee)}
              </ConfirmTable.Col>
            </ConfirmTable.Row>

            <ConfirmTable.Row type="total">
              <ConfirmTable.Col>
                <Translate
                  zh_hant="實際提現"
                  zh_hans="实际提现"
                  en="Final withdraw amount"
                />
              </ConfirmTable.Col>

              <ConfirmTable.Col>
                {currency} {formatAmount(total)}
              </ConfirmTable.Col>
            </ConfirmTable.Row>
          </ConfirmTable>

          <Form.PinInput
            length={PAYMENT_PASSSWORD_LENGTH}
            name="password"
            value={values.password}
            error={touched.password && errors.password}
            hint={
              <FormattedMessage
                defaultMessage="Enter a 6-digit payment password."
                id="OpeFTV"
              />
            }
            onChange={(value) => {
              const shouldValidate = value.length === PAYMENT_PASSSWORD_LENGTH
              setTouched({ amount: true, password: true }, shouldValidate)
              setFieldValue('password', value, shouldValidate)
            }}
          />
        </Form>
      </Dialog.Content>

      <Dialog.Footer
        btns={
          <Dialog.RoundedButton
            text={
              <FormattedMessage defaultMessage="Forget Password" id="N6PWfU" />
            }
            color="greyDarker"
            onClick={switchToResetPassword}
          />
        }
        smUpBtns={
          <>
            <Dialog.TextButton
              text={
                back ? (
                  <FormattedMessage defaultMessage="Back" id="cyR7Kh" />
                ) : (
                  <FormattedMessage defaultMessage="Cancel" id="47FYwb" />
                )
              }
              color="greyDarker"
              onClick={back || closeDialog}
            />

            <Dialog.TextButton
              text={
                <FormattedMessage
                  defaultMessage="Forget Password"
                  id="N6PWfU"
                />
              }
              color="greyDarker"
              onClick={switchToResetPassword}
            />

            {SubmitButton}
          </>
        }
      />
    </>
  )
}

const Confirm = (props: Omit<FormProps, 'balance'>) => {
  const { data, loading } = useQuery<WalletBalanceQuery>(WALLET_BALANCE, {
    fetchPolicy: 'network-only',
  })
  const balance = data?.viewer?.wallet.balance.HKD || 0

  if (loading) {
    return <SpinnerBlock />
  }

  return <BaseConfirm {...props} balance={balance} />
}

export default Confirm

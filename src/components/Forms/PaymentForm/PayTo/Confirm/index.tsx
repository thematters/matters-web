import { useQuery } from '@apollo/react-hooks'
import { useFormik } from 'formik'
import _pickBy from 'lodash/pickBy'
import { useContext, useEffect } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import {
  PAYMENT_CURRENCY as CURRENCY,
  PAYMENT_PASSSWORD_LENGTH,
} from '~/common/enums'
import { parseFormSubmitErrors, validatePaymentPassword } from '~/common/utils'
import {
  BindEmailHintDialog,
  Dialog,
  Form,
  IconOpenWallet20,
  // IconExternalLink16,
  LanguageContext,
  ResetPaymentPasswordDialog,
  Spacer,
  Spinner,
  TextIcon,
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
  openTabCallback,
  tabUrl,
  tx,
}) => {
  const intl = useIntl()
  const { lang } = useContext(LanguageContext)
  const viewer = useContext(ViewerContext)
  const hasEmail = !!viewer.info.email

  const formId = 'pay-to-confirm-form'

  const [payTo] = useMutation<PayToMutation>(PAY_TO, undefined, {
    showToast: false,
  })

  const { data, loading } = useQuery<WalletBalanceQuery>(WALLET_BALANCE, {
    fetchPolicy: 'network-only',
  })

  const isHKD = currency === CURRENCY.HKD
  const isUSDT = currency === CURRENCY.USDT
  const isLIKE = currency === CURRENCY.LIKE

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
        if (codes[0] === 'USER_PASSWORD_INVALID') {
          setFieldError(
            'password',
            intl.formatMessage({
              defaultMessage: 'Incorrect password',
              id: 'CPvyYN',
            })
          )
        } else {
          setFieldError('password', intl.formatMessage(messages[codes[0]]))
        }
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
        hintAlign="center"
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

  if (loading) {
    return (
      <Dialog.Content>
        <Spinner />
      </Dialog.Content>
    )
  }

  // TODO: Will reuse in like-coin support
  const onSubmitLikeCoin = () => {
    const payWindow = window.open(tabUrl, '_blank')
    if (payWindow && tx) {
      openTabCallback({ window: payWindow, transaction: tx })
    }
  }

  return (
    <section className={styles.container}>
      <PaymentInfo
        amount={amount}
        currency={currency}
        recipient={recipient}
        showLikerID={currency === CURRENCY.LIKE}
        showEthAddress={currency === CURRENCY.USDT}
      />

      {isSubmitting && (
        <>
          <Spinner noSpacing />
          <p className={styles.hint}>
            <FormattedMessage
              defaultMessage="Transaction in progress, please wait"
              id="SebPdz"
            />
          </p>
        </>
      )}

      {isHKD && !isWalletInsufficient && !isSubmitting && (
        <>
          <p className={styles.hint}>
            <FormattedMessage
              defaultMessage="Enter transaction password"
              id="zaY8Cu"
              description="src/components/Forms/PaymentForm/PayTo/Confirm/index.tsx"
            />
          </p>
          {InnerForm}

          <BindEmailHintDialog>
            {({ openDialog: openBindEmailHintDialog }) => (
              <ResetPaymentPasswordDialog autoCloseDialog>
                {({ openDialog: openResetPaymentPasswordDialog }) => (
                  <button
                    className={styles.forgetPassword}
                    onClick={
                      hasEmail
                        ? openResetPaymentPasswordDialog
                        : openBindEmailHintDialog
                    }
                  >
                    <FormattedMessage
                      defaultMessage="Forgot transaction password?"
                      id="7UqcsO"
                      description="src/components/Forms/PaymentForm/PayTo/Confirm/index.tsx"
                    />
                  </button>
                )}
              </ResetPaymentPasswordDialog>
            )}
          </BindEmailHintDialog>
        </>
      )}

      {(isUSDT || isLIKE) && !isSubmitting && (
        <>
          <Dialog.RoundedButton
            color="white"
            bgColor="green"
            onClick={isUSDT ? submitCallback : onSubmitLikeCoin}
            textWeight="normal"
            textSize="md"
            text={
              <TextIcon icon={<IconOpenWallet20 size="mdS" />}>
                {isUSDT && (
                  <FormattedMessage
                    defaultMessage="Confirm authorization"
                    id="/NX9L+"
                    description="src/components/Forms/PaymentForm/PayTo/Confirm/index.tsx"
                  />
                )}
                {isLIKE && (
                  <FormattedMessage
                    defaultMessage="Confirm"
                    id="xDhqHi"
                    description="src/components/Forms/PaymentForm/PayTo/Confirm/index.tsx"
                  />
                )}
              </TextIcon>
            }
          />
          <Spacer size="base" />
        </>
      )}

      {!isSubmitting && (
        <Dialog.RoundedButton
          color="black"
          onClick={switchToSetAmount}
          borderColor="greyLight"
          borderWidth="sm"
          textWeight="normal"
          borderActiveColor="grey"
          text={
            <FormattedMessage
              defaultMessage="Back"
              id="QfrKA6"
              description="src/components/Forms/PaymentForm"
            />
          }
        />
      )}
    </section>
  )
}

export default Confirm

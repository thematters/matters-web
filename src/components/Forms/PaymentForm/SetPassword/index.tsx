import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _pickBy from 'lodash/pickBy'
import React, { useContext, useEffect } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'
import { PAYMENT_PASSSWORD_LENGTH } from '~/common/enums'
import {
  parseFormSubmitErrors,
  validateComparedPassword,
  validatePaymentPassword,
} from '~/common/utils'
import {
  Dialog,
  Form,
  LanguageContext,
  Spacer,
  useMutation,
  useStep,
} from '~/components'
import {
  SetPaymentPasswordMutation,
  UserDonationRecipientFragment,
} from '~/gql/graphql'

import PaymentInfo from '../PaymentInfo'
import styles from './styles.module.css'

interface FormProps {
  submitCallback: () => void
  closeDialog?: () => any
  amount: number
  currency: CURRENCY
  recipient: UserDonationRecipientFragment
  switchToSetAmount: () => void
}

interface FormValues {
  password: string
  comparedPassword: string
}

const SET_PAYMENT_PASSWORD = gql`
  mutation SetPaymentPassword($password: String) {
    updateUserInfo(input: { paymentPassword: $password }) {
      id
      status {
        hasPaymentPassword
      }
    }
  }
`

const PaymentSetPasswordForm: React.FC<FormProps> = ({
  submitCallback,
  closeDialog,
  amount,
  currency,
  recipient,
  switchToSetAmount,
}) => {
  const intl = useIntl()
  const { lang } = useContext(LanguageContext)

  const [setPassword] = useMutation<SetPaymentPasswordMutation>(
    SET_PAYMENT_PASSWORD,
    undefined,
    { showToast: false }
  )

  const { currStep, forward } = useStep<'password' | 'comparedPassword'>(
    'password'
  )
  const isInPassword = currStep === 'password'
  const isInComparedPassword = currStep === 'comparedPassword'

  const {
    values,
    errors,
    isSubmitting,
    handleSubmit,
    setFieldValue,
    touched,
    setTouched,
  } = useFormik<FormValues>({
    initialValues: {
      password: '',
      comparedPassword: '',
    },
    validateOnBlur: false,
    validateOnChange: true,
    validate: ({ password, comparedPassword }) => {
      const passwordError = validatePaymentPassword(password, lang)
      const comparedPasswordError = validateComparedPassword(
        password,
        comparedPassword,
        lang
      )

      // jump to next step
      if (!passwordError && isInPassword) {
        forward('comparedPassword')
      }

      if (comparedPasswordError) {
        setFieldValue('comparedPassword', '', false)
      }

      return _pickBy({
        password: isInPassword && passwordError,
        comparedPassword: isInComparedPassword && comparedPasswordError,
      })
    },
    onSubmit: async ({ password }, { setFieldError, setSubmitting }) => {
      try {
        await setPassword({ variables: { password } })

        setSubmitting(false)
        submitCallback()
      } catch (error) {
        setSubmitting(false)

        const [messages, codes] = parseFormSubmitErrors(error as any)
        setFieldError('password', intl.formatMessage(messages[codes[0]]))
        setFieldValue('comparedPassword', '', false)
      }
    },
  })

  const InnerForm = (
    <Form onSubmit={handleSubmit}>
      {isInPassword && (
        <Form.PinInput
          length={PAYMENT_PASSSWORD_LENGTH}
          name="password"
          value={values.password}
          error={touched.password && errors.password}
          hintAlign="center"
          onChange={(value) => {
            const shouldValidate = value.length === PAYMENT_PASSSWORD_LENGTH
            setTouched({ password: true }, shouldValidate)
            setFieldValue('password', value, shouldValidate)
          }}
        />
      )}
      {isInComparedPassword && (
        <Form.PinInput
          length={PAYMENT_PASSSWORD_LENGTH}
          name="compared-password"
          value={values.comparedPassword}
          error={touched.comparedPassword && errors.comparedPassword}
          onChange={(value) => {
            const shouldValidate = value.length === PAYMENT_PASSSWORD_LENGTH
            setTouched({ comparedPassword: true }, shouldValidate)
            setFieldValue('comparedPassword', value, shouldValidate)
          }}
          hintAlign="center"
        />
      )}
    </Form>
  )

  useEffect(() => {
    // submit on validate
    if (
      values.password.length === PAYMENT_PASSSWORD_LENGTH &&
      values.comparedPassword.length === PAYMENT_PASSSWORD_LENGTH
    ) {
      handleSubmit()
    }
  }, [values.password, values.comparedPassword])

  return (
    <section className={styles.container}>
      <PaymentInfo amount={amount} currency={currency} recipient={recipient} />

      <p className={styles.hint}>
        {isInPassword && (
          <FormattedMessage
            defaultMessage="Welcome to use your wallet! {br} Please set a transaction password first"
            id="1WeErK"
            values={{ br: <br /> }}
            description="src/components/Forms/PaymentForm/SetPassword/index.tsx"
          />
        )}
        {isInComparedPassword && (
          <FormattedMessage
            defaultMessage="Please confirm transaction password"
            id="RU5NDB"
            description="src/components/Forms/PaymentForm/SetPassword/index.tsx"
          />
        )}
      </p>

      {InnerForm}

      {!isSubmitting && (
        <>
          <Spacer size="loose" />
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
        </>
      )}
    </section>
  )
}

export default PaymentSetPasswordForm

import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _pickBy from 'lodash/pickBy'
import React, { useContext, useEffect } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

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
  Spinner,
  Translate,
  useMutation,
  useStep,
} from '~/components'
import { SetPaymentPasswordMutation } from '~/gql/graphql'

import styles from './styles.module.css'

interface FormProps {
  submitCallback: () => void
  closeDialog?: () => any
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

const SetPaymentPasswordContent: React.FC<FormProps> = ({
  submitCallback,
  closeDialog,
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
          hint={
            <FormattedMessage
              defaultMessage="Enter a 6-digit payment password."
              id="OpeFTV"
            />
          }
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
          hint={
            <FormattedMessage
              defaultMessage="Enter a 6-digit payment password."
              id="OpeFTV"
            />
          }
          onChange={(value) => {
            const shouldValidate = value.length === PAYMENT_PASSSWORD_LENGTH
            setTouched({ comparedPassword: true }, shouldValidate)
            setFieldValue('comparedPassword', value, shouldValidate)
          }}
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

  if (isSubmitting) {
    return (
      <Dialog.Content>
        <Spinner />
      </Dialog.Content>
    )
  }

  return (
    <>
      <Dialog.Header
        title={
          <FormattedMessage defaultMessage="Transaction Password" id="9UNFGm" />
        }
        closeDialog={closeDialog}
      />

      <Dialog.Content>
        <section className={styles.reason}>
          {isInPassword && (
            <p>
              <FormattedMessage
                defaultMessage="To protect your assets,"
                id="bhehIF"
              />
              <br />
              <FormattedMessage
                defaultMessage="please set transaction password before top-up"
                id="yBkdMI"
              />
            </p>
          )}

          {isInComparedPassword && (
            <p>
              <FormattedMessage
                defaultMessage="Enter a 6-digit payment password."
                id="OpeFTV"
              />
            </p>
          )}

          <p className={styles.hint}>
            <Translate id="hintPaymentPassword" />
          </p>
        </section>

        {InnerForm}
      </Dialog.Content>

      <Dialog.Footer
        smUpBtns={
          <Dialog.TextButton
            text={<FormattedMessage defaultMessage="Cancel" id="47FYwb" />}
            color="greyDarker"
            onClick={closeDialog}
          />
        }
      />
    </>
  )
}

export default SetPaymentPasswordContent

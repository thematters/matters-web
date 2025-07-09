import { ApolloError } from '@apollo/client'
import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _pickBy from 'lodash/pickBy'
import React, { useContext, useId } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import {
  ERROR_CODES,
  KEYVALUE,
  MAX_CHANGE_EMAIL_TIME_DAILY,
  TOAST_SEND_EMAIL_VERIFICATION,
} from '~/common/enums'
import {
  emailVerifyCallbackUrl,
  parseFormSubmitErrors,
  validateEmail,
} from '~/common/utils'
import { Dialog, Form, useMutation, ViewerContext } from '~/components'
import SEND_CODE from '~/components/GQL/mutations/sendCode'
import {
  SendVerificationCodeMutation,
  SetEmailMutation,
  VerificationCodeType,
} from '~/gql/graphql'

interface FormProps {
  closeDialog: () => void
}

interface FormValues {
  email: string
}

const SET_EMAIL = gql`
  mutation SetEmail($input: SetEmailInput!) {
    setEmail(input: $input) {
      id
      info {
        email
        emailVerified
      }
      status {
        changeEmailTimesLeft
      }
    }
  }
`

const SetEmailDialogContent: React.FC<FormProps> = ({ closeDialog }) => {
  const viewer = useContext(ViewerContext)
  const intl = useIntl()

  const presetEmail = viewer.info.email
  const formId = useId()

  const hasPassword = !!viewer.status?.hasEmailLoginPassword
  const editable = (viewer.status?.changeEmailTimesLeft as number) > 0

  const [set] = useMutation<SetEmailMutation>(SET_EMAIL, undefined, {
    showToast: false,
  })
  const [sendCode] = useMutation<SendVerificationCodeMutation>(
    SEND_CODE,
    undefined,
    { showToast: false }
  )

  const {
    values,
    errors,
    touched,
    // handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useFormik<FormValues>({
    initialValues: {
      email: presetEmail,
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: ({ email }) =>
      _pickBy({
        email: validateEmail(email, intl, { allowPlusSign: true }),
      }),
    onSubmit: async ({ email }, { setSubmitting, setFieldError }) => {
      try {
        await set({ variables: { input: { email } } })

        const redirectUrl = emailVerifyCallbackUrl(email)

        await sendCode({
          variables: {
            input: {
              email: values.email,
              type: VerificationCodeType.EmailVerify,
              redirectUrl,
            },
          },
        })

        // toast
        window.dispatchEvent(new CustomEvent(TOAST_SEND_EMAIL_VERIFICATION))

        setSubmitting(false)
        closeDialog()
      } catch (error) {
        const [messages, codes] = parseFormSubmitErrors(error as ApolloError)
        codes.forEach((code) => {
          if (code.includes(ERROR_CODES.FORBIDDEN_BY_STATE)) {
            setFieldError(
              'email',
              intl.formatMessage({
                defaultMessage: 'Unavailable',
                id: 'rADhX5',
                description: 'FORBIDDEN_BY_STATE',
              })
            )
          } else {
            setFieldError('email', intl.formatMessage(messages[code]))
          }
        })
        setSubmitting(false)
      }
    },
  })

  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit}>
      <Form.Input
        type="email"
        name="email"
        required
        autoFocus
        placeholder="Email"
        disabled={!editable}
        value={values.email}
        error={touched.email && errors.email}
        // FIXME: handleBlur will cause the component to re-render
        // onBlur={handleBlur}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key.toLowerCase() === KEYVALUE.enter) {
            e.stopPropagation()
          }
        }}
      />
    </Form>
  )

  const SubmitButton = (
    <Dialog.TextButton
      type="submit"
      form={formId}
      disabled={
        isSubmitting || values.email === '' || presetEmail === values.email
      }
      text={<FormattedMessage defaultMessage="Confirm" id="N2IrpM" />}
      loading={isSubmitting}
    />
  )

  return (
    <>
      <Dialog.Header
        title={
          <FormattedMessage
            defaultMessage="Email address"
            id="FEI5Fv"
            description="src/components/Dialogs/SetEmailDialog/Content.tsx"
          />
        }
        closeDialog={closeDialog}
        rightBtn={editable ? SubmitButton : undefined}
      />

      <Dialog.Content>
        {editable && hasPassword && (
          <Dialog.Content.Message spacingBottom>
            <p>
              <FormattedMessage
                defaultMessage="For security, we will {resetHint} for this. You can set your password again after verifying new email address."
                id="h9A6AT"
                description="src/components/Dialogs/SetEmailDialog/Content.tsx"
                values={{
                  resetHint: (
                    <span className="u-highlight">
                      <FormattedMessage
                        defaultMessage="reset your login password"
                        id="vsD2wm"
                        description="src/components/Dialogs/SetEmailDialog/Content.tsx"
                      ></FormattedMessage>
                    </span>
                  ),
                }}
              />
            </p>
          </Dialog.Content.Message>
        )}

        {!editable && (
          <Dialog.Content.Message spacingBottom>
            <p>
              <FormattedMessage
                defaultMessage="Email can be modified up to {count} times per day."
                id="0e1xjL"
                description="src/components/Dialogs/SetEmailDialog/Content.tsx"
                values={{
                  count: MAX_CHANGE_EMAIL_TIME_DAILY,
                }}
              />
            </p>
          </Dialog.Content.Message>
        )}

        {InnerForm}
      </Dialog.Content>

      {editable && (
        <Dialog.Footer
          smUpBtns={
            <>
              <Dialog.TextButton
                text={<FormattedMessage defaultMessage="Cancel" id="47FYwb" />}
                color="greyDarker"
                onClick={closeDialog}
              />
              {SubmitButton}
            </>
          }
        />
      )}
      {!editable && (
        <Dialog.Footer
          smUpBtns={
            <>
              <Dialog.TextButton
                text={<FormattedMessage defaultMessage="Close" id="rbrahO" />}
                color="greyDarker"
                onClick={closeDialog}
              />
            </>
          }
        />
      )}
    </>
  )
}

export default SetEmailDialogContent

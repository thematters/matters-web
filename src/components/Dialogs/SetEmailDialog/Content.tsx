import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _pickBy from 'lodash/pickBy'
import React, { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import {
  CALLBACK_PROVIDERS,
  KEYVALUE,
  MAX_CHANGE_EMAIL_TIME_DAILY,
  TOAST_SEND_EMAIL_VERIFICATION,
} from '~/common/enums'
import { parseFormSubmitErrors, validateEmail } from '~/common/utils'
import {
  Dialog,
  Form,
  LanguageContext,
  useMutation,
  ViewerContext,
} from '~/components'
import SEND_CODE from '~/components/GQL/mutations/sendCode'
import { ROOT_QUERY_PRIVATE } from '~/components/Root/gql'
import {
  SendVerificationCodeMutation,
  SetEmailMutation,
  VerificationCodeType,
} from '~/gql/graphql'

import styles from './styles.module.css'

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
    }
  }
`

const SetEmailDialogContent: React.FC<FormProps> = ({ closeDialog }) => {
  const viewer = useContext(ViewerContext)
  const hasPassword = !!viewer.status?.hasEmailLoginPassword
  // TODO: max change email limit
  const editable = true

  const [set] = useMutation<SetEmailMutation>(SET_EMAIL, undefined, {
    showToast: false,
  })

  const [sendCode] = useMutation<SendVerificationCodeMutation>(
    SEND_CODE,
    undefined,
    {
      showToast: false,
    }
  )

  const intl = useIntl()
  const { lang } = useContext(LanguageContext)

  const presetEmail = viewer.info.email
  const formId = 'edit-email-form'

  const {
    values,
    errors,
    touched,
    handleBlur,
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
        email: validateEmail(email, lang, { allowPlusSign: true }),
      }),
    onSubmit: async ({ email }, { setSubmitting, setFieldError }) => {
      try {
        await set({
          variables: {
            input: {
              email,
            },
          },
          refetchQueries: [
            {
              query: ROOT_QUERY_PRIVATE,
            },
          ],
        })

        const redirectPath = `/callback/${CALLBACK_PROVIDERS.EmailVerification}`
        const redirectUrl = `${
          process.env.NEXT_PUBLIC_SITE_DOMAIN
        }${redirectPath}?email=${encodeURIComponent(email)}`

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
        const [messages, codes] = parseFormSubmitErrors(error as any)
        codes.forEach((code) => {
          setFieldError('email', intl.formatMessage(messages[code]))
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
        placeholder="Email"
        disabled={!editable}
        value={values.email}
        error={touched.email && errors.email}
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key.toLocaleLowerCase() === KEYVALUE.enter) {
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
      text={<FormattedMessage defaultMessage="Confirm" />}
      loading={isSubmitting}
    />
  )

  return (
    <>
      <Dialog.Header
        title={
          <FormattedMessage
            defaultMessage="Email address"
            description="src/components/Dialogs/SetEmailDialog/Content.tsx"
          />
        }
        closeDialog={closeDialog}
        rightBtn={editable ? SubmitButton : undefined}
      />

      {editable && hasPassword && (
        <>
          <Dialog.Message noSpacingBottom>
            <p className={styles.hint}>
              <FormattedMessage
                defaultMessage="For security, we will {resetHint} for this. You can set your password again after verifying new email address."
                description="src/components/Dialogs/SetEmailDialog/Content.tsx"
                values={{
                  resetHint: (
                    <span className="u-highlight">
                      <FormattedMessage
                        defaultMessage="reset your login password"
                        description="src/components/Dialogs/SetEmailDialog/Content.tsx"
                      ></FormattedMessage>
                    </span>
                  ),
                }}
              />
            </p>
          </Dialog.Message>
        </>
      )}

      {!editable && (
        <>
          <Dialog.Message noSpacingBottom>
            <p className={styles.hint}>
              <FormattedMessage
                defaultMessage="Email can be modified up to {count} times per day."
                description="src/components/Dialogs/SetEmailDialog/Content.tsx"
                values={{
                  count: MAX_CHANGE_EMAIL_TIME_DAILY,
                }}
              />
            </p>
          </Dialog.Message>
        </>
      )}

      <Dialog.Content>{InnerForm}</Dialog.Content>

      <Dialog.Footer
        smUpBtns={
          <>
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Cancel" />}
              color="greyDarker"
              onClick={closeDialog}
            />
            {editable && SubmitButton}
          </>
        }
      />
    </>
  )
}

export default SetEmailDialogContent

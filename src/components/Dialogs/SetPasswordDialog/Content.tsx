import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _pickBy from 'lodash/pickBy'
import React, { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { KEYVALUE } from '~/common/enums'
import {
  normalizePassowrd,
  parseFormSubmitErrors,
  validatePassword,
} from '~/common/utils'
import {
  Dialog,
  Form,
  LanguageContext,
  Media,
  Spacer,
  toast,
  useMutation,
} from '~/components'
import { SetPasswordMutation } from '~/gql/graphql'

interface FormProps {
  closeDialog: () => void
}

interface FormValues {
  password: string
}

const SET_PASSWORD = gql`
  mutation SetPassword($input: SetPasswordInput!) {
    setPassword(input: $input) {
      id
      info {
        email
      }
      status {
        hasEmailLoginPassword
      }
    }
  }
`

const SetPasswordDialogContent: React.FC<FormProps> = ({ closeDialog }) => {
  const intl = useIntl()

  const [set] = useMutation<SetPasswordMutation>(SET_PASSWORD, undefined, {
    showToast: false,
  })

  const { lang } = useContext(LanguageContext)

  const formId = 'edit-password-form'

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  } = useFormik<FormValues>({
    initialValues: {
      password: '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: ({ password }) =>
      _pickBy({
        email: validatePassword(password, lang),
      }),
    onSubmit: async ({ password }, { setSubmitting, setFieldError }) => {
      try {
        await set({ variables: { input: { password } } })

        // toast
        toast.success({
          message: (
            <FormattedMessage
              defaultMessage="Set password succeed"
              description="src/components/Dialogs/SetPasswordDialog/Content.tsx"
            />
          ),
        })

        setSubmitting(false)
        closeDialog()
      } catch (error) {
        const [messages, codes] = parseFormSubmitErrors(error as any)
        codes.forEach((code) => {
          setFieldError('password', intl.formatMessage(messages[code]))
        })
        setSubmitting(false)
      }
    },
  })

  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit}>
      <Form.Input
        type="text"
        name="password"
        autoFocus
        required
        placeholder={intl.formatMessage({ defaultMessage: 'Password' })}
        value={values.password}
        error={touched.password && errors.password}
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key.toLocaleLowerCase() === KEYVALUE.enter) {
            e.stopPropagation()
          }
        }}
        onKeyUp={() => {
          const p = normalizePassowrd(values.password)
          setFieldValue('password', p)
        }}
      />
    </Form>
  )

  const SubmitButton = (
    <Dialog.TextButton
      type="submit"
      form={formId}
      disabled={isSubmitting || values.password.length < 8}
      text={<FormattedMessage defaultMessage="Confirm" />}
      loading={isSubmitting}
    />
  )

  return (
    <>
      <Dialog.Header
        title={
          <FormattedMessage
            defaultMessage="Login password"
            description="src/components/Dialogs/SetPasswordDialog/Content.tsx"
          />
        }
        closeDialog={closeDialog}
        rightBtn={SubmitButton}
      />

      <Dialog.Message noSpacingBottom>
        <p>
          <FormattedMessage
            defaultMessage="Password must be at least 8 characters long, support letter, numbers and symbols."
            description="src/components/Dialogs/SetPasswordDialog/Content.tsx"
          />
        </p>
        <Media greaterThan="sm">
          <Spacer size="base" />
        </Media>
      </Dialog.Message>

      <Dialog.Content smExtraSpacing>{InnerForm}</Dialog.Content>

      <Dialog.Footer
        smUpBtns={
          <>
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Cancel" />}
              color="greyDarker"
              onClick={closeDialog}
            />
            {SubmitButton}
          </>
        }
      />
    </>
  )
}

export default SetPasswordDialogContent

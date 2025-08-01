import { ApolloError } from '@apollo/client'
import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _pickBy from 'lodash/pickBy'
import React, { useId } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { KEYVALUE } from '~/common/enums'
import {
  normalizePassowrd,
  parseFormSubmitErrors,
  validatePassword,
} from '~/common/utils'
import { Dialog, Form, Spacer, toast, useMutation } from '~/components'
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

  const formId = useId()

  const {
    values,
    errors,
    touched,
    // handleBlur,
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
        email: validatePassword(password, intl),
      }),
    onSubmit: async ({ password }, { setSubmitting, setFieldError }) => {
      try {
        await set({ variables: { input: { password } } })

        // toast
        toast.info({
          message: (
            <FormattedMessage
              defaultMessage="Set password succeed"
              id="pHg5Ju"
              description="src/components/Dialogs/SetPasswordDialog/Content.tsx"
            />
          ),
        })

        setSubmitting(false)
        closeDialog()
      } catch (error) {
        const [messages, codes] = parseFormSubmitErrors(error as ApolloError)
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
        placeholder={intl.formatMessage({
          defaultMessage: 'Password',
          id: '5sg7KC',
        })}
        value={values.password}
        error={touched.password && errors.password}
        // onBlur={handleBlur}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key.toLowerCase() === KEYVALUE.enter) {
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
      text={<FormattedMessage defaultMessage="Confirm" id="N2IrpM" />}
      loading={isSubmitting}
    />
  )

  return (
    <>
      <Dialog.Header
        title={
          <FormattedMessage
            defaultMessage="Login password"
            id="KIQUHo"
            description="src/components/Dialogs/SetPasswordDialog/Content.tsx"
          />
        }
        closeDialog={closeDialog}
        rightBtn={SubmitButton}
      />

      <Dialog.Content>
        <Dialog.Content.Message>
          <p>
            <FormattedMessage
              defaultMessage="Password must be at least 8 characters long, support letter, numbers and symbols."
              id="W66Eyq"
              description="src/components/Dialogs/SetPasswordDialog/Content.tsx"
            />
          </p>
          <Spacer size="sp16" />
        </Dialog.Content.Message>
        {InnerForm}
      </Dialog.Content>

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
    </>
  )
}

export default SetPasswordDialogContent

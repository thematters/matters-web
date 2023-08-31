import { useApolloClient } from '@apollo/react-hooks'
import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _pickBy from 'lodash/pickBy'
import React, { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { KEYVALUE } from '~/common/enums'
import { validateUserName } from '~/common/utils'
import { Dialog, Form, LanguageContext, Spacer } from '~/components'

import Field from '../../Form/Field'
import styles from './styles.module.css'

interface Props {
  userName: string
  gotoConfirm: (userName: string) => void
}

interface FormValues {
  userName: string
}

const QUERY_USER_NAME = gql`
  query QueryUserName($userName: String!) {
    user(input: { userName: $userName }) {
      id
    }
  }
`

const InputStep: React.FC<Props> = ({ userName, gotoConfirm }) => {
  const { lang } = useContext(LanguageContext)

  const client = useApolloClient()

  const maxUsername = 15
  const formId = 'edit-user-name-input'

  const intl = useIntl()
  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  } = useFormik<FormValues>({
    initialValues: {
      userName: userName,
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: ({ userName }) =>
      _pickBy({
        userName: validateUserName(userName, lang),
      }),
    onSubmit: async ({ userName }, { setSubmitting, setFieldError }) => {
      try {
        const { data } = await client.query({
          query: QUERY_USER_NAME,
          variables: { userName },
          fetchPolicy: 'network-only',
        })
        setSubmitting(false)

        if (!!data.user) {
          setFieldError(
            'userName',
            intl.formatMessage({
              defaultMessage: 'This ID has been taken, please try another one',
              description:
                'src/components/Dialogs/SetUserNameDialog/Content.tsx',
            })
          )
        } else {
          gotoConfirm(userName)
        }
      } catch (error) {
        setSubmitting(false)
      }
    },
  })

  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit}>
      <Form.Input
        type="text"
        name="userName"
        required
        placeholder={intl.formatMessage({
          defaultMessage: 'English letters, numbers, and underscores',
          description: 'src/components/Dialogs/SetUserNameDialog/Content.tsx',
        })}
        value={values.userName}
        error={errors.userName}
        onBlur={handleBlur}
        onChange={handleChange}
        maxLength={maxUsername}
        onKeyDown={(e) => {
          if (e.key.toLocaleLowerCase() === KEYVALUE.enter) {
            e.stopPropagation()
          }
        }}
        onPaste={(e) => {
          e.preventDefault()
          return false
        }}
        onKeyUp={() => {
          const v = values.userName
            .split('')
            .filter((c) => /^[a-zA-Z0-9_]*$/.test(c))
          setFieldValue('userName', v.join('').slice(0, maxUsername))
        }}
        leftButton={<span className={styles.atFlag}>@</span>}
        hasFooter={false}
      />
      <Field.Footer
        fieldMsgId={'field-msg-username'}
        hint={`${values.userName.length}/${maxUsername}`}
        hintAlign="right"
      />
      {errors.userName && (
        <Field.Footer
          fieldMsgId={'field-msg-username-error'}
          error={errors.userName}
          hintAlign="center"
          hintSpace="base"
        />
      )}
    </Form>
  )

  const SubmitButton = (
    <Dialog.TextButton
      type="submit"
      form={formId}
      disabled={isSubmitting || values.userName.length < 4}
      text={<FormattedMessage defaultMessage="Confirm" />}
      loading={isSubmitting}
    />
  )

  return (
    <>
      <Dialog.Header
        title={
          <FormattedMessage
            defaultMessage="Last step: Set Matters ID"
            description="src/components/Dialogs/SetUserNameDialog/Content.tsx"
          />
        }
      />

      <Dialog.Message>
        <p>
          <FormattedMessage
            defaultMessage="Matters ID is your unique identifier, and cannot be modified once set."
            description="src/components/Dialogs/SetUserNameDialog/Content.tsx"
          />
        </p>
      </Dialog.Message>
      <Spacer size="base" />
      <Dialog.Content>{InnerForm}</Dialog.Content>

      <Dialog.Footer smUpBtns={<>{SubmitButton}</>} />
    </>
  )
}

export default InputStep

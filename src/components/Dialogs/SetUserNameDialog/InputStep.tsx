import { useApolloClient } from '@apollo/react-hooks'
import { useFormik } from 'formik'
import _pickBy from 'lodash/pickBy'
import React, { useContext, useEffect } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import {
  KEYVALUE,
  MAX_USER_NAME_LENGTH,
  MIN_USER_NAME_LENGTH,
} from '~/common/enums'
import { normalizeUserName, validateUserName } from '~/common/utils'
import { DialogBeta, Form, LanguageContext, ViewerContext } from '~/components'

import Field from '../../Form/Field'
import { QUERY_USER_NAME } from './gql'
import styles from './styles.module.css'

interface Props {
  userName: string
  gotoConfirm: (userName: string) => void
}

interface FormValues {
  mattersID: string
}

const InputStep: React.FC<Props> = ({ userName, gotoConfirm }) => {
  const { lang } = useContext(LanguageContext)
  const viewer = useContext(ViewerContext)

  const client = useApolloClient()

  const maxUsername = MAX_USER_NAME_LENGTH
  const formId = 'edit-user-name-input'
  const isLegacyUserConfirm = !!(
    viewer.userName && viewer.info.userNameEditable
  )

  useEffect(() => {
    setFieldValue('mattersID', userName)
  }, [userName])

  const intl = useIntl()
  const {
    values,
    errors,
    // handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    validateForm,
    isSubmitting,
  } = useFormik<FormValues>({
    initialValues: {
      mattersID: userName,
    },
    validateOnBlur: false,
    validateOnChange: true,
    validate: ({ mattersID }) =>
      _pickBy({
        mattersID: validateUserName(mattersID, lang),
      }),
    onSubmit: async ({ mattersID }, { setSubmitting, setFieldError }) => {
      if (isLegacyUserConfirm && viewer.userName === mattersID) {
        gotoConfirm(mattersID)
        return
      }

      try {
        const { data } = await client.query({
          query: QUERY_USER_NAME,
          variables: { userName: mattersID },
          fetchPolicy: 'network-only',
        })
        setSubmitting(false)

        if (!!data.user) {
          setFieldError(
            'mattersID',
            intl.formatMessage({
              defaultMessage: 'This ID has been taken, please try another one',
              id: 'x7O1/5',
              description:
                'src/components/Dialogs/SetUserNameDialog/Content.tsx',
            })
          )
        } else {
          gotoConfirm(mattersID)
        }
      } catch (error) {
        setSubmitting(false)
      }
    },
  })

  useEffect(() => {
    if (!isLegacyUserConfirm) return

    validateForm()
  }, [isLegacyUserConfirm])

  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit}>
      <Form.Input
        type="text"
        // Why not use userName, userName will trigger auto fill feature in safari
        name="mattersID"
        autoFocus
        placeholder={intl.formatMessage({
          defaultMessage: 'Lowercase letters, numbers and underscores',
          id: '6+eeJ4',
          description: 'src/components/Dialogs/SetUserNameDialog/Content.tsx',
        })}
        value={values.mattersID}
        error={errors.mattersID}
        // FIXME: handleBlur will cause the component to re-render
        // onBlur={handleBlur}
        onChange={handleChange}
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
          const v = normalizeUserName(values.mattersID)
          setFieldValue('mattersID', v.slice(0, maxUsername))
        }}
        leftButton={<span className={styles.atFlag}>@</span>}
        hasFooter={false}
      />
      <Field.Footer
        fieldMsgId={'field-msg-username'}
        hint={`${values.mattersID.length}/${maxUsername}`}
        error={
          errors.mattersID ? `${values.mattersID.length}/${maxUsername}` : ''
        }
        hintAlign="right"
      />
      {errors.mattersID && (
        <Field.Footer
          fieldMsgId={'field-msg-username-error'}
          error={errors.mattersID}
          hintAlign="center"
          hintSpace="base"
          hintSize="sm"
        />
      )}
    </Form>
  )

  const SubmitButton = (
    <DialogBeta.TextButton
      type="submit"
      form={formId}
      disabled={
        isSubmitting ||
        values.mattersID.length < MIN_USER_NAME_LENGTH ||
        values.mattersID.length > MAX_USER_NAME_LENGTH ||
        !!errors.mattersID
      }
      text={<FormattedMessage defaultMessage="Confirm" id="N2IrpM" />}
      loading={isSubmitting}
    />
  )

  return (
    <>
      <DialogBeta.Header
        title={
          isLegacyUserConfirm ? (
            <FormattedMessage
              defaultMessage="Confirm Matters ID"
              id="1hyiZ8"
              description="src/components/Dialogs/SetUserNameDialog/Content.tsx"
            />
          ) : (
            <FormattedMessage
              defaultMessage="Last step: Set Matters ID"
              id="l0/EvT"
              description="src/components/Dialogs/SetUserNameDialog/Content.tsx"
            />
          )
        }
      />
      <DialogBeta.Content>
        <DialogBeta.Content.Message spacingBottom>
          <p>
            {isLegacyUserConfirm ? (
              <FormattedMessage
                defaultMessage="In order to ensure the identity security of the citizens of Matters City, we've upgraded some security settings. Please confirm your Matters ID (cannot be modified once confirmation)."
                id="ySSF/a"
                description="src/components/Dialogs/SetUserNameDialog/Content.tsx"
              />
            ) : (
              <FormattedMessage
                defaultMessage="Matters ID is your unique identifier, and cannot be modified once set."
                id="LwFJTy"
                description="src/components/Dialogs/SetUserNameDialog/Content.tsx"
              />
            )}
          </p>
        </DialogBeta.Content.Message>
        {InnerForm}
      </DialogBeta.Content>

      <DialogBeta.Footer
        btns={
          <>
            <DialogBeta.RoundedButton
              type="submit"
              color="green"
              form={formId}
              disabled={
                isSubmitting || values.mattersID.length < MIN_USER_NAME_LENGTH
              }
              text={<FormattedMessage defaultMessage="Confirm" id="N2IrpM" />}
              loading={isSubmitting}
            />
          </>
        }
        smUpBtns={<>{SubmitButton}</>}
      />
    </>
  )
}

export default InputStep

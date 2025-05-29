import { useApolloClient } from '@apollo/client'
import { useFormik } from 'formik'
import _pickBy from 'lodash/pickBy'
import React, { useContext, useEffect, useId } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import {
  KEYVALUE,
  MAX_USER_NAME_LENGTH,
  MIN_USER_NAME_LENGTH,
} from '~/common/enums'
import { normalizeUserName, validateUserName } from '~/common/utils'
import { Dialog, Form, ViewerContext } from '~/components'

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
  const viewer = useContext(ViewerContext)

  const client = useApolloClient()

  const maxUsername = MAX_USER_NAME_LENGTH
  const formId = useId()
  const isLegacyUserConfirm = !!(
    viewer.userName && viewer.info.userNameEditable
  )

  useEffect(() => {
    setFieldValue(
      'mattersID',
      isLegacyUserConfirm ? userName.toLowerCase() : userName
    )
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
      mattersID: isLegacyUserConfirm ? userName.toLowerCase() : userName,
    },
    validateOnBlur: false,
    validateOnChange: true,
    validate: ({ mattersID }) =>
      _pickBy({
        mattersID: validateUserName(mattersID, intl),
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

        if (!!data.user && data.user.id !== viewer.id) {
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
      } catch {
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
    <Dialog.TextButton
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
      <Dialog.Header
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

      <Dialog.Content>
        <Dialog.Content.Message spacingBottom>
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
        </Dialog.Content.Message>
        {InnerForm}
      </Dialog.Content>

      <Dialog.Footer
        btns={
          <>
            <Dialog.RoundedButton
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

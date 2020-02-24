import { useFormik } from 'formik'
import gql from 'graphql-tag'
import React, { useContext } from 'react'

import { Dialog, Form, LanguageContext, Translate } from '~/components'
import { getErrorCodes, useMutation } from '~/components/GQL'

import { TEXT } from '~/common/enums'
import {
  hasFormError,
  translate,
  validateComparedUserName,
  validateUserName
} from '~/common/utils'

import { UpdateUserInfoUserName } from './__generated__/UpdateUserInfoUserName'

interface FormProps {
  submitCallback: () => void
  closeDialog: () => void
}

interface FormValues {
  userName: string
  comparedUserName: string
}

const UPDATE_USER_INFO = gql`
  mutation UpdateUserInfoUserName($input: UpdateUserInfoInput!) {
    updateUserInfo(input: $input) {
      id
      userName
    }
  }
`

const Confirm: React.FC<FormProps> = ({ submitCallback, closeDialog }) => {
  const [update] = useMutation<UpdateUserInfoUserName>(UPDATE_USER_INFO)
  const { lang } = useContext(LanguageContext)

  const formId = 'username-change-confirm-form'

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting
  } = useFormik<FormValues>({
    initialValues: {
      userName: '',
      comparedUserName: ''
    },
    validate: ({ userName, comparedUserName }) => {
      return {
        userName: validateUserName(userName, lang),
        comparedUserName: validateComparedUserName(
          userName,
          comparedUserName,
          lang
        )
      }
    },
    onSubmit: async ({ userName }, { setFieldError, setSubmitting }) => {
      try {
        await update({ variables: { input: { userName } } })

        if (submitCallback) {
          submitCallback()
        }
      } catch (error) {
        const errorCode = getErrorCodes(error)[0]
        const errorMessage = translate({
          zh_hant: TEXT.zh_hant[errorCode] || errorCode,
          zh_hans: TEXT.zh_hans[errorCode] || errorCode,
          lang
        })
        setFieldError('userName', errorMessage)
      }

      setSubmitting(false)
    }
  })

  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit}>
      <Form.Input
        label="Matters ID"
        type="text"
        name="userName"
        required
        placeholder={translate({ id: 'enterUserName', lang })}
        hint={<Translate id="userNameHint" />}
        value={values.userName}
        error={touched.userName && errors.userName}
        onBlur={handleBlur}
        onChange={handleChange}
      />

      <Form.Input
        type="text"
        name="comparedUserName"
        required
        placeholder={translate({ id: 'enterUserNameAgign', lang })}
        value={values.comparedUserName}
        error={touched.comparedUserName && errors.comparedUserName}
        onBlur={handleBlur}
        onChange={handleChange}
        hint={<Translate id="userNameHint" />}
      />
    </Form>
  )

  const SubmitButton = (
    <Dialog.Header.RightButton
      type="submit"
      form={formId}
      disabled={!hasFormError(errors) || isSubmitting}
      text={<Translate id="nextStep" />}
      loading={isSubmitting}
    />
  )

  return (
    <>
      <Dialog.Header
        title={<Translate id="changeUserName" />}
        close={closeDialog}
        rightButton={SubmitButton}
      />

      <Dialog.Content spacing={[0, 0]} hasGrow>
        {InnerForm}
      </Dialog.Content>
    </>
  )
}

export default Confirm

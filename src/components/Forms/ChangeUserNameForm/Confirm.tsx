import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _pickBy from 'lodash/pickBy'
import React, { useContext, useId } from 'react'

import {
  normalizeName,
  parseFormSubmitErrors,
  translate,
  validateComparedUserName,
  validateUserName,
} from '~/common/utils'
import {
  Dialog,
  Form,
  LanguageContext,
  Layout,
  Translate,
  useMutation,
} from '~/components'
import { UpdateUserInfoUserNameMutation } from '~/gql/graphql'

import styles from '../styles.module.css'

interface FormProps {
  purpose: 'dialog' | 'page'
  submitCallback: () => void
  closeDialog?: () => void
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

const Confirm: React.FC<FormProps> = ({
  purpose,
  submitCallback,
  closeDialog,
}) => {
  const [update] = useMutation<UpdateUserInfoUserNameMutation>(
    UPDATE_USER_INFO,
    undefined,
    { showToast: false }
  )
  const { lang } = useContext(LanguageContext)
  const isInPage = purpose === 'page'
  const formId = useId()

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    isSubmitting,
    setFieldValue,
  } = useFormik<FormValues>({
    initialValues: {
      userName: '',
      comparedUserName: '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: ({ userName, comparedUserName }) =>
      _pickBy({
        userName: validateUserName(userName, lang),
        comparedUserName: validateComparedUserName(
          userName,
          comparedUserName,
          lang
        ),
      }),
    onSubmit: async ({ userName }, { setFieldError, setSubmitting }) => {
      try {
        await update({ variables: { input: { userName } } })

        setSubmitting(false)

        if (submitCallback) {
          submitCallback()
        }
      } catch (error) {
        setSubmitting(false)

        const [messages, codes] = parseFormSubmitErrors(error as any, lang)
        codes.forEach((code) => {
          if (code === 'NAME_EXISTS') {
            setFieldError(
              'userName',
              translate({
                zh_hant: 'Oops！此 Matters ID 已被使用了，換一個試試',
                zh_hans: 'Oops！此 Matters ID 已被使用了，换一个试试',
                lang,
              })
            )
          } else if (code === 'NAME_INVALID') {
            setFieldError(
              'userName',
              translate({
                id: 'hintUserName',
                lang,
              })
            )
          } else {
            setFieldError('userName', messages[code])
          }
        })
      }
    },
  })

  const InnerForm = (
    <section className="container">
      <Form id={formId} onSubmit={handleSubmit}>
        <Form.Input
          label="Matters ID"
          type="text"
          name="userName"
          required
          placeholder={translate({
            id: 'enterUserName',
            lang,
          })}
          hint={<Translate id="hintUserName" />}
          value={values.userName}
          error={touched.userName && errors.userName}
          onBlur={handleBlur}
          onChange={(e) => {
            const userName = normalizeName(e.target.value)
            setFieldValue('userName', userName)
            return userName
          }}
        />

        <Form.Input
          type="text"
          name="comparedUserName"
          required
          placeholder={translate({ id: 'enterUserNameAgain', lang })}
          value={values.comparedUserName}
          error={touched.comparedUserName && errors.comparedUserName}
          onBlur={handleBlur}
          hint={<Translate id="hintUserName" />}
          onChange={(e) => {
            const userName = normalizeName(e.target.value)
            setFieldValue('comparedUserName', userName)
            return userName
          }}
        />
      </Form>
    </section>
  )

  const SubmitButton = (
    <Dialog.Header.RightButton
      type="submit"
      form={formId}
      disabled={isSubmitting}
      text={<Translate id="nextStep" />}
      loading={isSubmitting}
    />
  )

  if (isInPage) {
    return (
      <>
        <Layout.Header
          right={
            <>
              <Layout.Header.Title id="changeUserName" />
              {SubmitButton}
            </>
          }
        />

        {InnerForm}
      </>
    )
  }

  return (
    <>
      {closeDialog && (
        <Dialog.Header
          title="changeUserName"
          closeDialog={closeDialog}
          rightButton={SubmitButton}
        />
      )}

      <Dialog.Content hasGrow>{InnerForm}</Dialog.Content>
    </>
  )
}

export default Confirm

import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _pickBy from 'lodash/pickBy'
import React, { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

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
  const intl = useIntl()
  const [update] = useMutation<UpdateUserInfoUserNameMutation>(
    UPDATE_USER_INFO,
    undefined,
    { showToast: false }
  )
  const { lang } = useContext(LanguageContext)
  const isInPage = purpose === 'page'
  const formId = 'username-confirm-form'

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

        const [messages, codes] = parseFormSubmitErrors(error as any)
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
            setFieldError('userName', intl.formatMessage(messages[code]))
          }
        })
      }
    },
  })

  const InnerForm = (
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
        spacingBottom="base"
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
  )

  const SubmitButton = (
    <Dialog.TextButton
      type="submit"
      form={formId}
      disabled={isSubmitting}
      text={<FormattedMessage defaultMessage="Next Step" />}
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
              <Layout.Header.RightButton
                type="submit"
                form={formId}
                disabled={isSubmitting}
                text={<FormattedMessage defaultMessage="Next Step" />}
                loading={isSubmitting}
              />
            </>
          }
        />

        <Layout.Main.Spacing>{InnerForm}</Layout.Main.Spacing>
      </>
    )
  }

  return (
    <>
      <Dialog.Header
        title="changeUserName"
        closeDialog={closeDialog}
        rightBtn={SubmitButton}
      />

      <Dialog.Content>{InnerForm}</Dialog.Content>

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

export default Confirm

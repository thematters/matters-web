import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _pickBy from 'lodash/pickBy'
import React, { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { KEYVALUE, OAUTH_CALLBACK_PROVIDERS } from '~/common/enums'
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
  console.log({ viewer })

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

          // TODO:
          // update(cache, result) {
          //   updateUserProfile({
          //     cache,
          //     userName,
          //     type: 'increaseCollection',
          //   })
          //   if (onUpdate) {
          //     onUpdate(cache, result.data?.putCollection || ({} as Collection))
          //   }
          // },
          // refetchQueries: [
          //   {
          //     query: USER_COLLECTIONS,
          //     variables: { userName: viewer.userName },
          //   },
          // ],
        })

        const redirectPath = `/callback/${OAUTH_CALLBACK_PROVIDERS.EmailVerification}`
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
          refetchQueries: [
            {
              query: ROOT_QUERY_PRIVATE,
            },
          ],
        })

        // TODO: toast

        setSubmitting(false)
        closeDialog()
      } catch (error) {
        const [messages, codes] = parseFormSubmitErrors(error as any, lang)
        console.log({ messages, codes })
        codes.forEach((code) => {
          setFieldError('email', messages[code])
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

export default SetEmailDialogContent
